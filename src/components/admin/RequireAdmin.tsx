import { type PropsWithChildren, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getSupabase } from '@/lib/supabase'

type State =
  | { status: 'loading' }
  | { status: 'no-supabase' }
  | { status: 'unauthenticated' }
  | { status: 'forbidden' }
  | { status: 'ok' }

export function RequireAdmin({ children }: PropsWithChildren) {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const sb = getSupabase()
    if (!sb) {
      setState({ status: 'no-supabase' })
      return
    }

    let canceled = false

    ;(async () => {
      const { data } = await sb.auth.getUser()
      const user = data.user
      if (!user) {
        if (!canceled) setState({ status: 'unauthenticated' })
        return
      }

      const { data: profile, error } = await sb
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .maybeSingle()

      if (error) {
        if (!canceled) setState({ status: 'forbidden' })
        return
      }

      if (!profile?.is_admin) {
        if (!canceled) setState({ status: 'forbidden' })
        return
      }

      if (!canceled) setState({ status: 'ok' })
    })()

    return () => {
      canceled = true
    }
  }, [])

  if (state.status === 'loading') {
    return (
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-6 md:py-20">
        <p className="text-sm text-inkMuted">Checking admin access…</p>
      </div>
    )
  }

  if (state.status === 'no-supabase') {
    return (
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-6 md:py-20">
        <p className="text-sm text-inkMuted">
          Admin requires Supabase configuration.
        </p>
      </div>
    )
  }

  if (state.status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />
  }

  if (state.status === 'forbidden') {
    return (
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-6 md:py-20">
        <p className="text-sm font-semibold text-ink">Access denied</p>
        <p className="mt-2 text-sm text-inkMuted">
          Your account doesn’t have admin permissions.
        </p>
      </div>
    )
  }

  return <>{children}</>
}
