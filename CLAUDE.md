# CLAUDE.md: Data with Cynthia portfolio

Briefing for Claude Code. Read this first, then `docs/PRD.md` (the product requirements) and `README.md` (setup and editing).

## What this is
A static, three-page portfolio for Cynthia Chidalu Oguadimma (Data Analyst, BI and Automation, Lagos, GMT+1), hosted on GitHub Pages and edited by Cynthia through Pages CMS (app.pagescms.org).

- `/` Home (general), `/data-bi/` Data Analytics & BI, `/automation/` AI & Automation, `/admin/` private editor shortcut.
- **Status:** design and build are complete and tested at 360 px and 1440 px. Remaining work is setup, content (CV, headshot, screenshots, links) and the open questions in PRD section 16 and README section 6.

## Architecture
- Plain HTML, CSS and ES modules. No framework, no npm dependencies, no build step for the site itself.
- All content lives in `content/*.json` and is rendered in the browser by `js/`. Projects are a Pages CMS collection: one file per project in `content/projects/<id>.json` with an `order` field; `prepare.mjs` combines them into `_site/content/projects.json` at deploy. Entry point `js/main.js`; page chosen by `<body data-page>`.
- `.pages.yml` defines the Pages CMS forms. **Every key in a content file must have a matching field in `.pages.yml`**, or Pages CMS may drop it on save. It was validated against Pages CMS's own schema (no `list: {min,max}` without `collapsible`).
- Paths in JSON are site-root-relative with no leading slash; `js/util.js` resolves them from `import.meta.url`, so the site works at a domain root or a repository sub-path.
- `.github/workflows/deploy.yml` runs `.github/scripts/prepare.mjs` on every push to `main`: validates JSON, blocks em dashes, copies the site to `_site`, replaces `%%BASE%%` with the live URL, writes `sitemap.xml` and `robots.txt`. `docs/`, `CLAUDE.md` and `README.md` are not deployed.
- Design tokens (colours, fonts, spacing) are in `css/tokens.css`. Concept: "the well-built report". Navy heroes, paper reading sections, gold for figures and primary buttons, teal for Data & BI, royal blue for Automation. IBM Plex Sans and IBM Plex Mono.

## Rules (non-negotiable)
1. **Never invent facts.** Only use employers, dates, projects, tools, figures and certifications already in `content/` or confirmed by Cynthia. No rounding up, no new metrics, no invented workflow steps or AI usage.
2. **No em dashes** in any site copy or document. Use commas, colons, semicolons or full stops; use a hyphen or "to" for ranges.
3. **Empty means hidden.** Never show placeholder text, "N/A", "Coming soon" or empty boxes. Leave a field empty and the UI hides it.
4. **Honest framing:** every project has a context (Professional, Personal project, Training programme, Data challenge); projected results use `"basis": "projected"`; employment entries show their type.
5. **No employer data:** no screenshots, dashboards or data from Koins Microfinance Bank or any employer. Public or synthetic data only.
6. Hidden items use `"published": false` (projects, experience). Do not publish them until Cynthia confirms.
7. Cynthia's documents (CVs, cover letters, PRDs) are delivered as .docx by default, with fully justified body text.

## Run and test locally
```bash
node .github/scripts/prepare.mjs http://localhost:8000/   # builds _site (needed: projects.json is generated)
cd _site && python3 -m http.server 8000                    # then open http://localhost:8000; rm -rf _site when done
```
Check every page at 360 px and 1440 px for horizontal overflow and console errors after changes.

## Likely next tasks
- Push to `<username>.github.io`, set Settings → Pages → Source: GitHub Actions, confirm the first deploy.
- Help Cynthia connect Pages CMS to the repository.
- Add her headshot to `assets/uploads/` (square, compressed, at least 440 px) and set `config.headshot`.
- Add her current CV PDF(s) under `assets/cv/` and set `config.cv`.
- Resolve the open questions and switch hidden items on as they are confirmed.
