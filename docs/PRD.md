**DATA WITH CYNTHIA**

**Portfolio Website**

Product Requirements Document (PRD)

| **Item** | **Detail**                                                                       |
|----------|----------------------------------------------------------------------------------|
| Product  | Three-page professional portfolio website with a browser-based editing dashboard |
| Owner    | Cynthia Chidalu Oguadimma                                                        |
| Version  | 1.1                                                                              |
| Date     | 28 October 2026                                                                  |
| Status   | Design and build complete. Content upload and launch in progress.                |
| Hosting  | GitHub Pages (free), edited through Pages CMS                                    |

**Contents**

1\. Overview

2\. Problem Statement

3\. Goals and Success Metrics

4\. Target Users

5\. Scope

6\. Information Architecture

7\. Functional Requirements

8\. Content Requirements

9\. Design Requirements

10\. Non-Functional Requirements

11\. Technical Architecture

12\. User Stories

13\. Release Plan

14\. Launch Acceptance Criteria

15\. Risks and Mitigations

16\. Open Questions and Dependencies

17\. Document History

# 1. Overview

This document defines the requirements for Cynthia Oguadimma's
professional portfolio website. The site presents her as an early-career
Data Analyst, Business Intelligence Analyst and Automation & Workflow
Specialist to recruiters and hiring managers at international,
remote-first companies and outsourcing firms.

The site has three pages: a general Home page and two specialist pages,
one for Data Analytics & BI and one for AI & Automation. Each specialist
page works as a stand-alone landing page, so Cynthia can send the page
that matches each job application. All content is stored in simple data
files and edited through Pages CMS, a browser dashboard that saves
changes to GitHub, so updates never require editing code.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Product principle</strong></p>
<p>The site should feel like a well-built report: clear hierarchy,
labelled numbers and verifiable proof. Every claim must be specific,
true and traceable to Cynthia's real experience.</p></td>
</tr>
</tbody>
</table>

# 2. Problem Statement

Cynthia is running an international remote job campaign targeting data,
BI and automation roles. Her existing portfolio and CV do not do the
following:

- Separate her two specialisms, so analyst roles and automation roles
  each see the most relevant proof first.

- Show measurable outcomes immediately. Recruiters spend under two
  minutes on a portfolio and often decide in the first few seconds.

- Signal readiness for remote work across time zones.

- Put a face to the name. Remote employers hiring across borders trust a
  real, professional photo.

- Let her add projects and update details quickly without technical
  help.

Without these, strong experience (for example, data accuracy improved
from 76% to 97%) is easy to miss, and every update depends on editing
code.

# 3. Goals and Success Metrics

## 3.1 Goals

1.  Pass the six-second test: role, location, time zone, remote
    availability and a CV button visible on a phone without scrolling.

2.  Present each specialism with its own page, metrics, projects and CV.

3.  Make every project verifiable through case studies, screenshots,
    live dashboards or code.

4.  Let Cynthia update everything from a browser in minutes.

5.  Meet international standards for speed, accessibility and search
    visibility.

## 3.2 Success metrics

Baselines for the visitor metrics are set during the first four weeks
after launch, then reviewed monthly.

| **Metric**                            | **How it is measured**                       | **Target**                                                 |
|---------------------------------------|----------------------------------------------|------------------------------------------------------------|
| Lighthouse scores (mobile)            | Chrome Lighthouse on all three pages         | Performance 90+, Accessibility, Best Practices and SEO 95+ |
| Six-second test                       | Manual check on a 360 px phone screen        | Pass on all three pages                                    |
| Portfolio visits from applications    | GoatCounter with ?ref= links in applications | Baseline in first 4 weeks, then grow monthly               |
| CV downloads                          | GoatCounter event                            | Baseline in first 4 weeks                                  |
| Case study opens                      | GoatCounter event                            | Baseline in first 4 weeks                                  |
| Interviews that mention the portfolio | Cynthia's application tracker                | Tracked per application                                    |
| Time to publish a new project         | From opening the editor to live              | Under 15 minutes                                           |

# 4. Target Users

| **User**                        | **What they need**                                                             | **Where they land**                                       |
|---------------------------------|--------------------------------------------------------------------------------|-----------------------------------------------------------|
| Recruiter or talent screener    | Role, location, availability and CV within seconds, usually on a phone         | Home or a specialist page from LinkedIn or an application |
| Hiring manager (data or BI)     | Proof of data cleaning, modelling and dashboards; real figures                 | Data & BI page                                            |
| Hiring manager (automation)     | Working workflows, error handling, honest use of AI                            | AI & Automation page                                      |
| Outsourcing firm recruiter      | Remote readiness: communication, time-zone overlap, reliability, documentation | Home page, How I Work section                             |
| Cynthia (site owner and editor) | Add projects, screenshots, CVs and links without code                          | Pages CMS editor and the /admin/ shortcut                 |

# 5. Scope

## 5.1 In scope

- Three public pages: Home, Data Analytics & BI, AI & Automation.

- Project cards with filters and full case study views.

- Experience timeline, skills, certifications, writing and
  recommendations sections.

- CV downloads (general and one per specialism), contact form and email
  contact.

- Browser-based editing through Pages CMS, with a private /admin/
  shortcut page.

- Automatic deployment to GitHub Pages with a content check on every
  change.

- Search engine and social sharing setup, privacy-friendly analytics.

## 5.2 Out of scope

- Blog or article system (writing links point to LinkedIn instead).

- Light and dark theme switch, chatbot, visitor counters.

- Any data, screenshot or dashboard from Koins Microfinance Bank or
  other employers.

- Paid services or a backend server.

# 6. Information Architecture

| **Page**            | **Address**  | **Sections in order**                                                                                                                                                                                     |
|---------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Home (General)      | /            | Hero with 3 headline figures and pipeline drawing; Two specialisms; About; How I work; Featured work; Experience; Certifications; Writing; Recommendations; CV and Contact                                |
| Data Analytics & BI | /data-bi/    | Hero with star schema drawing and 3 figures; What I do; Skills and tools; Projects with filters; Relevant experience; Relevant certifications; Contact strip                                              |
| AI & Automation     | /automation/ | Hero with pipeline drawing and 3 figures; How I build automations; Where AI fits; Workflow showcase; Skills and tools; Projects with filters; Relevant experience; Relevant certifications; Contact strip |
| Editor shortcut     | /admin/      | Private page (not indexed) with a button to Pages CMS and editing steps                                                                                                                                   |
| Not found           | 404          | Branded page linking to the three main pages                                                                                                                                                              |

Navigation on every page: Data with Cynthia wordmark (Home), Data & BI,
AI & Automation, Experience, Contact, and a Download CV button that
stays visible on mobile. Specialist pages also have a sticky in-page
menu.

# 7. Functional Requirements

Priority: Must (required for launch), Should (expected soon after
launch), Could (nice to have). Status shows where each item stands
today.

## 7.1 Global

| **ID**   | **Requirement**                                                                                                              | **Priority** | **Status**          |
|----------|------------------------------------------------------------------------------------------------------------------------------|--------------|---------------------|
| **G-01** | Shared header, footer and navigation on all pages, rendered from content files                                               | Must         | Built               |
| **G-02** | CV button always visible, including on mobile, and matched to the page (general, Data & BI or Automation CV)                 | Must         | Built               |
| **G-03** | When no CV is uploaded, CV buttons read "Request my CV" and open an email                                                    | Must         | Built               |
| **G-04** | Empty fields and sections are hidden; no "N/A", "Coming soon" or blank boxes                                                 | Must         | Built               |
| **G-05** | Section numbering never skips when a section is hidden                                                                       | Should       | Built               |
| **G-06** | Back-to-top button and skip-to-content link                                                                                  | Should       | Built               |
| **G-07** | Professional headshot in the hero of all three pages, with a thin gold ring (beside the text on desktop, above it on mobile) | Must         | Built; photo needed |

## 7.2 Home page

| **ID**   | **Requirement**                                                                                                 | **Priority** | **Status**             |
|----------|-----------------------------------------------------------------------------------------------------------------|--------------|------------------------|
| **H-01** | Hero: full name, title line, tagline, location, time zone, availability and two buttons to the specialist pages | Must         | Built                  |
| **H-02** | Three headline figures in dashboard style, counting up once on load                                             | Must         | Built                  |
| **H-03** | Line drawing of the real 8-step recruitment pipeline in the hero                                                | Should       | Built                  |
| **H-04** | Two specialism cards with proof points, tools and links                                                         | Must         | Built                  |
| **H-05** | About text with the Data to Business Impact flow                                                                | Must         | Built                  |
| **H-06** | How I work: async communication, documentation, time-zone overlap, accuracy                                     | Must         | Built                  |
| **H-07** | Featured work: projects marked "Feature on Home page"                                                           | Must         | Built                  |
| **H-08** | Full experience timeline with employment type badges and confidentiality note                                   | Must         | Built; types pending   |
| **H-09** | Certifications: completed first, then "Currently learning"                                                      | Must         | Built                  |
| **H-10** | Writing list and recommendations, each hidden until content exists                                              | Should       | Built; content pending |

## 7.3 Data Analytics & BI page

| **ID**   | **Requirement**                                                                     | **Priority** | **Status** |
|----------|-------------------------------------------------------------------------------------|--------------|------------|
| **D-01** | Hero with track title, tagline, Data & BI figures and Data & BI CV button           | Must         | Built      |
| **D-02** | What I do: four capability cards                                                    | Must         | Built      |
| **D-03** | Skills limited to data and BI groups                                                | Must         | Built      |
| **D-04** | Projects tagged Data & BI, with filters: Dashboards, SQL & Data Cleaning, Reporting | Must         | Built      |
| **D-05** | Relevant experience: only achievements tagged Data & BI                             | Must         | Built      |
| **D-06** | Works as a stand-alone landing page for applications                                | Must         | Built      |

## 7.4 AI & Automation page

| **ID**   | **Requirement**                                                                      | **Priority** | **Status**                    |
|----------|--------------------------------------------------------------------------------------|--------------|-------------------------------|
| **A-01** | Hero with automation figures, pipeline drawing and Automation CV button              | Must         | Built                         |
| **A-02** | Six-step build method strip                                                          | Must         | Built                         |
| **A-03** | "Where AI fits" section, shown only for projects with a confirmed AI step            | Must         | Built; hidden until confirmed |
| **A-04** | Workflow showcase: diagrams built from each project's steps, flagship first          | Must         | Built                         |
| **A-05** | Projects with filters: n8n, Make, AI-assisted (filters with no projects are hidden)  | Must         | Built                         |
| **A-06** | Page title editable (e.g. change to "Automation & Workflows" if no AI step is shown) | Should       | Built                         |

## 7.5 Projects and case studies

| **ID**   | **Requirement**                                                                                                                    | **Priority** | **Status**           |
|----------|------------------------------------------------------------------------------------------------------------------------------------|--------------|----------------------|
| **P-01** | Project cards show track, flagship badge, context badge, summary and tools                                                         | Must         | Built                |
| **P-02** | Designed fallback visual (mini workflow or dashboard outline) until a screenshot is uploaded                                       | Must         | Built                |
| **P-03** | Case study view: problem, objective, approach, tools, process, workflow, AI use, before and after, results, impact, screens, links | Must         | Built                |
| **P-04** | Each result labelled Measured or Projected                                                                                         | Must         | Built                |
| **P-05** | Case studies have shareable links (#project-id) on any page                                                                        | Should       | Built                |
| **P-06** | Power BI dashboards load inside the case study only when the visitor clicks                                                        | Should       | Built; links pending |
| **P-07** | "Show on site" switch to prepare a project before publishing                                                                       | Must         | Built                |
| **P-08** | One project can appear on both specialist pages                                                                                    | Should       | Built                |

## 7.6 Contact and CV

| **ID**   | **Requirement**                                                                              | **Priority** | **Status**              |
|----------|----------------------------------------------------------------------------------------------|--------------|-------------------------|
| **C-01** | CV strip with Download CV and LinkedIn buttons                                               | Must         | Built                   |
| **C-02** | Contact details with a copy-email button                                                     | Must         | Built                   |
| **C-03** | Formspree contact form with validation, spam protection and clear success and error messages | Should       | Built; endpoint pending |
| **C-04** | If no form is connected, an "Email me directly" button shows instead                         | Must         | Built                   |

## 7.7 Editing dashboard (Pages CMS)

| **ID**   | **Requirement**                                                                                                                             | **Priority** | **Status**          |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|--------------|---------------------|
| **M-01** | Forms for every content file: site settings, three pages, projects, experience, education, skills, certifications, writing, recommendations | Must         | Built and validated |
| **M-02** | Upload screenshots, headshot and CV PDFs from the editor                                                                                    | Must         | Built               |
| **M-03** | Every field has plain-language help text, including the no-em-dash rule                                                                     | Should       | Built               |
| **M-04** | Lists can be reordered; order in the editor is order on the site                                                                            | Must         | Built               |
| **M-05** | Saving publishes automatically within two to three minutes                                                                                  | Must         | Built               |
| **M-06** | Private /admin/ shortcut page, excluded from search engines                                                                                 | Should       | Built               |

# 8. Content Requirements

## 8.1 Integrity rules

- Only real employers, dates, projects, tools, certifications and
  figures. Nothing invented, rounded up or improved.

- Every project shows its context: Professional, Personal project,
  Training programme or Data challenge.

- Projected figures are always labelled "Projected".

- Every employment entry shows its type (Full-time, Contract, Part-time,
  Freelance), so overlapping dates read clearly.

- No employer data, screenshots or dashboards. Public or synthetic
  datasets only.

- No em dashes in any site text. The deploy check blocks them.

- Recommendations only if real and used with permission.

## 8.2 Content inventory

| **Content**                 | **Current state**                                                                                     |
|-----------------------------|-------------------------------------------------------------------------------------------------------|
| Projects                    | 10 defined: 8 published (4 Data & BI, 4 Automation, one shown on both), 2 hidden pending confirmation |
| Experience                  | 5 roles defined: 4 published, Binxiang hidden pending confirmation                                    |
| Skills                      | 5 groups, tagged by page                                                                              |
| Certifications              | 5 completed, 3 in progress                                                                            |
| Headline figures            | 3 per page, all from confirmed CV achievements                                                        |
| Headshot                    | Required for launch; not yet supplied                                                                 |
| Screenshots                 | None yet; designed fallbacks in place                                                                 |
| CV files                    | None yet; current CV to be uploaded (the stored May 2026 version is out of date)                      |
| Writing and recommendations | Empty; sections hidden                                                                                |

# 9. Design Requirements

| **Element** | **Requirement**                                                                                                                                                              |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Concept     | "The well-built report": clear hierarchy, labelled numbers, consistent grid, calm colour                                                                                     |
| Colour      | Navy for heroes, showcase and footer; warm off-white for reading sections; gold for figures and main buttons; teal for Data & BI; royal blue for Automation. Matches the CV. |
| Type        | IBM Plex Sans for text; IBM Plex Mono for figures, dates and tool tags                                                                                                       |
| Brand       | "Data with Cynthia" wordmark and DC monogram in navigation, footer and favicon                                                                                               |
| Motion      | Subtle and one-time only: section fade-in, pipeline drawing, figure count-up. Switched off for visitors who reduce motion.                                                   |
| Avoid       | Stock photos, skill percentage bars, logo walls, typewriter effects, emojis, words like "passionate" or "aspiring"                                                           |
| Layout      | Works from 360 px phones to wide desktops with no sideways scrolling                                                                                                         |

# 10. Non-Functional Requirements

| **Area**        | **Requirement**                                                                                                                 |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------|
| Performance     | Lighthouse Performance 90+ on mobile; under 500 KB per page before screenshots; images lazy-loaded; dashboards load on click    |
| Accessibility   | WCAG AA contrast; full keyboard use; visible focus; skip link; screen reader labels; reduced-motion support                     |
| SEO and sharing | Unique title and description per page; Open Graph images per page; canonical links; sitemap; robots.txt; Person structured data |
| Reliability     | Content check runs before every deploy; a broken edit never replaces the live site                                              |
| Privacy         | No cookies; GoatCounter analytics without personal data; no employer information                                                |
| Security        | Static site, no server or database; editor access through GitHub sign-in only                                                   |
| Maintainability | All content in data files; colours and fonts in one tokens file; README for setup and editing                                   |
| Portability     | Works on github.io, a repository sub-path or a custom domain without code changes                                               |

# 11. Technical Architecture

| **Layer**    | **Choice**                                                                                              |
|--------------|---------------------------------------------------------------------------------------------------------|
| Front end    | Plain HTML, CSS and JavaScript modules; no framework or build tools                                     |
| Content      | 11 JSON files in content/, loaded by the browser                                                        |
| Editor       | Pages CMS (app.pagescms.org), configured by .pages.yml                                                  |
| Hosting      | GitHub Pages                                                                                            |
| Deployment   | GitHub Actions on every save: check content, insert live address, write sitemap and robots.txt, publish |
| Contact form | Formspree (free plan)                                                                                   |
| Analytics    | GoatCounter (optional, free)                                                                            |
| Domain       | github.io address at launch; custom domain such as datawithcynthia.com optional                         |

# 12. User Stories

1.  As a recruiter on my phone, I want to see Cynthia's role, time zone
    and availability immediately, so I can decide whether to keep
    reading.

2.  As a BI hiring manager, I want to open a live dashboard from a case
    study, so I can judge her work directly.

3.  As an automation hiring manager, I want to see each workflow's
    steps, error handling and where AI is used, so I can tell real skill
    from buzzwords.

4.  As an outsourcing recruiter, I want to know how she communicates and
    which time zones she covers, so I can place her with the right
    client.

5.  As Cynthia, I want to add a new project with screenshots from my
    browser in under 15 minutes, so my portfolio stays current during my
    job campaign.

6.  As Cynthia, I want to send a different page with each application,
    so every hiring manager sees the most relevant proof first.

# 13. Release Plan

| **Phase**            | **Work**                                                                                                                   | **Status**  |
|----------------------|----------------------------------------------------------------------------------------------------------------------------|-------------|
| 1\. Design and build | Three pages, editor configuration, deploy pipeline, social images, README                                                  | Complete    |
| 2\. Setup            | Create GitHub repository, upload files, switch on Pages, connect Pages CMS                                                 | Next        |
| 3\. Content          | Upload current CV and headshot; resolve open questions; add screenshots and links to flagship projects                     | In progress |
| 4\. Launch           | Run the acceptance checklist; replace the old portfolio link on LinkedIn and the CV                                        | Pending     |
| 5\. Improve          | Connect Formspree and GoatCounter; add writing links and recommendations; consider a custom domain; review metrics monthly | Pending     |

# 14. Launch Acceptance Criteria

- All three pages pass the six-second test on a 360 px phone.

- Lighthouse targets met on all three pages.

- Current CV uploaded, and every fact on the site matches it.

- Professional headshot uploaded and showing on all three pages.

- Both flagship projects (Pharmacy dashboard, Recruitment automation)
  have screenshots and at least one link.

- No placeholder text, open questions or em dashes visible anywhere.

- Every link and button tested on phone and laptop.

- Editing test passed: change a field in Pages CMS and see it live
  within three minutes.

- LinkedIn link preview checked with LinkedIn Post Inspector.

# 15. Risks and Mitigations

| **Risk**                                          | **Impact**                           | **Mitigation**                                                                          |
|---------------------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------|
| Projects launch without screenshots or live links | Proof feels thin to hiring managers  | Prioritise the two flagship projects; designed fallbacks keep the site looking finished |
| "AI" in the page title without visible AI work    | Credibility questioned in interviews | "Where AI fits" shows only confirmed AI steps; title can be renamed in the editor       |
| Overlapping employment dates                      | Screeners may suspect padding        | Employment type badge on every role                                                     |
| CV and site out of sync                           | Recruiters notice mismatched figures | Single source of facts; checklist item before launch and after each CV update           |
| Employer data exposed in screenshots              | Confidentiality breach               | Rule in editor help text; public or synthetic data only                                 |
| A content edit breaks the site                    | Site down during applications        | Automatic content check; live site keeps the last good version                          |
| Two portfolios online at once                     | Confusing for recruiters             | Retire or redirect datascienceportfol.io at launch                                      |

# 16. Open Questions and Dependencies

These items are hidden or left blank on the site until Cynthia confirms
them.

| **\#** | **Item**                                         | **Needed from Cynthia**                                                                                |
|--------|--------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| 1      | Pharmacy dashboard                               | Public Power BI link, LinkedIn post link, key findings, other tools used                               |
| 2      | Sales Performance Analysis                       | Personal project or professional work                                                                  |
| 3      | Layoffs pipeline                                 | GitHub link for the SQL scripts                                                                        |
| 4      | Recruitment automation                           | Tools beyond n8n, Google Forms and Gmail; whether an AI model is used and for what                     |
| 5      | WhatsApp customer journey workflow               | Context, steps, WhatsApp provider, bugs fixed                                                          |
| 6      | Daily sales reporting and error-handling rebuild | Make or n8n; training or personal                                                                      |
| 7      | Bank statement workflow                          | Safe to show publicly; personal or work                                                                |
| 8      | Binxiang Project (Javiscam) role                 | Include or leave out                                                                                   |
| 9      | Employment types                                 | Koins, Binxiang and Eleganza                                                                           |
| 10     | Remote setup                                     | Backup power and internet: yes or no                                                                   |
| 11     | Writing and recommendations                      | LinkedIn post links; any real recommendations                                                          |
| 12     | Files                                            | Current CV (general, and optional Data & BI and Automation versions); professional headshot (required) |

# 17. Document History

| **Version** | **Date**    | **Change**                                                                   |
|-------------|-------------|------------------------------------------------------------------------------|
| 1.0         | 28 Oct 2026 | First PRD, written after the design and build phase                          |
| 1.1         | 28 Oct 2026 | Professional headshot made a launch requirement and shown on all three pages |
