# Spec: Nuevos Proyectos + Sección Experiencia

**Fecha:** 2026-04-07  
**Estado:** Aprobado

---

## Resumen

Dos cambios al portafolio (`index.html`):

1. Agregar dos tarjetas de proyecto nuevas (005 y 006) al grid existente.
2. Agregar una sección "Experiencia" después de "Proyectos" con un timeline animado estilo línea-izquierda.

---

## 1. Nuevas tarjetas de proyecto

### Proyecto 005 — Generador de Contraseñas

- **Número:** 005
- **Título:** Generador de Contraseñas
- **Descripción:** Genera contraseñas seguras con opciones de longitud, números y símbolos.
- **Tags:** `Python`
- **Link:** `https://github.com/rrobertf/generador-contrasenas` — texto "GitHub ↗"

### Proyecto 006 — Web Scraper de Noticias

- **Número:** 006
- **Título:** Web Scraper de Noticias
- **Descripción:** Extrae las 20 noticias principales de Hacker News y las guarda en archivo.
- **Tags:** `Python`, `BeautifulSoup`
- **Link:** `https://github.com/rrobertf/web-scraper` — texto "GitHub ↗"

### Comportamiento del grid

- El grid pasa de 4 tarjetas a 6. El layout `md:grid-cols-2` mantiene 2 columnas en desktop.
- Los nuevos cards deben incluir `animation-delay` para `card-flicker` (`:nth-child(5)` → 4.8s, `:nth-child(6)` → 6s).
- Los cards 001 (Todo App) y 002 (Organizador de Archivos) ya tienen link de GitHub en el HTML existente — verificar que se muestren correctamente (ya están presentes, solo con texto "GitHub ↗").

---

## 2. Sección Experiencia

### Posición

Después de `#proyectos`, antes de `#habilidades`.

### Navbar

Agregar enlace `#experiencia` al navbar, entre "Proyectos" y "Habilidades".

### Estructura HTML

```
section#experiencia [data-stagger]
  .cyber-grid.cyber-grid--dim
  .eyebrow "Experiencia"           ← stagger-child
  .tl-wrapper                      ← stagger-child
    .tl-group (Educación)
      .tl-group-label
      .tl-item  →  .tl-card
    .tl-group (Experiencia Laboral)
      .tl-group-label
      .tl-item ×3  →  .tl-card ×3
```

### Contenido

**Educación:**
| Período | Institución | Rol |
|---------|-------------|-----|
| 2024 – Presente | Universidad Interamericana de Puerto Rico | Bachillerato en Computer Science · Recinto de Ponce |

**Experiencia Laboral:**
| Período | Empresa | Rol |
|---------|---------|-----|
| 2026 – Presente | Popeyes | Trabajo part-time |
| 2024 – 2026 | Econo Supermarket | Trabajo part-time |
| 2022 – 2024 | New Look Salon | Trabajo part-time |

### Estilos CSS (nuevas clases)

- **`.tl-wrapper`** — `position:relative; padding-left:32px`. Contiene la línea vertical.
- **`.tl-wrapper::before`** — línea vertical de 1px con gradiente `transparent → #39ff85 → transparent`, opacidad 0.3, `left:8px`.
- **`.tl-group`** — `margin-bottom:28px`.
- **`.tl-group-label`** — `font-size:9px; letter-spacing:3px; uppercase; color:#444`. Separador visual entre grupos.
- **`.tl-item`** — `position:relative; margin-bottom:14px`. Contiene el punto y la tarjeta.
- **`.tl-item::before`** — punto neón `9×9px; border-radius:50%; background:#39ff85; box-shadow: 0 0 8px rgba(57,255,133,.6), 0 0 20px rgba(57,255,133,.2); left:-24px; top:14px; transform:translateX(-50%)`.
- **`.tl-card`** — igual que `.proj-card` pero sin la animación `card-flicker`. `padding:14px 16px`. Tiene `::before` en borde izquierdo (2px, gradiente verde) visible solo en `:hover`.
- **`.tl-period`** — `font-size:9px; color:#39ff85; letter-spacing:2px; uppercase`.
- **`.tl-name`** — `font-size:13px; font-weight:700`.
- **`.tl-role`** — `font-size:11px; color:#666`.

### Animaciones al hacer scroll

- `.tl-wrapper` es un `stagger-child` — el `staggerObserver` existente lo revela como bloque al entrar en viewport.
- Al mismo tiempo que `.tl-wrapper` se revela, un nuevo `IntersectionObserver` (`timelineObserver`) observa el wrapper y, cuando intersecta, itera sobre sus `.tl-item` hijos aplicando `stagger-child revealed` con 120ms de delay entre cada uno.
- La línea vertical (`tl-wrapper::before`) inicia con `transform:scaleY(0); transform-origin:top` y hace `scaleY(1)` con `transition:transform 0.8s cubic-bezier(.16,1,.3,1)` al mismo tiempo que el wrapper se revela. Esto se activa añadiendo una clase `.tl-line-revealed` al wrapper vía JS.
- Los puntos (`.tl-item::before`) usan `animation: tl-dot-pop 0.35s cubic-bezier(.16,1,.3,1) forwards` al revelarse — keyframes: `scale(0) → scale(1.3) → scale(1)`.
- Nueva keyframe: `@keyframes tl-dot-pop { 0%{transform:translateX(-50%) scale(0)} 70%{transform:translateX(-50%) scale(1.3)} 100%{transform:translateX(-50%) scale(1)} }`.

### `prefers-reduced-motion`

Agregar al bloque existente: `.tl-item, .tl-wrapper::before { animation:none; transition:none; }` y asegurar visibilidad sin animación.

---

## Archivos modificados

- `index.html` — único archivo, todos los cambios van aquí.

## Lo que NO cambia

- Estilos globales existentes (orbs, grid, eyebrow, info-card, proj-card, skill-badge, stagger-child, hero-item).
- El JavaScript de navbar scroll, copyEmail, y el `staggerObserver` existente (se extiende con lógica timeline, no se reemplaza).
- Orden de las demás secciones: Hero, Sobre Mí, Proyectos, **Experiencia (nueva)**, Habilidades, Contacto, Footer.
