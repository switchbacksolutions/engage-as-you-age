# Engage As You Age

Website for [Engage As You Age](https://engageasyouage.com) — the preeminent senior social
interaction service in Northern California, founded by Ben Lewis in 2009. Built with Astro,
Tailwind CSS, and CloudCannon CMS; deployed on Netlify.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Tech stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Astro](https://astro.build) | ^4 | Static site generator |
| [TypeScript](https://typescriptlang.org) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | ^3 | Utility-first CSS |
| [@astrojs/mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) | ^3 | MDX support |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | ^3 | Auto sitemap |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss/) | ^4 | RSS feed |
| [Vitest](https://vitest.dev) | ^2 | Unit testing |
| [Playwright](https://playwright.dev) | ^1.49 | E2E testing |

## Scripts

```bash
npm run dev         # Start dev server at http://localhost:4321
npm run build       # Build for production → dist/
npm run preview     # Preview the production build locally
npm run check       # Run astro check + TypeScript
npm test            # Run Vitest unit tests
npm run test:e2e    # Run Playwright E2E tests
npm run test:all    # Run unit + E2E tests
```

## Project layout

```
src/
  components/     # Reusable Astro components
  content/blog/   # Markdown / MDX blog posts
  layouts/        # Page shell layouts
  pages/          # File-based routes
  styles/         # Global CSS + Tailwind layers
tests/
  e2e/            # Playwright browser tests
  unit/           # Vitest unit tests
docs/
  TESTING.md      # Testing guide
  DEPLOYMENT.md   # Deployment guide
```

## Adding a blog post

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: 'My New Post'
description: 'A short description for SEO.'
pubDate: '2024-03-01'
tags:
  - seniors
  - dementia
draft: false
---

Post content goes here.
```

## Deployment

The site is hosted on [Netlify](https://netlify.com) at `engageasyouage.com`. The `netlify.toml`
configures the build command, publish directory, Node version, security headers, and caching rules
automatically. Content is managed through [CloudCannon](https://cloudcannon.com).

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full instructions.
