// ────────────────────────────────────────────────────────────────
// Roberto Feliciano · Portfolio v2 · Motion Engine
// ────────────────────────────────────────────────────────────────

const lerp = (a, b, n) => a + (b - a) * n;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarse = window.matchMedia('(pointer: coarse)').matches;

// ── Projects data ──────────────────────────────────────────────
const PROJECTS = [
  { id: 'todo', num: '01', year: '2025', title: 'Todo App · REST API', kind: 'Full-Stack',
    stack: ['Node.js', 'Express', 'SQLite', 'JavaScript'],
    desc: 'Full-stack CRUD app — Express API, SQLite database, vanilla JS client. Built to understand the complete data cycle from scratch.',
    bg: 1, url: 'https://github.com/rrobertf/todo-api',
    long: 'My first real full-stack project. I built the Express API, wired up a SQLite database without an ORM, and wrote the vanilla JS client that consumes it. The goal was to trace every piece of data from a form input to the database and back — no shortcuts.',
    bullets: ['Complete CRUD with Express REST routes', 'SQLite persistence without an ORM', 'Vanilla JS client consuming its own API', 'Server-side validation with real-time UI feedback'] },
  { id: 'org', num: '02', year: '2024', title: 'File Organizer · Bash CLI', kind: 'Automation',
    stack: ['Bash', 'CLI', 'Linux'],
    desc: 'Bash CLI that sorts a cluttered Downloads folder by type, date, or extension. My first tool added to PATH — still runs daily.',
    bg: 2, url: 'https://github.com/rrobertf/organizador',
    long: 'I got tired of a Downloads folder full of loose files and wrote a script to fix it. It automatically sorts by extension and date, supports a dry-run mode so you can preview before committing, and logs every move. I added it to my PATH and it became part of my daily workflow.',
    bullets: ['Configurable sorting rules by extension and date', 'Dry-run mode to preview changes before applying', 'Compatible with macOS and Linux', 'Full operation log for every run'] },
  { id: 'site', num: '03', year: '2026', title: 'Portfolio · Frontend', kind: 'Web',
    stack: ['HTML', 'JavaScript', 'Tailwind'],
    desc: 'This site. A design and engineering sandbox — custom animations, command palette, dark/light mode, and responsive layout.',
    bg: 3, url: 'https://rrobertf.github.io/',
    long: 'The site you\'re looking at right now. I use it as a sandbox for modern CSS, motion design, and UX patterns. Every new technique I learn ends up here before it goes anywhere else.',
    bullets: ['Distinctive typography (Bricolage Grotesque + IBM Plex Mono)', 'Magnetic cursor with contextual states', 'Command palette with keyboard navigation', 'Project modals with scroll animations'] },
  { id: 'pwgen', num: '04', year: '2024', title: 'Password Generator', kind: 'Utility',
    stack: ['Python', 'CLI'],
    desc: 'Python CLI for generating strong passwords with configurable rules. Built because I needed a reliable daily tool.',
    bg: 4, url: 'https://github.com/rrobertf/generador-contrasenas',
    long: 'I needed unique strong passwords for every account and didn\'t want to rely on a third-party tool I didn\'t understand. I built a minimal Python CLI with Unix-style flags, entropy measurement, and a bulk mode for generating multiple passwords at once.',
    bullets: ['Unix-style flags (--len, --no-symbols, --no-ambiguous)', 'Entropy calculation in bits', 'Bulk mode for generating multiple passwords', 'Option to copy directly to clipboard'] },
  { id: 'auth', num: '06', year: '2026', title: 'Secure Auth System', kind: 'Full-Stack',
    stack: ['React', 'Node.js', 'JWT', 'bcrypt', 'SQLite'],
    desc: 'Full-stack authentication system — JWT tokens, bcrypt password hashing, protected routes, and a React dashboard.',
    bg: 6, url: 'https://github.com/rrobertf/secure-auth-system',
    long: 'A complete authentication flow built from scratch. The Express backend handles registration, login, token verification, and user profiles using JWT and bcrypt. The React frontend manages auth state, persists tokens in localStorage, and renders a protected dashboard. Built to understand security fundamentals firsthand.',
    bullets: [
      'JWT-based auth with 7-day expiry and Bearer token headers',
      'bcrypt password hashing with salt rounds',
      'Protected REST routes with middleware token verification',
      'React frontend with login, register, and dashboard views',
    ] },
  { id: 'news', num: '05', year: '2025', title: 'News Web Scraper', kind: 'Automation',
    stack: ['Python', 'BeautifulSoup', 'Automation'],
    desc: 'Python scraper that pulls headlines from multiple sources, deduplicates them, and delivers a clean morning digest in the terminal.',
    bg: 5, url: 'https://github.com/rrobertf/web-scraper',
    long: 'Instead of opening five browser tabs every morning, I wrote a Python scraper that pulls headlines from several sources, strips duplicates, and shows a clean digest right in the terminal. It caches results locally so it\'s fast and doesn\'t hammer the servers.',
    bullets: ['HTML extraction with BeautifulSoup', 'Deduplication by headline similarity', 'Local cache to avoid repeat requests', 'Colorized CLI output with source labels'] },
];

// ── Preloader ──────────────────────────────────────────────────
const preloader = document.getElementById('preloader');
const preProg = preloader.querySelector('.progress');
const prePct = preloader.querySelector('.pct');
let pct = 0;
const preInterval = setInterval(() => {
  pct += Math.random() * 8 + 2;
  if (pct >= 100) { pct = 100; clearInterval(preInterval); finishPreloader(); }
  preProg.style.setProperty('--p', pct + '%');
  prePct.textContent = String(Math.floor(pct)).padStart(3, '0') + '%';
}, 60);
function finishPreloader() {
  setTimeout(() => {
    preloader.classList.add('done');
    setTimeout(() => preloader.remove(), 800);
  }, 350);
}

// ── Cursor ─────────────────────────────────────────────────────
const cdot = document.getElementById('cdot');
const cring = document.getElementById('cring');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let dotX = mx, dotY = my, ringX = mx, ringY = my;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function tickCursor() {
  dotX = lerp(dotX, mx, 0.5); dotY = lerp(dotY, my, 0.5);
  ringX = lerp(ringX, mx, 0.18); ringY = lerp(ringY, my, 0.18);
  cdot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
  cring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(tickCursor);
}
if (!isCoarse) tickCursor();

document.querySelectorAll('[data-cur]').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
});
document.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cur-text'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cur-text'));
});
window.addEventListener('mousedown', () => document.body.classList.add('cur-press'));
window.addEventListener('mouseup', () => document.body.classList.remove('cur-press'));

// ── Magnetic buttons ───────────────────────────────────────────
if (!isCoarse && !reduceMotion) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// ── Live clock (Atlantic Standard Time) ────────────────────────
const liveClock = document.getElementById('liveClock');
function updateClock() {
  const now = new Date();
  const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Puerto_Rico' };
  liveClock.textContent = new Intl.DateTimeFormat('en-GB', opts).format(now) + ' AST';
}
updateClock(); setInterval(updateClock, 1000);

// ── Marquee ────────────────────────────────────────────────────
const marqueeWords = ['JavaScript', 'Node.js', 'Python', 'Bash', 'SQLite', 'REST APIs', 'Tailwind', 'Git', 'C++', 'HTML/CSS'];
const marqueeTrack = document.getElementById('marqueeTrack');
function buildMarquee() {
  let html = '';
  const set = () => marqueeWords.map(w => `<span class="marquee-item">${w}<span class="sep">★</span></span>`).join('');
  // duplicate twice so loop is seamless
  html = set() + set();
  marqueeTrack.innerHTML = html;
}
buildMarquee();

// ── Project list render ────────────────────────────────────────
const workList = document.getElementById('workList');
function renderWork(filter = 'all') {
  workList.innerHTML = PROJECTS.map((p, i) => {
    const dim = filter !== 'all' && !p.stack.some(s => s.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(s.toLowerCase()));
    return `
    <div class="work-row${dim ? ' dimmed' : ''}" data-id="${p.id}" data-cur>
      <div class="work-meta">— ${p.num}<br/>${p.year}</div>
      <div>
        <div class="work-title">${p.title.split('·')[0].trim()}<span class="kind">/ ${p.kind}</span></div>
        <div class="work-stack">${p.stack.map(s => `<span class="chip">${s}</span>`).join('')}</div>
      </div>
      <div class="work-desc">${p.desc}</div>
      <div class="work-arrow">View ↗</div>
    </div>`;
  }).join('');
  bindWorkRows();
}
function bindWorkRows() {
  document.querySelectorAll('.work-row').forEach(row => {
    row.addEventListener('click', () => openModal(row.dataset.id));
    row.addEventListener('mouseenter', () => {
      document.body.classList.add('cur-project');
    });
    row.addEventListener('mouseleave', () => {
      document.body.classList.remove('cur-project');
    });
  });
}
renderWork();


// ── Skill filter ───────────────────────────────────────────────
document.querySelectorAll('#skillFilter .stack-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#skillFilter .stack-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderWork(chip.dataset.skill);
  });
});

// ── Modal ──────────────────────────────────────────────────────
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
function buildCoverArt(p) {
  const word = (p.kind || '').toLowerCase();
  return `<div class="mc-3d"><div class="mc-word">${word}</div></div>`;
}
function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  modalContent.innerHTML = `
    <div class="modal-cover" data-bg="${p.bg}">
      <span class="mc-meta">— ${p.num} / ${p.year}</span>
      <span class="mc-corner">${p.kind}</span>
      ${buildCoverArt(p)}
      <div class="mc-foot">
        <span>${p.stack.slice(0, 3).join(' · ')}</span>
        <span>github.com/rrobertf</span>
      </div>
    </div>
    <div class="modal-head">
      <div>
        <div style="font-family:'IBM Plex Mono',monospace; font-size: 11px; color: var(--mute); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px;">— ${p.num} · ${p.year} · ${p.kind.toUpperCase()}</div>
        <h3>${p.title}</h3>
      </div>
      <button class="close" onclick="closeModal()" data-cur>×</button>
    </div>
    <div class="modal-body">
      <p>${p.long}</p>
      <h4>Stack used</h4>
      <div style="display:flex; gap: 6px; flex-wrap: wrap;">${p.stack.map(s => `<span class="chip" style="font-family:'IBM Plex Mono',monospace; font-size: 10px; padding: 4px 10px; border: 1px solid var(--line2); border-radius: 999px;">${s}</span>`).join('')}</div>
      <h4>What I learned</h4>
      <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
    <div class="modal-actions">
      <a class="btn btn-primary" href="${p.url}" target="_blank" rel="noopener" data-cur><span class="label">View on GitHub</span><span class="arrow">↗</span></a>
      <button class="btn btn-ghost" onclick="closeModal()" data-cur><span class="label">Close</span></button>
    </div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
window.closeModal = closeModal;
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

// ── Theme toggle ───────────────────────────────────────────────
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('rf-theme');
if (savedTheme === 'light') { document.body.classList.add('light'); themeBtn.textContent = '☼'; }
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.textContent = isLight ? '☼' : '☾';
  localStorage.setItem('rf-theme', isLight ? 'light' : 'dark');
});

// ── Scroll progress + parallax + nav state ─────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#navLinks a');
const sections = ['hero', 'about', 'projects', 'experience', 'contact'].map(id => document.getElementById(id));
const scrollProgress = document.getElementById('scroll-progress');
const tlProgress = document.getElementById('timelineProgress');
const timelineEl = document.getElementById('timeline');

function onScroll() {
  const y = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = y / h;
  scrollProgress.style.width = (ratio * 100) + '%';
  navbar.classList.toggle('scrolled', y > 60);

  // active nav
  let active = 'hero';
  sections.forEach(s => { if (s && y + 200 >= s.offsetTop) active = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active));

  // timeline progress fill
  if (timelineEl) {
    const r = timelineEl.getBoundingClientRect();
    const visible = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
    tlProgress.style.height = (visible * 100) + '%';
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Intersection reveal ────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // animate skill bars
      e.target.querySelectorAll('.bar .fill').forEach(f => {
        f.style.width = (f.dataset.fill || 0) + '%';
      });
      // animate counters
      e.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const span = el.querySelector('em');
        if (!span || el.dataset.done) return;
        el.dataset.done = '1';
        let cur = 0; const dur = 1100; const start = performance.now();
        const step = t => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          span.textContent = Math.floor(eased * target);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// also observe stats specifically (they're inside a .reveal but may need their own trigger if outside)
document.querySelectorAll('.stats').forEach(el => io.observe(el));
document.querySelectorAll('.expertise').forEach(el => io.observe(el));

// ── About text word reveal ─────────────────────────────────────
const aboutText = document.getElementById('aboutText');
if (aboutText) {
  const html = aboutText.innerHTML;
  // wrap each word but keep <em> intact
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  function wrapWords(node) {
    const children = Array.from(node.childNodes);
    children.forEach(c => {
      if (c.nodeType === 3) {
        const words = c.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach(w => {
          if (/^\s+$/.test(w)) frag.appendChild(document.createTextNode(w));
          else if (w) {
            const span = document.createElement('span');
            span.className = 'word-reveal';
            span.textContent = w;
            frag.appendChild(span);
          }
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1) wrapWords(c);
    });
  }
  wrapWords(tmp);
  aboutText.innerHTML = tmp.innerHTML;
  const aboutIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const words = aboutText.querySelectorAll('.word-reveal');
        words.forEach((w, i) => setTimeout(() => w.classList.add('in'), i * 60));
        aboutIo.disconnect();
      }
    });
  }, { threshold: 0.4 });
  aboutIo.observe(aboutText);
}

// ── Command palette ────────────────────────────────────────────
const cmdk = document.getElementById('cmdk');
const cmdkInput = document.getElementById('cmdkInput');
const cmdkResults = document.getElementById('cmdkResults');
const cmdkBtn = document.getElementById('cmdkBtn');
const COMMANDS = [
  { label: 'Go to About', meta: 'section', action: () => goSection('#about') },
  { label: 'Go to Projects', meta: 'section', action: () => goSection('#projects') },
  { label: 'Go to Experience', meta: 'section', action: () => goSection('#experience') },
  { label: 'Go to Contact', meta: 'section', action: () => goSection('#contact') },
  ...PROJECTS.map(p => ({ label: 'Open: ' + p.title, meta: 'project', action: () => { closeCmdk(); setTimeout(() => openModal(p.id), 200); } })),
  { label: 'Copy email', meta: 'action', action: () => { copyEmail(); closeCmdk(); } },
  { label: 'Toggle theme', meta: 'action', action: () => { themeBtn.click(); closeCmdk(); } },
  { label: 'Open GitHub', meta: 'external link', action: () => window.open('https://github.com/rrobertf', '_blank') },
];
function goSection(hash) {
  closeCmdk();
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
let cmdkActiveIdx = 0;
function renderCmdk(q = '') {
  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(q.toLowerCase()) || c.meta.toLowerCase().includes(q.toLowerCase()));
  cmdkActiveIdx = Math.min(cmdkActiveIdx, Math.max(0, filtered.length - 1));
  cmdkResults.innerHTML = filtered.length ? filtered.map((c, i) => `
    <div class="cmdk-result${i === cmdkActiveIdx ? ' active' : ''}" data-idx="${i}">
      <span>${c.label}</span><span class="meta">${c.meta}</span>
    </div>
  `).join('') : `<div style="padding: 24px; text-align: center; color: var(--mute); font-size: 13px;">No results</div>`;
  cmdkResults.querySelectorAll('.cmdk-result').forEach((r, i) => {
    r.addEventListener('click', () => filtered[i].action());
    r.addEventListener('mouseenter', () => { cmdkActiveIdx = i; renderCmdk(cmdkInput.value); });
  });
  cmdkResults._items = filtered;
}
function openCmdk() { cmdk.classList.add('open'); cmdkInput.value = ''; cmdkActiveIdx = 0; renderCmdk(); setTimeout(() => cmdkInput.focus(), 50); }
function closeCmdk() { cmdk.classList.remove('open'); }
cmdkBtn.addEventListener('click', openCmdk);
cmdk.addEventListener('click', e => { if (e.target === cmdk) closeCmdk(); });
cmdkInput.addEventListener('input', e => { cmdkActiveIdx = 0; renderCmdk(e.target.value); });
window.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCmdk(); }
  if (e.key === 'Escape') { closeCmdk(); closeModal(); }
  if (cmdk.classList.contains('open') && cmdkResults._items) {
    if (e.key === 'ArrowDown') { e.preventDefault(); cmdkActiveIdx = Math.min(cmdkResults._items.length - 1, cmdkActiveIdx + 1); renderCmdk(cmdkInput.value); }
    if (e.key === 'ArrowUp') { e.preventDefault(); cmdkActiveIdx = Math.max(0, cmdkActiveIdx - 1); renderCmdk(cmdkInput.value); }
    if (e.key === 'Enter') { e.preventDefault(); cmdkResults._items[cmdkActiveIdx]?.action(); }
  }
});

// ── Toast ──────────────────────────────────────────────────────
const toast = document.getElementById('toast');
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── Confetti (on copy email) ───────────────────────────────────
function confetti(x, y) {
  if (reduceMotion) return;
  const colors = ['var(--ac)', 'var(--ac2)', 'var(--ink)', 'var(--green)'];
  for (let i = 0; i < 18; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    const c = colors[i % colors.length];
    piece.style.background = c;
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    piece.style.borderRadius = i % 2 ? '50%' : '0';
    document.body.appendChild(piece);
    const ang = (Math.PI * 2 * i) / 18 + Math.random() * 0.5;
    const dist = 80 + Math.random() * 80;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist + Math.random() * 60;
    const rot = Math.random() * 720 - 360;
    piece.animate(
      [{ transform: 'translate(0,0) rotate(0)', opacity: 1 },
       { transform: `translate(${dx}px,${dy}px) rotate(${rot}deg)`, opacity: 0 }],
      { duration: 900 + Math.random() * 300, easing: 'cubic-bezier(.16,1,.3,1)' }
    );
    setTimeout(() => piece.remove(), 1300);
  }
}

// ── Copy email ─────────────────────────────────────────────────
function copyEmail() {
  navigator.clipboard.writeText('robertofeliciano2130@gmail.com').then(() => {
    showToast('Email copied!');
    const btn = document.getElementById('copyBtn');
    if (btn) {
      const r = btn.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 2);
    }
  });
}
document.getElementById('copyBtn').addEventListener('click', copyEmail);

// ── Contact form ───────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg = document.getElementById('cf-msg').value.trim();
  const err = document.getElementById('formError');
  err.textContent = '';
  if (!name || !email || !msg) { err.textContent = 'Please fill in all fields.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'That email address doesn\'t look valid.'; return; }
  const subject = `Message from ${name}`;
  const body = `${msg}\n\n— ${name} (${email})`;
  window.location.href = `mailto:robertofeliciano2130@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  showToast('Opening mail client…');
});

// ── Resume placeholder ─────────────────────────────────────────
document.querySelectorAll('#resumeLink, .resume-trigger').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showToast('Resume coming soon — check back soon.');
  });
});

// ── GitHub stats ───────────────────────────────────────────────
(async function loadGitHub() {
  try {
    const [user, repos] = await Promise.all([
      fetch('https://api.github.com/users/rrobertf').then(r => r.json()),
      fetch('https://api.github.com/users/rrobertf/repos?per_page=100').then(r => r.json()),
    ]);
    const reposEl = document.getElementById('ghRepos');
    const followersEl = document.getElementById('ghFollowers');
    const starsEl = document.getElementById('ghStars');
    const langsEl = document.getElementById('ghLangs');
    if (reposEl) reposEl.textContent = user.public_repos ?? '—';
    if (followersEl) followersEl.textContent = user.followers ?? '—';
    if (starsEl && Array.isArray(repos)) {
      starsEl.textContent = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    }
    if (langsEl && Array.isArray(repos)) {
      const langCount = {};
      repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
      const top = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([l]) => l);
      langsEl.innerHTML = top.map(l => `<span class="gh-lang-chip">${l}</span>`).join('');
    }
  } catch (_) {}
})();

// ── Hover state on nav etc ─────────────────────────────────────
function rebindCursor() {
  document.querySelectorAll('[data-cur]').forEach(el => {
    if (el.dataset.curBound) return;
    el.dataset.curBound = '1';
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
  });
}
const mo = new MutationObserver(rebindCursor);
mo.observe(document.body, { childList: true, subtree: true });
