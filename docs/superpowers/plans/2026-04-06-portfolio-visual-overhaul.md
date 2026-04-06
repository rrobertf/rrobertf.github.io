# Portfolio Visual Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visually overhaul `index.html` with Inter typography, animated aurora background, stagger reveal animations, gradient border cards, shimmer buttons, and improved navbar — no new content sections.

**Architecture:** Single `index.html` file. All changes are CSS (in `<style>`) and JS (in `<script>`). No build tools, no new dependencies beyond Google Fonts. Aurora background uses fixed-position pseudo-layers. Stagger reveal uses `IntersectionObserver` with `data-stagger` containers.

**Tech Stack:** HTML, CSS (custom properties, keyframe animations, conic-gradient), vanilla JS (IntersectionObserver), Google Fonts (Inter)

---

### Task 1: Replace typography — Inter replaces Playfair Display

**Files:**
- Modify: `index.html` — `<head>` Google Fonts link + `<style>` font rules

- [ ] **Step 1: Replace the Google Fonts import**

In `index.html` line 10, replace:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
```
With:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..800;1,14..32,300..800&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Update CSS custom properties and body font**

Replace the entire `<style>` block's `:root` and `body` + `h1,h2,h3` rules with:
```css
:root {
  --bg: #0a0a18;
  --bg-card: #111127;
  --accent: #7c6fcd;
  --accent-light: #a78bfa;
  --border: #1e1e3a;
  --text-muted: #94a3b8;
  --font: 'Inter', system-ui, sans-serif;
}
* { scroll-behavior: smooth; box-sizing: border-box; }
body {
  background-color: var(--bg);
  font-family: var(--font);
  font-feature-settings: "cv11", "ss01";
  color: #fff;
  overflow-x: hidden;
}
h1, h2, h3 { font-family: var(--font); }
```

- [ ] **Step 3: Update hero h1 typography scale**

In the hero `<h1>` tag (line 99), replace the Tailwind classes `text-5xl md:text-7xl font-black leading-tight` with:
```html
<h1 style="font-size:clamp(48px,8vw,80px);font-weight:800;letter-spacing:-2px;line-height:1.05;" class="mb-4">
```

- [ ] **Step 4: Update section h2 typography**

For each `<h2>` in the 4 sections (sobre-mi, proyectos, habilidades, contacto), replace `text-4xl font-bold` with inline style:
```html
<h2 style="font-size:clamp(32px,5vw,48px);font-weight:700;letter-spacing:-1px;" class="mb-10">
```

- [ ] **Step 5: Verify in browser**

Open `index.html` in browser. Confirm:
- No serif font anywhere (headings should be clean sans-serif)
- Hero name is large and tight
- Section titles use Inter

- [ ] **Step 6: Commit**
```bash
git add index.html
git commit -m "style: replace Playfair Display with Inter, update type scale"
```

---

### Task 2: Aurora background system

**Files:**
- Modify: `index.html` — add aurora HTML after `<body>`, add CSS keyframes + aurora styles

- [ ] **Step 1: Add aurora HTML wrapper immediately after `<body>` tag**

After the opening `<body>` tag (line 82), insert:
```html
<!-- AURORA BACKGROUND -->
<div class="aurora" aria-hidden="true">
  <div class="aurora-blob aurora-blob--1"></div>
  <div class="aurora-blob aurora-blob--2"></div>
  <div class="aurora-blob aurora-blob--3"></div>
</div>
```

- [ ] **Step 2: Add aurora CSS to the `<style>` block**

Add after the existing `.skill-learning` rule:
```css
/* Aurora background */
.aurora {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.aurora::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.032;
  mix-blend-mode: screen;
}
.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}
.aurora-blob--1 {
  width: 700px; height: 700px;
  top: -200px; left: -150px;
  background: radial-gradient(circle, rgba(124,111,205,0.22) 0%, transparent 70%);
  animation: aurora-float-a 9s ease-in-out infinite;
}
.aurora-blob--2 {
  width: 600px; height: 600px;
  bottom: -150px; right: -100px;
  background: radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 70%);
  animation: aurora-float-b 13s ease-in-out infinite;
}
.aurora-blob--3 {
  width: 500px; height: 500px;
  bottom: 20%; left: 35%;
  background: radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%);
  animation: aurora-float-c 11s ease-in-out infinite;
}
@keyframes aurora-float-a {
  0%, 100% { transform: translate(0, 0); }
  33%       { transform: translate(30px, -20px); }
  66%       { transform: translate(-15px, 25px); }
}
@keyframes aurora-float-b {
  0%, 100% { transform: translate(0, 0); }
  40%       { transform: translate(-25px, -30px); }
  70%       { transform: translate(20px, 15px); }
}
@keyframes aurora-float-c {
  0%, 100% { transform: translate(0, 0); }
  50%       { transform: translate(20px, -25px); }
}
```

- [ ] **Step 3: Ensure all page sections sit above aurora**

Add `position: relative; z-index: 1;` to the `<nav>` and each `<section>` and `<footer>` via a CSS rule:
```css
nav, section, footer {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 4: Verify in browser**

Open `index.html`. The background should show 3 soft animated blobs — violet top-left, blue bottom-right, purple center. They should move slowly and never look synchronized. Content should sit cleanly on top.

- [ ] **Step 5: Commit**
```bash
git add index.html
git commit -m "style: add animated aurora background with noise texture overlay"
```

---

### Task 3: Hero stagger entrance animation

**Files:**
- Modify: `index.html` — hero section markup + CSS + JS

- [ ] **Step 1: Add `hero-item` class to each hero child element**

In the hero `<section>` (lines 96–113), add class `hero-item` to the label `<p>`, the `<h1>`, the typing `<p>`, and the buttons `<div>`:
```html
<section id="hero" class="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
  <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,111,205,0.15) 0%, transparent 70%);"></div>
  <p class="hero-item text-sm font-medium tracking-widest mb-4" style="color:var(--accent-light);">Bienvenido a mi portafolio</p>
  <h1 class="hero-item mb-4" style="font-size:clamp(48px,8vw,80px);font-weight:800;letter-spacing:-2px;line-height:1.05;">Roberto<br/>Feliciano Santiago</h1>
  <p class="hero-item text-xl md:text-2xl mb-10" style="color:var(--text-muted);">
    <span id="typing"></span><span class="cursor" style="color:var(--accent-light);">|</span>
  </p>
  <div class="hero-item flex gap-4 flex-wrap justify-center">
    <a href="#proyectos" class="btn-primary px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
       style="background:linear-gradient(135deg,var(--accent),var(--accent-light));color:#fff;">
      Ver Proyectos
    </a>
    <a href="#contacto" class="px-6 py-3 rounded-full font-semibold text-sm border transition-all hover:scale-105"
       style="border-color:var(--accent);color:var(--accent-light);">
      Contacto
    </a>
  </div>
</section>
```

- [ ] **Step 2: Add hero stagger CSS**

Add to `<style>`:
```css
/* Hero stagger entrance */
.hero-item {
  opacity: 0;
  transform: translateY(18px);
  animation: hero-fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.hero-item:nth-child(2) { animation-delay: 0.1s; }
.hero-item:nth-child(3) { animation-delay: 0.25s; }
.hero-item:nth-child(4) { animation-delay: 0.4s; }
.hero-item:nth-child(5) { animation-delay: 0.58s; }
@keyframes hero-fade-up {
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 3: Delay the typing effect script start**

In the `<script>` block, find the `type()` call at the bottom and wrap it:
```js
// Delay typing start until hero item 4 animation completes
setTimeout(type, 550);
```

- [ ] **Step 4: Verify in browser**

Reload the page. The hero label, name, typing line, and buttons should each fade up one after another over ~0.7s total. The typing cursor should not start blinking until the text line has appeared.

- [ ] **Step 5: Commit**
```bash
git add index.html
git commit -m "style: add stagger entrance animation to hero section"
```

---

### Task 4: Scroll reveal stagger system

**Files:**
- Modify: `index.html` — section markup, CSS, and JS IntersectionObserver

- [ ] **Step 1: Replace `fade-section` with `data-stagger` on all sections**

Remove `class="fade-section"` from the 4 content sections and add `data-stagger` attribute instead:
```html
<section id="sobre-mi" data-stagger class="py-24 px-6 md:px-16 max-w-5xl mx-auto">
<section id="proyectos" data-stagger class="py-24 px-6 md:px-16 max-w-5xl mx-auto">
<section id="habilidades" data-stagger class="py-24 px-6 md:px-16 max-w-5xl mx-auto">
<section id="contacto" data-stagger class="py-24 px-6 md:px-16 max-w-3xl mx-auto text-center">
```

- [ ] **Step 2: Add `stagger-child` to direct children in each section**

For the `sobre-mi` section, its direct children are the label `<p>`, the `<h2>`, and the grid `<div>`. For `proyectos`: label, h2, grid. For `habilidades`: label, h2, grid, legend p. For `contacto`: label, h2, p, div. Add `class="stagger-child"` to each of these direct children elements.

Example for `sobre-mi`:
```html
<section id="sobre-mi" data-stagger class="py-24 px-6 md:px-16 max-w-5xl mx-auto">
  <p class="stagger-child text-sm font-medium tracking-widest mb-2" style="color:var(--accent-light);">// sobre mí</p>
  <h2 class="stagger-child mb-10" style="font-size:clamp(32px,5vw,48px);font-weight:700;letter-spacing:-1px;">¿Quién soy?</h2>
  <div class="stagger-child grid md:grid-cols-2 gap-12 items-center">
    ...
  </div>
</section>
```

Apply the same pattern to proyectos, habilidades, and contacto sections.

- [ ] **Step 3: Add stagger CSS**

Remove the old `.fade-section` and `.fade-section.visible` rules. Add:
```css
/* Scroll stagger reveal */
.stagger-child {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.stagger-child.revealed {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .stagger-child { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 4: Replace the IntersectionObserver in `<script>`**

Remove the existing observer block and replace with:
```js
// Stagger scroll reveal
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const children = entry.target.querySelectorAll('.stagger-child');
    children.forEach((child, i) => {
      setTimeout(() => child.classList.add('revealed'), i * 120);
    });
    staggerObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

document.querySelectorAll('[data-stagger]').forEach(el => staggerObserver.observe(el));
```

- [ ] **Step 5: Verify in browser**

Scroll down slowly. Each section's children (label, title, content) should appear one by one with a ~120ms gap between them, sliding up from slightly below. Should not re-animate on scroll back up.

- [ ] **Step 6: Commit**
```bash
git add index.html
git commit -m "style: replace fade-section with stagger reveal IntersectionObserver system"
```

---

### Task 5: Project cards — animated gradient border + icons

**Files:**
- Modify: `index.html` — project card markup + CSS

- [ ] **Step 1: Update project card CSS**

Remove the existing `.project-card` and `.project-card:hover` rules. Replace with:
```css
/* Project cards */
.project-card {
  position: relative;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  z-index: 0;
  overflow: hidden;
}
.project-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 17px;
  background: conic-gradient(
    from var(--angle, 0deg),
    transparent 60%,
    rgba(124, 111, 205, 0.85) 75%,
    rgba(167, 139, 250, 0.6) 85%,
    transparent 95%
  );
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
  animation: card-spin 3s linear infinite paused;
}
.project-card:hover::before {
  opacity: 1;
  animation-play-state: running;
}
.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(124, 111, 205, 0.2);
}
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes card-spin {
  to { --angle: 360deg; }
}
.project-card-inner {
  position: relative;
  background: var(--bg-card);
  border-radius: 15px;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

- [ ] **Step 2: Wrap card content in `.project-card-inner`**

Each project card `<div class="project-card ...">` currently has `p-6` padding and direct content. Restructure each card to use the inner wrapper. For example, the Todo App card becomes:

```html
<div class="project-card stagger-child flex flex-col">
  <div class="project-card-inner">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-xl">📦</span>
        <h3 class="text-xl font-bold">Todo App</h3>
      </div>
      <a href="https://github.com/rrobertf/todo-api" target="_blank" rel="noopener"
         class="text-sm px-3 py-1 rounded-full transition-colors hover:text-white"
         style="color:var(--accent-light);border:1px solid var(--accent);">
        GitHub ↗
      </a>
    </div>
    <p style="color:var(--text-muted);">API REST con frontend completo. Permite crear, editar y eliminar tareas con persistencia en base de datos.</p>
    <div class="flex flex-wrap gap-2 mt-auto">
      <span class="tech-badge">Node.js</span>
      <span class="tech-badge">Express</span>
      <span class="tech-badge">SQLite</span>
      <span class="tech-badge">REST API</span>
    </div>
  </div>
</div>
```

Apply the same restructure to the other 3 cards with these icons:
- Organizador de Archivos: `⚙️`
- Calculadora en C++: `🧮`
- Sitio Web Personal: `🌐`

Also add `stagger-child` class to each card div so it participates in the scroll stagger from Task 4.

- [ ] **Step 3: Update tech-badge hover**

Add to the existing `.tech-badge` rule:
```css
.tech-badge {
  /* existing rules... */
  transition: box-shadow 0.2s ease;
}
.tech-badge:hover {
  box-shadow: 0 0 10px rgba(124, 111, 205, 0.45);
}
```

- [ ] **Step 4: Verify in browser**

Hover over a project card. The border should light up with a spinning gradient highlight going around the card edges. The card should lift slightly. Tech badges should glow on hover.

Note: `@property` is supported in all modern browsers. If testing in an older browser, the card will still lift and shadow — just without the spinning gradient.

- [ ] **Step 5: Commit**
```bash
git add index.html
git commit -m "style: animated conic-gradient border on project cards, add icons"
```

---

### Task 6: Hero CTA button — shimmer effect

**Files:**
- Modify: `index.html` — CSS for `.btn-primary`

- [ ] **Step 1: Add shimmer CSS for `.btn-primary`**

Add to `<style>`:
```css
/* Button shimmer */
.btn-primary {
  position: relative;
  overflow: hidden;
}
.btn-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(255, 255, 255, 0.18) 50%,
    transparent 70%
  );
  animation: shimmer-pass 4.5s ease-in-out infinite;
  animation-delay: 1.2s;
}
@keyframes shimmer-pass {
  0%   { left: -75%; opacity: 0; }
  10%  { opacity: 1; }
  50%  { left: 125%; opacity: 1; }
  51%  { opacity: 0; }
  100% { left: 125%; opacity: 0; }
}
```

- [ ] **Step 2: Verify in browser**

The "Ver Proyectos" button should have a light shimmer that sweeps across it every ~4.5 seconds automatically, without hover interaction.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "style: add periodic shimmer animation to primary hero CTA button"
```

---

### Task 7: Navbar — gradient logo, animated underline, mobile menu

**Files:**
- Modify: `index.html` — navbar markup + CSS + JS

- [ ] **Step 1: Update navbar logo to gradient**

Replace the logo `<a>` tag (line 86):
```html
<a href="#hero" class="text-xl font-bold navbar-logo">RF</a>
```

Add CSS:
```css
.navbar-logo {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -1px;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 2: Add animated underline to nav links**

Replace the nav links container:
```html
<div class="hidden md:flex gap-8 text-sm font-medium" style="color:var(--text-muted);">
  <a href="#sobre-mi" class="nav-link">Sobre mí</a>
  <a href="#proyectos" class="nav-link">Proyectos</a>
  <a href="#habilidades" class="nav-link">Habilidades</a>
  <a href="#contacto" class="nav-link">Contacto</a>
</div>
```

Add CSS:
```css
.nav-link {
  position: relative;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
  padding-bottom: 2px;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 1.5px;
  background: var(--accent-light);
  border-radius: 2px;
  transition: width 0.25s ease;
}
.nav-link:hover {
  color: #fff;
}
.nav-link:hover::after {
  width: 100%;
}
```

- [ ] **Step 3: Add mobile hamburger button and dropdown**

Inside the `<nav>`, after the desktop link `<div>`, add:
```html
<button id="mobile-menu-btn" class="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu" aria-expanded="false">
  <span class="menu-bar w-5 h-px bg-white block transition-all duration-300"></span>
  <span class="menu-bar w-5 h-px bg-white block transition-all duration-300"></span>
  <span class="menu-bar w-5 h-px bg-white block transition-all duration-300"></span>
</button>

<div id="mobile-menu" class="mobile-menu-dropdown" aria-hidden="true">
  <a href="#sobre-mi" class="mobile-nav-link" onclick="closeMobileMenu()">Sobre mí</a>
  <a href="#proyectos" class="mobile-nav-link" onclick="closeMobileMenu()">Proyectos</a>
  <a href="#habilidades" class="mobile-nav-link" onclick="closeMobileMenu()">Habilidades</a>
  <a href="#contacto" class="mobile-nav-link" onclick="closeMobileMenu()">Contacto</a>
</div>
```

Add CSS:
```css
.mobile-menu-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0; right: 0;
  background: rgba(10, 10, 24, 0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  flex-direction: column;
  padding: 16px 24px;
  gap: 4px;
}
.mobile-menu-dropdown.open {
  display: flex;
}
.mobile-nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  transition: color 0.2s;
}
.mobile-nav-link:last-child { border-bottom: none; }
.mobile-nav-link:hover { color: #fff; }
```

Add JS in the `<script>` block:
```js
// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}
```

- [ ] **Step 4: Verify in browser**

- Desktop: logo should show gradient. Hovering nav links shows an underline growing from center outward.
- Mobile (resize browser to < 768px): hamburger icon appears, clicking it shows the dropdown nav, clicking a link closes it.

- [ ] **Step 5: Commit**
```bash
git add index.html
git commit -m "style: gradient logo, animated nav underlines, mobile hamburger menu"
```

---

### Task 8: Footer gradient separator

**Files:**
- Modify: `index.html` — footer markup

- [ ] **Step 1: Replace footer border with gradient line**

Replace the `<footer>` tag's `border-top` style. Change from:
```html
<footer class="py-8 text-center text-sm" style="color:var(--text-muted);border-top:1px solid var(--border);">
```
To:
```html
<footer class="py-8 text-center text-sm" style="color:var(--text-muted);">
```

And add a gradient line element as the first child inside the footer:
```html
<footer class="py-8 text-center text-sm" style="color:var(--text-muted);">
  <div style="height:1px;background:linear-gradient(to right,transparent,var(--accent),transparent);margin-bottom:24px;"></div>
  Hecho por <span style="color:var(--accent-light);">Roberto Feliciano</span> · 2026
</footer>
```

- [ ] **Step 2: Verify in browser**

The footer separator should be a fading gradient line — transparent on both ends, accent violet in the center.

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "style: gradient separator line in footer"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Typography — Inter, scale, `font-feature-settings` — Task 1
- ✅ Aurora background — 3 blobs, noise, fixed position — Task 2
- ✅ Hero stagger entrance — Task 3
- ✅ Scroll reveal stagger — Task 4
- ✅ Project cards gradient border + icons — Task 5
- ✅ Button shimmer — Task 6
- ✅ Navbar gradient logo + underline + mobile menu — Task 7
- ✅ Footer gradient separator — Task 8

**Placeholder scan:** No TBDs. All code blocks are complete and runnable.

**Type consistency:** `.stagger-child` added in Task 4 CSS and referenced in Task 5 card markup. `.btn-primary` class added in Task 3 hero markup and used in Task 6 CSS. `.project-card-inner` defined in Task 5 CSS and used in Task 5 markup. All consistent.
