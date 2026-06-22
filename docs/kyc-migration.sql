-- ============================================================================
-- KYC Module — Schema, Roles, Storage Buckets, and Row-Level Security
--
-- HOW TO APPLY:
--   1. Open the Supabase SQL editor and run this file once.
--   2. Sign up through the app, then promote yourself to admin via the
--      INSERT statement at the bottom of this file.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Roles (separate table to avoid privilege-escalation via profile edits)
-- ---------------------------------------------------------------------------
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all    on public.user_roles to service_role;
alter table public.user_roles enable row level security;

-- Security-definer role check (used by other policies — avoids recursion)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

create policy "user can read own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "admins read all roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------------
-- 2. KYC Submissions table
-- ---------------------------------------------------------------------------
create type public.kyc_status as enum ('pending', 'review', 'approved', 'rejected');

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

  -- Document URLs (paths inside storage buckets)
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

-- Keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger kyc_submissions_touch
before update on public.kyc_submissions
for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 3. Storage buckets (private) + per-user folder access
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public) values
  ('kyc-id-front',      'kyc-id-front',      false),
  ('kyc-id-back',       'kyc-id-back',       false),
  ('kyc-passports',     'kyc-passports',     false),
  ('kyc-selfies',       'kyc-selfies',       false)
on conflict (id) do nothing;

do $$
declare b text;
begin
  foreach b in array array[
    'kyc-id-front','kyc-id-back','kyc-passports','kyc-selfies'
  ] loop
    execute format($f$
      create policy "kyc owner read %1$s" on storage.objects
        for select to authenticated
        using (bucket_id = %1$L and auth.uid()::text = (storage.foldername(name))[1]);
      create policy "kyc owner write %1$s" on storage.objects
        for insert to authenticated
        with check (bucket_id = %1$L and auth.uid()::text = (storage.foldername(name))[1]);
      create policy "kyc owner update %1$s" on storage.objects
        for update to authenticated
        using (bucket_id = %1$L and auth.uid()::text = (storage.foldername(name))[1]);
      create policy "kyc owner delete %1$s" on storage.objects
        for delete to authenticated
        using (bucket_id = %1$L and auth.uid()::text = (storage.foldername(name))[1]);
      create policy "kyc admin all %1$s" on storage.objects
        for all to authenticated
        using (bucket_id = %1$L and public.has_role(auth.uid(),'admin'))
        with check (bucket_id = %1$L and public.has_role(auth.uid(),'admin'));
    $f$, b);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- 4. Auto-assign 'user' role on signup
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.user_roles (user_id, role) values (new.id, 'user')
  on conflict do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 5. Indexes for performance
-- ---------------------------------------------------------------------------
create index if not exists idx_user_roles_user_id on public.user_roles (user_id);
create index if not exists idx_kyc_submissions_status on public.kyc_submissions (status);
create index if not exists idx_kyc_submissions_updated_at on public.kyc_submissions (updated_at desc);

-- ---------------------------------------------------------------------------
-- 6. Promote yourself to admin (RUN MANUALLY after signing up):
--    insert into public.user_roles (user_id, role)
--    values ('<your-auth-user-id>', 'admin');
-- ---------------------------------------------------------------------------
