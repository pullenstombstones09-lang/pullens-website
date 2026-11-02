-- Web shop tables for the Pullen's online store (public + trade).
-- Run manually in the Supabase SQL editor (project eznppvewksorfoedgzpa).
-- All tables: RLS enabled with NO policies — only the service key (used by
-- the website's server API routes) can read or write them.

-- Orders placed on the website (public, trade, gauteng)
create table if not exists public.web_orders (
  id uuid primary key default gen_random_uuid(),
  ref text not null,
  created_at timestamptz not null default now(),
  channel text not null default 'public',          -- public | trade | gauteng
  trade_account_id uuid,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  design_code text not null,
  covering text not null,                          -- cc | kc | t | ks
  extras jsonb not null default '[]',
  inscription text,
  cemetery text,
  branch text,
  freight_region text,
  freight_total numeric not null default 0,
  stone_total numeric not null,
  extras_total numeric not null default 0,
  order_total numeric not null,
  payment_mode text not null default 'deposit',    -- full | deposit | payment_plan | account
  deposit_due numeric not null default 0,
  plan_months int,
  referral_code text,
  status text not null default 'new',              -- new | deposit_paid | in_production | ready | collected | installed | settled | cancelled
  notes text
);
create index if not exists web_orders_ref_idx on public.web_orders (ref);
create index if not exists web_orders_created_idx on public.web_orders (created_at desc);
alter table public.web_orders enable row level security;

-- Price reveals on the public site — every reveal is a captured lead
create table if not exists public.web_quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  design_code text not null,
  covering text not null,
  extras jsonb not null default '[]',
  total numeric not null,
  source text not null default 'web'
);
create index if not exists web_quotes_phone_idx on public.web_quotes (phone);
create index if not exists web_quotes_created_idx on public.web_quotes (created_at desc);
alter table public.web_quotes enable row level security;

-- Undertaker (trade) accounts — PINs stored only as salted scrypt hashes
-- (generate a hash with: node scripts/hash-pin.mjs 12345)
create table if not exists public.trade_accounts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  account_code text unique not null,
  parlour_name text not null,
  contact_name text,
  phone text not null,
  email text,
  pin_hash text not null,                          -- scrypt$<salt-hex>$<hash-hex>
  price_tier text not null default 'tier1',
  credit_limit numeric not null default 0,
  on_account boolean not null default false,
  active boolean not null default true,
  last_login timestamptz
);
alter table public.trade_accounts enable row level security;

-- Trade price columns on the existing pricelist (null until the real
-- trade list is loaded; the site shows clearly-badged sample pricing
-- derived from retail until then)
alter table public.pricelist add column if not exists trade_price numeric;
alter table public.pricelist add column if not exists trade_price_kerbs_chips numeric;
alter table public.pricelist add column if not exists trade_price_tiles numeric;
alter table public.pricelist add column if not exists trade_price_kerbs_slab numeric;

-- Example trade account insert (replace values; hash from scripts/hash-pin.mjs):
-- insert into public.trade_accounts (account_code, parlour_name, contact_name, phone, pin_hash, on_account, credit_limit)
-- values ('PAR001', 'Example Funerals', 'Contact Name', '0820000000', 'scrypt$...$...', false, 0);
