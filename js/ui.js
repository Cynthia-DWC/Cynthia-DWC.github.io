// Navigation, header tone, sub-nav highlighting, filters, scroll reveal, KPI count-up, back-to-top, analytics events.
import { reducedMotion, track } from './util.js';

export function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('navLinks');
  if (!toggle || !menu) return;
  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) menu.querySelector('a')?.focus();
  };
  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') { setOpen(false); toggle.focus(); }
    if (e.key === 'Tab') {
      const items = [...menu.querySelectorAll('a'), toggle];
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
}

export function initHeaderTone() {
  const header = document.getElementById('siteHeader');
  const toTop = document.querySelector('.to-top');
  const bands = [...document.querySelectorAll('[data-tone]')];
  const update = () => {
    const y = header.getBoundingClientRect().bottom - 4;
    const band = bands.find((b) => { const r = b.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    const light = band && band.dataset.tone === 'light';
    header.classList.toggle('is-light', !!light);
    header.classList.toggle('is-scrolled', window.scrollY > 10 && !light);
    toTop?.classList.toggle('is-visible', window.scrollY > 900);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  });
}

export function initSubnav() {
  const links = [...document.querySelectorAll('.subnav a')];
  if (!links.length) return;
  const targets = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const update = () => {
    const line = window.innerHeight * 0.3;
    let current = targets[0];
    targets.forEach((t) => { if (t.getBoundingClientRect().top <= line) current = t; });
    links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${current?.id}`));
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

export function initFilters() {
  document.querySelectorAll('.filters').forEach((bar) => {
    const grid = bar.parentElement.querySelector('[data-grid]');
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const f = btn.dataset.filter;
      bar.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      grid.querySelectorAll(':scope > li').forEach((li) => {
        li.hidden = f !== 'all' && !li.dataset.tags.split('|').includes(f);
      });
    });
  });
}

export function initReveal() {
  const staged = [...document.querySelectorAll('.flow.is-staged')];
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    staged.forEach((el) => el.classList.add('in'));
    return;
  }
  const below = (el) => el.getBoundingClientRect().top > window.innerHeight;
  const els = [...document.querySelectorAll('.sec-head, .track-card, .proj-grid > li, .tl-item, .how-item, .cap-card, .skill-group, .rel-item, .showcase-item')].filter(below);
  els.forEach((el) => el.classList.add('reveal'));
  staged.forEach((el) => { if (!below(el)) el.classList.add('in'); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
  staged.filter((el) => !el.classList.contains('in')).forEach((el) => io.observe(el));
}

export function initCountUp() {
  if (reducedMotion()) return;
  document.querySelectorAll('[data-countup]').forEach((el) => {
    const original = el.textContent;
    const parts = original.split(/(\d+(?:\.\d+)?)/);
    if (parts.length < 2) return;
    const start = performance.now();
    const dur = 900;
    const frame = (now) => {
      const k = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = parts.map((p, i) => (i % 2 ? String(Math.round(Number(p) * e)) : p)).join('');
      if (k < 1) requestAnimationFrame(frame); else el.textContent = original;
    };
    el.setAttribute('aria-label', original);
    requestAnimationFrame(frame);
  });
}

export function initEvents() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-event]');
    if (el) track(el.dataset.event);
  });
}

export function initAnalytics(code) {
  if (!code) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
  document.head.appendChild(s);
}
