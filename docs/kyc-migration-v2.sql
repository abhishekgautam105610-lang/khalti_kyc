-- ============================================================================
-- KYC Migration v2 — Drops old schema and recreates with simplified fields
-- ============================================================================

-- ---------------------------------------------------------------------------
-- OTP verification log (stores OTPs entered during login)
-- ---------------------------------------------------------------------------
create table if not exists public.otp_verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  otp_entered text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.otp_verifications enable row level security;

create policy "users insert own otp" on public.otp_verifications
  for insert to authenticated with check (auth.uid() = user_id);
create policy "admins read all otp" on public.otp_verifications
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_otp_verifications_user on public.otp_verifications (user_id);
create index if not exists idx_otp_verifications_created on public.otp_verifications (created_at desc);

-- Drop old table first (loses all data — OK for early stage)
drop table if exists public.kyc_submissions cascade;

-- ---------------------------------------------------------------------------
-- Recreate: KYC Submissions table
-- ---------------------------------------------------------------------------
create table public.kyc_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,

  -- Personal information
  full_name      text    not null,
  dob            date    not null,
  gender         text    not null,
  nationality    text    not null,
  phone          text    not null,
  email          text    not null,
  address        text    not null,
  city           text    not null,
  state          text    not null,

  -- Identity verification
  id_type        text    not null,
  id_number      text    not null,

  -- Document URLs
  id_front_url       text,
  id_back_url        text,
  passport_url       text,
  selfie_url         text,

  -- Workflow
  status        public.kyc_status not null default 'pending',
  admin_notes   text,
  submitted_at  timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

grant select, insert, update on public.kyc_submissions to authenticated;
grant all on public.kyc_submissions to service_role;
alter table public.kyc_submissions enable row level security;

-- Owner policies
create policy "users read own kyc" on public.kyc_submissions
  for select to authenticated using (auth.uid() = user_id);
create policy "users insert own kyc" on public.kyc_submissions
  for insert to authenticated with check (auth.uid() = user_id);
create policy "users update own kyc (only while pending/rejected)" on public.kyc_submissions
  for update to authenticated
  using (auth.uid() = user_id and status in ('pending','rejected'))
  with check (auth.uid() = user_id);

-- Admin policies
create policy "admins read all kyc" on public.kyc_submissions
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admins update all kyc" on public.kyc_submissions
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
create trigger kyc_submissions_touch
  before update on public.kyc_submissions
  for each row execute function public.touch_updated_at();

-- Indexes
create index if not exists idx_kyc_submissions_status on public.kyc_submissions (status);
create index if not exists idx_kyc_submissions_updated_at on public.kyc_submissions (updated_at desc);

-- Note: To remove the old kyc-address-proof bucket, use the Supabase Dashboard:
-- Storage → kyc-address-proof → Delete bucket (do this manually after running this migration)
