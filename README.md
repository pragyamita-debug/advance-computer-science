# CV → Dashboard (Advanced Computer Science & Engineering)

Candidates upload a CV (PDF, DOCX or TXT) and get an animated portfolio dashboard in an engineering-lab
style: night-navy hero with a dev board under a desk lamp, electric-blue accents, glass cards, real
product and industry photos, and a sun rising over the curve of the earth.

Everything runs in the browser. The CV is read client-side and never sent to a server.

**Live site:** https://pragyamita-debug.github.io/advance-computer-science/ (after Pages is switched on — see below)

## How it works

0. **Example first** — the page opens on the full design filled with neutral placeholder text
   (`src/data/placeholder.ts`: “Your Name”, “Your Role”, “Project One”…) and an **Upload CV** button.
1. **Upload** — drag a CV onto the drop zone, or try the bundled sample (`src/data/sample-cv.txt`, a fictional embedded engineer).
2. **Read** — PDF text comes from pdf.js, Word files from mammoth; both load only when needed.
3. **Parse** — `src/lib/parseResume.ts` splits the text into sections and works out years of experience from
   the date ranges, counting overlapping jobs once. `Tech: ESP32, GPS` lines under a project become its tag
   chips; `Type: …` lines become its subtitle.
4. **Review** — the candidate checks what was found and fixes anything before the dashboard is built.
5. **Dashboard** — saved to `localStorage`; the gear menu can upload another CV, edit, download or go back to the example.

## What the dashboard shows

| Part | Built from |
| --- | --- |
| Nav | chip logo, name, specialism, section links, expanding search (Enter jumps to and highlights the match), gear menu, **Upload CV** / **Get in touch** |
| Hero | top five skills as the tag strip, name, role, first sentence of the summary, location / years / degree; the motto handwritten beside the board |
| Featured card | the first four projects, auto-sliding with dots |
| Three side cards | interests (or skills) with photos |
| Skills & domains | five photo cards plus every skill as a chip |
| Why work with … | current role, degree, certification, location; projects / skills / years / awards counting up; sunrise over the earth |
| Career path | roles as numbered steps, oldest to newest; the lit step walks along the dashed line and shows that role’s bullets |
| Recent work | project cards with tag chips; **View all** shows the rest |
| Highlights | achievements and certifications in an auto-playing slider |
| Have a project in mind? | the next goal, email and phone buttons over the summit photo |
| FAQ | questions answered from the CV: specialism, tools, education, location, what’s next |

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
npm test             # parser tests (vitest)
npm run build        # static build in dist/
npm run build:single # one self-contained index.html in dist-single/
```

## Publish on GitHub Pages

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Actions → Deploy to GitHub Pages → Run workflow** (it also runs on every push to `main`).

## Writing a CV that parses well

- Clear headings: **Experience**, **Education**, **Skills**, **Projects**, **Achievements**, **Certifications**.
- Dates on the role line or the line after it: `Jan 2023 – Present`, `03/2021 - 06/2023`, `2019 - 2022`.
- Under each project, an optional `Tech: …` line for the chips.
- Optional extras: **Goals** (`Goal: …`, `Next Step: …`), **Motto** (handwritten in the hero), **Interests** (the side cards).
- Text-based PDFs only — scanned images have no text to read.

## Project structure

```
src/
  App.tsx                 example → upload → reading → review → dashboard
  data/placeholder.ts     the general example profile shown before any upload
  data/sample-cv.txt      fictional sample CV
  lib/                    extractText, parseResume (+ tests), dates, storage, types
  hooks/                  useCountUp, useScramble, useInView, usePointerGlow, useScrollSpy
  components/
    NavBar.tsx            nav, search, gear menu
    Hero.tsx              hero copy + featured slider + side cards
    Sections.tsx          domains, why (earth + sunrise), career steps, recent work, highlights, CTA, FAQ, footer
    UploadScreen.tsx, ReviewDialog.tsx
    GlowCard.tsx          the moving-border card
  assets/photos/          hero, drone, side cards, domains, products, summit, earth
  styles/global.css       colour tokens, type, buttons
```

The photos in `src/assets/photos/` were cut from the design mock-up (printed text removed) and enlarged 4×
with an EDSR super-resolution network plus a light sharpen. The mock-up was small, so some are soft —
swap in higher-resolution photos with the same file names for the sharpest page.
