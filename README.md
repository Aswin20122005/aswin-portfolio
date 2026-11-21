# Aswin — Developer Portfolio

**Live site:** https://aswin-portfolio-eosin.vercel.app

A dark-themed personal portfolio built with React: glassmorphism cards, an interactive particle background, animated stats, filterable projects, a timeline, certifications and publications.

![Desktop screenshot](docs/screenshot-desktop.webp)

<p align="center"><img src="docs/screenshot-mobile.webp" alt="Mobile screenshot" width="260" /></p>

## Features

- **Hero** with typewriter roles, profile photo and one-click resume download
- **About** with animated stat counters and a career/education timeline
- **Skills** grouped by category with animated progress bars
- **Projects** filterable by ML & AI, IoT, Web, Apps and Security, with links to source code
- **Certifications & publications**
- **Contact** section with social links
- Responsive layout with a full-screen mobile menu and a back-to-top button
- Accessible: skip link, labelled icon buttons, visible keyboard focus, `prefers-reduced-motion` support
- SEO-ready: Open Graph/Twitter preview image, sitemap, robots.txt, web manifest and favicon

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, Lucide React icons |
| Effects | Canvas particle system, CSS animations, IntersectionObserver |
| Build | Create React App (react-scripts 5) |
| Hosting | Vercel (caching + security headers in `vercel.json`) |
| Quality | ESLint, Prettier, Jest + React Testing Library |
| CI | GitHub Actions: format check, tests and production build on every push |

## Project structure

```
aswin-portfolio/
├── public/
│   ├── index.html          # meta tags, fonts, noscript fallback
│   ├── profile.webp/.jpg   # profile photo
│   ├── Aswin_Resume.pdf    # resume served by the Resume button
│   ├── og-image.png        # link preview image
│   ├── favicon.svg, manifest.json, robots.txt, sitemap.xml
├── src/
│   ├── App.jsx             # page layout and scroll tracking
│   ├── sections/           # Navbar, Hero, About, Skills, Projects, Achievements, Contact, Footer
│   ├── components/         # reusable UI: GlassCard, ProjectCard, Typewriter, Particles…
│   ├── hooks/              # useInView, useCounter, useMediaQuery
│   ├── data/               # all portfolio content (projects, skills, certs, contact…)
│   ├── styles/global.css   # global styles and animations
│   └── index.js
├── docs/                   # README screenshots
├── .github/workflows/      # CI build
└── vercel.json
```

## Run locally

Requires Node.js 18+ (see `.nvmrc`).

```bash
git clone https://github.com/Aswin20122005/aswin-portfolio.git
cd aswin-portfolio
npm ci
npm start        # http://localhost:3000
npm run build    # production build in build/
```

## Quality checks

```bash
npm test             # tests in watch mode
npm run test:ci      # single run with coverage report
npm run format       # format code with Prettier
npm run format:check # check formatting
```

The test suite (React Testing Library + Jest) covers the data files, the custom hooks, every component and section, and an app-level smoke test. GitHub Actions runs formatting, tests and a production build on every push.

## Updating content

All content lives in `src/data/`:

- `projects.js`: add `repo: "https://github.com/..."` to show a **View code** link
- `certifications.js`, `publications.js`, `timeline.js`, `skills.js`, `roles.js`, `contact.js`

The stats counters (projects, publications, certifications) are calculated from these arrays automatically.

To replace the resume or photo, overwrite `public/Aswin_Resume.pdf` or `public/profile.webp` / `public/profile.jpg`.

## Deployment

Every push to `main` is deployed automatically by Vercel. To deploy a fork: import the repo at [vercel.com/new](https://vercel.com/new) and click **Deploy**. No configuration is needed.

## Contact

- GitHub: [@Aswin20122005](https://github.com/Aswin20122005)
- LinkedIn: [aswin-s-53abbb2a8](https://www.linkedin.com/in/aswin-s-53abbb2a8)
- Email: ashwin.20.achu@gmail.com
