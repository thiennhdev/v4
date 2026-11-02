# thiennh.dev

Personal portfolio of **Nguyen Hoang Thien**, Backend Software Engineer (Go & Java).

Built with **Vite + React 19 + TypeScript**. It's plain CSS with design tokens: a warm paper palette, one clay accent and serif headlines, with light and dark themes.

## Features

- **Hero** with current role, a short summary, impact stats and a CV download
- **Experience** as keyboard-accessible tabs, each with metric cards, bullets and the stack used
- **Skills explorer**: skills are grouped by area and marked _core_, _strong_ or _familiar_. Pick a skill to see the jobs and projects where it was used, then jump straight to them
- **Projects**: two featured systems, each with an architecture flow, plus open-source repos
- Education, certifications and an award section
- **⌘K / Ctrl K quick-jump menu** to jump to a section, copy the email, open the résumé or switch the theme
- Light/dark theme that follows the system and remembers your choice, with no flash on load
- Scroll reveal that respects `prefers-reduced-motion`; SEO meta, Open Graph image and JSON-LD

## Editing content

All content lives in **[`src/data/profile.ts`](src/data/profile.ts)**: profile, stats, jobs, projects, skills, education and certifications. Components only render that data.

- Résumé PDF: `public/Nguyen_Hoang_Thien_Software.pdf` (path set in `profile.resume`)
- Portrait / award photos: `src/assets/`
- Colors & typography: tokens at the top of `src/styles/global.css`

## Development

Requires Node 22+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Deploy

`netlify.toml` is included (build: `npm run build`, publish: `dist`). Any static host works: Vercel, Cloudflare Pages or GitHub Pages.
