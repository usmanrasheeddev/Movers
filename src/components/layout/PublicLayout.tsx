import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { RouteTransition } from '@/components/motion/RouteTransition'

export function PublicLayout() {
  const location = useLocation()
  const onHome = location.pathname === '/'
  const whatsappHref = 'https://wa.me/971557516254'

  return (
    <div className="min-h-dvh bg-background">
      <Navbar />
      <main className={onHome ? 'pt-0' : 'pt-24'}>
        <RouteTransition>
          <Outlet />
        </RouteTransition>
      </main>
      <Footer />
      {!onHome ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp 0557516254"
          className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-transform hover:scale-105"
        >
          <svg
            viewBox="0 0 32 32"
            className="size-6"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16.003 2.004c-7.732 0-13.999 6.266-13.999 13.998 0 2.463.64 4.874 1.857 7.002L2 30l7.17-1.833a13.936 13.936 0 0 0 6.833 1.834h.001c7.731 0 13.999-6.267 13.999-13.998 0-3.736-1.455-7.249-4.096-9.889a13.94 13.94 0 0 0-9.904-4.11zm0 25.333a11.35 11.35 0 0 1-5.796-1.591l-.416-.247-4.251 1.087 1.135-4.145-.27-.426a11.323 11.323 0 0 1-1.74-6.013c0-6.25 5.08-11.33 11.338-11.33 3.021 0 5.861 1.176 7.997 3.312a11.27 11.27 0 0 1 3.31 8.018c0 6.25-5.08 11.33-11.307 11.33zm6.195-8.477c-.338-.169-1.996-.985-2.306-1.097-.31-.112-.537-.169-.764.169-.225.338-.876 1.097-1.075 1.323-.197.225-.394.253-.732.084-.338-.169-1.427-.525-2.719-1.675-1.005-.896-1.683-2.003-1.881-2.34-.197-.338-.021-.52.148-.689.152-.151.338-.394.507-.591.169-.197.225-.338.338-.563.112-.225.056-.422-.028-.591-.084-.169-.764-1.844-1.047-2.528-.276-.662-.556-.572-.764-.583l-.65-.011c-.225 0-.59.084-.9.422-.31.338-1.183 1.154-1.183 2.815 0 1.661 1.211 3.268 1.379 3.494.169.225 2.383 3.64 5.776 5.102.807.347 1.437.555 1.929.711.81.258 1.548.222 2.131.135.65-.097 1.996-.816 2.277-1.603.281-.788.281-1.463.197-1.603-.084-.141-.31-.225-.648-.394z" />
          </svg>
          <span className="sr-only">WhatsApp 0557516254</span>
        </a>
      ) : null}
    </div>
  )
}
