# ByteSpace

A 1:1 replica of the ByteSpace course-platform design, built with Next.js 16, React 19, TypeScript and Tailwind v4.

**Live:** https://byte-five-psi.vercel.app/

The design source is the Figma file `OfiTDVmxnfjhcKcdLVtk0A`. Every colour,
type step, radius, shadow, spacing value and line of copy in this repo was
read out of that file through the Figma REST API — not eyeballed from
screenshots. That constraint shaped most of the architecture below.

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16.3.6 (App Router, Turbopack) |
| UI | React 19.2.8, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens, no config file) |
| Fonts | Satoshi, Poppins, Clash Display — self-hosted in `app/fonts` |
| Tooling | Python 3 for the Figma pipeline; no JS build deps beyond Next |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
```

> **Gotcha.** `next.config.ts` sets `allowedDevOrigins: ["127.0.0.1", "localhost"]`.
> Without it, loading the app via `127.0.0.1` instead of `localhost` gets the
> `/_next/hmr` request blocked, the client runtime never bootstraps, and the
> page renders correct server HTML that is completely dead — no effects, no
> click handlers. It looks like a working page. If you see that, use
> `localhost` or add your host.

## Routes

| Route | Source frame |
| --- | --- |
| `/` | Home |
| `/courses` | Search Page |
| `/courses/[slug]` | Course Details |
| `/courses/[slug]/lessons` | Course Lessons |
| `/courses/[slug]/reviews` | Course Reviews |
| `/creator` | Creator Profile |
| `/login`, `/register` | Login, Register |
| anything unmatched | 404 Not Found |

## Architecture

```
app/                    routes only — no layout logic
  globals.css           the whole design system: tokens, type scale, motion
components/
  ui/                   primitives, presentational and self-contained
  cards/                floating overlay cards (the ones that sit on imagery)
  layout/               site chrome shared across routes
  home/                 home sections; home/hero/ is its own module
  course/               the three course tabs, sharing one CourseLayout
  auth/                 the sign-in / register shell
lib/                    typed content and shapes
scripts/                the Figma pipeline (Python)
```

Two rules keep it from sprawling:

**One implementation per component, not per page.** The course tabs share
`CourseLayout` and differ only in the body passed to it. The sign-in and
register pages share `AuthShell`. The progress and social-proof cards were
duplicated in three files before being lifted into `components/cards/`.

**Generated code is generated.** `components/ui/icons.tsx` and
`components/ui/CategoryIcons.tsx` carry a "do not edit" header and a
`scripts/gen_*.py` that produces them. Hand-editing them loses the next
refresh.

### Design tokens

Everything lives in `app/globals.css` under `@theme`. The values that matter:

- **Colour** — `--color-brand` `#003be2` (Electric Violet), `--color-lime`
  `#d4fb20` (Electric Lime), ink `#242528`, body `#4f4f4f`, muted `#4b4c53`.
- **Radius** — 8 / 12 / 16 / 24 / 40 plus pill. Buttons and badges are pill.
- **Elevation** — an 8-step shadow ladder, all low-alpha black.
- **Type** — Satoshi for body and UI, Poppins for display, Clash Display for
  the wordmark. Sizes are the Figma values at 1440, clamped down on small
  screens. Every display step tracks −1% of its own size, so one `-0.01em`
  rule covers the entire scale.

The scale is fluid, not fixed. `clamp()` keeps the 72px hero at 72px on
desktop and lands on a readable 30px on a phone, rather than a media-query
ladder of nine breakpoints.

## The Figma pipeline

This is the part that makes the replica verifiable rather than
approximate. The scripts under `scripts/` read the design file directly:

```bash
python scripts/figma_extract.py tokens        # colours, radii, shadows, type, by usage
python scripts/figma_extract.py styles        # the 77 published style names
python scripts/figma_extract.py tree 1:1067 --depth 4
python scripts/figma_extract.py images 1:1067
```

`tokens` is the useful one: it aggregates every usage in the file and prints
the real hex values, which is how the palette and the 96-combination type
scale were derived rather than guessed.

To refresh assets after a design change:

```bash
export FIGMA_TOKEN=figd_...
python scripts/figma_assets.py          # image fills -> public/assets/
python scripts/gen_icons.py             # 28 page glyphs -> components/ui/icons.tsx
python scripts/gen_category_icons.py    # 6 category glyphs -> CategoryIcons.tsx
```

Three details in there are load-bearing:

- **Image fills come from `/v1/files/:key/images`, not the render
  endpoints.** That returns the raw `imageRef` asset. Rendering the frame
  would bake Figma-only overlays — the pill row, the card chrome — into the
  photo.
- **Vector paths need `geometry=paths`.** The plain `/v1/files` response
  omits them entirely, so a cached file fetched without that parameter has
  no icon data in it.
- **Category glyphs are component instances, not loose vectors**, so the
  generic sweep in `figma_assets.py` cannot see them. They get their own
  script and their own generated module.

`gen_icons.py` yields 28 entries from 27 unique shapes: `chart-bar` and
`chart-bar-blue` are the same path under two names, the neutral and blue
variants of one bar chart.

Figma's render endpoints are aggressively rate limited — a refresh can need
several minutes of backoff. The file and node endpoints are not, which is
why the pipeline leans on them.

## Motion

House rules, applied throughout `app/globals.css`:

- **transform and opacity only**, so nothing leaves the compositor.
- **No scroll listeners anywhere.** Entrances are driven by
  IntersectionObserver, which fires once and disconnects. A scroll handler
  runs on every frame and collapses on mobile.
- **CSS transitions over keyframes** for anything the user can interrupt, so
  a retarget mid-flight does not restart.
- **UI feedback under 300ms**, entrances slower. Hover rules are gated
  behind `(hover: hover)` so touch devices do not fire phantom lifts.
- **`prefers-reduced-motion` is handled in the stylesheet alone** — no
  JavaScript branch anywhere.

`Reveal` and `Stagger` in `components/ui/Reveal.tsx` are the two entry
points. `Stagger` exists because a twelve-card grid should run *one*
observer, not twelve: the container reveals and each child picks up a delay
from an inline `--i`.

Both toggle a class on the node through a ref rather than through
`useState`, so revealing a grid costs zero React re-renders.

Two things worth knowing before changing it:

- **Both run at `threshold: 0` with a bottom root margin.** A ratio is the
  wrong knob for tall elements — the course body is 1511px, so `0.12` needed
  180px on screen before firing and scrolling to a course tab left the page
  blank.
- **Both have a fail-safe.** An immediate rect test on mount plus a bounded
  timeout, so a callback that never arrives — a deep link, a restored scroll
  position, a container resized underneath — cannot strand content at
  `opacity: 0`.

## Known limitations

Worth stating plainly rather than discovering later:

- **No backend.** Content lives in `lib/data.ts`. Forms do not submit, the
  filter pills filter the in-memory list, and pagination is presentational.
- **No dark mode.** The Figma file is light-only and a dark variant would
  break fidelity with it. This is a deliberate deviation, not an omission.
- **No tests.** The visual regression risk here is layout drift against the
  Figma frame, which a component test would not catch anyway; it needs a
  screenshot diff.
- **Ornaments are CSS-masked approximations.** Figma builds the lime and
  white 3D shapes from paired image fills clipped by mask groups. Masking
  the exported grey render and colouring the mask target reproduces the same
  silhouette from one asset per shape, but the exact rendered pixels differ.
  Positions, sizes and tints are exact; the shape geometry is the closest
  exported equivalent.
- **Copy is verbatim from the source,** including the em dashes in the
  testimonial strings. A house style guide would normally strip those.
