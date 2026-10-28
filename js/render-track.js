// Specialist pages: Data Analytics & BI, and AI & Automation. One renderer, two configurations.
import { esc, has, published, onTrack, counter } from './util.js';
import { sectionHead, flowList, relevantExperience, cvLink } from './components.js';
import { hero, projectsSection, certificationsSection, trackContactStrip } from './sections.js';
import { heroPipeline, heroStarSchema } from './diagrams.js';

export function trackSubnav(page, data) {
  const items = [{ id: 'overview', label: 'Overview' }];
  if (page === 'automation') items.push({ id: 'method', label: 'Method' }, { id: 'workflows', label: 'Workflows' });
  items.push({ id: 'skills', label: 'Skills' }, { id: 'projects', label: 'Projects' }, { id: 'experience', label: 'Experience' }, { id: 'contact', label: 'Contact' });
  return items;
}

export function renderTrack(page, data) {
  const { config } = data;
  const t = data[page];
  const n = counter();
  const isAuto = page === 'automation';
  const title = isAuto ? (config.automationPageTitle || 'AI & Automation') : t.title;
  const projects = published(data.projects).filter((p) => onTrack(p, page));
  const flagship = projects.find((p) => p.featured && p.steps?.length) || projects.find((p) => p.steps?.length);
  const cvLabel = isAuto ? 'Download Automation CV' : 'Download Data & BI CV';

  const heroHtml = hero({
    track: page,
    eyebrow: t.eyebrow,
    title,
    role: config.name,
    tagline: t.tagline,
    actions: `
      <a class="btn btn--gold" href="#projects">${isAuto ? 'See Workflows' : 'See Projects'}</a>
      ${cvLink(config, isAuto ? 'automation' : 'dataBi', 'btn btn--ghost', cvLabel)}`,
    metrics: t.heroMetrics,
    bg: isAuto ? (flagship ? heroPipeline(flagship.steps) : '') : heroStarSchema(),
    photo: config.headshot,
    layout: 'card',
    portrait: config.portrait,
    card: [
      ['Status', esc(config.availability), true],
      ['Based in', esc(config.location)],
      ['Hours', esc(config.overlap || '')]
    ]
  });

  let out = `<div id="overview">${heroHtml}</div>`;

  if (!isAuto) {
    const caps = (t.capabilities || []).filter((c) => has(c.title));
    if (caps.length) {
      out += `
        <section class="band band--white" data-tone="light" data-track="${page}">
          <div class="wrap">
            ${sectionHead({ num: n(), eyebrow: 'Capabilities', title: t.capabilitiesHeading })}
            <ul class="capabilities">${caps.map((c) => `<li class="cap-card"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></li>`).join('')}</ul>
          </div>
        </section>`;
    }
  } else {
    const method = (t.method || []).filter(has);
    if (method.length) {
      out += `
        <section class="band band--white" id="method" data-tone="light" data-track="${page}">
          <div class="wrap">
            ${sectionHead({ num: n(), eyebrow: 'Method', title: t.methodHeading })}
            ${flowList(method, { paper: true })}
          </div>
        </section>`;
    }
    const ai = projects.filter((p) => has(p.aiComponent));
    if (ai.length) {
      out += `
        <section class="band band--paper" id="ai" data-tone="light" data-track="${page}">
          <div class="wrap">
            ${sectionHead({ num: n(), eyebrow: 'AI in practice', title: t.aiHeading, intro: t.aiIntro })}
            <ul class="ai-list">${ai.map((p) => `<li class="ai-item"><h3><a class="text-link" href="#project-${esc(p.id)}">${esc(p.title)}</a></h3><p>${esc(p.aiComponent)}</p></li>`).join('')}</ul>
          </div>
        </section>`;
    }
    const withSteps = projects.filter((p) => (p.steps || []).filter(has).length);
    if (withSteps.length) {
      const [first, ...rest] = flagship ? [flagship, ...withSteps.filter((p) => p !== flagship)] : withSteps;
      const item = (p, big) => `
        <article class="showcase-item${big ? ' is-flagship' : ''}">
          <div class="showcase-head"><h3>${esc(p.title)}</h3><a class="link-arrow" href="#project-${esc(p.id)}">Case study</a></div>
          ${flowList(p.steps)}
        </article>`;
      out += `
        <section class="band band--navy" id="workflows" data-tone="dark" data-track="${page}">
          <div class="wrap">
            ${sectionHead({ num: n(), eyebrow: 'Workflow showcase', title: t.showcaseHeading, intro: t.showcaseText })}
            <div class="showcase">
              ${item(first, true)}
              ${rest.length ? `<div class="showcase-grid">${rest.map((p) => item(p, false)).join('')}</div>` : ''}
            </div>
          </div>
        </section>`;
    }
  }

  const groups = (data.skills || []).filter((g) => onTrack(g, page) && (g.items || []).filter(has).length);
  if (groups.length) {
    out += `
      <section class="band band--paper" id="skills" data-tone="light" data-track="${page}">
        <div class="wrap">
          ${sectionHead({ num: n(), eyebrow: 'Toolkit', title: t.skillsHeading })}
          <div class="skills-grid">${groups.map((g) => {
            const items = g.items.filter(has);
            return `<div class="skill-group"><h3>${esc(g.group)}<span class="mono">${items.length}</span></h3><ul class="chips">${items.map((i) => `<li class="chip">${esc(i)}</li>`).join('')}</ul></div>`;
          }).join('')}</div>
        </div>
      </section>`;
  }

  out += projectsSection({ id: 'projects', num: n(), eyebrow: 'Projects', title: t.projectsHeading, intro: t.projectsIntro, projects, track: page, filters: t.filters, tone: 'band--white' });

  const rel = relevantExperience(published(data.experience), page);
  if (rel) {
    out += `
      <section class="band band--paper" id="experience" data-tone="light" data-track="${page}">
        <div class="wrap">
          ${sectionHead({ num: n(), eyebrow: 'Experience', title: t.experienceHeading, intro: data.home.confidentialityNote })}
          ${rel}
        </div>
      </section>`;
  }

  out += certificationsSection({ num: n(), title: t.certificationsHeading, items: (data.certifications || []).filter((c) => onTrack(c, page)) });
  out += trackContactStrip({ data, page, heading: t.contactHeading, text: t.contactText });
  return out;
}
