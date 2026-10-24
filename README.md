# Engineering Portfolio Dashboard

An animated portfolio dashboard in an engineering-lab style: night-navy hero with a dev board under a desk lamp, electric-blue accents, glass cards, real
product and industry photos, and a sun rising over the curve of the earth.

All the content lives in one file, `src/data/profile.ts`. It ships with neutral placeholder text
(“Your Name”, “Your Role”, “Project One”…) — replace the values and the whole page updates.

**Live site:** https://pragyamita-debug.github.io/advance-computer-science/ (after Pages is switched on — see below)

## Making it yours

Open `src/data/profile.ts` and edit the fields:

| Field | Shown in |
| --- | --- |
| `name`, `headline` (`Role | Specialism`), `location`, `email`, `phone`, `links` | nav, hero, why panel, contact, footer |
| `summary`, `tagline`, `motto` | hero, skills intro, why panel, the handwriting |
| `skills`, `interests` | hero tag strip, side cards, domain cards, skill chips |
| `experience` | career steps |
| `education`, `certifications`, `achievements` | why panel, highlights slider, FAQ |
| `projects` (with `tags`) | featured slider and Recent Work |
| `goals` | call to action and FAQ |
| `stats` | the counting numbers |

## What the dashboard shows

| Part | Built from |
| --- | --- |
| Nav | chip logo, name, specialism, section links, expanding search (Enter jumps to and highlights the match), **Get in touch** |
| Hero | top five skills as the tag strip, name, role, first sentence of the summary, location / years / degree; the motto handwritten beside the board |
| Featured card | the first four projects, auto-sliding with dots |
| Three side cards | interests (or skills) with photos |
| Skills & domains | five photo cards plus every skill as a chip |
| Why work with … | current role, degree, certification, location; projects / skills / years / awards counting up; sunrise over the earth |
| Career path | roles as numbered steps, oldest to newest; the lit step walks along the dashed line and shows that role’s bullets |
| Recent work | project cards with tag chips; **View all** shows the rest |
| Highlights | achievements and certifications in an auto-playing slider |
| Have a project in mind? | the next goal, email and phone buttons over the summit photo |
| FAQ | questions answered from the profile: specialism, tools, education, location, what’s next |

## Animations

| Effect | Where | How |
| --- | --- | --- |
| Counting numbers | stats in the navy panel | `useCountUp` — rAF + ease-out-expo, starts when in view; the “+” lands when the count finishes |
| Moving, lit borders | featured, side, domain, project and detail cards | conic gradient on `@property --angle`, masked to a thin ring, plus a blurred halo (`GlowCard`) |
| Hover | every card, button and icon | pointer spotlight + slight tilt, lift, photo zoom, icons fill blue |
| Rising sun | navy panel | the sun climbs out from behind the earth’s curve, rays turn, light spreads along the horizon |
| Handwriting | hero | each word is written in, then the underline draws |
| Lamp glow, sliders, dashed path | hero, featured card, career steps, highlights | CSS keyframes + small React timers (pause on hover) |

All motion respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev          # local dev server
npm run typecheck    # TypeScript check
npm run build        # static build in dist/
npm run build:single # one self-contained index.html in dist-single/
```

## Publish on GitHub Pages

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Actions → Deploy to GitHub Pages → Run workflow** (it also runs on every push to `main`).

## Project structure

```
src/
  App.tsx                 renders the dashboard from the profile
  data/profile.ts         all the content (edit this)
  lib/types.ts            the profile shape
  hooks/                  useCountUp, useScramble, useInView, usePointerGlow, useScrollSpy
  components/
    NavBar.tsx            nav + search
    Hero.tsx              hero copy + featured slider + side cards
    Sections.tsx          domains, why (earth + sunrise), career steps, recent work, highlights, CTA, FAQ, footer
    GlowCard.tsx          the moving-border card
  assets/photos/          hero, drone, side cards, domains, products, summit, earth
  styles/global.css       colour tokens, type, buttons
```

The photos in `src/assets/photos/` were cut from the design mock-up (printed text removed) and enlarged 4×
with an EDSR super-resolution network plus a light sharpen. The mock-up was small, so some are soft —
swap in higher-resolution photos with the same file names for the sharpest page.
