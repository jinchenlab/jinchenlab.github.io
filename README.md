# Chen Lab website

Source for **https://jinchenlab.com** — the Chen Lab site at Altos Labs
(Bay Area Institute of Science, Redwood City) and UT Southwestern
Medical Center (Dallas).

## Stack

- [Astro 5](https://astro.build/) static site generator, TypeScript-ready
- Vanilla CSS with custom properties in `src/styles/tokens.css`
- Google Fonts: Figtree · Open Sans · Source Code Pro
- Deployed via GitHub Actions to `gh-pages` → served by GitHub Pages
- Custom domain `jinchenlab.com` (DNS at SquareSpace, A records point
  at GitHub Pages' four anycast IPs)

## Structure

```
public/                          # copied verbatim into dist/
├── .nojekyll                    # tells GitHub Pages NOT to run Jekyll
├── CNAME                        # jinchenlab.com — configures custom domain
├── robots.txt                   # allows crawlers, links to sitemap
├── favicon.svg + favicon-32.png # gene-network cartoon icon (also
│                                  apple-touch-icon.png, icon-192.png,
│                                  icon-512.png)
└── images/                      # site imagery
    ├── team/jin-chen.webp       # PI photo (400x400)
    └── news/                    # 3 images used on the news timeline

src/
├── layouts/BaseLayout.astro     # persistent nav + footer + design tokens
├── components/Waddington.astro  # Waddington landscape SVG (home page)
├── pages/                       # one file per route (see below)
└── styles/tokens.css            # design tokens

.github/workflows/deploy.yml     # CI: build on push, force-push dist/ to gh-pages
astro.config.mjs                 # site URL, sitemap integration, dev port
```

### Pages

| Route | File | What's editable |
|---|---|---|
| `/` | `src/pages/index.astro` | Hero, mission, overview, research pillar cards, Selected publications, Latest news, Honors — most content as arrays at the top of the file |
| `/publications/` | `src/pages/publications.astro` | Publications grouped by three eras (2020–present / 2016–2020 / 2010–2016). All ~40 entries as one flat `eras` array. |
| `/team/` | `src/pages/team.astro` | PI card + `members` array + `alumni` array |
| `/news/` | `src/pages/news.astro` | Timeline entries as a flat `news` array. Each item can carry an optional `image` and `imageStyle` ('logo' or 'photo'). |
| `/contact/` | `src/pages/contact.astro` | Address + Contact us button |

## Local development

Requires Node 20+ (Node 22 recommended).

```bash
npm install                # first time only
npm run dev                # http://localhost:4321
npm run build              # production build → dist/
npm run preview            # serve the build locally for a final check
```

## Editing content

Content lives inline in each `src/pages/*.astro` file as data arrays at
the top of the frontmatter — publications, team members, news items,
honors. Change the array, save, `git push`. CI rebuilds and deploys in
~2 minutes.

**Adding a publication:** open `src/pages/publications.astro`, find the
appropriate era block, add a new entry with `year`, `authors`, `title`,
`venue`, and optionally `note` / `selected: true`.

**Adding a news item:** open `src/pages/news.astro`, add a new object at
the top of the `news` array (items are listed newest-first). Fields:
`date`, `text`, and optional `image` + `alt` + `imageStyle`.

**Adding a team member:** open `src/pages/team.astro`, add a new object
to the `members` array with `name`, `role`, `since`, `initials`.

**Changing colors / fonts:** edit `src/styles/tokens.css` — everything
uses CSS custom properties, so one change flows to every page.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. Checks out the repo, sets up Node 22
2. Runs `npm ci` then `npm run build`
3. `touch dist/.nojekyll` (belt-and-suspenders — some deploy actions
   drop dotfiles; the .nojekyll file must be present so GitHub Pages
   doesn't route through Jekyll and strip `/_astro/`)
4. Force-pushes `dist/` to `gh-pages` via `JamesIves/github-pages-deploy-action@v4`
5. GitHub Pages picks up the new `gh-pages` head and serves within seconds

**GitHub Pages settings must be:**
- Source: `gh-pages` branch, `/ (root)` folder
- Custom domain: `jinchenlab.com`
- Enforce HTTPS: enabled once Let's Encrypt provisions the cert

## Adding new pages

1. Create `src/pages/whatever.astro`, wrap content in `<BaseLayout title="..." active="research|publications|team|news|contact">`
2. Add a nav entry in `src/layouts/BaseLayout.astro` (the `navItems` array
   at the top of the frontmatter)
3. Optionally: add page to `src/pages/index.astro`'s cross-links

The sitemap integration (`@astrojs/sitemap`) picks up new routes
automatically on the next build.

## Design system

Follows the Altos Labs Design System (spec in
`../design_handoff_chen_lab_site/README.md`):

- **Fonts:** Figtree (headings, weight 500/600), Open Sans (body, 400/600),
  Source Code Pro (mono: years, tokens, code)
- **Brand colors:** green `#259851` primary, teal `#2E8E84` secondary,
  dark canvas `#242928`
- **Layout:** content max-width 1180px, horizontal padding 40px, section
  vertical padding ~88px, sticky nav 72px with backdrop blur
- **Radii:** cards 12px, buttons 8px, pills 9999px
- **Sentence case everywhere** — never Title Case headings

## SEO / search indexing

- `<title>` and `<meta name="description">` per page via `BaseLayout` props
- Sitemap at `/sitemap-index.xml` (auto-generated by `@astrojs/sitemap`)
- `robots.txt` allows all crawlers and points to the sitemap
- Registered at Google Search Console for jinchenlab.com; submit new
  URLs via URL Inspection → Request Indexing for faster crawls

## Known limitations / one-time gotchas

- **`.nojekyll` file is critical.** GitHub Pages runs Jekyll by default,
  which excludes any directory starting with `_` — including Astro's
  `_astro/` output. If `.nojekyll` ever disappears from `gh-pages`, all
  CSS + JS assets 404 and the site renders unstyled. The workflow's
  explicit `touch dist/.nojekyll` step guards against this.
- **HTTPS cert provisioning takes 10–60 min** after DNS check passes.
  During that window Chrome/Safari show "not secure." Once provisioned,
  enable "Enforce HTTPS" in Settings → Pages.
- **Browser favicon caching** is aggressive. When changing the icon,
  close all tabs of jinchenlab.com and reopen (or hard-refresh in
  incognito) to see the new one.
