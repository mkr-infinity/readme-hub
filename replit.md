# Revision Master

React + Vite + TypeScript SPA (with optional Capacitor wrapper for Android).

## Run

- Dev server: `npm run dev` (Vite on port 5000, host 0.0.0.0, all hosts allowed for Replit's iframe proxy)
- Build: `npm run build`
- Workflow: "Start application" → `npm run dev`

## Deployment

Configured as a static deployment:
- Build: `npm run build`
- Public dir: `dist`

## Notes

- `vite.config.ts` server block sets `host`, `port: 5000`, and `allowedHosts: true` so Replit's preview proxy works.
- `GEMINI_API_KEY` env var is exposed to the client via `define` in `vite.config.ts`.
- The whole app uses an anime/manga aesthetic, English-only (no Japanese characters). The base utility classes in `src/index.css` (`.premium-card`, `.glass`, `.gradient-violet`, plus new `.anime-page-bg` / `.anime-modal` / `.anime-badge`) are upgraded with thick playful borders, offset drop-shadows, and primary-color glows, so every screen using them inherits the look automatically.
- Theme palettes in `src/context/AppContext.tsx` and `src/index.css` are renamed to anime themes: Sakura Bloom, Cloud Nine, Sunset Magic, Midnight Manga, Cyber Tokyo, Forest Spirit (theme IDs unchanged).
- Anime fonts ("Bagel Fat One", "Mochiy Pop One", "Zen Maru Gothic") are loaded in `src/index.css` and exposed via `font-anime-pop` / `font-anime-soft` / `font-anime-body` and the default `--font-display`.
- Onboarding (`src/screens/Onboarding.tsx`) uses the chibi mascot SVG (`src/assets/anime-mascot.svg`), speech bubbles, manga panels with offset shadows, sakura-fall and kira-twinkle animations, and a rainbow striped progress bar.
- Settings → Help & Feedback "Report a Bug" / "Request a Feature" links open pre-filled GitHub issues against `https://github.com/mkr-infinity/Revision-Master` (templates defined in `src/screens/Settings.tsx`).
