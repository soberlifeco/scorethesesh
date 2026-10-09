/**
 * Sales go live at midnight UK time on 6 December 2026 (GMT, so UTC).
 * For testing before launch, set NEXT_PUBLIC_SESHED_OUT_SALES_OPEN=true
 * (it is read on both the server and in the browser).
 */
export const SESHED_OUT_LAUNCH_AT = "2026-12-06T00:00:00Z";

export function isSalesOpen(nowMs: number = Date.now()): boolean {
  if (process.env.NEXT_PUBLIC_SESHED_OUT_SALES_OPEN === "true") return true;
  return nowMs >= Date.parse(SESHED_OUT_LAUNCH_AT);
}

/** Stamped on every Checkout Session we create, so the webhook can ignore other Stripe payments (e.g. donations). */
export const SESHED_OUT_PRODUCT_TAG = "all-seshed-out";

/** Display only. The real price lives in Stripe (STRIPE_PRICE_ID) — keep these in step. */
export const SESHED_OUT_PRICE_LABEL = "£12.99";

/**
 * Countries Stripe Checkout will collect a postal address for (the free tote
 * bag). Checkout only accepts addresses from this list, so it also decides
 * who can buy. Trim it if postage abroad costs too much.
 */
export const SESHED_OUT_SHIPPING_COUNTRIES = [
  "GB", "IE", "US", "CA", "AU", "NZ",
  "FR", "DE", "ES", "IT", "NL", "BE", "PT", "AT", "SE", "DK", "FI", "PL",
  "CZ", "GR", "HU", "RO", "BG", "HR", "SK", "SI", "LT", "LV", "EE", "LU", "MT", "CY",
  "CH", "NO", "IS",
] as const;
