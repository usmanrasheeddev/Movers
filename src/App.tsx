import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { RequireAdmin } from '@/components/admin/RequireAdmin'

import Home from '@/pages/Home' // Eager import for instant LCP of landing page

// Lazy loaded sub-pages
const Services = lazy(() => import('@/pages/Services'))
const About = lazy(() => import('@/pages/About'))
const Faq = lazy(() => import('@/pages/Faq'))
const Contact = lazy(() => import('@/pages/Contact'))
const Booking = lazy(() => import('@/pages/Booking'))
const Track = lazy(() => import('@/pages/Track'))
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminPanel = lazy(() => import('@/pages/admin/AdminPanel'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
      <div className="size-10 animate-spin rounded-full border-4 border-muted border-t-accent" />
      <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
        Loading...
      </p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/track" element={<Track />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<AdminPanel />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </SmoothScroll>

      <Toaster richColors />
    </BrowserRouter>
  )
}

export default App
