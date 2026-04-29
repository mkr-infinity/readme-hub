<div align="center">

<img src="./public/favicon.svg" width="90" alt="ReadmeHub logo" />

# ReadmeHub

### *The README generator developers actually want to open.*

[![Open Source](https://img.shields.io/badge/Open-Source-22c55e?style=for-the-badge)](https://github.com/mkr-infinity/readme-hub)
[![License: MIT](https://img.shields.io/badge/License-MIT-3b82f6?style=for-the-badge)](LICENSE)
[![Free Forever](https://img.shields.io/badge/Free-Forever-ec4899?style=for-the-badge)](https://github.com/mkr-infinity/readme-hub)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/mkr-infinity/readme-hub/pulls)

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**[Live Demo](https://mkr-infinity.github.io/readme-hub)** &middot; **[Report a Bug](https://github.com/mkr-infinity/readme-hub/issues/new?template=bug_report.md)** &middot; **[Request a Feature](https://github.com/mkr-infinity/readme-hub/issues/new?template=feature_request.md)**

</div>

---

## What is ReadmeHub?

**ReadmeHub** is a beautiful, fast, fully **client-side** GitHub README generator. No server, no sign-up, no telemetry — everything runs in your browser and your data is saved locally so you never lose a draft.

Pick from **15 structurally distinct themes**, fill out a smart guided form, and export a polished Markdown file in seconds. Supports both **project READMEs** and **GitHub profile READMEs** from one place.

---

## Features

| | Feature | Details |
|---|---|---|
| 🎨 | **15 unique themes** | Each theme re-arranges the markdown *structure* — not just colors. Professional, Terminal, Brutalist, Cyberpunk, API Reference, and more. |
| 👤 | **Two modes** | Generate a **Project README** or a **GitHub Profile README** with tailored form fields for each |
| ✨ | **Live preview** | Toggle between GitHub-style (light) rendering and dark editor mode side-by-side |
| 🖥️ | **Resizable split editor** | Drag the divider to give more space to code or preview — your choice |
| 🧩 | **90+ tech logos** | Auto-categorized badges: Languages, Frameworks, Databases, DevOps, AI, Tools — click to add |
| 📊 | **GitHub stats widgets** | readme-stats, top-langs, streak, and trophy widgets for profile READMEs |
| 💾 | **Local persistence** | Everything saves to `localStorage` automatically — refresh anytime, pick up where you left off |
| 📱 | **Fully responsive** | Tabbed editor / preview / themes on mobile with no hidden overflow |
| 📋 | **Copy or download** | Clipboard copy or `.md` file download with in-app step-by-step guidance |
| 🚫 | **Zero backend** | 100% client-side, 100% free, MIT-licensed, forever |

---

## Themes

| # | Name | Vibe |
|---|---|---|
| 01 | **Professional** | Restrained, executive, portfolio-grade |
| 02 | **Terminal** | Green-on-black, monospaced, prompt-driven |
| 03 | **Anime Kawaii** | Pastel sparkle, animated banner, kawaii dividers |
| 04 | **Brutalist** | Massive type, raw blocks, high contrast |
| 05 | **Editorial** | Magazine spread, drop caps, serif rhythm |
| 06 | **Neon Synthwave** | Dark base, glowing cyan and magenta |
| 07 | **Cyberpunk** | Glitchy, system-overrides, scanline aesthetic |
| 08 | **Pastel Notebook** | Soft, organised, dotted-grid notebook vibe |
| 09 | **Origami Paper** | Folded geometry, monochrome restraint |
| 10 | **Botanical** | Sage, clay, earthy and grounded |
| 11 | **Magazine Cover** | Glossy cover, table of contents, footnotes |
| 12 | **API Reference** | Endpoint blocks, request/response, parameter tables |
| 13 | **Resume / CV** | Career-style, hiring-ready, recruiter-friendly |
| 14 | **Changelog** | Versioned releases, semver, breaking-change alerts |
| 15 | **Minimal Zen** | Whitespace, nothing extra, signal only |

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) v8 or higher (`npm install -g pnpm`)

### Install & run

```bash
# 1. Clone the repo
git clone https://github.com/mkr-infinity/readme-hub.git
cd readme-hub

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`) — that's it.

> Prefer `npm` or `yarn`? Both work too — just swap `pnpm` for `npm` or `yarn` in any command.

---

## How to Use

### Step 1 — Pick a theme

Go to **Templates** and browse the 15 options. Each card shows a miniature preview of the README structure. Click **"Use this theme"** to start with that layout, or start from the Form and apply a theme later.

### Step 2 — Fill the form

The smart form adapts to your README type:

- **Project README** — fill in your project name, tagline, description, features, installation steps, usage examples, contributing guidelines, license, and links.
- **GitHub Profile README** — fill in your bio, what you're working on, what you're learning, social links, and toggle GitHub stats widgets.

Click the **Tech Picker** section to browse and add 90+ technology logos as badges — no manual badge URL typing.

### Step 3 — Edit & export

The Editor gives you:

- **Left panel** — raw Markdown source you can freely edit
- **Right panel** — live rendered preview (toggle between GitHub-style light or dark editor mode)
- **Resizable divider** — drag left or right to expand whichever side you need

When you're happy, click **Copy** to paste it into GitHub's web editor, or **Download** to get a `README.md` file.

### Step 4 — Ship it to GitHub

**Project README** — put `README.md` in the root of your repo and commit:

```bash
git add README.md
git commit -m "docs: add README"
git push
```

**Profile README** — create a repo named **exactly your GitHub username** (e.g. `mkr-infinity/mkr-infinity`). GitHub automatically pins it to your profile page.

---


### GitHub Pages

```bash
# Build with the /readme-hub/ base path (matches your repo name)
pnpm run build:gh-pages

# The output is in dist/public/
# Deploy to GitHub Pages (Actions, gh-pages branch, or /docs folder)
```

The `public/404.html` included in the project automatically handles SPA routing — no blank pages on direct URL access or refresh.

> If your repo name is **not** `readme-hub`, edit the `build:gh-pages` script in `package.json` and set `BASE_PATH=/your-repo-name/`.

#### GitHub Actions example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install
      - run: pnpm run build:gh-pages
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist/public }
      - uses: actions/deploy-pages@v4
        id: deployment
```

In your repo settings, go to **Settings → Pages → Build and deployment → Source: GitHub Actions**. Your site will be live at `https://<your-username>.github.io/readme-hub/` after the first successful run.

---

## Project Structure

```
readme-hub/
├── public/
│   ├── favicon.svg          # App icon
│   ├── 404.html             # SPA routing fallback for GitHub Pages
│
├── src/
│   ├── components/
│   │   ├── layout.tsx       # Nav, footer, cursor follower
│   │   ├── preview.tsx      # Markdown renderer (GitHub + dark mode)
│   │   ├── tech-picker.tsx  # 90+ tech logo selector
│   │   └── ui/              # shadcn/ui component library
│   ├── lib/
│   │   ├── store.ts         # State management + localStorage
│   │   ├── templates.ts     # 15 theme generators
│   │   └── tech-icons.ts    # Tech logo registry
│   ├── pages/
│   │   ├── home.tsx         # Landing page
│   │   ├── templates.tsx    # Theme gallery
│   │   ├── form.tsx         # Multi-step form
│   │   ├── editor.tsx       # Split editor + preview
│   │   └── not-found.tsx    # 404 page
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind / tsconfig / package.json
└── netlify.toml             # Netlify deploy config + SPA redirect
```

---

## Tech Stack

<details>
<summary><b>Languages</b></summary>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

</details>

<details>
<summary><b>Framework & UI</b></summary>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-0055FF?style=flat-square&logo=framer&logoColor=white)
![Wouter](https://img.shields.io/badge/Wouter-000000?style=flat-square)

</details>

<details>
<summary><b>Tooling & Libraries</b></summary>

![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![react-markdown](https://img.shields.io/badge/react--markdown-000000?style=flat-square)
![remark-gfm](https://img.shields.io/badge/remark--gfm-000000?style=flat-square)

</details>

---

## Contributing

All contributions are welcome — whether it's a bug fix, a new theme, additional tech logos, or a UI improvement.

### How to contribute

1. **Fork** the repo and create a branch from `main`:

   ```bash
   git checkout -b feat/my-new-theme
   ```

2. **Install** dependencies:

   ```bash
   pnpm install
   ```

3. **Make your changes** and test locally:

   ```bash
   pnpm --filter @workspace/readme-hub run dev
   ```

4. **Open a Pull Request** — describe what you changed and why.

### Contribution ideas

- **New themes** — the bar is "structurally different", not just a color swap. Each template in `lib/templates.ts` exports a `generate(data: FormData): string` function.
- **More tech logos** — add entries to `lib/tech-icons.ts` with `slug`, `name`, `color`, and `category`.
- **Accessibility improvements** — keyboard navigation, ARIA labels, contrast ratios.
- **Translations** — the UI strings are not yet extracted for i18n, but PRs that add that structure are welcome.
- **Bug reports** — open an [issue](https://github.com/mkr-infinity/readme-hub/issues/new) with steps to reproduce.

### Guidelines

- Keep PRs focused — one feature or fix per PR.
- Open an [issue](https://github.com/mkr-infinity/readme-hub/issues/new) first for anything bigger than a typo so we can discuss direction.
- Code style: TypeScript, no `any` unless justified, Tailwind classes preferred over inline styles.

---

## License

[MIT](LICENSE) — do whatever you like, just be nice. Attribution back to this repo is appreciated but not required.

---

<div align="center">

[![Star on GitHub](https://img.shields.io/badge/Star_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mkr-infinity/readme-hub)
[![Follow @mkr-infinity](https://img.shields.io/badge/Follow_@mkr--infinity-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mkr-infinity/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy_me_a_coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/mkr_infinity)

<sub>Built with ☕ and stubbornness by <a href="https://github.com/mkr-infinity/">@mkr-infinity</a></sub>

</div>
