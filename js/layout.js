// Header, sub-navigation and footer, shared by all three pages.
import { esc, has, pageHref, ICONS } from './util.js';
import { cvLink } from './components.js';

export function header(page, data) {
  const { config } = data;
  const cvKey = page === 'data-bi' ? 'dataBi' : page === 'automation' ? 'automation' : 'general';
  const autoLabel = config.automationPageTitle || 'AI & Automation';
  const contactHref = page === 'home' ? '#contact' : '#contact';
  const links = [
    { href: pageHref('data-bi'), label: 'Data & BI', current: page === 'data-bi' },
    { href: pageHref('automation'), label: autoLabel, current: page === 'automation' },
    { href: page === 'home' ? '#experience' : pageHref('home', '#experience'), label: 'Experience' },
    { href: contactHref, label: 'Contact' }
  ];
  return `
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header" id="siteHeader">
      <div class="wrap nav">
        <a class="wordmark" href="${esc(pageHref('home'))}"${page === 'home' ? ' aria-current="page"' : ''}>
          <span class="wordmark-mark">DC</span><span class="wordmark-text">${esc(config.brand || config.shortName)}</span>
        </a>
        <nav aria-label="Primary" class="nav-primary">
          <ul class="nav-links" id="navLinks">
            ${links.map((l) => `<li><a class="nav-link" href="${esc(l.href)}"${l.current ? ' aria-current="page"' : ''}>${esc(l.label)}</a></li>`).join('')}
          </ul>
        </nav>
        ${cvLink(config, cvKey, 'btn btn--gold btn--sm nav-cv', 'Download CV')}
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="Open menu">${ICONS.menu}</button>
      </div>
    </header>`;
}

export function subnav(items) {
  return `<nav class="subnav" aria-label="On this page"><div class="wrap"><ul>${items.map((i) => `<li><a href="#${esc(i.id)}">${esc(i.label)}</a></li>`).join('')}</ul></div></nav>`;
}

export function footer(data) {
  const { config } = data;
  const autoLabel = config.automationPageTitle || 'AI & Automation';
  return `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <h2>${esc(config.brand || config.name)}</h2>
            <p style="margin-top:8px">${esc(config.name)}</p>
            <p>${esc(config.title)}</p>
            <p style="margin-top:8px">${esc(config.location)}</p>
          </div>
          <div>
            <h3>Pages</h3>
            <ul>
              <li><a href="${esc(pageHref('home'))}">Home</a></li>
              <li><a href="${esc(pageHref('data-bi'))}">Data Analytics & BI</a></li>
              <li><a href="${esc(pageHref('automation'))}">${esc(autoLabel)}</a></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href="mailto:${esc(config.email)}">${esc(config.email)}</a></li>
              ${has(config.linkedin) ? `<li><a href="${esc(config.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>` : ''}
              ${has(config.github) ? `<li><a href="${esc(config.github)}" target="_blank" rel="noopener">GitHub</a></li>` : ''}
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Last updated: ${esc(config.lastUpdated)}</span>
          <a href="#main" style="color:inherit">Back to top ↑</a>
        </div>
      </div>
    </footer>
    <button class="to-top" type="button" aria-label="Back to top">${ICONS.up}</button>`;
}
