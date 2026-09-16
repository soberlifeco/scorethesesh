/**
 * Lightweight in-memory rate limiter — a speed bump against a bot hammering
 * an API route, not a bulletproof distributed limiter. It resets whenever a
 * serverless function cold-starts, and doesn't share state across scaled-out
 * instances. Good enough to stop a naive script; not a substitute for real
 * abuse review (see the community_scores/community_users tables in Supabase
 * if something ever needs cleaning up by hand).
 */

const buckets = new Map<string, { count: number; resetAt: number }>();

// Prevent unbounded memory growth from an endless stream of distinct IPs.
const MAX_BUCKETS = 5000;

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    if (buckets.size >= MAX_BUCKETS) {
      buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

/** Best-effort client IP from Vercel's forwarded-for header. */
export function clientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
