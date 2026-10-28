// Runs on every deploy. 1) Checks every content file. 2) Copies the site to _site.
// 3) Writes the live address into canonical, Open Graph and 404 links. 4) Writes sitemap.xml and robots.txt.
// Usage: node .github/scripts/prepare.mjs https://username.github.io/repo
import fs from 'node:fs';
import path from 'node:path';

const base = (process.argv[2] || '').replace(/\/?$/, '/');
const root = process.cwd();
const out = path.join(root, '_site');
const errors = [];

const required = {
  'config.json': ['name', 'email', 'title'],
  'home.json': ['heroMetrics', 'tracks'],
  'data-bi.json': ['title', 'heroMetrics'],
  'automation.json': ['heroMetrics'],
  'projects.json': [],
  'experience.json': [],
  'education.json': [],
  'skills.json': [],
  'certifications.json': [],
  'writing.json': [],
  'recommendations.json': []
};

for (const [file, keys] of Object.entries(required)) {
  const p = path.join(root, 'content', file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    errors.push(`content/${file}: ${e.message}`);
    continue;
  }
  for (const k of keys) if (!(k in data)) errors.push(`content/${file}: missing "${k}"`);
  if (file === 'projects.json') {
    if (!Array.isArray(data)) { errors.push('content/projects.json must be a list'); continue; }
    const ids = new Set();
    data.forEach((p, i) => {
      if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) errors.push(`Project ${i + 1} ("${p.title || 'untitled'}"): Short ID must use lowercase letters, numbers and hyphens only`);
      if (ids.has(p.id)) errors.push(`Project ID "${p.id}" is used twice`);
      ids.add(p.id);
    });
  }
}

// Em dashes are not allowed anywhere in site copy.
for (const file of fs.readdirSync(path.join(root, 'content'))) {
  const text = fs.readFileSync(path.join(root, 'content', file), 'utf8');
  if (text.includes('\u2014')) errors.push(`content/${file}: contains an em dash. Replace it with a comma, colon or full stop.`);
}

if (errors.length) {
  console.error('Content check failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log('Content check passed.');

// Copy the site.
const skip = new Set(['.git', '.github', '_site', 'node_modules', 'README.md', 'CLAUDE.md', 'docs', '.gitignore']);
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const entry of fs.readdirSync(root)) {
  if (skip.has(entry)) continue;
  fs.cpSync(path.join(root, entry), path.join(out, entry), { recursive: true });
}

// Live address in head tags and the 404 page.
const htmlFiles = ['index.html', 'data-bi/index.html', 'automation/index.html', '404.html'];
for (const f of htmlFiles) {
  const p = path.join(out, f);
  if (fs.existsSync(p)) fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replaceAll('%%BASE%%', base));
}

// Sitemap and robots.
const pages = ['', 'data-bi/', 'automation/'];
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nDisallow: /admin/\nSitemap: ${base}sitemap.xml\n`);
console.log(`Prepared _site for ${base}`);
