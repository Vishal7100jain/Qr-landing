# Review Landing Pages

Dynamic Next.js app for post-visit Google review funnels, driven by QR codes.

```
Customer scans QR
   → review.yourdomain.com/r/sher-e-punjab
   → landing page (this app)
   → "Review us on Google" button
   → https://search.google.com/local/writereview?placeid=...
```

## Two ways to drive it

### 1. Slug registry — `/r/[slug]` (recommended for real clients)

Add each business to `lib/businesses.ts`:

```ts
{
  slug: "sher-e-punjab",
  name: "Sher-e-Punjab",
  tagline: "North Indian Kitchen",
  placeId: "ChIJ...",       // real Google Place ID
  accent: "#C9A15C",         // optional, per-brand accent color
  logo: "/logos/sep.png",    // optional, put file in /public/logos
}
```

Then your QR code points to:
```
https://review.yourdomain.com/r/sher-e-punjab
```

You can still override the Place ID at request time for testing:
```
https://review.yourdomain.com/r/sher-e-punjab?placeid=ChIJDifferentId
```

### 2. Pure query string — `/review` (no registry entry needed)

```
https://review.yourdomain.com/review?placeid=ChIJ...&name=Sher-e-Punjab&tagline=North+Indian+Kitchen&accent=%23C9A15C
```

Useful if you're generating QR codes dynamically from a database/dashboard elsewhere and don't want a code deploy per new client.

## Finding a Google Place ID

Use Google's Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id
(Search the business, copy the ID starting with `ChIJ...`.)

## Local development

```bash
npm install
npm run dev
```

Visit:
- `http://localhost:3000/r/sher-e-punjab`
- `http://localhost:3000/review?placeid=ChIJ...&name=Test`

## Production build

```bash
npm run build
npm run start
```

## Deploying

Works out of the box on Vercel (or any Node host). Just push and set your
domain's `/r/*` and `/review` routes to point at this app — no env vars
required unless you move `lib/businesses.ts` to a real database.

## Customizing the design

All visual tokens (colors, fonts, spacing) live in `app/globals.css` under
`:root` and `.review-card`. Per-business accent color can be overridden via
the `accent` field in the registry or the `?accent=%23HEX` query param.

The card component (`components/ReviewCard.tsx`) handles the star reveal
animation and CTA button — safe to restyle without touching page logic.
# Qr-landing
