
-- Enum de roles
create type public.app_role as enum ('superadmin', 'client_admin');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- User roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Trigger para crear profile en signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Profiles RLS
create policy "Users can view their own profile" on public.profiles
  for select to authenticated using (id = auth.uid());
create policy "Superadmin can view all profiles" on public.profiles
  for select to authenticated using (public.has_role(auth.uid(), 'superadmin'));
create policy "Users can update their own profile" on public.profiles
  for update to authenticated using (id = auth.uid());
create policy "Superadmin can update any profile" on public.profiles
  for update to authenticated using (public.has_role(auth.uid(), 'superadmin'));

-- user_roles RLS
create policy "Users can view their own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());
create policy "Superadmin can view all roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'superadmin'));
create policy "Superadmin can manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'superadmin'))
  with check (public.has_role(auth.uid(), 'superadmin'));

-- App settings (singleton)
create table public.app_settings (
  id int primary key default 1,
  contact_email text not null default 'info@faztred.com.ar',
  whatsapp_number text not null default '5491100000000',
  whatsapp_message text not null default 'Hola Faztred, quería consultarles sobre sus servicios.',
  updated_at timestamptz not null default now(),
  constraint singleton check (id = 1)
);
insert into public.app_settings (id) values (1);
grant select on public.app_settings to anon, authenticated;
grant all on public.app_settings to service_role;
alter table public.app_settings enable row level security;
create policy "Anyone can read settings" on public.app_settings for select using (true);
create policy "Superadmin can update settings" on public.app_settings for update to authenticated
  using (public.has_role(auth.uid(), 'superadmin'))
  with check (public.has_role(auth.uid(), 'superadmin'));
create trigger app_settings_updated_at before update on public.app_settings
  for each row execute function public.set_updated_at();

-- Popup config (singleton)
create table public.popup_config (
  id int primary key default 1,
  enabled boolean not null default true,
  title text not null default 'Industria 4.0 llave en mano',
  description text not null default 'Nuevos servicios de adquisición de datos y dashboards en tiempo real.',
  image_url text,
  button_label text default 'Ver servicios',
  button_url text default '/servicios',
  version int not null default 1,
  updated_at timestamptz not null default now(),
  constraint popup_singleton check (id = 1)
);
insert into public.popup_config (id) values (1);
grant select on public.popup_config to anon, authenticated;
grant all on public.popup_config to service_role;
alter table public.popup_config enable row level security;
create policy "Anyone can read popup" on public.popup_config for select using (true);
create policy "Superadmin can update popup" on public.popup_config for update to authenticated
  using (public.has_role(auth.uid(), 'superadmin'))
  with check (public.has_role(auth.uid(), 'superadmin'));
create trigger popup_config_updated_at before update on public.popup_config
  for each row execute function public.set_updated_at();

-- Contact submissions
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  source text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.contact_submissions to anon, authenticated;
grant select, update, delete on public.contact_submissions to authenticated;
grant all on public.contact_submissions to service_role;
alter table public.contact_submissions enable row level security;
create policy "Anyone can submit contact" on public.contact_submissions for insert to anon, authenticated with check (true);
create policy "Superadmin can view submissions" on public.contact_submissions for select to authenticated
  using (public.has_role(auth.uid(), 'superadmin'));
create policy "Superadmin can update submissions" on public.contact_submissions for update to authenticated
  using (public.has_role(auth.uid(), 'superadmin'));
create policy "Superadmin can delete submissions" on public.contact_submissions for delete to authenticated
  using (public.has_role(auth.uid(), 'superadmin'));

-- Client attachments
create table public.client_attachments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  uploaded_by uuid references auth.users(id) on delete set null,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  description text,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.client_attachments to authenticated;
grant all on public.client_attachments to service_role;
alter table public.client_attachments enable row level security;
create policy "Client sees own attachments" on public.client_attachments for select to authenticated
  using (client_id = auth.uid());
create policy "Superadmin sees all attachments" on public.client_attachments for select to authenticated
  using (public.has_role(auth.uid(), 'superadmin'));
create policy "Superadmin manages attachments" on public.client_attachments for all to authenticated
  using (public.has_role(auth.uid(), 'superadmin'))
  with check (public.has_role(auth.uid(), 'superadmin'));

-- Trust logos
create table public.trust_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  website_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.trust_logos to anon, authenticated;
grant all on public.trust_logos to service_role;
alter table public.trust_logos enable row level security;
create policy "Anyone can view active logos" on public.trust_logos for select using (is_active = true);
create policy "Superadmin manages logos" on public.trust_logos for all to authenticated
  using (public.has_role(auth.uid(), 'superadmin'))
  with check (public.has_role(auth.uid(), 'superadmin'));

-- Storage policies for client-attachments bucket (bucket created via tool)
-- (policies added in separate step after bucket creation)
