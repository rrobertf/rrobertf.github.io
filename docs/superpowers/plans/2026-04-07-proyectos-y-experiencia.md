# Proyectos + Experiencia Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar dos tarjetas de proyecto (005/006) al grid existente y una nueva sección "Experiencia" con un timeline animado de línea izquierda, todo en `index.html`.

**Architecture:** Single-file HTML — todos los cambios van en `index.html` en cuatro zonas: `<style>`, sección `#proyectos`, nueva sección `#experiencia`, y `<script>`. Se extiende el sistema de animaciones y observadores existentes sin romperlos.

**Tech Stack:** HTML, CSS (variables CSS, keyframes, IntersectionObserver), Tailwind CDN (clases utilitarias), Vanilla JS.

---

### Task 1: Agregar CSS del timeline

**Files:**
- Modify: `index.html` — bloque `<style>`, justo antes del cierre `</style>` en línea ~212.

- [ ] **Step 1: Agregar keyframe `tl-dot-pop` y clases del timeline**

Insertar esto inmediatamente antes de `  </style>` (línea 212):

```css
/* ── Timeline de Experiencia ── */
@keyframes tl-dot-pop {
  0%   { transform: translateX(-50%) scale(0); }
  70%  { transform: translateX(-50%) scale(1.3); }
  100% { transform: translateX(-50%) scale(1); }
}

.tl-wrapper {
  position: relative;
  padding-left: 32px;
}
.tl-wrapper::before {
  content: '';
  position: absolute;
  left: 8px; top: 8px; bottom: 8px;
  width: 1px;
  background: linear-gradient(180deg, transparent 0%, var(--ac) 15%, var(--ac) 85%, transparent 100%);
  opacity: 0.3;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.8s cubic-bezier(.16,1,.3,1);
}
.tl-wrapper.tl-line-revealed::before {
  transform: scaleY(1);
}
.tl-group {
  margin-bottom: 28px;
}
.tl-group-label {
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: #444; margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px;
}
.tl-group-label::before {
  content: ''; width: 14px; height: 1px; background: #333; display: inline-block;
}
.tl-item {
  position: relative;
  margin-bottom: 14px;
  opacity: 0; transform: translateY(16px);
  transition: opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1);
}
.tl-item.revealed {
  opacity: 1; transform: translateY(0);
}
.tl-item::before {
  content: '';
  position: absolute;
  left: -24px; top: 14px;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: var(--ac);
  box-shadow: 0 0 8px rgba(57,255,133,.6), 0 0 20px rgba(57,255,133,.2);
  transform: translateX(-50%) scale(0);
}
.tl-item.revealed::before {
  animation: tl-dot-pop 0.35s cubic-bezier(.16,1,.3,1) forwards;
}
.tl-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex; flex-direction: column; gap: 4px;
  position: relative; overflow: hidden;
  transition: border-color .2s;
}
.tl-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; bottom: 0; width: 2px;
  background: linear-gradient(180deg, transparent, rgba(57,255,133,.4), transparent);
  opacity: 0;
  transition: opacity .3s;
}
.tl-card:hover { border-color: rgba(57,255,133,.25); }
.tl-card:hover::before { opacity: 1; }
.tl-period {
  font-size: 9px; color: var(--ac); letter-spacing: 2px; text-transform: uppercase;
}
.tl-name { font-size: 13px; font-weight: 700; margin: 2px 0; }
.tl-role  { font-size: 11px; color: #666; }

@media (prefers-reduced-motion: reduce) {
  .tl-item { opacity: 1; transform: none; transition: none; }
  .tl-item::before { transform: translateX(-50%) scale(1); animation: none; }
  .tl-wrapper::before { transform: scaleY(1); transition: none; }
}
```

- [ ] **Step 2: Verificar que el archivo sigue siendo HTML válido**

Abrir `index.html` en el navegador (o `open index.html`). No debe haber errores de consola ni estilos rotos.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: add timeline CSS for experiencia section"
```

---

### Task 2: Agregar tarjetas de proyecto 005 y 006

**Files:**
- Modify: `index.html` — sección `#proyectos`, después de la tarjeta 004 (línea ~393), antes del cierre `</div></section>`.

- [ ] **Step 1: Agregar `animation-delay` a los nuevos cards via CSS**

En el bloque `<style>`, donde están los delays de `proj-card` (líneas ~163-165), agregar:

```css
.proj-card:nth-child(5){ animation-delay:4.8s }
.proj-card:nth-child(6){ animation-delay:6s }
```

- [ ] **Step 2: Insertar las dos tarjetas nuevas**

En `index.html`, localizar el cierre de la tarjeta 004 (buscar `</div>` después de `Ver sitio ↗`). Insertar después de esa tarjeta, antes del cierre `</div></section>` de la sección proyectos:

```html
    <div class="proj-card">
      <div class="flex items-center justify-between">
        <span class="proj-num">005</span>
        <a href="https://github.com/rrobertf/generador-contrasenas" target="_blank" rel="noopener" class="text-xs tracking-widest uppercase transition-colors hover:text-white" style="color:var(--ac);">GitHub ↗</a>
      </div>
      <h3 class="text-base font-bold">Generador de Contraseñas</h3>
      <p class="text-xs leading-relaxed" style="color:#fff;">Genera contraseñas seguras con opciones de longitud, números y símbolos.</p>
      <div class="flex flex-wrap gap-2 mt-auto">
        <span class="proj-tag">Python</span>
      </div>
    </div>

    <div class="proj-card">
      <div class="flex items-center justify-between">
        <span class="proj-num">006</span>
        <a href="https://github.com/rrobertf/web-scraper" target="_blank" rel="noopener" class="text-xs tracking-widest uppercase transition-colors hover:text-white" style="color:var(--ac);">GitHub ↗</a>
      </div>
      <h3 class="text-base font-bold">Web Scraper de Noticias</h3>
      <p class="text-xs leading-relaxed" style="color:#fff;">Extrae las 20 noticias principales de Hacker News y las guarda en archivo.</p>
      <div class="flex flex-wrap gap-2 mt-auto">
        <span class="proj-tag">Python</span>
        <span class="proj-tag">BeautifulSoup</span>
      </div>
    </div>
```

- [ ] **Step 3: Verificar en el navegador**

Abrir `index.html`. La sección Proyectos debe mostrar 6 tarjetas en grid 2×2 (3 filas en desktop). Los links de 005 y 006 deben apuntar a los URLs correctos.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add projects 005 (password generator) and 006 (news scraper)"
```

---

### Task 3: Agregar sección Experiencia (HTML)

**Files:**
- Modify: `index.html` — insertar nueva `<section>` entre `#proyectos` y `#habilidades`.

- [ ] **Step 1: Insertar la sección completa**

Localizar el comentario `<!-- HABILIDADES -->` en `index.html`. Insertar antes de él:

```html
  <!-- EXPERIENCIA -->
  <section id="experiencia" data-stagger class="relative py-24 px-6 md:px-16 max-w-5xl mx-auto overflow-hidden">
  <div class="cyber-grid cyber-grid--dim"></div>

  <p class="stagger-child eyebrow mb-10">Experiencia</p>
  <div class="stagger-child tl-wrapper">

    <!-- Educación -->
    <div class="tl-group">
      <div class="tl-group-label">Educación</div>
      <div class="tl-item">
        <div class="tl-card">
          <div class="tl-period">2024 – Presente</div>
          <div class="tl-name">Universidad Interamericana de Puerto Rico</div>
          <div class="tl-role">Bachillerato en Computer Science · Recinto de Ponce</div>
        </div>
      </div>
    </div>

    <!-- Experiencia Laboral -->
    <div class="tl-group">
      <div class="tl-group-label">Experiencia Laboral</div>

      <div class="tl-item">
        <div class="tl-card">
          <div class="tl-period">2026 – Presente</div>
          <div class="tl-name">Popeyes</div>
          <div class="tl-role">Trabajo part-time</div>
        </div>
      </div>

      <div class="tl-item">
        <div class="tl-card">
          <div class="tl-period">2024 – 2026</div>
          <div class="tl-name">Econo Supermarket</div>
          <div class="tl-role">Trabajo part-time</div>
        </div>
      </div>

      <div class="tl-item">
        <div class="tl-card">
          <div class="tl-period">2022 – 2024</div>
          <div class="tl-name">New Look Salon</div>
          <div class="tl-role">Trabajo part-time</div>
        </div>
      </div>
    </div>

  </div>
</section>

```

- [ ] **Step 2: Verificar en el navegador**

Abrir `index.html`. Scroll a la sección "Experiencia". Debe aparecer debajo de Proyectos con el eyebrow label verde, y mostrar las 4 entradas. La línea y los puntos aún no animan (eso va en Task 4).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add experiencia section with timeline HTML"
```

---

### Task 4: Agregar JavaScript del timeline y enlace en navbar

**Files:**
- Modify: `index.html` — bloque `<script>` (al final del body) y `<nav>`.

- [ ] **Step 1: Agregar enlace "Experiencia" al navbar**

Localizar el bloque `<div class="hidden md:flex gap-8 ...">` en el navbar. Insertar el enlace entre "Proyectos" y "Habilidades":

```html
      <a href="#experiencia"  class="hover:text-white transition-colors">Experiencia</a>
```

El bloque completo debe quedar:

```html
    <div class="hidden md:flex gap-8 text-xs font-medium tracking-widest uppercase" style="color:#fff;">
      <a href="#sobre-mi"    class="hover:text-white transition-colors">Sobre mí</a>
      <a href="#proyectos"   class="hover:text-white transition-colors">Proyectos</a>
      <a href="#experiencia" class="hover:text-white transition-colors">Experiencia</a>
      <a href="#habilidades" class="hover:text-white transition-colors">Habilidades</a>
      <a href="#contacto"    class="hover:text-white transition-colors">Contacto</a>
    </div>
```

- [ ] **Step 2: Agregar `timelineObserver` en el bloque `<script>`**

Localizar `document.querySelectorAll('[data-stagger]').forEach(...)` al final del script. Insertar después de esa línea:

```js
  // Timeline reveal
  const tlWrapper = document.querySelector('.tl-wrapper');
  if (tlWrapper) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const wrapper = entry.target;
        wrapper.classList.add('tl-line-revealed');
        const items = [...wrapper.querySelectorAll('.tl-item')];
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('revealed'), i * 120);
        });
        timelineObserver.unobserve(wrapper);
      });
    }, { threshold: 0.08 });
    timelineObserver.observe(tlWrapper);
  }
```

- [ ] **Step 3: Verificar animaciones en el navegador**

Abrir `index.html`. Hacer scroll hasta "Experiencia". Debe ocurrir en orden:
1. La línea vertical crece de arriba hacia abajo.
2. Las tarjetas aparecen una a una con fade+translateY.
3. Los puntos neón hacen pop (escala 0→1.3→1).

Verificar también que el link "Experiencia" en el navbar lleva a la sección correcta.

- [ ] **Step 4: Verificar `prefers-reduced-motion`**

En DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Las tarjetas y la línea deben ser visibles sin animación.

- [ ] **Step 5: Commit final**

```bash
git add index.html
git commit -m "feat: add timeline JS reveal and experiencia navbar link"
```
