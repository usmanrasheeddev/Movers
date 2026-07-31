import { useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { getSupabase } from '@/lib/supabase'
import { Lock, Shield } from 'lucide-react'

export default function AdminLogin() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <Seo title="Admin Login — Movers Packers Dubai" canonicalPath="/admin/login" />

      {/* Left side: Premium Branding (Desktop only) */}
      <section className="hidden md:flex md:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
        
        {/* Top Header */}
        <div className="flex items-center gap-3 relative z-10">
          <span className="grid size-10 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
            <Shield className="size-5" />
          </span>
          <div>
            <span className="block text-sm font-extrabold tracking-tight text-white uppercase">
              MPD Console
            </span>
            <span className="block text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
              Control Center
            </span>
          </div>
        </div>

        {/* Center Panel */}
        <div className="space-y-4 max-w-md relative z-10 my-auto">
          <h2 className="text-3xl font-black tracking-tight leading-tight text-white">
            Secure Access to Bookings Manager
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Review incoming requests, monitor dispatch operations, update booking status, and export operations data across Dubai.
          </p>
        </div>

        {/* Bottom Metadata */}
        <div className="text-[11px] text-slate-500 flex items-center justify-between relative z-10 border-t border-slate-800/80 pt-4">
          <span>Dubai, UAE</span>
          <span>© {new Date().getFullYear()} Movers Packers Dubai</span>
        </div>
      </section>

      {/* Right side: Login Form */}
      <section className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div>
            {/* Mobile-only logo */}
            <div className="flex md:hidden items-center gap-2.5 mb-6">
              <span className="grid size-9 place-items-center rounded-xl bg-slate-900 text-white">
                <Shield className="size-4.5" />
              </span>
              <div>
                <span className="block text-xs font-black tracking-tight text-ink uppercase">
                  MPD Console
                </span>
                <span className="block text-[9px] text-emerald-600 uppercase tracking-wider font-bold">
                  Control Center
                </span>
              </div>
            </div>

            <h1 className="text-2xl font-black text-ink tracking-tight flex items-center gap-2">
              <Lock className="size-5 text-emerald-600" /> Admin login
            </h1>
            <p className="text-xs text-inkMuted mt-2">
              Sign in with your secure administrator credentials.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              const sb = getSupabase()
              if (!sb) {
                toast.error('Supabase not configured.')
                return
              }

              const data = new FormData(e.currentTarget)
              const email = String(data.get('email') ?? '')
              const password = String(data.get('password') ?? '')

              setLoading(true)
              try {
                const { error } = await sb.auth.signInWithPassword({
                  email,
                  password,
                })
                if (error) throw error
                window.location.href = '/admin'
              } catch (err: any) {
                toast.error(err?.message ?? 'Login failed')
              } finally {
                setLoading(false)
              }
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[11px] font-bold text-inkMuted uppercase tracking-wider">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="h-11 rounded-xl bg-card border-outline/70 focus:border-emerald-600 focus:ring-emerald-600 text-xs font-medium"
                placeholder="admin@company.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[11px] font-bold text-inkMuted uppercase tracking-wider">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="h-11 rounded-xl bg-card border-outline/70 focus:border-emerald-600 focus:ring-emerald-600 text-xs font-medium"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all mt-2"
              disabled={loading}
            >
              {loading ? 'Authenticating…' : 'Sign in to Console →'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
