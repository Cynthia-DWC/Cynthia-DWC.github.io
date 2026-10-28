// Page sections shared by the Home page and the two specialist pages.
import { esc, has, asset, ICONS } from './util.js';
import { sectionHead, kpiTiles, projectCard, certifications, cvLink, emailCopy } from './components.js';

export function hero({ track, eyebrow, title, role, tagline, meta, actions, metrics, bg, photo, layout = 'circle', portrait, card }) {
  const portraitSrc = portrait || photo;
  const usePortrait = layout === 'portrait' && portraitSrc;
  const useCard = layout === 'card' && (portraitSrc || (card || []).length);
  const useCircle = layout === 'circle' && photo;
  const cardHtml = useCard ? `
    <aside class="hero-card" aria-label="Profile">
      ${portraitSrc ? `<div class="hero-card-photo"><img src="${esc(asset(portraitSrc))}" alt="Portrait of ${esc(role || title)}" width="800" height="1000"></div>` : ''}
      <dl class="hero-card-dl">${(card || []).filter((c) => has(c[1])).map(([k, v, dot]) => `<div><dt>${esc(k)}</dt><dd>${dot ? '<span class="dot" aria-hidden="true"></span>' : ''}${v}</dd></div>`).join('')}</dl>
    </aside>` : '';
  return `
    <section class="hero${usePortrait ? ' hero--portrait' : ''}${useCard ? ' hero--card' : ''}" data-tone="dark"${track ? ` data-track="${esc(track)}"` : ''} aria-labelledby="heroTitle">
      ${usePortrait ? `<div class="hero-portrait"><img src="${esc(asset(portraitSrc))}" alt="Portrait of ${esc(title)}" width="800" height="1000" fetchpriority="high"></div>` : ''}
      <div class="wrap">
        <div class="hero-grid${useCircle ? ' has-photo' : ''}${useCard ? ' has-card' : ''}">
          <div class="hero-text">
            ${has(eyebrow) ? `<p class="eyebrow"><span class="mono">${esc(eyebrow)}</span></p>` : ''}
            <h1 class="hero-title" id="heroTitle">${esc(title)}</h1>
            ${has(role) ? `<p class="hero-role">${esc(role)}</p>` : ''}
            ${has(tagline) ? `<p class="hero-tagline">${esc(tagline)}</p>` : ''}
            ${meta ? `<p class="hero-meta">${meta}</p>` : ''}
            <div class="hero-actions">${actions}</div>
          </div>
          ${useCircle ? `<div class="hero-photo"><img src="${esc(asset(photo))}" alt="Portrait of ${esc(title)}" width="440" height="440"></div>` : ''}
          ${cardHtml}
        </div>
        ${bg ? `<div class="hero-pipeline" aria-hidden="true">${bg}</div>` : ''}
        ${kpiTiles(metrics)}
      </div>
    </section>`;
}

export function heroMeta(config) {
  const parts = [`<span><span class="dot" aria-hidden="true"></span>${esc(config.availability)}</span>`, `<span>${esc(config.location)}</span>`];
  if (has(config.openTo)) parts.push(`<span>${esc(config.openTo)}</span>`);
  return parts.join('');
}

export function projectsSection({ id, num, eyebrow, title, intro, projects, track, filters, tone = 'band--paper' }) {
  if (!projects.length) return '';
  const usable = (filters || []).filter((f) => projects.some((p) => (p.tags || []).includes(f)));
  const filterBar = usable.length
    ? `<div class="filters" role="group" aria-label="Filter projects">
        <button type="button" class="filter" aria-pressed="true" data-filter="all">All</button>
        ${usable.map((f) => `<button type="button" class="filter" aria-pressed="false" data-filter="${esc(f)}">${esc(f)}</button>`).join('')}
      </div>`
    : '';
  return `
    <section class="band ${tone}" id="${esc(id)}" data-tone="light" ${track ? `data-track="${esc(track)}"` : ''}>
      <div class="wrap">
        ${sectionHead({ num, eyebrow, title, intro })}
        ${filterBar}
        <ul class="proj-grid" data-grid>
          ${projects.map((p) => `<li data-tags="${esc((p.tags || []).join('|'))}">${projectCard(p, track)}</li>`).join('')}
        </ul>
      </div>
    </section>`;
}

export function certificationsSection({ id = 'certifications', num, title, items, tone = 'band--white' }) {
  const html = certifications(items);
  if (!html) return '';
  return `<section class="band ${tone}" id="${esc(id)}" data-tone="light"><div class="wrap">${sectionHead({ num, eyebrow: 'Credentials', title })}${html}</div></section>`;
}

export function contactSection({ num, data, page, heading, text }) {
  const { config } = data;
  const cvKey = page === 'data-bi' ? 'dataBi' : page === 'automation' ? 'automation' : 'general';
  const form = has(config.formspreeEndpoint)
    ? `<div class="form-card">
        <form class="form" id="contactForm" novalidate>
          <div class="form-row">
            <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" autocomplete="name" required><span class="field-error" id="cf-name-err"></span></div>
            <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" required><span class="field-error" id="cf-email-err"></span></div>
          </div>
          <div class="field"><label for="cf-subject">Subject</label><input id="cf-subject" name="subject" required><span class="field-error" id="cf-subject-err"></span></div>
          <div class="field"><label for="cf-message">Message</label><textarea id="cf-message" name="message" required></textarea><span class="field-error" id="cf-message-err"></span></div>
          <div class="hp" aria-hidden="true"><label for="cf-company">Company</label><input id="cf-company" name="_gotcha" tabindex="-1" autocomplete="off"></div>
          <input type="hidden" name="page" value="${esc(page)}">
          <div><button class="btn btn--dark" type="submit" id="cf-submit">Send message</button></div>
          <p class="form-status" id="cf-status" role="status" aria-live="polite"></p>
        </form>
      </div>`
    : `<div class="form-card mail-card">
        <h3>Prefer email?</h3>
        <p>Write to me directly. Tell me about the role or the process you want to improve.</p>
        <div><a class="btn btn--dark" href="mailto:${esc(config.email)}">Email me directly</a></div>
      </div>`;
  return `
    <section class="band band--paper" id="contact" data-tone="light">
      <div class="wrap">
        <div class="cv-strip" id="cv">
          <div><h2>${esc(data.home.cvHeading)}</h2><p>${esc(data.home.cvText)}</p></div>
          <div class="cv-actions">
            ${cvLink(config, cvKey, 'btn btn--gold')}
            ${has(config.linkedin) ? `<a class="btn btn--ghost" href="${esc(config.linkedin)}" target="_blank" rel="noopener">View LinkedIn</a>` : ''}
          </div>
        </div>
        <div class="contact-grid">
          <div>
            ${sectionHead({ num, eyebrow: 'Contact', title: heading, intro: text })}
            <ul class="contact-lines">
              <li><span class="mono">Email</span>${emailCopy(config.email)}</li>
              ${has(config.linkedin) ? `<li><span class="mono">LinkedIn</span><a class="text-link" href="${esc(config.linkedin)}" target="_blank" rel="noopener">${esc(config.linkedin.replace(/^https?:\/\/(www\.)?/, ''))}</a></li>` : ''}
              ${has(config.github) ? `<li><span class="mono">GitHub</span><a class="text-link" href="${esc(config.github)}" target="_blank" rel="noopener">${esc(config.github.replace(/^https?:\/\//, ''))}</a></li>` : ''}
              <li><span class="mono">Based in</span><span>${esc(config.location)}</span></li>
            </ul>
          </div>
          ${form}
        </div>
      </div>
    </section>`;
}

export function trackContactStrip({ data, page, heading, text }) {
  const { config } = data;
  const cvKey = page === 'data-bi' ? 'dataBi' : 'automation';
  const cvLabel = page === 'data-bi' ? 'Download Data & BI CV' : 'Download Automation CV';
  return `
    <section class="band band--navy" id="contact" data-tone="dark" data-track="${esc(page)}">
      <div class="wrap contact-strip">
        <div>
          <h2>${esc(heading)}</h2>
          ${has(text) ? `<p>${esc(text)}</p>` : ''}
          ${emailCopy(config.email)}
        </div>
        <div class="cv-actions">
          ${cvLink(config, cvKey, 'btn btn--gold', cvLabel)}
          <a class="btn btn--ghost" href="mailto:${esc(config.email)}">Email me</a>
          ${has(config.linkedin) ? `<a class="btn btn--ghost" href="${esc(config.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
        </div>
      </div>
    </section>`;
}

export function confidentialityNote(text) {
  return has(text) ? `<p class="note">${ICONS.lock}<span>${esc(text)}</span></p>` : '';
}
