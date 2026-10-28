// Shared helpers. ROOT is the site root, worked out from this file's own location,
// so the same code works at user.github.io/, user.github.io/repo/ and on a custom domain.
export const ROOT = new URL('../', import.meta.url);

// 'clean' links to folders (data-bi/). 'explicit' links to files (data-bi/index.html),
// which some preview hosts need. GitHub Pages works with either.
export const LINK_MODE = 'clean';

export const PAGES = {
  home: { path: '', label: 'Home' },
  'data-bi': { path: 'data-bi/', label: 'Data & BI' },
  automation: { path: 'automation/', label: 'AI & Automation' }
};

export function pageHref(key, hash = '') {
  let p = PAGES[key].path;
  if (LINK_MODE === 'explicit') p += 'index.html';
  return new URL(p, ROOT).href + hash;
}

// Resolve a content path ("assets/uploads/x.png") or pass through a full URL.
export function asset(p) {
  if (!p) return '';
  if (/^(https?:|mailto:|data:)/i.test(p)) return p;
  return new URL(String(p).replace(/^\/+/, ''), ROOT).href;
}

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export const has = (v) => Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && String(v).trim() !== '';
export const list = (v) => (Array.isArray(v) ? v.filter((x) => has(typeof x === 'object' && x !== null ? (x.text ?? x.src ?? x.title ?? x.name ?? x.value ?? 'x') : x)) : []);
export const published = (items) => (Array.isArray(items) ? items.filter((i) => i && i.published !== false) : []);
export const onTrack = (item, track) => Array.isArray(item.tracks) && item.tracks.includes(track);

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function track(eventName) {
  try { window.goatcounter?.count?.({ path: eventName, title: eventName, event: true }); } catch (e) { /* analytics is optional */ }
}

// Simple numbered section counter so eyebrow numbers never skip when a section is hidden.
export function counter() {
  let n = 0;
  return () => String(++n).padStart(2, '0');
}

export const ICONS = {
  message: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" stroke-linejoin="round"/><path d="M8 9.5h8M8 12.5h5"/></svg>',
  doc: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" stroke-linejoin="round"/><path d="M14 3v4h4M9 12h6M9 15.5h6M9 9h2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.3-3.1 8-7.5 9.5-4.4-1.5-7.5-5.2-7.5-9.5V6z" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
  power: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M13 3L6 13h5l-1 8 7-10h-5z" stroke-linejoin="round"/></svg>',
  tick: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8.5l3 3 7-7"/></svg>',
  lock: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2"/></svg>',
  close: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg>',
  menu: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14"/></svg>',
  up: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5"/></svg>'
};
