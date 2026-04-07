# Portfolio Redesign — Obsidian × Cyber (Verde Neón)

**Date:** 2026-04-06
**Status:** Approved

## Overview

Rediseño completo del `index.html` existente. Se mantiene el stack (HTML + Tailwind CDN + JS vanilla) pero se reemplaza toda la identidad visual: de un dark-violet genérico a un estilo **Obsidian × Cyber** con acento verde neón `#39ff85`.

## Design Language

| Token | Valor |
|---|---|
| Background | `#0c0c0c` |
| Background card | `#0f0f0f` |
| Border | `#1e1e1e` |
| Accent | `#39ff85` |
| Text primary | `#ffffff` |
| Text muted | `#3a3a3a` — `#444` |
| Text label | `#2a2a2a` |

**Tipografía:**
- Nombre hero: `font-size: clamp(38px, 7.5vw, 68px)`, `font-weight: 900`, `text-transform: uppercase`, `letter-spacing: -3px`
- Segunda línea del nombre: `color: transparent`, `-webkit-text-stroke: 1.5px rgba(255,255,255,0.18)` (outline)
- Labels/eyebrows: `9-10px`, `letter-spacing: 4px`, `text-transform: uppercase`, `color: var(--ac)`
- Numeración proyectos: `001 / 002 / 003 / 004`

## Animations (todas en CSS puro)

| Animación | Elemento | Descripción |
|---|---|---|
| `grid-breathe` | Fondo de todas las secciones | Grid de líneas verdes que pulsa `opacity 0.3 → 1` en 7s |
| `dot-float` | Glow dot radial en hero | Punto de luz flotante verde, se mueve -20px en 6s |
| `scan` | Línea top del hero | Scan line horizontal que se expande y contrae en 5s |
| `ey-pulse` | Eyebrow labels en verde | Fade 0.5 → 1 en 3s |
| `btn-glow` | Botón CTA primario | Box-shadow verde pulsando en 4s |
| `ghost-flicker` | Botón secundario outline | Border y color flashean sutilmente en 6s |
| `card-flicker` | Cards proyectos e info | Border flashea a verde cada ~6s, con delays escalonados |
| `c-tick` | Contador `001 / PORTFOLIO` | Color oscila entre `#1e1e1e` y `#353535` en 3s |
| `dot-blink` | Punto en footer | Opacity 0.3 → 1 en 2s |

## Secciones

### Navbar
- Logo `RF` en verde neón
- Links en `#3a3a3a` — sin subrayado, sin hover effect llamativo
- Fondo transparente → blur `rgba(12,12,12,0.85)` al scroll

### Hero
- Grid animado de fondo con tinte verde
- Glow dot radial en esquina superior derecha (+ uno secundario inferior izquierda)
- Scan line en el top
- Contador `001 / PORTFOLIO` en esquina superior derecha
- Eyebrow label verde con línea decorativa
- Nombre en dos líneas: `ROBERTO` (blanco) / `FELICIANO` (outline)
- Bottom row: rol a la izquierda, dos botones a la derecha
  - Botón primario: fondo `#39ff85`, texto negro, glow pulse
  - Botón secundario: outline `#252525`, flicker sutil

### Sobre mí
- Grid de fondo tenue
- Eyebrow label verde
- Texto descriptivo a la izquierda
- 3 info-cards a la derecha con SVG icons en verde (graduación, monitor, candado) — sin emojis
- Cards con `card-flicker` escalonado

### Proyectos
- Grid de fondo tenue
- Numeración `001–004`
- Tags con fondo y borde verde translúcido
- Border flicker escalonado por card

### Habilidades
- Badges con borde `#1e1e1e`, hover → `#39ff85`
- Diferenciación "en aprendizaje": borde y texto verde

### Contacto
- Eyebrow label + texto intro
- Dos cards:
  - **Email** `robertofeliciano2130@gmail.com` — botón "Copiar" funcional (JS clipboard), cambia a "¡Copiado!" 2s
  - **GitHub** `github.com/rrobertf` — botón "Abrir ↗" link externo
- SVG icons en verde dentro de un chip redondeado

### Footer
- `Roberto Feliciano · 2026` en `#2a2a2a`
- Punto verde parpadeante a la derecha

## Scroll Animations

Mantener el sistema de stagger IntersectionObserver existente. Cada sección entra con fade + translateY desde abajo.

## What Changes vs Current

- Eliminar completamente: `--accent: #7c6fcd`, `--accent-light: #a78bfa`, Playfair Display, todas las clases `.project-card` con borde animado conic-gradient, `.tech-badge` violeta, gradiente hero radial violeta, `.btn-primary` shimmer
- Reemplazar con el sistema de tokens y animaciones especificado arriba
- Actualizar email de `robertofeliciano579@yahoo.com` a `robertofeliciano2130@gmail.com`
