// Reusable pieces of markup. Every function returns an HTML string built from content data.
import { esc, has, asset, ICONS } from './util.js';
import { miniFlowSvg } from './diagrams.js';

const strs = (arr) => (Array.isArray(arr) ? arr.filter((s) => has(s)) : []);

export function sectionHead({ num, eyebrow, title, intro, id }) {
  return `
    <header class="sec-head">
      <p class="eyebrow"><span class="mono">${esc(num)} / ${esc(eyebrow)}</span></p>
      <h2 class="sec-title"${id ? ` id="${esc(id)}"` : ''}>${esc(title)}</h2>
      ${has(intro) ? `<p class="sec-intro">${esc(intro)}</p>` : ''}
    </header>`;
}

export function kpiTiles(metrics) {
  const items = (metrics || []).filter((m) => has(m?.value));
  if (!items.length) return '';
  return `<div class="kpis" role="list">${items.map((m) => `
    <div class="kpi" role="listitem"${has(m.track) ? ` data-track="${esc(m.track)}"` : ''}>
      ${has(m.tag) ? `<p class="kpi-tag">${esc(m.tag)}</p>` : ''}
      <p class="kpi-value${String(m.value).length > 11 ? ' kpi-value--long' : ''}" data-countup>${esc(m.value)}</p>
      <p class="kpi-label">${esc(m.label)}</p>
    </div>`).join('')}</div>`;
}

export function chips(items, cls = 'chips') {
  const s = strs(items);
  return s.length ? `<ul class="${cls}">${s.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>` : '';
}

export function cvLink(config, which, cls = 'btn btn--gold', labelOverride) {
  const path = config.cv?.[which] || config.cv?.general || '';
  if (path) {
    const label = labelOverride || 'Download CV';
    return `<a class="${cls}" href="${esc(asset(path))}" target="_blank" rel="noopener" download data-event="cv-download-${esc(which)}">${esc(label)}</a>`;
  }
  const subject = encodeURIComponent('CV request from your portfolio');
  return `<a class="${cls}" href="mailto:${esc(config.email)}?subject=${subject}" data-event="cv-request">Request my CV</a>`;
}

export function trackLabel(t) {
  return t === 'data-bi' ? 'Data & BI' : t === 'automation' ? 'Automation' : '';
}

export function contextBadge(p) {
  if (!has(p.context)) return '';
  const detail = has(p.contextDetail) ? `: ${p.contextDetail}` : '';
  return `<span class="badge">${esc(p.context + detail)}</span>`;
}

export function fallbackVisual(p, primaryTrack) {
  const tools = strs(p.tools);
  const steps = strs(p.steps);
  const top = `<div class="fb-top"><span>${esc(trackLabel(primaryTrack) || 'Project')}</span><span>${steps.length ? `${steps.length} steps` : esc(tools[0] || '')}</span></div>`;
  if (steps.length) {
    return `<div class="fb" aria-hidden="true">${top}${miniFlowSvg(steps)}<div class="fb-tools">${tools.slice(0, 4).map((t) => `<span>${esc(t)}</span>`).join('')}</div></div>`;
  }
  const isDash = (p.tags || []).includes('Dashboards');
  const bars = isDash ? '<div class="fb-wire"><span></span><span></span><span></span><span class="wide"></span></div>' : `<p class="fb-big">${esc(p.title)}</p>`;
  return `<div class="fb" aria-hidden="true">${top}${bars}<div class="fb-tools">${tools.slice(0, 4).map((t) => `<span>${esc(t)}</span>`).join('')}</div></div>`;
}

export function projectCard(p, primaryTrack) {
  const t = primaryTrack || (p.tracks || [])[0] || '';
  const visual = has(p.image)
    ? `<img src="${esc(asset(p.image))}" alt="${esc(p.imageAlt || '')}" loading="lazy" width="1280" height="720">`
    : fallbackVisual(p, t);
  const tags = strs(p.tools).slice(0, 5);
  return `
    <a class="proj-card" href="#project-${esc(p.id)}" data-track="${esc(t)}" data-project="${esc(p.id)}" aria-label="${esc(p.title)}, read case study">
      <div class="proj-visual">${visual}</div>
      <div class="proj-body">
        <div class="proj-meta">
          <span class="proj-eyebrow">${esc(trackLabel(t))}</span>
          ${p.featured ? '<span class="badge badge--flagship">Flagship</span>' : ''}
          ${contextBadge(p)}
        </div>
        <h3 class="proj-title">${esc(p.title)}</h3>
        <p class="proj-summary">${esc(p.summary)}</p>
        ${tags.length ? `<ul class="tags">${tags.map((x) => `<li class="tag">${esc(x)}</li>`).join('')}</ul>` : ''}
        <span class="proj-more link-arrow">Read case study</span>
      </div>
    </a>`;
}

export function flowList(steps, { paper = false, staged = true } = {}) {
  const s = strs(steps);
  if (!s.length) return '';
  return `<ol class="flow${paper ? ' flow--paper' : ''}${staged ? ' is-staged' : ''}">${s.map((label, i) => `
    <li class="flow-step" style="--i:${i}"><span class="flow-num">${String(i + 1).padStart(2, '0')}</span><span class="flow-label">${esc(label)}</span></li>`).join('')}</ol>`;
}

function typeBadge(type) {
  return has(type) ? `<span class="badge">${esc(type)}</span>` : '';
}

export function timeline(items) {
  return `<ol class="timeline">${items.map((e) => {
    const bullets = (e.bullets || []).filter((b) => has(b?.text));
    return `
      <li class="tl-item">
        <div class="tl-when"><span>${esc(e.start)} to ${esc(e.end)}</span>${typeBadge(e.type)}</div>
        <div class="tl-body">
          <h3 class="tl-role">${esc(e.role)}</h3>
          <p class="tl-company">${esc([e.company, e.location].filter(has).join(' · '))}</p>
          ${bullets.length ? `<ul class="tl-bullets">${bullets.map((b) => `<li>${esc(b.text)}</li>`).join('')}</ul>` : ''}
        </div>
      </li>`;
  }).join('')}</ol>`;
}

export function relevantExperience(items, trackKey) {
  const rows = items
    .map((e) => ({ ...e, bullets: (e.bullets || []).filter((b) => has(b?.text) && (b.tracks || []).includes(trackKey)) }))
    .filter((e) => e.bullets.length);
  if (!rows.length) return '';
  return `<ul class="rel-exp">${rows.map((e) => `
    <li class="rel-item">
      <p class="mono">${esc(e.start)} to ${esc(e.end)}${has(e.type) ? ` · ${esc(e.type)}` : ''}</p>
      <h3>${esc(e.role)}</h3>
      <p class="tl-company">${esc(e.company)}</p>
      <ul class="tl-bullets">${e.bullets.map((b) => `<li>${esc(b.text)}</li>`).join('')}</ul>
    </li>`).join('')}</ul>`;
}

export function certifications(items) {
  const done = items.filter((c) => c.status === 'completed' && has(c.name));
  const learning = items.filter((c) => c.status !== 'completed' && has(c.name));
  if (!done.length && !learning.length) return '';
  const name = (c) => {
    const inner = `<span class="cert-name">${esc(c.name)}</span>${has(c.issuer) ? `<br><span class="cert-issuer">${esc(c.issuer)}${has(c.note) ? ` · ${esc(c.note)}` : ''}</span>` : (has(c.note) ? `<br><span class="cert-issuer">${esc(c.note)}</span>` : '')}`;
    return has(c.url) ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${inner}</a>` : `<span>${inner}</span>`;
  };
  return `<div class="certs">
    ${done.length ? `<div class="cert-col"><h3>Completed</h3><ul class="cert-list">${done.map((c) => `<li class="cert-item">${ICONS.tick}${name(c)}<span></span></li>`).join('')}</ul></div>` : ''}
    ${learning.length ? `<div class="cert-col cert-col--learning"><h3>Currently learning</h3><ul class="cert-list">${learning.map((c) => `<li class="cert-item">${name(c)}<span class="badge badge--progress">In progress</span></li>`).join('')}</ul></div>` : ''}
  </div>`;
}

export function emailCopy(email) {
  return `<span class="copy-row"><a href="mailto:${esc(email)}" class="text-link">${esc(email)}</a><button type="button" class="copy-btn" data-copy="${esc(email)}">Copy</button></span>`;
}
