// Case study view. Opens for links like #project-recruitment-automation on any page.
import { esc, has, asset, track, ICONS } from './util.js';
import { flowList, contextBadge, trackLabel } from './components.js';

let dialog;
let lastFocus = null;
let projectsById = {};
let pageTrack = '';

const strs = (arr) => (Array.isArray(arr) ? arr.filter((s) => has(s)) : []);
const row = (label, content) => (content ? `<div class="cs-row"><p class="cs-label">${esc(label)}</p><div class="cs-content">${content}</div></div>` : '');
const para = (t) => (has(t) ? `<p>${esc(t)}</p>` : '');

function body(p) {
  const process = strs(p.process);
  const steps = strs(p.steps);
  const tools = strs(p.tools);
  const results = (p.results || []).filter((r) => has(r?.text));
  const gallery = (p.gallery || []).filter((g) => has(g?.src));
  const ba = p.beforeAfter || {};
  const links = [
    has(p.liveUrl) && `<a class="btn btn--dark" href="${esc(p.liveUrl)}" target="_blank" rel="noopener" data-event="live-${esc(p.id)}">View live dashboard ↗</a>`,
    has(p.githubUrl) && `<a class="btn btn--outline" href="${esc(p.githubUrl)}" target="_blank" rel="noopener" data-event="code-${esc(p.id)}">View code ↗</a>`,
    has(p.writeupUrl) && `<a class="btn btn--outline" href="${esc(p.writeupUrl)}" target="_blank" rel="noopener">Read the write-up ↗</a>`
  ].filter(Boolean);

  return [
    row('Business problem', para(p.problem)),
    row('Objective', para(p.objective)),
    row('Approach', para(p.approach)),
    row('Tools', tools.length ? `<ul class="tags">${tools.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}</ul>` : ''),
    row('Process', process.length ? `<ol>${process.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : ''),
    row('Workflow', [
      has(p.diagramImage) ? `<a href="${esc(asset(p.diagramImage))}" target="_blank" rel="noopener" class="cs-diagram"><img src="${esc(asset(p.diagramImage))}" alt="${esc(p.diagramAlt || 'Workflow diagram')}" loading="lazy"></a>` : '',
      steps.length ? `<div class="cs-flow">${flowList(steps, { staged: false })}</div>` : ''
    ].join('')),
    row('Where AI is used', para(p.aiComponent)),
    row('Before and after', has(ba.before) || has(ba.after) ? `<div class="ba">
        ${has(ba.before) ? `<div class="ba-panel"><span class="mono">Before</span><p>${esc(ba.before)}</p></div>` : ''}
        ${has(ba.after) ? `<div class="ba-panel ba-panel--after"><span class="mono">After</span><p>${esc(ba.after)}</p></div>` : ''}
      </div>` : ''),
    row('Results', results.length ? `<ul class="results">${results.map((r) => `<li><span>${esc(r.text)}</span><span class="basis basis--${r.basis === 'projected' ? 'projected' : 'measured'}">${r.basis === 'projected' ? 'Projected' : 'Measured'}</span></li>`).join('')}</ul>` : ''),
    row('Business impact', para(p.impact)),
    row('Screens', gallery.length ? `<div class="gallery">${gallery.map((g) => `<img src="${esc(asset(g.src))}" alt="${esc(g.alt || '')}" loading="lazy">`).join('')}</div>` : (has(p.image) ? `<img src="${esc(asset(p.image))}" alt="${esc(p.imageAlt || '')}" loading="lazy" style="border-radius:6px;border:1px solid var(--line)">` : '')),
    row('Interactive', has(p.embedUrl) ? `<div class="embed-box" data-embed="${esc(p.embedUrl)}"><button type="button" class="btn btn--dark" data-load-embed>Load interactive dashboard</button></div>` : ''),
    row('Links', links.length ? `<div class="cs-links">${links.join('')}</div>` : '')
  ].join('');
}

function open(id, { fromHash = false } = {}) {
  const p = projectsById[id];
  if (!p) return;
  const t = (p.tracks || []).includes(pageTrack) ? pageTrack : (p.tracks || [])[0] || '';
  lastFocus = fromHash ? lastFocus : document.activeElement;
  dialog.setAttribute('data-track', t);
  dialog.querySelector('.cs-inner').innerHTML = `
    <header class="cs-head">
      <div class="proj-meta"><span class="proj-eyebrow">${esc(trackLabel(t))} case study</span>${p.featured ? '<span class="badge badge--flagship">Flagship</span>' : ''}${contextBadge(p)}</div>
      <h2 id="csTitle">${esc(p.title)}</h2>
      ${has(p.summary) ? `<p style="color:var(--on-navy-2);max-width:62ch">${esc(p.summary)}</p>` : ''}
      <button type="button" class="cs-close" aria-label="Close case study">${ICONS.close}</button>
    </header>
    <div class="cs-body">${body(p)}</div>`;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector('.cs-close').focus();
  track(`case-study-${id}`);
}

function close() {
  if (dialog.open) dialog.close();
}

function onClosed() {
  if (location.hash.startsWith('#project-')) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}

function fromHash() {
  const m = location.hash.match(/^#project-([\w-]+)$/);
  if (m && projectsById[m[1]]) open(m[1], { fromHash: true });
}

export function initModal(projects, page) {
  pageTrack = page;
  projectsById = Object.fromEntries(projects.map((p) => [p.id, p]));
  dialog = document.createElement('dialog');
  dialog.className = 'cs';
  dialog.setAttribute('aria-labelledby', 'csTitle');
  dialog.innerHTML = '<div class="cs-inner"></div>';
  document.body.appendChild(dialog);

  dialog.addEventListener('close', onClosed);
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
    if (e.target.closest('.cs-close')) close();
    const loadBtn = e.target.closest('[data-load-embed]');
    if (loadBtn) {
      const box = loadBtn.closest('.embed-box');
      box.innerHTML = `<iframe src="${esc(box.dataset.embed)}" title="Interactive dashboard" loading="lazy" allowfullscreen></iframe>`;
    }
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#project-"]');
    if (!a) return;
    const id = a.getAttribute('href').slice('#project-'.length);
    if (!projectsById[id]) return;
    e.preventDefault();
    lastFocus = a;
    history.pushState(null, '', `#project-${id}`);
    open(id);
  });
  window.addEventListener('hashchange', fromHash);
  window.addEventListener('popstate', () => { if (!location.hash.startsWith('#project-')) close(); else fromHash(); });
  fromHash();
}
