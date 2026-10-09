-- Run once in the Supabase SQL editor (for a database that already has the
-- seshed_out_purchases table). Adds the tote bag delivery details.
alter table public.seshed_out_purchases
  add column if not exists customer_name text,
  add column if not exists shipping_name text,
  add column if not exists shipping_address jsonb;
