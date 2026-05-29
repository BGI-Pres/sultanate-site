-- ════════════════════════════════════════════════════════════════
-- Sultanate of Amexem — Complete Database Schema
-- Run this ONCE in Supabase SQL Editor to create all required tables
-- Safe to re-run: uses IF NOT EXISTS and idempotent operations
-- ════════════════════════════════════════════════════════════════

-- ── 1. POSTS (Press releases, articles, spotlights) ──────────────
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null,
  post_type text not null check (post_type in ('press_release', 'article', 'spotlight', 'event_recap')),
  cover_image_url text,
  author text default 'Sultanate of Amexem',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_published_idx on public.posts (published, published_at desc);
create index if not exists posts_slug_idx on public.posts (slug);

-- ── 2. MEMBERS (member profiles for portal) ──────────────────────
create table if not exists public.members (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  status text default 'Pending' check (status in ('Pending', 'Active', 'Suspended')),
  tier text default 'Affiliate' check (tier in ('Affiliate', 'Community', 'General', 'Lead')),
  member_id text unique,
  joined_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 3. APPLICATIONS (main membership application from /apply) ────
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  data jsonb not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── 4. CARD_REQUESTS (membership card requests) ──────────────────
create table if not exists public.card_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  member_id text,
  membership_tier text,
  reason text,
  street_address text,
  city text,
  state text,
  zip text,
  photo_url text,
  status text default 'pending',
  created_at timestamptz not null default now()
);

-- ── 5. CERTIFICATIONS (business certification applications) ──────
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  applicant_name text not null,
  applicant_email text not null,
  membership_id text,
  member_duration text,
  certification_type text,
  business_name text,
  business_type text,
  ein text,
  industry text,
  business_phone text,
  business_website text,
  street_address text,
  city text,
  state text,
  zip text,
  business_description text,
  revenue_range text,
  employee_count text,
  years_operating text,
  documents_description text,
  additional_notes text,
  terms_accepted boolean default false,
  fee_acknowledged boolean default false,
  status text default 'pending',
  created_at timestamptz not null default now()
);

-- ── 6. EVENT_RSVPS ────────────────────────────────────────────────
create table if not exists public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  name text not null,
  email text not null,
  phone text,
  created_at timestamptz not null default now()
);
create index if not exists event_rsvps_email_idx on public.event_rsvps (email);
create index if not exists event_rsvps_event_idx on public.event_rsvps (event_name);

-- ── 7. ANNOUNCEMENTS (member dashboard) ──────────────────────────
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- ── 8. COMMERCE_APPLICATIONS ──────────────────────────────────────
create table if not exists public.commerce_applications (
  id uuid primary key default gen_random_uuid(),
  application_type text,
  business_name text,
  business_type text,
  products_services text,
  contact_name text,
  contact_email text,
  contact_phone text,
  trade_interest text,
  business_website text,
  additional_notes text,
  status text default 'pending',
  created_at timestamptz not null default now()
);

-- ── 9. VENTURE_PROPOSALS ──────────────────────────────────────────
create table if not exists public.venture_proposals (
  id uuid primary key default gen_random_uuid(),
  proposal_name text,
  institution_type text,
  description text,
  target_community text,
  estimated_funding text,
  proposed_timeline text,
  team_members text,
  proposer_name text,
  proposer_email text,
  proposer_phone text,
  additional_notes text,
  status text default 'pending',
  created_at timestamptz not null default now()
);

-- ── 10. SERVICE_APPLICATIONS ──────────────────────────────────────
create table if not exists public.service_applications (
  id uuid primary key default gen_random_uuid(),
  application_type text,
  provider_name text,
  profession text,
  services_offered text,
  years_experience text,
  certifications text,
  service_area text,
  contact_name text,
  contact_email text,
  contact_phone text,
  website_url text,
  additional_notes text,
  status text default 'pending',
  created_at timestamptz not null default now()
);

-- ── 11. COOPERATIVE_APPLICATIONS ──────────────────────────────────
create table if not exists public.cooperative_applications (
  id uuid primary key default gen_random_uuid(),
  intent text,
  venture_name text,
  venture_type text,
  description text,
  investment_interest text,
  skills text,
  applicant_name text,
  applicant_email text,
  applicant_phone text,
  additional_notes text,
  status text default 'pending',
  created_at timestamptz not null default now()
);

-- ── 12. ASSET_INQUIRIES ───────────────────────────────────────────
create table if not exists public.asset_inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text,
  name text,
  email text,
  phone text,
  organization text,
  description text,
  additional_notes text,
  status text default 'pending',
  created_at timestamptz not null default now()
);

-- ── 13. CONTACT_SUBMISSIONS ───────────────────────────────────────
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new',
  created_at timestamptz not null default now()
);

-- ── 14. SUBSCRIBERS (newsletter signups) ──────────────────────────
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'website',
  created_at timestamptz not null default now()
);

-- ── 15. TRANSACTIONS (donations / payments, optional) ─────────────
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  amount numeric(10,2),
  currency text default 'USD',
  type text,
  reference text,
  status text default 'pending',
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- ════════════════════════════════════════════════════════════════
-- AUTO-UPDATE TIMESTAMPS
-- ════════════════════════════════════════════════════════════════

create or replace function public.set_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at before update on public.posts
  for each row execute function public.set_updated_at();

drop trigger if exists members_updated_at on public.members;
create trigger members_updated_at before update on public.members
  for each row execute function public.set_updated_at();

drop trigger if exists applications_updated_at on public.applications;
create trigger applications_updated_at before update on public.applications
  for each row execute function public.set_updated_at();

-- ════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- Public can INSERT to forms / RSVPs / subscribers
-- Public can READ only published posts and own member row
-- Authenticated (admin) can do everything
-- ════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
alter table public.posts enable row level security;
alter table public.members enable row level security;
alter table public.applications enable row level security;
alter table public.card_requests enable row level security;
alter table public.certifications enable row level security;
alter table public.event_rsvps enable row level security;
alter table public.announcements enable row level security;
alter table public.commerce_applications enable row level security;
alter table public.venture_proposals enable row level security;
alter table public.service_applications enable row level security;
alter table public.cooperative_applications enable row level security;
alter table public.asset_inquiries enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.subscribers enable row level security;
alter table public.transactions enable row level security;

-- POSTS: public reads published, auth manages all
drop policy if exists "public_read_published_posts" on public.posts;
create policy "public_read_published_posts" on public.posts
  for select using (published = true);

drop policy if exists "auth_manage_posts" on public.posts;
create policy "auth_manage_posts" on public.posts
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- MEMBERS: users can read their own row; auth can manage all
drop policy if exists "members_read_own" on public.members;
create policy "members_read_own" on public.members
  for select using (auth.uid() = id or auth.role() = 'authenticated');

drop policy if exists "auth_manage_members" on public.members;
create policy "auth_manage_members" on public.members
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ANNOUNCEMENTS: authenticated can read; admin manages
drop policy if exists "auth_read_announcements" on public.announcements;
create policy "auth_read_announcements" on public.announcements
  for select using (auth.role() = 'authenticated');

drop policy if exists "auth_manage_announcements" on public.announcements;
create policy "auth_manage_announcements" on public.announcements
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- All FORM tables: PUBLIC INSERT, AUTH SELECT/UPDATE/DELETE
-- Generator function would be nice but Postgres doesn't have one;
-- so we declare per-table policies explicitly.

-- Helper: same pattern for all submission tables
do $$
declare
  t text;
  submission_tables text[] := array[
    'applications',
    'card_requests',
    'certifications',
    'event_rsvps',
    'commerce_applications',
    'venture_proposals',
    'service_applications',
    'cooperative_applications',
    'asset_inquiries',
    'contact_submissions',
    'subscribers',
    'transactions'
  ];
begin
  foreach t in array submission_tables loop
    execute format('drop policy if exists "public_insert_%s" on public.%I', t, t);
    execute format('create policy "public_insert_%s" on public.%I for insert with check (true)', t, t);
    execute format('drop policy if exists "auth_select_%s" on public.%I', t, t);
    execute format('create policy "auth_select_%s" on public.%I for select using (auth.role() = ''authenticated'')', t, t);
    execute format('drop policy if exists "auth_update_%s" on public.%I', t, t);
    execute format('create policy "auth_update_%s" on public.%I for update using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')', t, t);
    execute format('drop policy if exists "auth_delete_%s" on public.%I', t, t);
    execute format('create policy "auth_delete_%s" on public.%I for delete using (auth.role() = ''authenticated'')', t, t);
  end loop;
end$$;

-- ════════════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ════════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public)
  values ('uploads', 'uploads', true)
  on conflict (id) do nothing;

-- Public can upload to uploads bucket (for card photos, etc.)
drop policy if exists "public_upload_uploads" on storage.objects;
create policy "public_upload_uploads" on storage.objects
  for insert with check (bucket_id = 'uploads');

drop policy if exists "public_read_uploads" on storage.objects;
create policy "public_read_uploads" on storage.objects
  for select using (bucket_id = 'uploads');

-- ════════════════════════════════════════════════════════════════
-- DONE
-- Tables: posts, members, applications, card_requests, certifications,
-- event_rsvps, announcements, commerce_applications, venture_proposals,
-- service_applications, cooperative_applications, asset_inquiries,
-- contact_submissions, subscribers, transactions
-- Storage: uploads bucket
-- ════════════════════════════════════════════════════════════════
