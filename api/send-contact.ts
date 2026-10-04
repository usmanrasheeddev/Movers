/// <reference types="node" />
import { Resend } from 'resend'

type Body = {
  name: string
  phone?: string
  message: string
}

function isNonEmptyString(v: unknown) {
  return typeof v === 'string' && v.trim().length > 0
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: { message: 'Method not allowed' } })
    return
  }

  try {
    const resendKey = process.env.RESEND_API_KEY
    const toEmail = process.env.BOOKING_EMAIL_TO
    const fromEmail = process.env.BOOKING_EMAIL_FROM

    if (!resendKey || !toEmail || !fromEmail) {
      res.status(500).json({
        ok: false,
        error: {
          message:
            'Email is not configured. Set RESEND_API_KEY, BOOKING_EMAIL_TO, BOOKING_EMAIL_FROM in Vercel env vars.',
        },
      })
      return
    }

    const body = (req.body ?? {}) as Partial<Body>

    const required: Array<keyof Body> = ['name', 'message']

    for (const k of required) {
      if (!isNonEmptyString(body[k])) {
        res.status(400).json({ ok: false, error: { message: `Missing ${k}` } })
        return
      }
    }

    const name = body.name!.trim()
    const message = body.message!.trim()
    const phone = isNonEmptyString(body.phone) ? body.phone.trim() : 'Not provided'

    const subject = `New contact message - ${name}`

    const text = [`Name: ${name}`, `Phone: ${phone}`, '', 'Message:', message].join(
      '\n'
    )

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">
        <h2 style="margin:0 0 12px">New contact message</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 8px"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <hr style="margin:16px 0" />
        <p style="margin:0 0 8px"><strong>Message</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:12px;line-height:1.4">${escapeHtml(
          message
        )}</pre>
      </div>
    `.trim()

    const recipients = String(toEmail)
      .split(/[\s,]+/g)
      .map((s) => s.trim())
      .filter(Boolean)

    if (!recipients.length) {
      res.status(500).json({
        ok: false,
        error: {
          message: 'BOOKING_EMAIL_TO has no valid recipients',
        },
      })
      return
    }

    const fromDisplay = formatFrom(fromEmail, 'Movers&Packers')
    const resend = new Resend(resendKey)
    const result = await resend.emails.send({
      from: fromDisplay,
      to: recipients,
      subject,
      text,
      html,
    })

    if (result.error) {
      const errorMessage = result.error.message ?? 'Failed to send email'

      // Resend free/testing mode may only allow sending to the account owner's email.
      // The error message usually includes the allowed address in parentheses.
      if (errorMessage.includes('only send testing emails')) {
        const match = errorMessage.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
        const allowedTestingEmail = match?.[0]

        if (allowedTestingEmail) {
          const retryText = `${text}\n\n---\nNOTE: Resend testing mode fallback used. Intended recipients: ${recipients.join(
            ', '
          )}`
          const retryHtml = `${html}\n<hr style="margin:16px 0" />\n<p style="margin:0;color:#555"><strong>Note:</strong> Resend testing mode fallback used. Intended recipients: ${escapeHtml(
            recipients.join(', ')
          )}</p>`

          const retry = await resend.emails.send({
            from: fromDisplay,
            to: [allowedTestingEmail],
            subject,
            text: retryText,
            html: retryHtml,
          })

          if (!retry.error) {
            res.status(200).json({
              ok: true,
              data: { id: retry.data?.id ?? null },
              warning: {
                message:
                  'Resend testing mode: email sent to the verified account address only. Verify a domain to send to other recipients.',
                sentTo: allowedTestingEmail,
              },
            })
            return
          }
        }
      }

      res.status(500).json({
        ok: false,
        error: {
          message: errorMessage,
        },
      })
      return
    }

    res.status(200).json({ ok: true, data: { id: result.data?.id ?? null } })
  } catch (e: any) {
    res.status(500).json({ ok: false, error: { message: e?.message ?? 'Failed to send email' } })
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatFrom(email: string, name: string) {
  if (email.includes('<') && email.includes('>')) return email
  return `${name} <${email}>`
}
