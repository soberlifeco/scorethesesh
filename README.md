# scorethesesh.com

Email capture landing page for Score The Sesh. Next.js + Tailwind, matching the
black background / neon green (`#39FF14`) look of soberlifeco.co.uk.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables

Copy `.env.local` (not committed) and set:

- `MAILERLITE_API_KEY` — from MailerLite → Integrations → Developer API
- `MAILERLITE_GROUP_ID` — optional. From MailerLite → Subscribers → Groups →
  open your group, the ID is in the URL. If unset, new signups just go into
  your general subscriber list with no group.

These also need to be set as Environment Variables on the Vercel project
before deploying (Project Settings → Environment Variables) — `.env.local`
only applies locally.

## Pages

- `/` — the landing page with the email capture form
- `/thank-you` — shown after a successful signup
- `/api/subscribe` — POST endpoint that adds the email to MailerLite

## Deploying

Push to GitHub, import the repo in Vercel, add the environment variables
above, then point the scorethesesh.com domain at the Vercel project
(Project Settings → Domains).
