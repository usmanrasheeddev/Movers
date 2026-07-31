-- Movers Packers Dubai — Supabase schema
--
-- Includes:
-- - public.bookings: booking submissions from the website
-- - public.profiles: user profiles + admin flag
-- - RLS policies: public can INSERT bookings; only admins can read/update
-- - Storage policies: public can upload into booking-photos bucket; admins can read

-- Extensions (Supabase usually has these available)
create extension if not exists pgcrypto;

-- Admin flag lookup
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select coalesce((select p.is_admin from public.profiles p where p.id = uid), false);
$$;

-- Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  is_admin boolean not null default false
);

alter table public.profiles enable row level security;

-- Allow authenticated users to read their own profile (admin panel uses this)
drop policy if exists "Profiles: read own" on public.profiles;
create policy "Profiles: read own" on public.profiles
for select to authenticated
using (auth.uid() = id);

-- Allow admins to read all profiles (optional, but useful)
drop policy if exists "Profiles: admins read" on public.profiles;
create policy "Profiles: admins read" on public.profiles
for select to authenticated
using (public.is_admin(auth.uid()));

-- Auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  booking_id text not null unique,
  service_type text not null,

  pickup_address text not null,
  dropoff_address text not null,

  schedule_at timestamptz not null,
  item_details text not null,

  contact_name text not null,
  contact_phone text not null,
  contact_email text not null,

  payment_method text not null default 'cash_on_delivery',
  status text not null default 'new',
  source text not null default 'web',

  photo_paths text[] not null default '{}'
);

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_status_idx on public.bookings (status);

alter table public.bookings enable row level security;

-- Public booking form can submit (anon or authenticated)
drop policy if exists "Bookings: public insert" on public.bookings;
create policy "Bookings: public insert" on public.bookings
for insert to anon, authenticated
with check (true);

-- Only admins can read bookings
drop policy if exists "Bookings: admin read" on public.bookings;
create policy "Bookings: admin read" on public.bookings
for select to authenticated
using (public.is_admin(auth.uid()));

-- Only admins can update bookings (status changes)
drop policy if exists "Bookings: admin update" on public.bookings;
create policy "Bookings: admin update" on public.bookings
for update to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Storage policies for booking photo uploads
-- NOTE: You still need to create the bucket named 'booking-photos' in the Supabase UI.
--       Recommended: keep it private.

-- Public can upload objects into booking-photos bucket (needed for anon booking submissions)
drop policy if exists "Storage: public upload booking photos" on storage.objects;
create policy "Storage: public upload booking photos" on storage.objects
for insert to anon, authenticated
with check (bucket_id = 'booking-photos');

-- Only admins can read booking photos
drop policy if exists "Storage: admin read booking photos" on storage.objects;
create policy "Storage: admin read booking photos" on storage.objects
for select to authenticated
using (bucket_id = 'booking-photos' and public.is_admin(auth.uid()));
