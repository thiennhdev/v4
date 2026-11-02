# thiennh.dev

Personal portfolio of **Nguyen Hoang Thien**, Backend Software Engineer (Go & Java).

Built with **Vite + React 19 + TypeScript**. It's plain CSS with design tokens: a warm paper palette, one clay accent and serif headlines, with light and dark themes.

## Features

- **Hero** with current role, a short summary, impact stats and a CV download. The portrait is an atom's nucleus: the Claude mark, a small octopus mascot and two energy orbs orbit it, passing in front of and behind the photo
- **Experience** as keyboard-accessible tabs, each with metric cards, bullets and the stack used
- **Skills explorer**: a core-stack row with monochrome logos, then skills grouped by area with a three-bar level meter (_core_, _strong_, _familiar_). Pick a skill to see where it was used (with dates) and the skills it is often paired with, then jump straight to that job or project
- **Projects**: two featured systems, each with an architecture flow, plus open-source repos
- Education, certifications and an award section
- **⌘K / Ctrl K quick-jump menu** to jump to a section, copy the email, open the résumé or switch the theme
- Light/dark theme that follows the system and remembers your choice, with no flash on load
- Scroll reveal that respects `prefers-reduced-motion`; SEO meta, Open Graph image and JSON-LD

## Editing content

All content lives in **[`src/data/profile.ts`](src/data/profile.ts)**: profile, stats, jobs, projects, skills, education and certifications. Components only render that data.

- Résumé PDF: `public/Nguyen_Hoang_Thien_Software.pdf` (path set in `profile.resume`)
- Portrait / award photos: `src/assets/`
- Skill logos: `src/lib/brandIcons.ts` maps a skill name to a [Simple Icons](https://simpleicons.org) mark
- Orbit animation (orbits, speeds, electrons): `src/components/OrbitPortrait.tsx`
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
