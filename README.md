<div align="center">
  <img src="assets/logo.svg" width="160" height="160" alt="Revision Master Logo">
  <h1> Revision Master </h1>
  <p align="center">
    <b>The Anime-Themed Companion for Exam Excellence</b><br>
    <i>A high-performance, beautiful and intuitive study app — flashcards, formulas, mock tests and AI-generated study material, wrapped in a fun manga aesthetic.</i>
  </p>

  <div align="center">
    <img src="https://img.shields.io/badge/version-2.0.0-ff5c93?style=for-the-badge" alt="Version">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
    <img src="https://img.shields.io/badge/Capacitor-8-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor">
  </div>
</div>

<br>

---
## 📲 Download the App

<div align="center">

<a href="https://github.com/mkr-infinity/Revision-Master/releases/latest">
  <img src="https://img.shields.io/badge/⬇️%20Download%20APK-Latest%20v2.0.0-ff5c93?style=for-the-badge&logo=android" />
</a>

<a href="https://github.com/mkr-infinity/Revision-Master/releases">
  <img src="https://img.shields.io/badge/🚀%20All%20Releases-Browse-success?style=for-the-badge&logo=github" />
</a>

</div>

### 📌 Installation Steps
1. Download the APK file from the latest release.
2. On your Android device, enable **Install from Unknown Sources**.
3. Open the APK and install.
4. Launch the app — you'll start at the onboarding flow on first run. 🎉

---

## ✨ What's New in v2.0.0 — Anime Edition

- Full anime / manga aesthetic across every screen and popup.
- Six new themes: **Sakura Bloom · Cloud Nine · Sunset Magic · Midnight Manga · Cyber Tokyo · Forest Spirit**.
- Chibi mascot, speech bubbles, manga panels, sparkle backgrounds and bold "anime-pop" typography.
- New **Use system default font** option in Settings (revert to your device's default font).
- **Skip onboarding** button now visible on every step — instant default profile.
- Formulas tile on Home now opens the Cards screen on the Formulas tab.
- Performance: code-split vendor chunks, faster route loading, smoother animations.
- All Japanese characters removed — English-only copy throughout.

See the full [`CHANGELOG.txt`](./CHANGELOG.txt) for everything.

---

## 🌟 Why Revision Master?

In a world full of distractions, **Revision Master** is built to keep you focused. It is precision-engineered for students who value their time, their data, and a touch of fun.

### 🛡️ Privacy Focused (Local-First)
Your study habits and data are yours alone. Revision Master follows a **local-first** architecture:
- **Zero cloud storage** — subjects, flashcards and progress live on your device.
- **No tracking** — no analytics, no cookies, no hidden trackers.
- **Full control** — export your entire database as JSON anytime.

### ⚡ Built for Speed
- **Native feel** — Capacitor wrapper, mobile-first viewport, safe-area aware layout.
- **Offline-ready** — core features work without an internet connection.
- **Code-split bundle** — react, framer-motion, recharts and pdf libs are loaded on demand.
- **AI-powered** — generate flashcards and explanations with Gemini, OpenAI, Grok or Claude (your key, your choice).

---

## 🎨 Powerful Features

| Feature | Description |
|-------|-------------|
| <img src="assets/features/subjects.svg" width="40"> **Smart Decks** | Organise study material with custom themes, gradients and progress tracking |
| <img src="assets/features/flashcards.svg" width="40"> **Active Recall** | Interactive flashcards with text, images, formulas and notes |
| <img src="assets/features/tests.svg" width="40"> **Mock Tests** | Build timed tests that simulate real exam conditions |
| <img src="assets/features/ai.svg" width="40"> **AI Study Buddy** | Generate cards, explanations and tests with your favourite LLM |
| <img src="assets/features/analytics.svg" width="40"> **Deep Insights** | Streaks, XP, level-ups, heatmaps and per-deck stats |
| <img src="assets/features/pdf.svg" width="40"> **PDF Export** | Export decks as PDFs for offline study |

---

## 📦 Getting Started

### 🌐 Web development

```bash
git clone https://github.com/mkr-infinity/Revision-Master.git
cd Revision-Master
npm install
npm run dev          # http://localhost:5000
```

### 📱 Build the Android APK with Capacitor

You'll need: **Node 18+**, **JDK 17**, **Android Studio** (with Android SDK 34+), and the Android `ANDROID_HOME` env var configured.

```bash
# 1. Install dependencies
npm install

# 2. Build the web bundle and sync into the Android project
npm run cap:sync

# 3a. Build a debug APK (no signing required)
npm run android:debug
# → android/app/build/outputs/apk/debug/app-debug.apk

# 3b. Or build a release APK (you'll need a keystore configured in
#     android/app/build.gradle for the `release` signing config)
npm run android:build
# → android/app/build/outputs/apk/release/app-release.apk
```

Useful one-shot commands:

| Command | What it does |
|---|---|
| `npm run cap:sync` | Build the web app and sync `dist/` into Android |
| `npm run cap:open` | Open the Android project in Android Studio |
| `npm run cap:run` | Build, sync and launch on a connected device / emulator |
| `npm run android:debug` | Build a debug APK |
| `npm run android:build` | Build a release APK |

### 🔑 Optional: Gemini API key

Set `GEMINI_API_KEY` in a `.env` file (or in Replit's secrets) to enable the built-in AI provider without users having to bring their own key:

```env
GEMINI_API_KEY=your-key-here
```

Users can also bring their own key (Gemini, OpenAI, Grok or Claude) directly in Settings → AI.

---

## 🧱 Project Structure

```
src/
  assets/            # logos, mascot SVG, feature icons
  components/        # Layout, Chatbot, modals, providers
  context/           # AppContext (themes, user, decks, tests)
  screens/           # Home, Flashcards, MockTests, Stats, Settings, About, Onboarding
  utils/             # AI client, helpers
  index.css          # Tailwind v4 + anime theme palettes + utility classes
android/             # Capacitor Android project
capacitor.config.ts  # Capacitor app config
vite.config.ts       # Vite + PWA + manualChunks for fast loads
```

---

## 💖 Support

<p align="center">
  <a href="https://buymeacoffee.com/mkr_infinity" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="55" alt="Buy Me A Coffee"/>
  </a>
</p>

<p align="center">
  If you like <b>Revision Master</b>, please consider supporting 🙌
</p>

<p align="center">
  <a href="https://supportmkr.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Other%20Ways%20to%20Support-Click%20Here-blue?style=for-the-badge"/>
  </a>
</p>

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Crafted with passion by <b>Mohammad Kaif Raja</b></p>
  <a href="https://github.com/mkr-infinity">
    <img src="https://img.shields.io/github/followers/mkr-infinity?label=Follow%20@mkr-infinity&style=social" alt="Follow mkr-infinity">
  </a>
</div>
