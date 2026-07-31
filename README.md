<p align="center">
  <img src="public/favicon.svg" alt="Movers Packers Dubai" width="80" height="80" />
</p>

<h1 align="center">Movers Packers Dubai</h1>

<p align="center">
  <strong>Dubai's easiest move — premium moving & packing services website.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## ✨ Overview

A full-featured, production-ready website for a Dubai-based movers and packers service. Customers can browse services, create bookings with photo uploads, track their order status, and reach out via a contact form. Admins manage all bookings through a dedicated dashboard. No payment gateway — **cash on delivery** model.

## 🚀 Features

| Category | Details |
|---|---|
| **Landing Page** | Hero with optional video background, services showcase, process steps, testimonials marquee, trust logos, call-to-action sections |
| **Booking System** | Multi-step booking form with date, time, addresses, photo uploads, and Auth0 login |
| **Order Tracking** | Real-time booking status tracker (Pending → Confirmed → In Transit → Delivered) |
| **Address Input** | Interactive Leaflet map with pin selection + optional Google Places autocomplete |
| **Email Notifications** | Booking & contact form submissions emailed to admin via Resend |
| **Admin Dashboard** | Protected panel to view, filter, and manage all bookings with photo gallery & status updates |
| **Animations** | GSAP-powered animations, Lenis smooth scrolling, split-text reveals, magnetic hover effects, route transitions |
| **Contact Page** | Contact form with serverless email delivery |
| **SEO** | React Helmet for per-page meta tags, Open Graph support, semantic HTML |
| **Dark/Light Mode** | Theme toggle powered by `next-themes` |
| **Responsive** | Mobile-first design with sheet navigation on smaller screens |

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI library |
| [TypeScript 6](https://www.typescriptlang.org) | Type safety |
| [Vite 8](https://vite.dev) | Build tool & dev server |
| [React Router 7](https://reactrouter.com) | Client-side routing with lazy-loaded pages |
| [Tailwind CSS 3.4](https://tailwindcss.com) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) | Accessible component primitives |
| [GSAP 3.15](https://gsap.com) | Scroll-triggered animations & motion |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scroll experience |
| [Leaflet](https://leafletjs.com) | Interactive map for address selection |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Form handling & schema validation |
| [Lucide React](https://lucide.dev) | Icon system |
| [Sonner](https://sonner.emilkowal.ski) | Toast notifications |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Booking confirmation celebration effect |

### Backend & Services

| Technology | Purpose |
|---|---|
| [Vercel Serverless Functions](https://vercel.com/docs/functions) | API endpoints (`/api/send-booking`, `/api/send-contact`) |
| [Resend](https://resend.com) | Transactional email delivery |
| [Supabase](https://supabase.com) | Database, auth & storage (admin panel) |
| [Auth0](https://auth0.com) | Customer authentication for bookings |

## 📁 Project Structure

```
Movers-main/
├── api/                          # Vercel Serverless Functions
│   ├── send-booking.ts           #   Booking email handler
│   └── send-contact.ts           #   Contact form email handler
├── public/                       # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── admin/                # Admin components
│   │   │   ├── BookingDetailView.tsx
│   │   │   ├── BookingPhotoGallery.tsx
│   │   │   ├── RequireAdmin.tsx
│   │   │   └── StatusPicker.tsx
│   │   ├── forms/                # Form components
│   │   │   ├── AddressMapSelectInput.tsx  # Leaflet map picker
│   │   │   └── GooglePlacesInput.tsx      # Google Places autocomplete
│   │   ├── layout/               # Layout shells
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── PublicLayout.tsx
│   │   ├── motion/               # Animation utilities
│   │   │   ├── Magnetic.tsx      #   Magnetic hover effect
│   │   │   ├── RouteTransition.tsx
│   │   │   ├── SmoothScroll.tsx  #   Lenis wrapper
│   │   │   └── SplitText.tsx     #   GSAP text reveal
│   │   ├── sections/home/        # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── TestimonialsMarquee.tsx
│   │   │   ├── TrustLogosSection.tsx
│   │   │   └── FinalCtaSection.tsx
│   │   ├── seo/                  # SEO meta component
│   │   ├── theme/                # Theme toggle (dark/light)
│   │   └── ui/                   # shadcn/ui components (16 components)
│   ├── hooks/
│   │   └── useBookings.ts        # Supabase bookings hook
│   ├── lib/
│   │   ├── admin-utils.ts        # Admin helper functions
│   │   ├── booking.ts            # Booking utilities
│   │   ├── gsap.ts               # GSAP registration
│   │   ├── supabase.ts           # Supabase client
│   │   └── utils.ts              # General utilities (cn)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Faq.tsx
│   │   ├── Contact.tsx
│   │   ├── Booking.tsx
│   │   ├── Track.tsx
│   │   └── admin/
│   │       ├── AdminLogin.tsx
│   │       └── AdminPanel.tsx
│   ├── types/                    # TypeScript type definitions
│   ├── App.tsx                   # Root component & routes
│   ├── main.tsx                  # Entry point
│   ├── App.css
│   └── index.css
├── supabase/
│   └── schema.sql                # Database schema
├── .env.example                  # Environment variable template
├── vercel.json                   # Vercel rewrites config
├── tailwind.config.cjs
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## ⚡ Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/movers-packers-dubai.git
cd movers-packers-dubai
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Fill in the required values (see [Environment Variables](#-environment-variables) below).

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 🔐 Environment Variables

### Client-side (`.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_AUTH0_DOMAIN` | ✅ | Auth0 tenant domain (e.g. `your-app.auth0.com`) |
| `VITE_AUTH0_CLIENT_ID` | ✅ | Auth0 application Client ID |
| `VITE_AUTH0_AUDIENCE` | ❌ | Auth0 API audience identifier |
| `VITE_SUPABASE_URL` | ❌ | Supabase project URL (admin panel only) |
| `VITE_SUPABASE_ANON_KEY` | ❌ | Supabase anonymous key (admin panel only) |
| `VITE_GOOGLE_PLACES_API_KEY` | ❌ | Google Places API key (enables address autocomplete) |
| `VITE_HERO_VIDEO_SRC` | ❌ | Hero section background video URL |
| `VITE_HERO_VIDEO_POSTER` | ❌ | Hero section video poster image URL |

### Server-side (Vercel Environment Variables)

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ | Resend API key for sending emails |
| `BOOKING_EMAIL_TO` | ✅ | Admin email(s) to receive bookings (comma-separated) |
| `BOOKING_EMAIL_FROM` | ✅ | Verified sender address in Resend |

> [!IMPORTANT]
> Server-side variables (`RESEND_*`, `BOOKING_*`) must be set in **Vercel → Project → Settings → Environment Variables**, not in `.env`.

## 📧 Email System Setup (Resend)

The booking and contact forms send emails via [Resend](https://resend.com) through Vercel Serverless Functions.

| API Endpoint | Function File | Purpose |
|---|---|---|
| `POST /api/send-booking` | [`api/send-booking.ts`](api/send-booking.ts) | Sends booking details to admin |
| `POST /api/send-contact` | [`api/send-contact.ts`](api/send-contact.ts) | Sends contact form messages to admin |

### Setup Steps

1. Create a [Resend](https://resend.com) account
2. Verify your domain and create a sender address
3. Copy your API key
4. Add `RESEND_API_KEY`, `BOOKING_EMAIL_TO`, and `BOOKING_EMAIL_FROM` in Vercel environment variables

> [!TIP]
> For testing, you can use `onboarding@resend.dev` as the `BOOKING_EMAIL_FROM` sender.

## 🔑 Auth0 Setup (Booking Login)

Customers must log in before creating a booking. Authentication is handled by [Auth0](https://auth0.com).

1. Create an Auth0 application (Single Page Application)
2. Set **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins** to your domain
3. Copy the **Domain** and **Client ID** to your `.env` file

## 🗄️ Supabase Setup (Admin Panel)

The admin panel uses [Supabase](https://supabase.com) for database, authentication, and file storage. **This is optional** — the public-facing website works without it.

### Setup Steps

1. Create a new [Supabase](https://supabase.com) project

2. Run the database schema in the SQL editor:

   ```sql
   -- Paste contents of supabase/schema.sql
   ```

   Schema file: [`supabase/schema.sql`](supabase/schema.sql)

3. *(Optional)* Create a Storage bucket named `booking-photos` for photo uploads

4. Create an admin user:

   ```sql
   -- After creating/signing-in a user in Supabase Auth, find their UUID and run:
   UPDATE public.profiles SET is_admin = true WHERE id = '<USER_UUID>';
   ```

5. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env`

6. Access the admin panel at `/admin/login`

## 🌐 Deployment (Vercel)

This project is configured for deployment on [Vercel](https://vercel.com).

### Steps

1. Push your code to a Git repository (GitHub / GitLab / Bitbucket)
2. Import the project in Vercel
3. Add all [server-side environment variables](#server-side-vercel-environment-variables) in Vercel settings
4. Deploy — Vercel will auto-detect the Vite framework

The [`vercel.json`](vercel.json) handles:
- API routes → Serverless Functions (`/api/*`)
- All other routes → `index.html` (SPA fallback)

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check & build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## 🗺️ Routes

| Path | Page | Auth |
|---|---|---|
| `/` | Home (landing page) | Public |
| `/services` | Services overview | Public |
| `/about` | About us | Public |
| `/faq` | Frequently asked questions | Public |
| `/contact` | Contact form | Public |
| `/booking` | Booking form | Auth0 login |
| `/track` | Order tracking | Public |
| `/admin/login` | Admin login | Supabase Auth |
| `/admin` | Admin dashboard | Admin only |

## 📄 License

This project is private and proprietary.
