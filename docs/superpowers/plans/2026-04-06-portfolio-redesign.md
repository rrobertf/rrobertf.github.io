# Portfolio Redesign — Obsidian × Cyber Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la identidad visual del portafolio (dark-violet genérico) por un estilo Obsidian × Cyber con acento verde neón `#39ff85`, tipografía uppercase bold con outline, y animaciones CSS de grid, glow y flicker.

**Architecture:** Todo en un solo archivo `index.html`. Se reemplazan los bloques `<style>`, HTML de cada sección, y el bloque `<script>` inline al final del `<body>`. No se crean archivos nuevos.

**Tech Stack:** HTML5, Tailwind CSS CDN v3, CSS custom en `<style>`, JavaScript vanilla

---

### Task 1: CSS — variables, reset y animaciones globales

**Files:**
- Modify: `index.html` — bloque `<style>` (líneas 11–245)

- [ ] **Step 1: Reemplazar el bloque `<style>` completo**

Eliminar todo el contenido dentro de `<style>…</style>` y reemplazar con:

```css
:root {
  --bg:     #0c0c0c;
  --bg2:    #0f0f0f;
  --ac:     #39ff85;
  --border: #1e1e1e;
  --muted:  #3a3a3a;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
* { scroll-behavior: smooth; }
body {
  background: var(--bg);
  font-family: 'Inter', system-ui, sans-serif;
  color: #fff;
  overflow-x: hidden;
}

/* ── Navbar ── */
#navbar.scrolled {
  background: rgba(12,12,12,0.88);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

/* ── Animaciones globales ── */
@keyframes grid-breathe { 0%{opacity:.3} 100%{opacity:1} }
@keyframes dot-float    { 0%{transform:translate(0,0)} 100%{transform:translate(-20px,20px)} }
@keyframes dot-float-r  { 0%{transform:translate(0,0)} 100%{transform:translate(16px,-16px)} }
@keyframes scan         { 0%,100%{opacity:.2;transform:scaleX(.4)} 50%{opacity:.7;transform:scaleX(1)} }
@keyframes ey-pulse     { 0%{opacity:.5} 100%{opacity:1} }
@keyframes c-tick       { 0%{color:#1e1e1e} 100%{color:#353535} }
@keyframes btn-glow     { 0%,100%{box-shadow:0 0 0 transparent} 50%{box-shadow:0 0 22px rgba(57,255,133,.35)} }
@keyframes ghost-flicker{ 0%,85%,100%{border-color:#252525;color:#444} 90%{border-color:#444;color:#666} }
@keyframes card-flicker { 0%,85%,100%{border-color:var(--border)} 91%{border-color:rgba(57,255,133,.35)} }
@keyframes dot-blink    { 0%,100%{opacity:.3} 50%{opacity:1} }
@keyframes hero-up      { to{opacity:1;transform:translateY(0)} }

/* ── Grid de fondo (reutilizable) ── */
.cyber-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(57,255,133,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57,255,133,.04) 1px, transparent 1px);
  background-size: 36px 36px;
  animation: grid-breathe 7s ease-in-out infinite alternate;
}
.cyber-grid--dim {
  background-image:
    linear-gradient(rgba(57,255,133,.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57,255,133,.02) 1px, transparent 1px);
  background-size: 36px 36px;
}

/* ── Eyebrow label verde ── */
.eyebrow {
  font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
  color: var(--ac); display: flex; align-items: center; gap: 10px;
  animation: ey-pulse 3s ease-in-out infinite alternate;
}
.eyebrow::before { content:''; width:20px; height:1px; background:var(--ac); display:inline-block; }

/* ── Info / contact cards ── */
.info-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 10px; padding: 12px 16px;
  display: flex; align-items: center; gap: 12px;
  animation: card-flicker 7s ease-in-out infinite;
}
.info-card:nth-child(2){ animation-delay:2s }
.info-card:nth-child(3){ animation-delay:4s }
.info-icon {
  width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
  background: rgba(57,255,133,.1);
  border: 1px solid rgba(57,255,133,.25);
  display: flex; align-items: center; justify-content: center;
}

/* ── Project cards ── */
.proj-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 10px; padding: 20px;
  display: flex; flex-direction: column; gap: 12px;
  position: relative; overflow: hidden;
  animation: card-flicker 6s ease-in-out infinite;
}
.proj-card:nth-child(2){ animation-delay:1.2s }
.proj-card:nth-child(3){ animation-delay:2.4s }
.proj-card:nth-child(4){ animation-delay:3.6s }
.proj-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background: linear-gradient(90deg, transparent, rgba(57,255,133,.08), transparent);
}
.proj-num  { font-size: 9px; color: #2a2a2a; letter-spacing: 2px; }
.proj-tag  {
  font-size: 9px; color: var(--ac);
  border: 1px solid rgba(57,255,133,.3);
  background: rgba(57,255,133,.07);
  padding: 2px 8px; border-radius: 3px;
  letter-spacing: 1px; text-transform: uppercase;
}

/* ── Skill badges ── */
.skill-badge {
  padding: 6px 14px; border-radius: 999px;
  font-size: 12px; font-weight: 500;
  background: var(--bg2); color: #fff;
  border: 1px solid var(--border);
  transition: border-color .2s;
}
.skill-badge:hover { border-color: var(--ac); }
.skill-learning { color: var(--ac); border-color: rgba(57,255,133,.35); }

/* ── Stagger reveal ── */
.stagger-child {
  opacity: 0; transform: translateY(20px);
  transition: opacity .55s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1);
}
.stagger-child.revealed { opacity:1; transform:translateY(0); }

/* ── Hero entrance ── */
.hero-item {
  opacity: 0; transform: translateY(16px);
  animation: hero-up .6s cubic-bezier(.16,1,.3,1) forwards;
}
.hero-item:nth-child(2){ animation-delay:.1s }
.hero-item:nth-child(3){ animation-delay:.25s }
.hero-item:nth-child(4){ animation-delay:.4s }

@media (prefers-reduced-motion: reduce) {
  .stagger-child { opacity:1; transform:none; transition:none; }
  .hero-item     { opacity:1; transform:none; animation:none; }
  .cyber-grid, .info-card, .proj-card { animation:none; }
}
```

- [ ] **Step 2: Eliminar el link de Playfair Display de Google Fonts**

Reemplazar la línea del link de Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..800;1,14..32,300..800&display=swap" rel="stylesheet" />
```
No cambia — Inter ya está cargado. Solo eliminar las dos líneas de `preconnect` y el link si apuntan a Playfair. Verificar que solo quede Inter.

- [ ] **Step 3: Verificar en navegador**

Abrir `index.html`. El fondo debe ser `#0c0c0c`. La página se verá rota (estilos viejos en HTML) — es esperado en este paso.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "style: replace CSS variables and animations — Obsidian×Cyber system"
```

---

### Task 2: Aurora background → eliminado / Navbar

**Files:**
- Modify: `index.html` — `<body>` (desde `<div class="aurora">` hasta `</nav>`)

- [ ] **Step 1: Eliminar el bloque aurora**

Eliminar estas líneas del `<body>`:
```html
<!-- AURORA BACKGROUND -->
<div class="aurora" aria-hidden="true">
  <div class="aurora-blob aurora-blob--1"></div>
  <div class="aurora-blob aurora-blob--2"></div>
  <div class="aurora-blob aurora-blob--3"></div>
</div>
```

- [ ] **Step 2: Reemplazar el `<nav>`**

Reemplazar el `<nav id="navbar" …>…</nav>` completo con:

```html
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-16 flex items-center justify-between" aria-label="Main navigation">
  <a href="#hero" class="text-base font-black tracking-tight" style="color:var(--ac);">RF</a>
  <div class="hidden md:flex gap-8 text-xs font-medium tracking-widest uppercase" style="color:var(--muted);">
    <a href="#sobre-mi"   class="hover:text-white transition-colors">Sobre mí</a>
    <a href="#proyectos"  class="hover:text-white transition-colors">Proyectos</a>
    <a href="#habilidades" class="hover:text-white transition-colors">Habilidades</a>
    <a href="#contacto"   class="hover:text-white transition-colors">Contacto</a>
  </div>
</nav>
```

- [ ] **Step 3: Verificar en navegador**

Recargar. La navbar debe mostrar `RF` en verde neón. Links en gris oscuro. Sin aurora.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "style: remove aurora, update navbar to Obsidian×Cyber"
```

---

### Task 3: Hero section

**Files:**
- Modify: `index.html` — `<section id="hero">…</section>`

- [ ] **Step 1: Reemplazar la sección hero completa**

```html
<section id="hero" class="relative min-h-screen flex flex-col justify-between overflow-hidden px-6 md:px-16 pt-32 pb-16">

  <!-- grid animado -->
  <div class="cyber-grid"></div>

  <!-- glow dots flotantes -->
  <div class="absolute pointer-events-none" style="width:320px;height:320px;top:-80px;right:-60px;background:radial-gradient(circle,rgba(57,255,133,.1) 0%,transparent 70%);animation:dot-float 6s ease-in-out infinite alternate;"></div>
  <div class="absolute pointer-events-none" style="width:180px;height:180px;bottom:-40px;left:10%;background:radial-gradient(circle,rgba(57,255,133,.06) 0%,transparent 70%);animation:dot-float-r 9s ease-in-out infinite alternate;"></div>

  <!-- scan line -->
  <div class="absolute top-0 left-0 right-0 pointer-events-none" style="height:2px;background:linear-gradient(90deg,transparent,var(--ac) 40%,transparent);animation:scan 5s ease-in-out infinite;opacity:.6;"></div>

  <!-- contador -->
  <div class="absolute top-20 right-6 md:right-16 text-xs tracking-widest pointer-events-none" style="color:#2a2a2a;animation:c-tick 3s ease-in-out infinite alternate;font-variant-numeric:tabular-nums;">001 / PORTFOLIO</div>

  <!-- contenido -->
  <div class="relative flex flex-col justify-between flex-1 gap-12 max-w-5xl mx-auto w-full">

    <!-- top: eyebrow + nombre -->
    <div>
      <p class="hero-item eyebrow mb-6">Bienvenido a mi portafolio</p>
      <h1 class="hero-item font-black uppercase leading-none" style="font-size:clamp(48px,9vw,88px);letter-spacing:-3px;">
        Roberto<br/>
        <span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.2);">Feliciano</span>
      </h1>
    </div>

    <!-- bottom: rol + botones -->
    <div class="hero-item flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t pt-8" style="border-color:var(--border);">
      <p class="text-xs tracking-widest uppercase leading-loose" style="color:var(--muted);">
        CS Student · UIPR Ponce<br/>
        Full-Stack Developer<br/>
        Cybersecurity &amp; IA
      </p>
      <div class="flex gap-3">
        <a href="#contacto" class="text-xs font-semibold tracking-widest uppercase px-5 py-3 rounded-md transition-colors" style="border:1px solid #252525;color:#444;animation:ghost-flicker 6s ease-in-out infinite;">
          Contacto
        </a>
        <a href="#proyectos" class="text-xs font-black tracking-widest uppercase px-5 py-3 rounded-md" style="background:var(--ac);color:#000;animation:btn-glow 4s ease-in-out infinite;">
          Ver proyectos
        </a>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Verificar en navegador**

Recargar. El hero debe mostrar: grid verde de fondo, nombre gigante con segunda línea en outline, botón verde con glow pulse, scan line en la parte superior.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: hero — big name, cyber grid, scan line, glow dots"
```

---

### Task 4: Sección Sobre mí

**Files:**
- Modify: `index.html` — `<section id="sobre-mi">…</section>`

- [ ] **Step 1: Reemplazar la sección completa**

```html
<section id="sobre-mi" data-stagger class="relative py-24 px-6 md:px-16 max-w-5xl mx-auto overflow-hidden">
  <div class="cyber-grid cyber-grid--dim"></div>

  <p class="stagger-child eyebrow mb-10">Sobre mí</p>
  <div class="stagger-child grid md:grid-cols-2 gap-12 items-center">

      <p class="text-sm leading-relaxed" style="color:var(--muted);line-height:1.9;">
        Estudiante de Computer Science de 21 años en la Universidad Interamericana de Puerto Rico, Recinto de Ponce.
        Me apasiona el desarrollo Full-Stack y tengo interés a largo plazo en Cybersecurity e IA.
        Aprendo rápido, busco soluciones por mi cuenta y trabajo part-time mientras estudio.
      </p>

      <div class="flex flex-col gap-3">

        <div class="info-card">
          <div class="info-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#39ff85" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5"/></svg>
          </div>
          <div>
            <p class="text-sm font-semibold">UIPR Ponce</p>
            <p class="text-xs mt-0.5" style="color:var(--muted);">Computer Science</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#39ff85" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          </div>
          <div>
            <p class="text-sm font-semibold">Full-Stack Development</p>
            <p class="text-xs mt-0.5" style="color:var(--muted);">Pasión principal</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#39ff85" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <p class="text-sm font-semibold">Cybersecurity &amp; IA</p>
            <p class="text-xs mt-0.5" style="color:var(--muted);">Interés a largo plazo</p>
          </div>
        </div>

      </div>
    </div>
</section>
```

- [ ] **Step 2: Verificar en navegador**

Scroll a la sección. Las 3 info-cards deben aparecer con icons SVG verdes, border flicker escalonado, y grid tenue de fondo.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: sobre mí — SVG icons, info-cards con flicker"
```

---

### Task 5: Sección Proyectos

**Files:**
- Modify: `index.html` — `<section id="proyectos">…</section>`

- [ ] **Step 1: Reemplazar la sección completa**

```html
<section id="proyectos" data-stagger class="relative py-24 px-6 md:px-16 max-w-5xl mx-auto overflow-hidden">
  <div class="cyber-grid cyber-grid--dim"></div>

  <p class="stagger-child eyebrow mb-10">Proyectos</p>
  <div class="stagger-child grid md:grid-cols-2 gap-4">

      <div class="proj-card">
        <div class="flex items-center justify-between">
          <span class="proj-num">001</span>
          <a href="https://github.com/rrobertf/todo-api" target="_blank" rel="noopener" class="text-xs tracking-widest uppercase transition-colors hover:text-white" style="color:var(--ac);">GitHub ↗</a>
        </div>
        <h3 class="text-base font-bold">Todo App</h3>
        <p class="text-xs leading-relaxed" style="color:var(--muted);">API REST con frontend completo. Permite crear, editar y eliminar tareas con persistencia en base de datos.</p>
        <div class="flex flex-wrap gap-2 mt-auto">
          <span class="proj-tag">Node.js</span>
          <span class="proj-tag">Express</span>
          <span class="proj-tag">SQLite</span>
          <span class="proj-tag">REST API</span>
        </div>
      </div>

      <div class="proj-card">
        <div class="flex items-center justify-between">
          <span class="proj-num">002</span>
          <a href="https://github.com/rrobertf/organizador" target="_blank" rel="noopener" class="text-xs tracking-widest uppercase transition-colors hover:text-white" style="color:var(--ac);">GitHub ↗</a>
        </div>
        <h3 class="text-base font-bold">Organizador de Archivos</h3>
        <p class="text-xs leading-relaxed" style="color:var(--muted);">Script de automatización que organiza archivos en carpetas por tipo, fecha o extensión.</p>
        <div class="flex flex-wrap gap-2 mt-auto">
          <span class="proj-tag">Bash</span>
          <span class="proj-tag">Shell Script</span>
          <span class="proj-tag">Terminal</span>
        </div>
      </div>

      <div class="proj-card">
        <div class="flex items-center justify-between">
          <span class="proj-num">003</span>
          <span class="text-xs tracking-widest uppercase" style="color:var(--muted);">Privado</span>
        </div>
        <h3 class="text-base font-bold">Calculadora en C++</h3>
        <p class="text-xs leading-relaxed" style="color:var(--muted);">Aplicación de consola con operaciones aritméticas básicas y manejo de errores de entrada.</p>
        <div class="flex flex-wrap gap-2 mt-auto">
          <span class="proj-tag">C++</span>
          <span class="proj-tag">OOP</span>
        </div>
      </div>

      <div class="proj-card">
        <div class="flex items-center justify-between">
          <span class="proj-num">004</span>
          <span class="text-xs tracking-widest uppercase font-semibold" style="color:#f59e0b;">En progreso</span>
        </div>
        <h3 class="text-base font-bold">Sitio Web Personal</h3>
        <p class="text-xs leading-relaxed" style="color:var(--muted);">Portafolio personal para mostrar proyectos, habilidades y experiencia como desarrollador.</p>
        <div class="flex flex-wrap gap-2 mt-auto">
          <span class="proj-tag">HTML</span>
          <span class="proj-tag">CSS</span>
          <span class="proj-tag">JavaScript</span>
          <span class="proj-tag">Tailwind</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Verificar en navegador**

Scroll a proyectos. Cards con numeración `001–004`, tags verdes, border flicker escalonado.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: proyectos — numbered cards, green tags, flicker animation"
```

---

### Task 6: Sección Habilidades

**Files:**
- Modify: `index.html` — `<section id="habilidades">…</section>`

- [ ] **Step 1: Reemplazar la sección completa**

```html
<section id="habilidades" data-stagger class="relative py-24 px-6 md:px-16 max-w-5xl mx-auto overflow-hidden">
  <div class="cyber-grid cyber-grid--dim"></div>

  <p class="stagger-child eyebrow mb-10">Habilidades</p>
  <div class="stagger-child grid md:grid-cols-3 gap-8">

      <div>
        <h3 class="text-xs font-semibold tracking-widest uppercase mb-4" style="color:var(--muted);">Lenguajes</h3>
        <div class="flex flex-wrap gap-2">
          <span class="skill-badge">C++</span>
          <span class="skill-badge">HTML</span>
          <span class="skill-badge">CSS</span>
          <span class="skill-badge skill-learning">JavaScript ✦</span>
          <span class="skill-badge skill-learning">Node.js ✦</span>
        </div>
      </div>

      <div>
        <h3 class="text-xs font-semibold tracking-widest uppercase mb-4" style="color:var(--muted);">Herramientas</h3>
        <div class="flex flex-wrap gap-2">
          <span class="skill-badge skill-learning">Git / GitHub ✦</span>
          <span class="skill-badge">Terminal / Bash</span>
          <span class="skill-badge">VS Code</span>
        </div>
      </div>

      <div>
        <h3 class="text-xs font-semibold tracking-widest uppercase mb-4" style="color:var(--muted);">Bases de datos / APIs</h3>
        <div class="flex flex-wrap gap-2">
          <span class="skill-badge">SQLite</span>
          <span class="skill-badge skill-learning">REST APIs ✦</span>
        </div>
      </div>

    </div>
    <p class="stagger-child mt-8 text-xs" style="color:var(--muted);">
      <span style="color:var(--ac);">✦</span> En aprendizaje activo
    </p>
  </div>
</section>
```

- [ ] **Step 2: Verificar en navegador**

Badges blancos con borde oscuro, badges `skill-learning` en verde. Hover añade borde verde.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: habilidades — skill badges verde neón"
```

---

### Task 7: Sección Contacto

**Files:**
- Modify: `index.html` — `<section id="contacto">…</section>`

- [ ] **Step 1: Reemplazar la sección completa**

```html
<section id="contacto" data-stagger class="relative py-24 px-6 md:px-16 max-w-5xl mx-auto overflow-hidden">
  <div class="cyber-grid cyber-grid--dim"></div>

  <p class="stagger-child eyebrow mb-4">Contacto</p>
  <p class="stagger-child text-sm mb-10" style="color:var(--muted);max-width:420px;line-height:1.8;">
    Abierto a oportunidades, colaboraciones y proyectos. Escríbeme directamente.
  </p>

  <div class="stagger-child flex flex-col sm:flex-row gap-4">

      <!-- Email -->
      <div class="info-card flex-1">
        <div class="info-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#39ff85" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs tracking-widest uppercase mb-1" style="color:var(--muted);">Email</p>
          <p class="text-sm font-semibold truncate">robertofeliciano2130@gmail.com</p>
        </div>
        <button id="copy-btn" onclick="copyEmail()"
          class="text-xs tracking-widest uppercase px-3 py-1.5 rounded flex-shrink-0 transition-colors"
          style="color:var(--ac);border:1px solid rgba(57,255,133,.3);background:rgba(57,255,133,.07);">
          Copiar
        </button>
      </div>

      <!-- GitHub -->
      <a href="https://github.com/rrobertf" target="_blank" rel="noopener" class="info-card flex-1 hover:border-green-500 transition-colors no-underline">
        <div class="info-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#39ff85"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
        </div>
        <div class="flex-1">
          <p class="text-xs tracking-widest uppercase mb-1" style="color:var(--muted);">GitHub</p>
          <p class="text-sm font-semibold">github.com/rrobertf</p>
        </div>
        <span class="text-xs flex-shrink-0" style="color:var(--ac);">↗</span>
      </a>

  </div>

</section>
```

- [ ] **Step 2: Verificar en navegador**

Scroll a contacto. Dos cards lado a lado, botón "Copiar" funcional (JS aún no actualizado — se ve pero no funciona todavía, ok).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: contacto — email card + GitHub card con SVG icons"
```

---

### Task 8: Footer

**Files:**
- Modify: `index.html` — `<footer>…</footer>`

- [ ] **Step 1: Reemplazar el footer**

```html
<footer class="py-8 px-6 md:px-16 flex items-center justify-between text-xs tracking-widest" style="border-top:1px solid var(--border);color:#2a2a2a;">
  <span>Roberto Feliciano · 2026</span>
  <span style="width:6px;height:6px;border-radius:50%;background:var(--ac);display:inline-block;animation:dot-blink 2s ease-in-out infinite;"></span>
</footer>
```

- [ ] **Step 2: Verificar en navegador**

Footer con texto gris oscuro y punto verde parpadeando a la derecha.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: footer — minimal con dot blink verde"
```

---

### Task 9: JavaScript — actualizar copyEmail y limpiar typing effect

**Files:**
- Modify: `index.html` — bloque `<script>` al final del `<body>`

- [ ] **Step 1: Reemplazar el bloque `<script>` completo**

```html
<script>
  // Navbar scroll
  const navbar = document.getElementById('navbar');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });

  // Copy email
  function copyEmail() {
    navigator.clipboard.writeText('robertofeliciano2130@gmail.com').then(() => {
      const btn = document.getElementById('copy-btn');
      btn.textContent = '¡Copiado!';
      btn.style.color = '#39ff85';
      btn.style.borderColor = 'rgba(57,255,133,.6)';
      setTimeout(() => {
        btn.textContent = 'Copiar';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  }

  // Stagger scroll reveal
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const children = [...entry.target.children].filter(el => el.classList.contains('stagger-child'));
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('revealed'), i * 120);
      });
      staggerObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('[data-stagger]').forEach(el => staggerObserver.observe(el));
</script>
```

- [ ] **Step 2: Verificar copyEmail en navegador**

Abrir DevTools → Console. Hacer clic en "Copiar". Debe cambiar a "¡Copiado!" en verde y volver a "Copiar" en 2 segundos. Sin errores en consola.

- [ ] **Step 3: Verificar stagger reveal**

Hacer scroll por todas las secciones. Cada sección debe aparecer con fade suave desde abajo.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "style: update JS — new email, remove typing effect, clean script"
```

---

### Task 10: Polish y verificación final

**Files:**
- Modify: `index.html` (ajustes menores si aplica)

- [ ] **Step 1: Verificar en móvil (390px)**

DevTools → Toggle device → iPhone 14 Pro (390px). Verificar:
- Hero: nombre grande no se desborda
- Grid 2 columnas de proyectos colapsa a 1 columna
- Contacto cards se apilan verticalmente
- Navbar no se desborda

- [ ] **Step 2: Verificar animaciones**

Recargar la página en desktop. Confirmar que se ven:
- Grid verde respirando en hero
- Glow dot flotando en hero
- Scan line en el top del hero
- Glow pulse en el botón "Ver proyectos"
- Border flicker en info-cards (esperar ~6s)
- Border flicker en proj-cards (esperar ~6s)
- Dot blink en footer

- [ ] **Step 3: Verificar consola limpia**

DevTools → Console. No debe haber errores en rojo.

- [ ] **Step 4: Verificar todos los links**

- `Ver proyectos` → scrollea a `#proyectos`
- `Contacto` → scrollea a `#contacto`
- GitHub Todo App → `github.com/rrobertf/todo-api`
- GitHub Organizador → `github.com/rrobertf/organizador`
- GitHub en contacto → `github.com/rrobertf`
- Botón copiar → copia `robertofeliciano2130@gmail.com`

- [ ] **Step 5: Commit final**

```bash
git add index.html
git commit -m "chore: polish y verificación final del rediseño Obsidian×Cyber"
```
