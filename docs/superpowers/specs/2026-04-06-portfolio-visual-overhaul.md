# Portfolio Visual Overhaul — Design Spec
Date: 2026-04-06

## Overview

Full visual overhaul of `index.html`. No new sections or content changes — focused entirely on typography, background animation, and motion design. Single-file, no new dependencies beyond Google Fonts.

---

## 1. Typography

- **Remove**: Playfair Display (all serif references)
- **Add**: Inter from Google Fonts — weights 300, 400, 500, 600, 700
- **Apply**: Inter to `body`, all headings (`h1`, `h2`, `h3`), navbar, badges, everything
- **Settings**: `font-feature-settings: "cv11"` on body for cleaner numeral/letter forms
- **Scale**:
  - Hero name: `clamp(52px, 8vw, 80px)`, weight 800, `letter-spacing: -2px`
  - Section titles: `48px`, weight 700, `letter-spacing: -1px`
  - Body: `18px`, weight 400, line-height 1.7
  - Labels (e.g. `// sobre mí`): `11px`, weight 600, `letter-spacing: 3px`, uppercase
  - Badges/tags: `12px`, weight 500

---

## 2. Background — Aurora System

Three radial blob layers, always visible behind all content (fixed to the `<body>` or a fixed `div`):

- **Blob 1** (top-left): `rgba(124, 111, 205, 0.20)` — violet, `800px × 800px`, animates with `float-a 9s ease-in-out infinite`
- **Blob 2** (bottom-right): `rgba(56, 189, 248, 0.12)` — sky blue, `700px × 700px`, `float-b 13s ease-in-out infinite`
- **Blob 3** (center-bottom): `rgba(168, 85, 247, 0.14)` — purple, `600px × 600px`, `float-c 11s ease-in-out infinite`

Each `float-*` keyframe moves the blob `20–35px` in X/Y at `50%` — different directions so they never look synchronized.

**Noise overlay**: a full-screen `::before` pseudo-element on `body` using an inline SVG `feTurbulence` filter at `opacity: 0.035` — adds grain texture, prevents the gradient from looking too digital/flat.

All blobs use `pointer-events: none; position: fixed; z-index: 0`. All page content sits at `z-index: 1` or higher.

---

## 3. Hero — Stagger Entrance

On page load, hero elements enter sequentially. Each child gets `opacity: 0; transform: translateY(16px)` initially, then plays `fade-up 0.6s ease forwards` with increasing `animation-delay`:

| Element | Delay |
|---|---|
| Label `// bienvenido` | 0.1s |
| Name `h1` | 0.25s |
| Typing effect line | 0.4s |
| CTA buttons | 0.6s |

The typing effect script starts only after its element's animation completes (delay-gated with `setTimeout`).

---

## 4. Scroll Reveal — Stagger on Sections

Replace the current single `fade-section` class system with a more granular `stagger-reveal` system:

- Each section wrapper gets `data-stagger` attribute
- `IntersectionObserver` (threshold: `0.1`) watches all `[data-stagger]` containers
- When a container enters viewport, its direct children get class `revealed` added with `index * 120ms` delay each
- Base animation: `opacity: 0; transform: translateY(20px)` → `opacity: 1; transform: translateY(0)`, duration `0.55s`, easing `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out)
- Once revealed, `observer.unobserve()` — no re-animation on scroll back

---

## 5. Project Cards — Animated Gradient Border

Current: `border: 1px solid var(--border)` that changes color on hover.

New approach using a wrapper technique:
- Card gets `position: relative; border-radius: 16px; background: var(--bg-card)`
- On hover, a `::before` pseudo-element with `background: conic-gradient(from 0deg, transparent 60%, rgba(124,111,205,0.8) 80%, transparent)` is positioned behind the card and rotated via `@keyframes spin 3s linear infinite`
- A `::after` pseudo-element covers the inside to reveal only a thin border
- Fallback for no-animation: simple `border-color` transition for `prefers-reduced-motion`

Card content additions:
- Each card gets a small icon (emoji or SVG) in the top-left corner
- Tag badges get a subtle hover glow: `box-shadow: 0 0 8px rgba(124,111,205,0.4)`

---

## 6. Buttons — Shimmer Effect

Hero CTA primary button gets a `::after` pseudo-element with:
- `background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`
- Animated via `@keyframes shimmer-pass 4s ease-in-out infinite` — the gradient sweeps left-to-right every 4 seconds
- `overflow: hidden` on the button to clip the shimmer

---

## 7. Navbar

- Font: Inter 500, same muted color scheme
- Logo "RF": `font-family: 'Inter'`, weight 800, with `background: linear-gradient(135deg, var(--accent), var(--accent-light)); -webkit-background-clip: text; color: transparent`
- Nav links: animated underline via `::after` pseudo-element — `width: 0` → `width: 100%` on hover, `transform-origin: center`, `transition: width 0.25s ease`
- Mobile hamburger menu: hidden by default, shown below `md` breakpoint, toggles a vertical nav dropdown with the same links

---

## 8. Footer

- Separator line: `border-top` replaced with a `height: 1px; background: linear-gradient(to right, transparent, var(--accent), transparent)`

---

## Out of Scope

- No new content sections
- No changes to existing text/copy
- No external JS libraries
- No changes to the contact section functionality (email copy still works)
- No backend or build tooling

---

## Files Changed

- `index.html` — only file modified
