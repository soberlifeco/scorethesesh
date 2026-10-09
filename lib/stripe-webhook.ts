import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verifies a Stripe webhook signature (Stripe-Signature header) against the
 * raw request body, using the endpoint's signing secret. Implemented with
 * node:crypto so no extra dependency is needed.
 * https://docs.stripe.com/webhooks#verify-manually
 */
export function verifyStripeSignature(
  rawBody: string,
  header: string | null,
  secret: string,
  toleranceSeconds = 300,
  nowMs: number = Date.now()
): boolean {
  if (!header || !secret) return false;

  let timestamp: string | undefined;
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key === "t") timestamp = value;
    else if (key === "v1") signatures.push(value);
  }

  if (!timestamp || signatures.length === 0) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(nowMs / 1000 - ts) > toleranceSeconds) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest();

  return signatures.some((sig) => {
    const candidate = Buffer.from(sig, "hex");
    return (
      candidate.length === expected.length && timingSafeEqual(candidate, expected)
    );
  });
}
