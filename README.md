# Abhinav Gunda — Cybersecurity Portfolio

Personal portfolio of **Venkata Abhinav Kumar Gupta Gunda** — Security Engineer, penetration tester and AI/LLM security researcher.

Dark "security operations" design: boot sequence, live-typing recon console, pinned horizontal case files, an interactive terminal (`help`, `whoami`, `projects`, `hire`…) and HUD-style UI.

## Stack

| Piece | Used for |
| --- | --- |
| [React](https://react.dev) + [Vite](https://vite.dev) | App + build |
| [GSAP](https://gsap.com) + ScrollTrigger + `@gsap/react` | Boot timeline, scroll reveals, pinned horizontal projects, scrubbed text |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth scrolling, synced to GSAP's ticker |
| [React Bits](https://github.com/DavidHDev/react-bits) | FaultyTerminal, LetterGlitch, DecryptedText, GlitchText, SpotlightCard, CountUp, TargetCursor, ClickSpark (in `src/components/reactbits`) |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Generated the design system (palette, type, pattern) |
| [GSAP Skills](https://github.com/greensock/gsap-skills) | GSAP best practices for AI coding agents |

Both agent skill packs are installed in `.claude/skills/`, so Claude Code (or other agents) will pick them up automatically when working on this repo.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

Node 20+ recommended.

## Edit content

All text lives in **`src/data.js`** (profile, stats, experience, projects, skills, certifications, education).
The résumé served by the site is `public/Abhinav_Gunda_Resume.pdf` — replace it to update.

## Deploy

**GitHub Pages (included):** push to a repo's `main` branch, then in *Settings → Pages* set *Source* to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes automatically.
The site will be at `https://<username>.github.io/<repo>/`.

**Vercel / Netlify:** import the repo — build command `npm run build`, output directory `dist`.

## Push to a new GitHub repo

```bash
git init            # skip if the folder already has .git
git add .
git commit -m "Cybersecurity portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## Accessibility & performance

- Respects `prefers-reduced-motion` (no smooth scroll, no pinning, static animations).
- Custom cursor only on mouse/trackpad devices; touch devices get native behavior.
- Fully responsive (375px → 1440px+), keyboard-focus states visible.

## Credits

React Bits components © David Haz (MIT + Commons Clause, see `src/components/reactbits/LICENSE-react-bits.md`).
GSAP is free for commercial use under the GSAP standard license.
