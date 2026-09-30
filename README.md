# ByteSpace

A 1:1 replica of the ByteSpace course-platform design, built with Next.js 16, React 19, TypeScript and Tailwind v4.

**Live:** https://byte-five-psi.vercel.app/

Every colour, type step, radius, shadow, spacing value and line of copy in this
repo was read out of the Figma file `OfiTDVmxnfjhcKcdLVtk0A` through the REST
API. Nothing here was eyeballed from a screenshot, and that constraint is what
shaped most of the architecture below.

---

## Contents

- [Stack](#stack)
- [Running it](#running-it)
- [Routes](#routes)
- [Architecture](#architecture)
- [Design tokens](#design-tokens)
- [The Figma pipeline](#the-figma-pipeline)
- [Motion](#motion)
- [Known limitations](#known-limitations)

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.3.6, App Router, Turbopack |
| UI | React 19.2.8, TypeScript 5 strict |
| Styling | Tailwind CSS v4, tokens in `@theme`, no config file |
| Type | Satoshi (body/UI), Poppins (display), Clash Display (wordmark) |
| Fonts | Self-hosted as woff2 in `app/fonts`, no CDN at runtime |
| Tooling | Python 3 for the Figma pipeline, no extra JS build deps |

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

> **One trap worth knowing about.** `next.config.ts` sets
> `allowedDevOrigins: ["127.0.0.1", "localhost"]`. Without it, opening the app
> via `127.0.0.1` instead of `localhost` gets the `/_next/hmr` request blocked,
> the client runtime never bootstraps, and the page renders correct server HTML
> that is completely dead. No effects, no click handlers, and it looks like a
> working page. Use `localhost`, or add your host to that list.

## Routes

| Route | Source frame | Status |
| --- | --- | --- |
| `/` | Home | Nine sections, built to the frame |
| `/courses` | Search Page | Built |
| `/courses/[slug]` | Course Details | Built |
| `/courses/[slug]/lessons` | Course Lessons | Built |
| `/courses/[slug]/reviews` | Course Reviews | Built |
| `/creator` | Creator Profile | Built |
| `/login`, `/register` | Login, Register | Built |
| anything unmatched | 404 Not Found | Built |

Every route is statically rendered except the three `/courses/[slug]` pages,
which read their slug at request time.

## Architecture

```
app/                    routes only, no layout logic
  globals.css           the whole design system: tokens, type scale, motion
components/
  ui/                   primitives, presentational and self-contained
  cards/                floating overlay cards, the ones that sit on imagery
  layout/               site chrome shared across routes
  home/                 home sections, with home/hero/ as its own module
  course/               the three course tabs, sharing one CourseLayout
  auth/                 the sign-in and register shell
lib/                    typed content and shapes
scripts/                the Figma pipeline
```

Two rules keep this from sprawling:

**One implementation per component, not per page.** The three course tabs
share `CourseLayout` and pass only their body. Sign-in and register share
`AuthShell`. The progress and social-proof cards were duplicated across three
files before being lifted into `components/cards/`.

**Generated code stays generated.** `components/ui/icons.tsx` and
`components/ui/CategoryIcons.tsx` carry a "do not edit" header and a
`scripts/gen_*.py` that produces them. Hand edits are lost on the next refresh.

### Design tokens

Everything lives in `app/globals.css` under `@theme`.

| Group | Values |
| --- | --- |
| Colour | brand `#003be2`, lime `#d4fb20`, ink `#242528`, body `#4f4f4f`, muted `#4b4c53` |
| Radius | 8, 12, 16, 24, 40, plus pill. Buttons and badges are pill |
| Elevation | An 8-step shadow ladder, all low-alpha black |
| Type | Figma sizes at 1440, clamped down on small screens |

The type scale is fluid rather than stepped. `clamp()` holds the 72px hero at
72px on desktop and lands on a readable 30px on a phone, instead of a
media-query ladder across nine breakpoints. Every display step tracks minus 1%
of its own size, so one `-0.01em` rule covers the entire scale.

## The Figma pipeline

This is what makes the replica verifiable rather than approximate. The scripts
under `scripts/` read the design file directly.

```bash
python scripts/figma_extract.py tokens      # colours, radii, shadows, type, by usage
python scripts/figma_extract.py styles      # the 77 published style names
python scripts/figma_extract.py tree 1:1067 --depth 4
python scripts/figma_extract.py images 1:1067
```

`tokens` is the one that matters: it aggregates every usage in the file and
prints the resolved hex values. That is where the palette and the
96-combination type scale came from.

To refresh assets after a design change:

```bash
export FIGMA_TOKEN=figd_...
python scripts/figma_assets.py          # image fills into public/assets
python scripts/gen_icons.py             # 28 page glyphs into components/ui/icons.tsx
python scripts/gen_category_icons.py    # 6 category glyphs into CategoryIcons.tsx
```

Three details in there are load-bearing:

- **Image fills come from `/v1/files/:key/images`, not the render endpoints.**
  That returns the raw `imageRef` asset. Rendering the frame instead would bake
  Figma-only overlays, the pill row and the card chrome, into the photo.
- **Vector paths need `geometry=paths`.** The plain `/v1/files` response omits
  them entirely, so a file cached without that parameter contains no icon data.
- **Category glyphs are component instances, not loose vectors**, so the generic
  sweep in `figma_assets.py` cannot see them. They get their own script and
  their own generated module.

`gen_icons.py` emits 28 entries from 27 unique shapes. `chart-bar` and
`chart-bar-blue` are one path under two names, the neutral and blue variants of
the same bar chart.

Figma's render endpoints are aggressively rate limited and a refresh can need
several minutes of backoff. The file and node endpoints are not, which is why
the pipeline leans on them.

## Motion

House rules, applied throughout `app/globals.css`:

- **Transform and opacity only**, so nothing leaves the compositor.
- **No scroll listeners anywhere.** Entrances are driven by
  IntersectionObserver, which fires once and disconnects. A scroll handler runs
  on every frame and collapses on mobile.
- **CSS transitions over keyframes** for anything the user can interrupt, so a
  retarget mid-flight does not restart.
- **UI feedback under 300ms**, entrances slower. Hover rules sit behind
  `(hover: hover)` so touch devices do not fire phantom lifts.
- **`prefers-reduced-motion` handled in the stylesheet alone.** There is no
  JavaScript branch anywhere.

`Reveal` and `Stagger` in `components/ui/Reveal.tsx` are the two entry points.
`Stagger` exists because a twelve-card grid should run one observer rather than
twelve: the container reveals, and each child picks up a delay from an inline
`--i`. Both toggle a class on the node through a ref rather than through
`useState`, so revealing a grid costs zero React re-renders.

Two things to know before changing either:

- **Both run at `threshold: 0` with a bottom root margin.** A ratio is the wrong
  knob for tall elements. The course body is 1511px, so a `0.12` threshold
  needed 180px of it on screen before firing, and scrolling to a course tab left
  the page blank.
- **Both carry a fail-safe.** An immediate rect test on mount plus a bounded
  timeout, so a callback that never arrives, through a deep link, a restored
  scroll position or a container resized underneath, cannot strand content at
  `opacity: 0`.

## Known limitations

Stated plainly rather than left to be discovered:

- **No backend.** Content lives in `lib/data.ts`. Forms do not submit, the
  filter pills filter the in-memory list, and pagination is presentational.
- **No dark mode.** The Figma file is light-only and a dark variant would break
  fidelity with it. This is a deliberate deviation, not an oversight.
- **No tests.** The real regression risk here is layout drift against the Figma
  frame, which a component test would not catch. That needs a screenshot diff.
- **Ornaments are CSS-masked approximations.** Figma builds the lime and white
  3D shapes from paired image fills clipped by mask groups. Masking the
  exported grey render and colouring the mask target reproduces the same
  silhouette from a single asset per shape, but the rendered pixels differ.
  Positions, sizes and tints are exact; the shape geometry is the closest
  exported equivalent.
- **Copy is verbatim from the source,** including the em dashes in the
  testimonial strings. A house style guide would normally strip those.
