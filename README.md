# Chen Lab website

Source for the Chen Lab website (Altos Labs · Bay Area Institute of Science).

**Live URL:** https://jinchenlab.github.io (planned custom domain: https://jinchenlab.com)

## Stack

- [Astro 5](https://astro.build/) static site generator
- Vanilla CSS with CSS custom properties (design tokens in `src/styles/tokens.css`)
- Deployed via GitHub Actions to the `gh-pages` branch

## Local development

Requires Node 20+ (Node 22 recommended).

```bash
npm install
npm run dev   # dev server at http://localhost:4321
npm run build # production build to ./dist
```

## Structure

```
src/
├── layouts/BaseLayout.astro    # Persistent nav + footer + design token loader
├── components/Waddington.astro # The Waddington epigenetic landscape SVG
├── pages/                      # One file per route
│   ├── index.astro             # Home (Research)
│   ├── publications.astro
│   ├── team.astro
│   ├── news.astro
│   └── contact.astro
└── styles/tokens.css           # Design tokens (colors, fonts, spacing)
public/
└── .nojekyll                   # Tells GitHub Pages to serve build output as-is
```

## Design system

Follows the Altos Labs Design System (Figtree + Open Sans + Source Code Pro; brand green `#259851`, teal `#2E8E84`, dark canvas `#242928`; 1180px content max-width). Full spec in `design_handoff_chen_lab_site/README.md` in the sibling directory.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and force-pushes the `dist/` output to `gh-pages`. GitHub Pages Settings source must be set to `gh-pages` branch, root folder.

## Editing content

Content lives inline in each `src/pages/*.astro` file as data arrays at the top of the frontmatter — publications, team members, news items, honors. Edit those arrays and the pages regenerate on rebuild.
