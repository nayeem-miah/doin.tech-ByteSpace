# ByteSpace

A 1:1 replica of the ByteSpace Figma design, built with Next.js 16, React 19,
TypeScript and Tailwind v4.

The design source is the Figma file `OfiTDVmxnfjhcKcdLVtk0A` ("ByteSpace"),
readable over the Figma REST API with a personal access token. Every colour,
type step, radius, shadow and piece of copy here was pulled from that file
rather than eyeballed from a screenshot.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Routes

| Route                     | Source frame    |
| ------------------------- | --------------- |
| `/`                       | Home            |
| `/courses`                | Search Page     |
| `/courses/[slug]`         | Course Details  |
| `/courses/[slug]/lessons` | Course Lessons  |
| `/courses/[slug]/reviews` | Course Reviews  |
| `/creator`                | Creator Profile |
| `/login`, `/register`     | Login, Register |
| anything unmatched        | 404 Not Found   |

## Design tokens

`app/globals.css` holds the system. The values that matter:

- **Colour** - `--color-brand` `#003be2` (Electric Violet), `--color-lime`
  `#d4fb20` (Electric Lime), ink `#242528`, body `#4f4f4f`, muted `#4b4c53`.
- **Radius** - 8 / 12 / 16 / 24 / 40 plus pill. Buttons and badges are pill.
- **Elevation** - an 8-step shadow ladder, all low-alpha black.
- **Type** - Satoshi for body and UI, Poppins for display, Clash Display for
  the wordmark. Sizes are the Figma values at 1440 and clamp down on small
  screens. Every display step tracks -1% of its own size, so a single
  `-0.01em` rule covers the whole scale.

### Verifying a token against the source

```bash
python scripts/figma_extract.py tokens     # colours, radii, shadows, type by usage
python scripts/figma_extract.py styles     # published style names
python scripts/figma_extract.py tree 1:1067 --depth 4
python scripts/figma_extract.py images 1:1067
```

## Assets

`public/assets/` is generated, not hand-drawn. `scripts/figma_assets.py` pulls
every image fill through `/v1/files/:key/images`, which returns the raw
`imageRef` asset rather than a re-render of the frame - a frame render would
have baked Figma-only overlays into the photo. The 27 unique icon glyphs are
inlined by `scripts/gen_icons.py` into `components/ui/icons.tsx` as a typed
React component, because external `<use href="icon.svg">` references do not
work in browsers.

To refresh after a design change:

```bash
export FIGMA_TOKEN=figd_...
python scripts/figma_assets.py
python scripts/gen_icons.py
```

Note that Figma's image-render endpoints are aggressively rate limited; a
refresh can need a few minutes of backoff.

## Motion

Reveals use IntersectionObserver, not scroll listeners. Scroll handlers run on
every frame and collapse on mobile, so they are avoided throughout; the visible
class is toggled on the node via a ref, which means revealing a grid costs zero
React re-renders. Progress bars animate `transform: scaleX` rather than
`width`, and everything honours `prefers-reduced-motion` through the
stylesheet, with no JavaScript branches.

## Deviations from the source design

- **No dark mode.** The Figma file is light-only, and a dark variant would
  break fidelity with it.
- **Ornaments are CSS-masked.** Figma builds the hero's lime and white 3D
  shapes from paired image fills clipped by mask groups. Masking the exported
  grey render and colouring the mask target reproduces the same silhouette
  from a single asset per shape.
- **Copy is verbatim,** including the em dashes present in the source strings.
  A house style guide would normally strip those, but this is a replica.
