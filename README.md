# Nawaz Studio — Premium Futuristic Developer Portfolio

Production-ready personal portfolio + freelancing website built for a coding-focused developer brand.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion
- Three.js + React Three Fiber + Drei
- GSAP ScrollTrigger + Lenis smooth scrolling
- Resend (contact brief delivery)

## Experience Highlights

- Sticky premium navbar with mobile hamburger menu
- Immersive hero with futuristic **3D cyber coding core** (inspired by your reference composition)
- Mouse-reactive + scroll-reactive hero 3D object
- Flutter-focused premium app showcase cards with CTA actions
- Productized services grid (7 services)
- Professional About section with mission and skill highlights
- Why Work With Me trust section
- Testimonial + social proof section with trust stats
- Conversion-focused contact/project-brief form with validation
- Form submission to backend route + email delivery via Resend
- Premium footer with quick links and social/contact links
- Responsive performance constraints for mobile/low-end devices

## Folder Structure

```text
Devsprint/
├── .env.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── README.md
└── src/
    ├── app/
    │   ├── api/
    │   │   └── contact/
    │   │       └── route.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── opengraph-image.tsx
    │   ├── page.tsx
    │   └── twitter-image.tsx
    ├── components/
    │   ├── effects/
    │   │   ├── CursorGlow.tsx
    │   │   ├── MagneticButton.tsx
    │   │   ├── MouseFollowLight.tsx
    │   │   └── RippleButton.tsx
    │   ├── hero/
    │   │   └── HeroSection.tsx
    │   ├── layout/
    │   │   ├── SiteFooter.tsx
    │   │   ├── SmoothScrollProvider.tsx
    │   │   └── StickyHeader.tsx
    │   ├── page/
    │   │   └── PortfolioExperience.tsx
    │   ├── sections/
    │   │   ├── AboutSection.tsx
    │   │   ├── ContactSection.tsx
    │   │   ├── ProjectsSection.tsx
    │   │   ├── ServicesSection.tsx
    │   │   ├── StorySection.tsx
    │   │   ├── TestimonialsSection.tsx
    │   │   └── WhyChooseSection.tsx
    │   └── three/
    │       ├── FloatingOrb.tsx
    │       └── HeroCanvas.tsx
    ├── data/
    │   ├── projects.ts
    │   └── services.ts
    ├── hooks/
    │   ├── useDeviceTier.ts
    │   ├── useIsMobile.ts
    │   ├── useMousePosition.ts
    │   ├── useReducedMotionSafe.ts
    │   └── useScrollProgress.ts
    ├── lib/
    │   ├── analytics/
    │   │   └── track.ts
    │   ├── animations/
    │   │   ├── presets.ts
    │   │   └── scroll.ts
    │   └── utils/
    │       └── cn.ts
    └── types/
        └── content.ts
```

## Contact Form Flow (Where data goes)

- Client form submits to: `POST /api/contact`
- Route file: `src/app/api/contact/route.ts`
- Server validates payload (name, email, optional company, project type, budget, message)
- On success, backend sends email through Resend
- Destination inbox is controlled by `CONTACT_TO_EMAIL`

This makes project briefs useful/reliable for real freelance lead intake.

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Required values:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` (must be verified sender in Resend)
- `CONTACT_TO_EMAIL` (your inbox)
- `NEXT_PUBLIC_SITE_URL` (public site URL)

## Run Locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Validate Production Build

```bash
npm run lint
npm run build
npm run start
```

## Deploy (Vercel)

1. Push repository to GitHub
2. Import repo in Vercel
3. Add all env variables in Vercel project settings
4. Deploy

## Notes

- 3D effects degrade gracefully on constrained devices
- Heavy interaction layers are reduced on mobile/reduced-motion contexts
- OG/Twitter images are dynamically generated from App Router image routes
