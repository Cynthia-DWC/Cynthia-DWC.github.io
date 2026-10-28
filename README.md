# Data with Cynthia: Portfolio Website

Three-page portfolio for Cynthia Chidalu Oguadimma, hosted free on GitHub Pages and edited in the browser with Pages CMS.

| Page | Address | Send it with |
|---|---|---|
| Home (General) | `/` | General applications, LinkedIn, networking |
| Data Analytics & BI | `/data-bi/` | Data Analyst, BI Analyst, Reporting Analyst applications |
| AI & Automation | `/automation/` | Automation Specialist and workflow roles |

All words, figures, projects and files live in the `content/` folder. You change them through the editor, never in code.

---

## 1. First-time setup (about 15 minutes, once)

### 1a. Put the site on GitHub
1. Sign in at github.com and click **New repository**.
2. Name it **`<your-username>.github.io`** (for example `cynthiaoguadimma.github.io`). This gives you the cleanest address. Any other name also works; the address then becomes `<your-username>.github.io/<repo-name>/`.
3. Choose **Public**, then **Create repository**.
4. On the new repository page, click **uploading an existing file**. Unzip the site folder on your computer, open it, select everything inside it (including the `.github` folder and the `.pages.yml` and `.nojekyll` files), and drag it into the browser. Click **Commit changes**.
   - On a Mac, press `Cmd + Shift + .` in Finder to show hidden files that start with a dot. On Windows, tick **View → Hidden items**.

### 1b. Switch on GitHub Pages
1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab. A run called "Deploy portfolio" starts (if not, click it, then **Run workflow**). When it shows a green tick, your site is live at the address in Settings → Pages.

### 1c. Connect the editor (Pages CMS)
1. Go to **app.pagescms.org** and click **Sign in with GitHub**.
2. When asked, install the Pages CMS GitHub App and give it access to your portfolio repository only.
3. Open your repository in Pages CMS. You will see: Site settings, Home page, Data & BI page, Automation page, Projects, Experience, Education, Skills, Certifications, Writing, Recommendations.
4. Bookmark it. The site also has a private shortcut page at `/admin/` with a button to the editor.

---

## 2. Everyday editing

1. Open app.pagescms.org and your repository.
2. Choose the section, make your change, click **Save**.
3. Wait two to three minutes, then refresh your site.

Rules that keep the site consistent:
- No em dashes. Use commas, colons or full stops. The deploy check stops any content containing one.
- Leave a field empty to hide it. Empty sections, buttons and badges never show.
- Use public or synthetic data only in screenshots. Never upload anything from an employer.

### Add or finish a project
1. **Projects** → open the project (or **Add an entry**).
2. Fill in the case study fields. Mark each result as **measured** or **projected**.
3. Upload a **Card screenshot** (16:9, about 1280 x 720 px, under 300 KB; compress at squoosh.app or tinypng.com) and write a **Screenshot description**.
4. Add links: live dashboard, code (GitHub) or write-up (LinkedIn post).
5. Switch on **Show on site** and save.
   - Projects with **Show on site** off are kept but hidden. Use this to prepare a project before it goes live.
   - **Show on page** decides which specialist page lists it. A project can be on both.
   - **Filter tags** must match the page filters: Dashboards, SQL & Data Cleaning, Reporting, n8n, Make, AI-assisted.
   - If you fill in **Where AI is used**, the project also appears in the "Where AI fits" section of the Automation page.

### Upload your CVs
**Site settings → CV files.** Upload a PDF for General, and optionally separate Data & BI and Automation CVs. While the General CV is empty, every CV button reads **Request my CV** and opens an email to you.

### Add your headshot
**Site settings → Headshot photo.** A square, professional photo of at least 440 x 440 px.

### Reorder anything
In any list (projects, experience, skills), drag items into the order you want. Order in the editor is the order on the site.

---

## 3. Optional extras

### Contact form (Formspree, free plan)
1. Create an account at formspree.io and click **New form**.
2. Copy the form address (it looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into **Site settings → Formspree form URL** and save. The form replaces the email button on the Home page.

### Visitor analytics (GoatCounter)
1. Sign up at goatcounter.com and choose a code, e.g. `datawithcynthia`.
2. Put that code in **Site settings → Analytics → GoatCounter code**.
3. The site records page views, CV downloads, case study opens and dashboard clicks.
4. Add `?ref=company-name` to links you send in applications (e.g. `.../automation/?ref=scalearmy`) to see which applications led to a visit.

### Custom domain (e.g. datawithcynthia.com)
1. Buy the domain from any registrar.
2. In GitHub, **Settings → Pages → Custom domain**, enter it and save. GitHub shows the DNS records to add at your registrar.
3. Tick **Enforce HTTPS** once it becomes available. No code changes are needed; the deploy step uses the new address automatically.

---

## 4. If something goes wrong

- **A change did not appear.** Open the **Actions** tab. A red cross means the content check found a problem; click the run to read the message (for example a duplicate project ID or an em dash). Fix it in the editor and save again. The live site keeps the last good version in the meantime.
- **Undo a change.** In GitHub, open the file in `content/`, click **History**, open the earlier version, then copy its text back. Or ask for help reverting the commit.
- **Page shows "could not load its content".** The site was opened as a file on your computer. Use the live address, or run it locally (below).

---

## 5. Where things live (for whoever maintains the code)

```
index.html, data-bi/index.html, automation/index.html   page shells and <head> metadata
admin/index.html                                        private editor shortcut (not indexed)
404.html                                                not-found page
content/*.json                                          all content (edited through Pages CMS)
.pages.yml                                              editor forms for content/
css/tokens.css                                          colours, fonts, spacing
css/main.css                                            layout and components
js/                                                     rendering (main.js is the entry point)
assets/cv, assets/uploads                               files uploaded through the editor
assets/og                                               social preview images (1200 x 630)
.github/workflows/deploy.yml                            deploy on every push to main
.github/scripts/prepare.mjs                             content check, live address, sitemap, robots.txt
```

- **Page titles and descriptions** for search and link previews are in the `<head>` of the three `index.html` files. `%%BASE%%` is replaced with the live address during deploy; leave it as is.
- **Colours and fonts:** change the variables in `css/tokens.css`.
- **Run locally:** in the site folder run `python3 -m http.server 8000`, then open `http://localhost:8000`.

---

## 6. Items awaiting confirmation

These are left out or hidden until confirmed:

1. **Pharmacy dashboard:** public Power BI link, LinkedIn post link, key findings, other tools used.
2. **Sales Performance Analysis:** personal project or professional work (context label is hidden).
3. **Layoffs pipeline:** GitHub link for the SQL scripts.
4. **Recruitment automation:** any tools beyond n8n, Google Forms and Gmail; whether an AI model is used, and for what.
5. **WhatsApp customer journey workflow:** hidden. Needs context, steps, WhatsApp provider and the bugs fixed.
6. **Daily sales reporting and error-handling rebuild:** Make or n8n, and context (training or personal). Tool tags and context labels are hidden.
7. **Bank statement workflow:** hidden. Confirm it is safe to show and whether it is personal or work.
8. **Binxiang Project (Javiscam) role:** hidden in Experience. Switch on **Show on site** to include it.
9. **Employment type** for Koins, Binxiang and Eleganza (badge hidden).
10. **Backup power and internet** for the How I Work section (add a fifth item with the "power" icon if true).
11. **Writing links** (pharmacy findings, data schema post, PL-300 journey) and any **recommendations**.
12. **CV files** and **headshot**.

## 7. Pre-launch checklist

- [ ] Current CV uploaded and its facts match the site
- [ ] Every link clicked on all three pages, on a phone and a laptop
- [ ] At least the flagship projects have screenshots
- [ ] Lighthouse run on all three pages (Chrome DevTools → Lighthouse)
- [ ] Old portfolio link (datascienceportfol.io) replaced on LinkedIn and the CV
- [ ] Link preview checked with LinkedIn Post Inspector (linkedin.com/post-inspector)
