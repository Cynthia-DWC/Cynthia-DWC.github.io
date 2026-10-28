// Home page (General).
import { esc, has, pageHref, published, counter, ICONS } from './util.js';
import { sectionHead, chips, projectCard, timeline } from './components.js';
import { hero, heroMeta, contactSection, certificationsSection, confidentialityNote } from './sections.js';
import { heroPipeline } from './diagrams.js';

export function renderHome(data) {
  const { config, home } = data;
  const n = counter();
  const projects = published(data.projects);
  const flagship = projects.find((p) => p.id === 'recruitment-automation' && p.steps?.length) || projects.find((p) => p.steps?.length);
  const autoLabel = config.automationPageTitle || 'AI & Automation';

  const heroHtml = hero({
    title: config.name,
    role: config.title,
    tagline: config.tagline,
    meta: heroMeta(config),
    actions: `
      <a class="btn btn--gold" href="${esc(pageHref('data-bi'))}">View Data & BI Work</a>
      <a class="btn btn--ghost" href="${esc(pageHref('automation'))}">View Automation Work</a>`,
    metrics: home.heroMetrics,
    bg: flagship ? heroPipeline(flagship.steps) : '',
    photo: config.headshot
  });

  const tracks = (home.tracks || []).map((t) => `
    <article class="track-card" data-track="${esc(t.key)}">
      ${has(t.eyebrow) ? `<p class="eyebrow"><span class="mono">${esc(t.eyebrow)}</span></p>` : ''}
      <h3 class="track-title">${esc(t.key === 'automation' ? autoLabel : t.title)}</h3>
      <p class="track-summary">${esc(t.summary)}</p>
      ${(t.proof || []).filter(has).length ? `<ul class="proof">${t.proof.filter(has).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
      ${chips(t.tools)}
      <a class="link-arrow" href="${esc(pageHref(t.key))}">${esc(t.key === 'automation' ? `Explore ${autoLabel}` : t.cta)}</a>
    </article>`).join('');

  const pathsHtml = `
    <section class="band band--paper" id="paths" data-tone="light">
      <div class="wrap">
        ${sectionHead({ num: n(), eyebrow: 'Specialisms', title: home.tracksHeading, intro: home.tracksIntro })}
        <div class="tracks">${tracks}</div>
      </div>
    </section>`;

  const flow = (home.flow || []).filter(has);
  const aboutHtml = `
    <section class="band band--white" id="about" data-tone="light">
      <div class="wrap">
        ${sectionHead({ num: n(), eyebrow: 'About', title: home.aboutHeading })}
        <div class="about-grid">
          <div class="about-text">${(home.about || []).filter(has).map((p) => `<p>${esc(p)}</p>`).join('')}</div>
          ${flow.length ? `<ol class="flowstrip" aria-label="How I add value">${flow.map((f, i) => `<li><span class="mono">${String(i + 1).padStart(2, '0')}</span><span>${esc(f)}</span></li>`).join('')}</ol>` : ''}
        </div>
      </div>
    </section>`;

  const how = (home.howIWork || []).filter((h) => has(h.title));
  const howHtml = how.length ? `
    <section class="band band--paper" id="how-i-work" data-tone="light">
      <div class="wrap">
        ${sectionHead({ num: n(), eyebrow: 'Ways of working', title: home.howIWorkHeading })}
        <ul class="howwork">${how.map((h) => `
          <li class="how-item"><span class="how-icon">${ICONS[h.icon] || ICONS.check}</span><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p></li>`).join('')}
        </ul>
      </div>
    </section>` : '';

  const featured = projects.filter((p) => p.featuredOnHome);
  const featuredHtml = featured.length ? `
    <section class="band band--white" id="featured" data-tone="light">
      <div class="wrap">
        ${sectionHead({ num: n(), eyebrow: 'Selected work', title: home.featuredHeading, intro: home.featuredIntro })}
        <ul class="proj-grid">${featured.map((p) => `<li>${projectCard(p)}</li>`).join('')}</ul>
      </div>
    </section>` : '';

  const exp = published(data.experience);
  const edu = (data.education || []).filter((e) => has(e.qualification));
  const expHtml = exp.length ? `
    <section class="band band--paper" id="experience" data-tone="light">
      <div class="wrap">
        ${sectionHead({ num: n(), eyebrow: 'Career', title: home.experienceHeading })}
        ${confidentialityNote(home.confidentialityNote)}
        ${timeline(exp)}
        ${edu.length ? `<div class="edu"><span class="mono" style="font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3)">Education</span>${edu.map((e) => `<span><strong>${esc(e.qualification)}</strong> · ${esc(e.institution)} · ${esc(e.year)}</span>`).join('')}</div>` : ''}
      </div>
    </section>` : '';

  const certHtml = certificationsSection({ num: n(), title: home.certificationsHeading, items: data.certifications || [] });

  const writing = (data.writing || []).filter((w) => has(w.title) && has(w.url));
  const writingHtml = writing.length ? `
    <section class="band band--paper" id="writing" data-tone="light">
      <div class="wrap">
        ${sectionHead({ num: n(), eyebrow: 'Writing', title: home.writingHeading })}
        <ul class="writing-list">${writing.map((w) => `
          <li><a href="${esc(w.url)}" target="_blank" rel="noopener">
            <span class="mono">${esc(w.date)}</span>
            <span><h3>${esc(w.title)}</h3>${has(w.summary) ? `<p>${esc(w.summary)}</p>` : ''}</span>
            <span class="mono">${esc(w.platform)} ↗</span>
          </a></li>`).join('')}
        </ul>
      </div>
    </section>` : '';

  const recs = (data.recommendations || []).filter((r) => has(r.quote) && has(r.name));
  const recHtml = recs.length ? `
    <section class="band band--white" id="recommendations" data-tone="light">
      <div class="wrap">
        ${sectionHead({ num: n(), eyebrow: 'References', title: home.recommendationsHeading })}
        <ul class="rec-grid">${recs.map((r) => `
          <li><figure class="rec"><blockquote>${esc(r.quote)}</blockquote>
            <figcaption><strong>${esc(r.name)}</strong>${esc([r.role, r.company].filter(has).join(', '))}${has(r.relationship) ? `<br>${esc(r.relationship)}` : ''}${has(r.sourceUrl) ? ` · <a class="text-link" href="${esc(r.sourceUrl)}" target="_blank" rel="noopener">Source</a>` : ''}</figcaption>
          </figure></li>`).join('')}
        </ul>
      </div>
    </section>` : '';

  const contactHtml = contactSection({ num: n(), data, page: 'home', heading: home.contactHeading, text: home.contactText });

  return heroHtml + pathsHtml + aboutHtml + howHtml + featuredHtml + expHtml + certHtml + writingHtml + recHtml + contactHtml;
}
