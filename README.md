# LaseCraft — Stripe-ready Storefront

Premium storefront for **LaseCraft** (*Natural Ideas Last Longer*) — personalised laser-cut and engraved products in wood, acrylic and leather.

Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Prisma + SQLite**, and **Stripe Checkout** (test-mode ready). Cart state is persisted in `localStorage`. Products and orders live in the database.

## Quick start

```bash
cd /workspace/lasecraft
cp .env.example .env          # if you do not already have a .env
npm install
npx prisma migrate dev        # creates prisma/dev.db
npm run db:seed               # loads ~17 demo products
npm run build
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run db:seed` | Seed / refresh demo products |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:reset` | Reset DB and re-seed |

## Environment variables

Copy `.env.example` to `.env` and fill in as needed:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | SQLite path, default `file:./dev.db` (relative to `prisma/`) |
| `ADMIN_PASSWORD` | Admin panel password (default `lasecraft-admin`) |
| `NEXT_PUBLIC_BASE_URL` | Public site URL for Stripe redirects (local `http://localhost:3000`; on Vercel set to your `https://….vercel.app` URL) |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_…`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (`whsec_…`); optional locally |

If Stripe keys are missing, checkout shows **“Stripe not configured”** and does not crash.

### Deploying on Vercel

SQLite (`file:./dev.db`) does **not** work on Vercel serverless. The storefront automatically serves the built-in seed catalogue (17 products) when `VERCEL=1`, so browse / cart / product pages work without a writable DB.

Set these Environment Variables in the Vercel project:

| Variable | Value |
|----------|-------|
| `STRIPE_SECRET_KEY` | your Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | your Stripe publishable key |
| `ADMIN_PASSWORD` | admin panel password |
| `NEXT_PUBLIC_BASE_URL` | your deployment URL, e.g. `https://your-app.vercel.app` (no trailing slash) |

Optional: `STRIPE_WEBHOOK_SECRET` if you configure a Stripe webhook to `/api/webhooks/stripe`.

Admin product create/edit/delete is read-only on Vercel until you attach a hosted database (e.g. Postgres) and stop relying on the seed fallback. Checkout still creates Stripe sessions using seed prices when Stripe keys are set.

### Stripe test mode

1. Create a [Stripe test account](https://dashboard.stripe.com/test/apikeys) and copy the test keys into `.env`.
2. Restart `npm run dev`.
3. Add items to the cart → Checkout → **Pay with Stripe**.
4. Use card `4242 4242 4242 4242`, any future expiry, any CVC.
5. For webhooks locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` and set `STRIPE_WEBHOOK_SECRET` to the printed `whsec_…` value. When the secret is unset, the webhook stub accepts unsigned JSON for local testing.

## Admin panel

- URL: [http://localhost:3000/admin](http://localhost:3000/admin) (login at `/admin/login`)
- Default password: **`lasecraft-admin`** (override with `ADMIN_PASSWORD`)
- Features: list / add / edit / deactivate / delete products; view recent orders
- Auth: httpOnly cookie session (no third-party auth provider)

## Routes

| Path | Page |
|------|------|
| `/` | Home — hero, categories, featured products |
| `/shop` | Shop (reads products from DB) |
| `/product/[slug]` | Product detail + personalisation |
| `/cart` | Shopping cart |
| `/checkout` | Stripe Checkout hand-off |
| `/checkout/success` | Post-payment thank-you |
| `/custom` | Custom / contact enquiry |
| `/about` | About LaseCraft |
| `/admin` | Admin dashboard |
| `/admin/login` | Admin sign-in |
| `POST /api/checkout` | Create Stripe Checkout Session |
| `POST /api/webhooks/stripe` | Mark orders paid on `checkout.session.completed` |

## Data layer

- Prisma schema: `prisma/schema.prisma` (local/dev)
- SQLite file: `prisma/dev.db` (local/dev only)
- Seed catalogue module: `src/data/seed-catalogue.ts` (also used on Vercel)
- Models: `Product`, `Order`, `OrderItem`
- Seed script: `prisma/seed.ts` (`npm run db:seed`) — imports the shared catalogue

## Brand assets

- Logo: `public/assets/logo.png`
- Flyer reference: `public/assets/flyer.png`
- Palette: charcoal / gold / cream (Tailwind theme)

## Contact (demo)

- www.lasecraft.co.uk  
- info@lasecraft.co.uk  
- +44 7700 123456  
- Gloucestershire, UK  

© LaseCraft — demo storefront.
