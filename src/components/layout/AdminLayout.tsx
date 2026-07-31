import { Outlet, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { getSupabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { LogOut, Shield, ClipboardList, TrendingUp } from 'lucide-react'

export function AdminLayout() {
  const [email, setEmail] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const sb = getSupabase()
    if (!sb) return
    sb.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar / Mobile Header */}
      <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-900 p-5 flex flex-col justify-between z-10 text-slate-300">
        <div>
          {/* Logo / Branding */}
          <Link to="/admin" className="flex items-center gap-3 py-2 px-1 hover:opacity-95 transition-opacity">
            <span className="grid size-10 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <Shield className="size-5" />
            </span>
            <div>
              <span className="block text-sm font-extrabold tracking-tight text-white">
                MPD Console
              </span>
              <span className="block text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
                Control Center
              </span>
            </div>
          </Link>

          <hr className="my-5 border-slate-800" />

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                location.pathname === '/admin'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <ClipboardList className="size-4 shrink-0" />
              <span>Bookings list</span>
            </Link>

            <div className="opacity-40 pointer-events-none cursor-not-allowed">
              <span
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-slate-600"
              >
                <TrendingUp className="size-4 shrink-0" />
                <span>Analytics (Coming)</span>
              </span>
            </div>
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="mt-8 md:mt-0 pt-4 border-t border-slate-800 space-y-4">
          {email ? (
            <div className="px-1">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Logged in as</p>
              <p className="text-xs font-semibold text-white truncate mt-0.5" title={email}>
                {email}
              </p>
            </div>
          ) : null}

          <Button
            variant="outline"
            className="w-full justify-start rounded-2xl border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={async () => {
              const sb = getSupabase()
              if (!sb) return
              await sb.auth.signOut()
              window.location.href = '/'
            }}
          >
            <LogOut className="mr-2 size-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="text-sm font-bold text-slate-800 tracking-tight">
            Admin Panel
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-3 font-semibold">
            <span>Dubai, UAE</span>
            <span className="text-slate-200">|</span>
            <span>{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Primary Page Outlet */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
