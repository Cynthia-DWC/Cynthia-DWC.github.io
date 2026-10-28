// Entry point. Loads every content file, then renders the page named in <body data-page="...">.
import { ROOT, published } from './util.js';
import { header, subnav, footer } from './layout.js';
import { renderHome } from './render-home.js';
import { renderTrack, trackSubnav } from './render-track.js';
import { initModal } from './modal.js';
import { initContactForm, initCopyButtons } from './contact.js';
import { initNav, initHeaderTone, initSubnav, initFilters, initReveal, initCountUp, initEvents, initAnalytics } from './ui.js';

const FILES = ['config', 'home', 'data-bi', 'automation', 'projects', 'experience', 'education', 'skills', 'certifications', 'writing', 'recommendations'];

async function load() {
  const data = {};
  await Promise.all(FILES.map(async (name) => {
    const res = await fetch(new URL(`content/${name}.json`, ROOT), { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${name}.json returned ${res.status}`);
    data[name] = await res.json();
  }));
  return data;
}

async function start() {
  const page = document.body.dataset.page || 'home';
  const root = document.getElementById('app');
  let data;
  try {
    data = await load();
  } catch (err) {
    root.innerHTML = `<main id="main" class="load-error"><h1>This page could not load its content.</h1><p>Please refresh the page. If you opened the file directly from your computer, run a local server instead (see README).</p></main>`;
    console.error(err);
    return;
  }

  const main = page === 'home' ? renderHome(data) : renderTrack(page, data);
  const sub = page === 'home' ? '' : subnav(trackSubnav(page, data));
  root.innerHTML = `${header(page, data)}<main id="main" tabindex="-1">${main.replace('</section>', `</section>${sub}`)}</main>${footer(data)}`;

  if (page === 'automation' && data.config.automationPageTitle) {
    document.title = document.title.replace('AI & Automation', data.config.automationPageTitle);
  }

  initNav();
  initHeaderTone();
  initSubnav();
  initFilters();
  initModal(published(data.projects), page);
  initCopyButtons();
  initContactForm(data.config.formspreeEndpoint);
  initEvents();
  initReveal();
  initCountUp();
  initAnalytics(data.config.analytics?.goatcounterCode);
}

start();
