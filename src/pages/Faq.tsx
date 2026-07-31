import { Seo } from '@/components/seo/Seo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'How fast can you move?',
    a: 'Same-day slots are sometimes available depending on schedule and scope. The fastest way is to start the booking form or call us directly.',
  },
  {
    q: 'Do you provide packing materials?',
    a: 'Yes — we bring premium wrapping and packing materials. If you have special items (art, glass, electronics), add details in the booking form.',
  },
  {
    q: 'Are you licensed & insured?',
    a: 'Yes. We operate professionally and aim for a clean, trustworthy experience from start to finish.',
  },
  {
    q: 'Can you do a single item pickup?',
    a: 'Absolutely. Large item delivery and pickups are common — sofas, appliances, bikes, and more.',
  },
  {
    q: 'How do you price moves?',
    a: 'Pricing depends on distance, access (stairs/elevators), item volume, and packing needs. Request a free estimate for exact numbers.',
  },
] as const

export default function Faq() {
  return (
    <div className="bg-background">
      <Seo
        title="FAQ — Movers Packers Dubai"
        description="Answers about moving, packing, junk removal, and delivery services in Dubai."
        canonicalPath="/faq"
      />

      <section className="mx-auto max-w-3xl px-5 py-14 md:px-6 md:py-20">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          Frequently asked questions
        </h1>
        <p dir="rtl" className="mt-2 text-sm text-inkMuted">
          الأسئلة الشائعة
        </p>
        <p className="mt-4 text-sm text-inkMuted md:text-base">
          Quick answers — and a premium experience.
        </p>

        <div className="mt-10 rounded-[2.5rem] border border-outline/70 bg-background p-2 shadow-[0_18px_50px_rgba(26,58,58,0.06)]">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, idx) => (
              <AccordionItem
                key={f.q}
                value={`item-${idx}`}
                className="border-outline/70"
              >
                <AccordionTrigger className="px-5 text-left text-base font-semibold text-ink">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-sm leading-relaxed text-inkMuted">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
