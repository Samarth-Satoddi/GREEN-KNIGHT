-- ==============================================================================
-- GREEN KNIGHTS OF TECH & AI - DATABASE SCHEMA & MIGRATIONS
-- ==============================================================================

-- Enable UUID generation extension if not already enabled
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 1. TABLE: contact_submissions
-- Stores all customer enquiries submitted through the public website
-- ==============================================================================
create table if not exists public.contact_submissions (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text not null,
    company text,
    service text,
    message text not null,
    status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'converted', 'closed')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for optimal query performance
create index if not exists idx_contact_submissions_created_at on public.contact_submissions (created_at desc);
create index if not exists idx_contact_submissions_status on public.contact_submissions (status);
create index if not exists idx_contact_submissions_email on public.contact_submissions (email);

-- ==============================================================================
-- 2. TABLE: admin_users
-- Whitelist of authorized company administrators (linked to auth.users)
-- ==============================================================================
create table if not exists public.admin_users (
    id uuid primary key default gen_random_uuid(),
    user_id uuid unique not null references auth.users(id) on delete cascade,
    email text not null,
    role text not null default 'admin',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_admin_users_user_id on public.admin_users (user_id);
create index if not exists idx_admin_users_email on public.admin_users (email);

-- ==============================================================================
-- 3. TABLE: enquiry_audit_logs
-- Immutable audit record of admin actions & status changes on customer enquiries
-- ==============================================================================
create table if not exists public.enquiry_audit_logs (
    id uuid primary key default gen_random_uuid(),
    enquiry_id uuid not null references public.contact_submissions(id) on delete cascade,
    admin_user_id uuid not null,
    admin_email text,
    old_status text,
    new_status text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_enquiry_audit_logs_enquiry_id on public.enquiry_audit_logs (enquiry_id);
create index if not exists idx_enquiry_audit_logs_created_at on public.enquiry_audit_logs (created_at desc);

-- ==============================================================================
-- 4. AUTOMATED updated_at TRIGGER
-- ==============================================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

drop trigger if exists set_contact_submissions_updated_at on public.contact_submissions;
create trigger set_contact_submissions_updated_at
    before update on public.contact_submissions
    for each row
    execute function public.handle_updated_at();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
alter table public.contact_submissions enable row level security;
alter table public.admin_users enable row level security;
alter table public.enquiry_audit_logs enable row level security;

-- Helper function: Check if authenticated user is in admin_users whitelist
create or replace function public.is_admin()
returns boolean as $$
begin
    return exists (
        select 1
        from public.admin_users
        where user_id = auth.uid()
    );
end;
$$ language plpgsql security definer;

-- ------------------------------------------------------------------------------
-- POLICIES: contact_submissions
-- Public users have NO direct read/write access to this table via Supabase client.
-- Server-side API inserts submissions using SUPABASE_SERVICE_ROLE_KEY.
-- Authorized admins can view, update, and delete submissions.
-- ------------------------------------------------------------------------------
drop policy if exists "Admins can view contact submissions" on public.contact_submissions;
create policy "Admins can view contact submissions"
    on public.contact_submissions
    for select
    using (public.is_admin());

drop policy if exists "Admins can update contact submissions" on public.contact_submissions;
create policy "Admins can update contact submissions"
    on public.contact_submissions
    for update
    using (public.is_admin())
    with check (public.is_admin());

drop policy if exists "Admins can delete contact submissions" on public.contact_submissions;
create policy "Admins can delete contact submissions"
    on public.contact_submissions
    for delete
    using (public.is_admin());

-- ------------------------------------------------------------------------------
-- POLICIES: admin_users
-- Authorized admins can view the admin whitelist.
-- ------------------------------------------------------------------------------
drop policy if exists "Admins can view admin_users" on public.admin_users;
create policy "Admins can view admin_users"
    on public.admin_users
    for select
    using (user_id = auth.uid() or public.is_admin());

-- ------------------------------------------------------------------------------
-- POLICIES: enquiry_audit_logs
-- Authorized admins can view and insert audit log entries.
-- ------------------------------------------------------------------------------
drop policy if exists "Admins can view audit logs" on public.enquiry_audit_logs;
create policy "Admins can view audit logs"
    on public.enquiry_audit_logs
    for select
    using (public.is_admin());

drop policy if exists "Admins can insert audit logs" on public.enquiry_audit_logs;
create policy "Admins can insert audit logs"
    on public.enquiry_audit_logs
    for insert
    with check (public.is_admin());

-- ==============================================================================
-- 6. SETUP INSTRUCTIONS FOR CREATING FIRST ADMIN USER
-- ==============================================================================
-- Step 1: Create the admin user in Supabase Authentication dashboard (Authentication -> Users -> Add User).
-- Step 2: Run this SQL query with the generated User UID and Admin Email:
--
-- INSERT INTO public.admin_users (user_id, email, role)
-- VALUES ('<YOUR-AUTH-USER-UUID-HERE>', 'admin@greenknights.tech', 'admin')
-- ON CONFLICT (user_id) DO NOTHING;
-- ==============================================================================
