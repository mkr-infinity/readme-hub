import { FormData, SectionToggles, defaultSections, DEFAULT_BUYMEACOFFEE, DEFAULT_FOLLOW_GITHUB } from './store';
import { findTech, TechItem } from './tech-icons';

export interface Template {
  id: string;
  name: string;
  description: string;
  swatch: { bg: string; ink: string; accent: string };
  generate: (data: FormData) => string;
}

type BadgeStyle = 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';

const CATEGORY_LABELS: Record<TechItem['category'], string> = {
  language: 'Languages',
  framework: 'Frameworks & Backend',
  styling: 'Styling',
  database: 'Databases & Data',
  devops: 'DevOps & Cloud',
  mobile: 'Mobile',
  ai: 'AI / ML',
  tools: 'Tools & Libraries',
};

const CATEGORY_EMOJI: Record<TechItem['category'], string> = {
  language: '💻',
  framework: '🧩',
  styling: '🎨',
  database: '🗄️',
  devops: '☁️',
  mobile: '📱',
  ai: '🤖',
  tools: '🛠️',
};

const CATEGORY_ORDER: TechItem['category'][] = [
  'language', 'framework', 'styling', 'database', 'devops', 'mobile', 'ai', 'tools',
];

function badgeUrl(slug: string, name: string, color: string, style: BadgeStyle, logoColor = 'white'): string {
  const safeName = encodeURIComponent(name.replace(/-/g, ' ').replace(/\s+/g, '_'));
  return `https://img.shields.io/badge/${safeName}-${color}?style=${style}&logo=${slug}&logoColor=${logoColor}`;
}

function renderBadgeLine(slugs: string[], style: BadgeStyle, logoColor = 'white'): string {
  return slugs
    .map((slug) => {
      const t = findTech(slug);
      return `![${t.name}](${badgeUrl(t.slug, t.name, t.color, style, logoColor)})`;
    })
    .join(' ');
}

function groupByCategory(slugs: string[]): Map<TechItem['category'], string[]> {
  const groups = new Map<TechItem['category'], string[]>();
  for (const slug of slugs) {
    const t = findTech(slug);
    const arr = groups.get(t.category) || [];
    arr.push(slug);
    groups.set(t.category, arr);
  }
  return groups;
}

function renderTechStack(data: FormData, style: BadgeStyle, opts: { centered?: boolean } = {}): string {
  if (data.techStack.length === 0) return '';
  const { centered = false } = opts;

  if (!data.categorizeTech) {
    const line = renderBadgeLine(data.techStack, style);
    return centered ? `<div align="center">\n\n${line}\n\n</div>` : line;
  }

  const groups = groupByCategory(data.techStack);
  const blocks: string[] = [];

  for (const cat of CATEGORY_ORDER) {
    const slugs = groups.get(cat);
    if (!slugs || slugs.length === 0) continue;
    const label = CATEGORY_LABELS[cat];
    const emoji = CATEGORY_EMOJI[cat];
    const badges = renderBadgeLine(slugs, style);

    if (data.collapsibleTech) {
      blocks.push(
        `<details>\n<summary><b>${emoji} ${label}</b> &nbsp;<sub>(${slugs.length})</sub></summary>\n<br/>\n\n${badges}\n\n</details>`,
      );
    } else {
      blocks.push(`**${emoji} ${label}**\n\n${badges}`);
    }
  }

  const out = blocks.join('\n\n');
  return centered ? `<div align="center">\n\n${out}\n\n</div>` : out;
}

/* ---------- Support / social ---------- */

function getSupportLinks(data: FormData) {
  const buy = data.support?.buyMeCoffee?.trim() || DEFAULT_BUYMEACOFFEE;
  const followRaw = data.support?.followGithub?.trim();
  const follow = followRaw
    ? (followRaw.startsWith('http') ? followRaw : `https://github.com/${followRaw.replace(/^@/, '')}`)
    : (data.github ? `https://github.com/${data.github.replace(/^@/, '')}` : DEFAULT_FOLLOW_GITHUB);
  return { buy, follow };
}

function appendFooter(data: FormData): string {
  if (!data.includeSupportFooter) return '';
  const { buy, follow } = getSupportLinks(data);
  return `

---

<div align="center">
  <a href="${buy}" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" />
  </a>
  <br/><br/>
  <a href="${follow}" target="_blank">
    <img src="https://img.shields.io/badge/Follow_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Follow on GitHub" />
  </a>
</div>`;
}

function socialBadges(data: FormData): string {
  const out: string[] = [];
  if (data.github) out.push(`[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${data.github})`);
  if (data.linkedin) out.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](${data.linkedin.startsWith('http') ? data.linkedin : `https://linkedin.com/in/${data.linkedin}`})`);
  if (data.twitter) out.push(`[![X](https://img.shields.io/badge/X_/_Twitter-000000?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/${data.twitter.replace(/^@/, '')})`);
  if (data.email) out.push(`[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${data.email})`);
  if (data.website) out.push(`[![Website](https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](${data.website})`);
  return out.join(' ');
}

function statsBlock(data: FormData, theme = 'tokyonight'): string {
  const p = data.profile;
  const u = data.github || 'octocat';
  const lines: string[] = [];
  if (p.showStats) lines.push(`<img src="https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${theme}&hide_border=true&count_private=true" alt="${u} stats" height="170" />`);
  if (p.showTopLangs) lines.push(`<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=${theme}&hide_border=true&langs_count=8" alt="Top Languages" height="170" />`);
  if (p.showStreak) lines.push(`<img src="https://streak-stats.demolab.com/?user=${u}&theme=${theme}&hide_border=true" alt="GitHub Streak" height="170" />`);
  if (p.showTrophies) lines.push(`<img src="https://github-profile-trophy.vercel.app/?username=${u}&theme=${theme === 'tokyonight' ? 'tokyonight' : theme}&no-frame=true&row=1&column=7" alt="GitHub Trophies" />`);
  if (p.showVisitors) lines.push(`<img src="https://komarev.com/ghpvc/?username=${u}&style=for-the-badge&color=blueviolet" alt="Profile Views" />`);
  if (lines.length === 0) return '';
  return `<div align="center">\n  ${lines.join('\n  ')}\n</div>`;
}

function bannerImage(url: string, fallbackText: string): string {
  if (url) return `<img src="${url}" alt="${fallbackText}" />`;
  const safe = encodeURIComponent(fallbackText);
  return `<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,2,30&height=180&section=header&text=${safe}&fontSize=60&fontColor=ffffff&animation=fadeIn" alt="${fallbackText}" />`;
}

/* Helper to get section flags safely */
function getSections(data: FormData): SectionToggles {
  return { ...defaultSections, ...(data.sections || {}) };
}

/* =============================================================================
   THEMES
============================================================================= */

const themes: Array<{
  id: string;
  name: string;
  description: string;
  swatch: { bg: string; ink: string; accent: string };
  badgeStyle: BadgeStyle;
  statsTheme: string;
}> = [
  { id: 'professional', name: 'Professional', description: 'Restrained, executive, portfolio-grade.', swatch: { bg: '#0F172A', ink: '#E2E8F0', accent: '#3B82F6' }, badgeStyle: 'flat', statsTheme: 'github_dark' },
  { id: 'terminal', name: 'Terminal', description: 'Green-on-black, monospaced, prompt-driven.', swatch: { bg: '#000000', ink: '#10B981', accent: '#10B981' }, badgeStyle: 'flat-square', statsTheme: 'matrix' },
  { id: 'anime', name: 'Anime Kawaii', description: 'Pastel sparkle, animated banner, kawaii dividers.', swatch: { bg: '#FCE7F3', ink: '#831843', accent: '#EC4899' }, badgeStyle: 'for-the-badge', statsTheme: 'pink' },
  { id: 'brutalist', name: 'Brutalist', description: 'Massive type, raw blocks, high contrast.', swatch: { bg: '#FEE440', ink: '#000000', accent: '#000000' }, badgeStyle: 'for-the-badge', statsTheme: 'highcontrast' },
  { id: 'editorial', name: 'Editorial', description: 'Magazine spread, drop caps, serif rhythm.', swatch: { bg: '#F5F5F4', ink: '#1C1917', accent: '#A855F7' }, badgeStyle: 'flat', statsTheme: 'graywhite' },
  { id: 'neon', name: 'Neon Synthwave', description: 'Dark base, glowing cyan and magenta.', swatch: { bg: '#0F0524', ink: '#F0ABFC', accent: '#22D3EE' }, badgeStyle: 'for-the-badge', statsTheme: 'synthwave' },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Glitchy, system-overrides, scanline aesthetic.', swatch: { bg: '#0A0A0A', ink: '#FCD34D', accent: '#EF4444' }, badgeStyle: 'for-the-badge', statsTheme: 'radical' },
  { id: 'pastel', name: 'Pastel Notebook', description: 'Soft, organized, dotted-grid notebook vibe.', swatch: { bg: '#FEF3C7', ink: '#7C2D12', accent: '#F59E0B' }, badgeStyle: 'flat-square', statsTheme: 'merko' },
  { id: 'origami', name: 'Origami Paper', description: 'Folded geometry, monochrome restraint.', swatch: { bg: '#FAFAF9', ink: '#0C0A09', accent: '#71717A' }, badgeStyle: 'flat', statsTheme: 'minimal' },
  { id: 'botanical', name: 'Botanical', description: 'Sage, clay, earthy and grounded.', swatch: { bg: '#F0FDF4', ink: '#14532D', accent: '#16A34A' }, badgeStyle: 'flat-square', statsTheme: 'jolly' },
  { id: 'magazine', name: 'Magazine Cover', description: 'Glossy cover, table of contents, footnotes.', swatch: { bg: '#FFFBEB', ink: '#7F1D1D', accent: '#DC2626' }, badgeStyle: 'flat', statsTheme: 'graywhite' },
  { id: 'apidocs', name: 'API Reference', description: 'Endpoint blocks, request/response, parameter tables.', swatch: { bg: '#0B1020', ink: '#E2E8F0', accent: '#06B6D4' }, badgeStyle: 'flat-square', statsTheme: 'tokyonight' },
  { id: 'resume', name: 'Resume / CV', description: 'Career-style, hiring-ready, recruiter-friendly.', swatch: { bg: '#F8FAFC', ink: '#0F172A', accent: '#1D4ED8' }, badgeStyle: 'flat', statsTheme: 'default' },
  { id: 'changelog', name: 'Changelog', description: 'Versioned releases, semver, breaking-change alerts.', swatch: { bg: '#111827', ink: '#F9FAFB', accent: '#FBBF24' }, badgeStyle: 'flat-square', statsTheme: 'dark' },
  { id: 'zen', name: 'Minimal Zen', description: 'Whitespace, nothing extra, signal only.', swatch: { bg: '#FFFFFF', ink: '#171717', accent: '#404040' }, badgeStyle: 'flat', statsTheme: 'minimal' },
];

/* =============================================================================
   PROJECT MARKDOWN
============================================================================= */

function projectMarkdown(themeId: string, data: FormData): string {
  const p = data.project;
  const t = themes.find((x) => x.id === themeId) || themes[0];
  const s = getSections(data);

  // Section flags
  const sf = s.pFeatures;
  const si = s.pInstall;
  const su = s.pUsage;
  const ss = s.pScreenshots && !!p.screenshots;
  const sc = s.pContributing;
  const sl = s.pLicense;

  // Pre-compute conditional blocks
  const techCentered = s.pTechStack ? renderTechStack(data, t.badgeStyle, { centered: true }) : '';
  const techPlain = s.pTechStack ? renderTechStack(data, t.badgeStyle) : '';
  const social = s.pContact ? socialBadges(data) : '';
  const screenshots = ss ? `\n## Screenshots\n${p.screenshots}\n` : '';
  const banner = p.bannerUrl
    ? `<div align="center">\n  <img src="${p.bannerUrl}" alt="${p.projectName}" />\n</div>\n`
    : '';

  switch (themeId) {
    case 'anime':
      return `<div align="center">
  ${bannerImage(p.bannerUrl, p.projectName)}
</div>

<h1 align="center">🌸 ${p.projectName} 🌸</h1>
<p align="center"><i>${p.tagline}</i></p>
${sf ? `\n## ✨ About\n${p.description}\n\n## 🎀 Features\n${p.features}\n` : `\n## ✨ About\n${p.description}\n`}
${techCentered ? `## 💖 Tech Stack\n${techCentered}\n` : ''}
${si ? `## 🌟 Installation\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `## 💫 Usage\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `## 🖼️ Screenshots\n${p.screenshots}\n` : ''}
${sc ? `## 🌷 Contributing\n${p.contributing}\n` : ''}
${sl ? `## 📜 License\n${p.license}\n` : ''}
${social ? `## 💌 Connect\n${social}` : ''}
${appendFooter(data)}`;

    case 'terminal':
      return `\`\`\`
┌──(${data.author || 'user'}@github)-[~/${p.projectName.replace(/\s+/g, '-').toLowerCase()}]
└─$ cat README.md
\`\`\`

# > ${p.projectName}
\`# ${p.tagline}\`

### \`$ cat about.txt\`
\`\`\`
${p.description}
\`\`\`
${sf ? `\n### \`$ ls -la features/\`\n${p.features}\n` : ''}
${techPlain ? `### \`$ cat tech_stack.json\`\n${techPlain}\n` : ''}
${si ? `### \`$ ./install.sh\`\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### \`$ ./run.sh\`\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `### \`$ display screenshots/*\`\n${p.screenshots}\n` : ''}
${sc ? `### \`$ cat CONTRIBUTING.md\`\n${p.contributing}\n` : ''}
${sl ? `### \`$ cat LICENSE\`\n\`${p.license}\`` : ''}
${social ? `\n### \`$ whoami\`\n${data.author}  \n${social}` : ''}
${appendFooter(data)}`;

    case 'professional':
      return `${banner}# ${p.projectName}

> ${p.tagline}

---
${sf ? `\n## About\n${p.description}\n\n## Features\n${p.features}\n` : `\n## About\n${p.description}\n`}
${techPlain ? `## Tech Stack\n${techPlain}\n` : ''}
${si || su ? `## Getting Started\n` : ''}
${si ? `### Installation\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### Usage\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${screenshots}
${sc ? `## Contributing\n${p.contributing}\n` : ''}
${sl ? `## License\n${p.license}\n` : ''}
${social ? `## Contact\n**${data.author}**\n\n${social}` : ''}
${appendFooter(data)}`;

    case 'brutalist':
      return `<div align="center">

# ${p.projectName.toUpperCase()}

### // ${p.tagline.toUpperCase()} //

</div>

---

> **WHAT IT IS**
> ${p.description.toUpperCase()}
${sf ? `\n## ▓▓ FEATURES ▓▓\n${p.features}\n` : ''}
${techPlain ? `## ▓▓ STACK ▓▓\n${techPlain}\n` : ''}
${si ? `## ▓▓ INSTALL ▓▓\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `## ▓▓ USE ▓▓\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `## ▓▓ SCREENS ▓▓\n${p.screenshots}\n` : ''}
${sc ? `## ▓▓ CONTRIB ▓▓\n${p.contributing.toUpperCase()}\n` : ''}
${sl ? `## ▓▓ LICENSE ▓▓\n\`${p.license.toUpperCase()}\`\n` : ''}
${social ? `## ▓▓ AUTHOR ▓▓\n**${data.author.toUpperCase()}**\n\n${social}` : ''}
${appendFooter(data)}`;

    case 'editorial':
      return `<div align="center">
  <h1><i>${p.projectName}</i></h1>
  <h3>${p.tagline}</h3>
  <hr/>
</div>

### I &middot; The Story
> *${p.description}*
${sf ? `\n### II &middot; What It Does\n${p.features}\n` : ''}
${techPlain ? `### III &middot; Built With\n${techPlain}\n` : ''}
${si ? `### IV &middot; Setup\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### V &middot; In Practice\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `### VI &middot; Gallery\n${p.screenshots}\n` : ''}
${sc || sl ? `### Appendix\n${sc ? `**Contributing.** ${p.contributing}  \n` : ''}${sl ? `**License.** ${p.license}  \n` : ''}${social ? `**Author.** ${data.author}\n` : ''}` : ''}
${social && !sc && !sl ? `${social}` : social ? `\n${social}` : ''}
${appendFooter(data)}`;

    case 'neon':
      return `<div align="center">
  ${bannerImage(p.bannerUrl, p.projectName)}
  <h3>⚡ ${p.tagline} ⚡</h3>
</div>

---
${sf ? `\n### 🔮 Description\n${p.description}\n\n### 🕹️ Features\n${p.features}\n` : `\n### 🔮 Description\n${p.description}\n`}
${techPlain ? `### 💽 Stack\n${techPlain}\n` : ''}
${si ? `### 🔌 Install\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### 💻 Run\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `### 📸 Screens\n${p.screenshots}\n` : ''}
${sc ? `### 🤝 Contributing\n${p.contributing}\n` : ''}
${sl ? `### 📜 License\n${p.license}\n` : ''}
${social ? `### 👤 Author\n**${data.author}**\n\n${social}` : ''}
${appendFooter(data)}`;

    case 'cyberpunk':
      return `# >> SYSTEM.OVERRIDE :: ${p.projectName.toUpperCase()}
## // ${p.tagline}

\`> ESTABLISHING UPLINK...\`  \`> AUTH OK\`  \`> BOOT SEQUENCE START\`

<details>
<summary><b>::// INITIALIZE_DATABANK</b></summary>

${p.description}

</details>
${sf ? `\n### ::// MODULES_LOADED\n${p.features}\n` : ''}
${techPlain ? `### ::// HARDWARE_SPECS\n${techPlain}\n` : ''}
${si ? `### ::// DEPLOYMENT\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### ::// EXECUTION\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `### ::// VISUAL_LOGS\n${p.screenshots}\n` : ''}
${sc || sl ? `### ::// PROTOCOLS\n${sc ? `\`CONTRIB:\` ${p.contributing}  \n` : ''}${sl ? `\`LICENSE:\` ${p.license}  \n` : ''}\`USER:\` ${data.author}\n` : ''}
${social}
${appendFooter(data)}`;

    case 'pastel':
      return `# 📒 ${p.projectName}

*${p.tagline}*

---
${sf ? `\n### 📌 What this is\n${p.description}\n\n### ✨ Highlights\n${p.features}\n` : `\n### 📌 What this is\n${p.description}\n`}
${techPlain ? `### 🛠️ Tools used\n${techPlain}\n` : ''}
${si ? `### 📦 Setting up\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### 💡 Try it out\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `### 🖼️ Snapshots\n${p.screenshots}\n` : ''}
${sc ? `### 🤝 Want to help?\n${p.contributing}\n` : ''}
${sl ? `### 📄 License\n${p.license}\n` : ''}
${social ? `### 👋 Made by\n${data.author}\n\n${social}` : ''}
${appendFooter(data)}`;

    case 'origami':
      return `<div align="center">
  <h1>◬ ${p.projectName} ◬</h1>
  <p><b>${p.tagline}</b></p>
</div>

---

## ▤ Overview
${p.description}
${sf ? `\n## ▥ Features\n${p.features}\n` : ''}
${techPlain ? `## ▦ Built with\n${techPlain}\n` : ''}
${si ? `## ▧ Install\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `## ▨ Use\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `## ▩ Gallery\n${p.screenshots}\n` : ''}
${sc || sl ? `## ◧ Details\n${sc ? `- **Contributing:** ${p.contributing}\n` : ''}${sl ? `- **License:** ${p.license}\n` : ''}${social ? `- **Author:** ${data.author}\n` : ''}` : ''}
${social}
${appendFooter(data)}`;

    case 'botanical':
      return `<div align="center">
  <h1>🌿 ${p.projectName} 🌿</h1>
  <p><i>${p.tagline}</i></p>
</div>

### 🪴 The root
${p.description}
${sf ? `\n### 🍃 Branches\n${p.features}\n` : ''}
${techPlain ? `### 🌱 Soil (Tech)\n${techPlain}\n` : ''}
${si ? `### 💧 Watering (Install)\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### ☀️ Sun (Usage)\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `### 🌸 Blooms\n${p.screenshots}\n` : ''}
${sc ? `### 🍄 Tending\n${p.contributing}\n` : ''}
${sl ? `### 🍂 License\n${p.license}\n` : ''}
${social ? `### 🌻 Gardener\n${data.author}\n\n${social}` : ''}
${appendFooter(data)}`;

    case 'magazine':
      return `<div align="center">

> # **${p.projectName.toUpperCase()}**
> ### THE ${new Date().getFullYear()} ISSUE
> *${p.tagline}*

</div>

---

### CONTENTS

\`01\` &middot; The Story  
${sf ? '`02` &middot; What It Does  \n' : ''}\
${techPlain ? '`03` &middot; The Stack  \n' : ''}\
${si || su ? '`04` &middot; How To Use  \n' : ''}\
${sc || sl ? '`05` &middot; The Fine Print  \n' : ''}

---

## 01 &middot; The Story
> *"${p.description}"*
${sf ? `\n## 02 &middot; What It Does\n${p.features}\n` : ''}
${techPlain ? `## 03 &middot; The Stack\n${techPlain}\n` : ''}
${si || su ? `## 04 &middot; How To Use\n${si ? `\n**Install.**\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}${su ? `\n**Run.**\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}` : ''}
${ss ? `## In Picture\n${p.screenshots}\n` : ''}
${sc || sl ? `## 05 &middot; The Fine Print\n${sc ? `**Contributing.** ${p.contributing}  \n` : ''}${sl ? `**License.** ${p.license}  \n` : ''}${social ? `**By.** ${data.author}\n` : ''}` : ''}

---

<sub>**FOOTNOTES.** All trademarks belong to their respective owners. ${p.projectName} is open-source software.</sub>

${social}
${appendFooter(data)}`;

    case 'apidocs':
      return `# \`POST\` /projects/${p.projectName.replace(/\s+/g, '-').toLowerCase()}

> ${p.tagline}

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
\`\`\`

## Description
${p.description}

---
${sf ? `\n## Endpoints\n\n### \`GET\` /features\nReturns the feature set.\n\n${p.features}\n` : ''}
${techPlain ? `### \`GET\` /stack\nReturns the technology stack.\n\n${techPlain}\n` : ''}
${si ? `### \`POST\` /install\nInstall the project.\n\n**Request**\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### \`POST\` /run\nRun the project.\n\n**Request**\n\`\`\`javascript\n${p.usage}\n\`\`\`\n\n**Response**\n\`\`\`http\nHTTP/1.1 200 OK\n\`\`\`\n` : ''}
${ss ? `### \`GET\` /screenshots\n${p.screenshots}\n` : ''}

---

## Headers
| key | value |
|---|---|
| \`X-Author\` | \`${data.author}\` |
${sl ? `| \`X-License\` | \`${p.license}\` |\n` : ''}\
${sc ? `| \`X-Contributing\` | \`${p.contributing.slice(0, 60)}${p.contributing.length > 60 ? '…' : ''}\` |\n` : ''}

## Errors
| code | meaning |
|---|---|
| \`200\` | OK |
| \`418\` | I'm a teapot, not a bug |
| \`500\` | Open an issue |

${social}
${appendFooter(data)}`;

    case 'resume':
      return `# ${p.projectName}
**${p.tagline}**  
*A project by ${data.author}*

---

## Project Summary
${p.description}
${sf ? `\n## Key Features\n${p.features}\n` : ''}
${techPlain ? `## Technology\n${techPlain}\n` : ''}
${si || su ? `## Getting Started\n${si ? `\n**Installation**\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}${su ? `\n**Usage**\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}` : ''}
${ss ? `## Visual Documentation\n${p.screenshots}\n` : ''}
${sc ? `## Contribution\n${p.contributing}\n` : ''}
${sl ? `## License\n${p.license}\n` : ''}
${social ? `## Maintainer\n**${data.author}** &mdash; [@${data.github || 'mkr-infinity'}](https://github.com/${data.github || 'mkr-infinity'})\n\n${social}\n` : ''}

---
*Documentation last updated: ${new Date().toISOString().slice(0, 10)}*
${appendFooter(data)}`;

    case 'changelog':
      return `# ${p.projectName} &mdash; CHANGELOG
> ${p.tagline}

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]
### About
${p.description}
${sf ? `\n### Added\n${p.features}\n` : ''}
${techPlain ? `### Stack\n${techPlain}\n` : ''}

---

## [1.0.0] &mdash; ${new Date().toISOString().slice(0, 10)}
${si ? `### Installation\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `### Usage\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `### Screenshots\n${p.screenshots}\n` : ''}
### ⚠️ Breaking Changes
> Initial release. There may be breaking changes between \`0.x\` and \`1.0\` &mdash; review carefully.
${sc ? `\n### Contributing\n${p.contributing}\n` : ''}
${sl ? `\n### License\n${p.license} &middot; **${data.author}**\n` : ''}

${social}
${appendFooter(data)}`;

    case 'zen':
      return `# ${p.projectName}

${p.tagline}

&nbsp;

${p.description}
${sf ? `\n&nbsp;\n\n## Features\n\n${p.features}\n` : ''}
${techPlain ? `\n&nbsp;\n\n## Stack\n\n${techPlain}\n` : ''}
${si ? `\n&nbsp;\n\n## Install\n\n\`\`\`bash\n${p.installation}\n\`\`\`\n` : ''}
${su ? `\n&nbsp;\n\n## Use\n\n\`\`\`javascript\n${p.usage}\n\`\`\`\n` : ''}
${ss ? `\n&nbsp;\n\n${p.screenshots}\n` : ''}

&nbsp;

---

${sl ? `${p.license} &middot; ` : ''}${data.author}

${social}
${appendFooter(data)}`;

    default:
      return projectMarkdown('professional', data);
  }
}

/* =============================================================================
   PROFILE MARKDOWN
============================================================================= */

function profileMarkdown(themeId: string, data: FormData): string {
  const p = data.profile;
  const t = themes.find((x) => x.id === themeId) || themes[0];
  const s = getSections(data);

  // Pre-compute conditional blocks
  const techCentered = s.prTechStack ? renderTechStack(data, t.badgeStyle, { centered: true }) : '';
  const techPlain = s.prTechStack ? renderTechStack(data, t.badgeStyle) : '';
  const social = s.prContact ? socialBadges(data) : '';
  const stats = s.prStats ? statsBlock(data, t.statsTheme) : '';
  const sb = s.prBio;
  const ss = s.prStatus;

  switch (themeId) {
    case 'anime':
      return `<div align="center">
  ${bannerImage(p.bannerUrl, `Hi I'm ${p.name}`)}
</div>

<h1 align="center">🌸 Konnichiwa, I'm ${p.name}! 🌸</h1>
<h3 align="center">✨ ${p.role} from ${p.location} ✨</h3>

<div align="center">

${social}

</div>
${sb ? `\n## 🎀 About me\n${p.bio}\n` : ''}
${ss ? `\n- 🌟 Currently working on **${p.currentlyWorking}**\n- 🌱 Currently learning **${p.learning}**\n- 💞 Looking to collaborate on **${p.collaboration}**\n- 🍡 Fun fact: ${p.funFact}\n` : ''}
${techCentered ? `\n## 💖 My Tech\n${techCentered}\n` : ''}
${stats ? `\n## ⭐ My GitHub Adventures ⭐\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'terminal':
      return `\`\`\`
$ whoami
${p.name}

$ cat role.txt
${p.role}

$ cat location.txt
${p.location}
\`\`\`

# > Hello, world.
${sb ? `\`# ${p.bio}\`\n` : ''}
${ss ? `\`\`\`yaml\nstatus:\n  working_on: "${p.currentlyWorking}"\n  learning:   "${p.learning}"\n  open_to:    "${p.collaboration}"\n  fun_fact:   "${p.funFact}"\n\`\`\`\n` : ''}
${techPlain ? `### \`$ ls ~/skills\`\n${techPlain}\n` : ''}
${social ? `### \`$ ./connect.sh\`\n${social}\n` : ''}
${stats ? `### \`$ stats --user=${data.github || 'user'}\`\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'professional':
      return `${p.bannerUrl ? `<div align="center">\n  <img src="${p.bannerUrl}" alt="${p.name}" />\n</div>\n\n` : ''}# ${p.name}

> ${p.role} &middot; ${p.location}

${social}

---
${sb ? `\n## About\n${p.bio}\n` : ''}
${ss ? `\n- **Currently building.** ${p.currentlyWorking}\n- **Currently learning.** ${p.learning}\n- **Open to collaborate on.** ${p.collaboration}\n- **Quick fact.** ${p.funFact}\n` : ''}
${techPlain ? `\n## Skills\n${techPlain}\n` : ''}
${stats ? `\n## GitHub\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'brutalist':
      return `<div align="center">

# ${p.name.toUpperCase()}

### // ${p.role.toUpperCase()} // ${p.location.toUpperCase()} //

${social}

</div>

---
${sb ? `\n## ▓▓ ABOUT ▓▓\n${p.bio.toUpperCase()}\n` : ''}
${ss ? `\n## ▓▓ STATUS ▓▓\n- **BUILDING:** ${p.currentlyWorking}\n- **LEARNING:** ${p.learning}\n- **WANT TO BUILD:** ${p.collaboration}\n- **NOTE:** ${p.funFact}\n` : ''}
${techPlain ? `\n## ▓▓ STACK ▓▓\n${techPlain}\n` : ''}
${stats ? `\n## ▓▓ GITHUB ▓▓\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'editorial':
      return `<div align="center">
  <h1><i>${p.name}</i></h1>
  <h3>${p.role} &middot; ${p.location}</h3>
  <hr/>
</div>

<p align="center">

${social}

</p>
${sb ? `\n### I &middot; A short bio\n> *${p.bio}*\n` : ''}
${ss ? `\n### II &middot; What I'm doing\n- **Working on.** ${p.currentlyWorking}\n- **Studying.** ${p.learning}\n- **Open to.** ${p.collaboration}\n- **Side note.** ${p.funFact}\n` : ''}
${techPlain ? `\n### III &middot; Tooling\n${techPlain}\n` : ''}
${stats ? `\n### IV &middot; GitHub\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'neon':
      return `<div align="center">
  ${bannerImage(p.bannerUrl, p.name)}
  <h3>⚡ ${p.role} &middot; ${p.location} ⚡</h3>
</div>

<div align="center">

${social}

</div>

---
${sb ? `\n### 🔮 About\n${p.bio}\n` : ''}
${ss ? `\n### 🕹️ Right now\n- **Building** ${p.currentlyWorking}\n- **Learning** ${p.learning}\n- **Want to collab on** ${p.collaboration}\n- **Fun fact** ${p.funFact}\n` : ''}
${techPlain ? `\n### 💽 Stack\n${techPlain}\n` : ''}
${stats ? `\n### 📊 Stats\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'cyberpunk':
      return `# >> USER.PROFILE :: ${p.name.toUpperCase()}
## // ${p.role} // ${p.location} //

\`> AUTH OK\`  \`> PROFILE LOADED\`  \`> READY\`

${social}
${sb ? `\n<details>\n<summary><b>::// BIOGRAPHY</b></summary>\n\n${p.bio}\n\n</details>\n` : ''}
${ss ? `\n### ::// STATUS_LOG\n- **WORKING_ON:** \`${p.currentlyWorking}\`\n- **LEARNING:** \`${p.learning}\`\n- **OPEN_TO:** \`${p.collaboration}\`\n- **NOTE:** \`${p.funFact}\`\n` : ''}
${techPlain ? `\n### ::// LOADOUT\n${techPlain}\n` : ''}
${stats ? `\n### ::// METRICS\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'pastel':
      return `# 📒 Hi, I'm ${p.name}

*${p.role} &middot; ${p.location}*

---

${social}
${sb ? `\n### 📌 About me\n${p.bio}\n` : ''}
${ss ? `\n### ✨ Right now\n- 🌱 **Building:** ${p.currentlyWorking}\n- 📚 **Learning:** ${p.learning}\n- 🤝 **Open to:** ${p.collaboration}\n- 💡 **Fun fact:** ${p.funFact}\n` : ''}
${techPlain ? `\n### 🛠️ My toolkit\n${techPlain}\n` : ''}
${stats ? `\n### 📊 GitHub\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'origami':
      return `<div align="center">
  <h1>◬ ${p.name} ◬</h1>
  <p><b>${p.role} &middot; ${p.location}</b></p>
</div>

${social}

---
${sb ? `\n## ▤ About\n${p.bio}\n` : ''}
${ss ? `\n## ▥ Currently\n- **Working on:** ${p.currentlyWorking}\n- **Learning:** ${p.learning}\n- **Collaborate on:** ${p.collaboration}\n- **Note:** ${p.funFact}\n` : ''}
${techPlain ? `\n## ▦ Tools\n${techPlain}\n` : ''}
${stats ? `\n## ▧ GitHub\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'botanical':
      return `<div align="center">
  <h1>🌿 ${p.name} 🌿</h1>
  <p><i>${p.role} &middot; ${p.location}</i></p>
</div>

<p align="center">

${social}

</p>
${sb ? `\n### 🪴 Roots\n${p.bio}\n` : ''}
${ss ? `\n### 🍃 Currently growing\n- **Tending:** ${p.currentlyWorking}\n- **Sprouting:** ${p.learning}\n- **Want to plant:** ${p.collaboration}\n- **Pollen:** ${p.funFact}\n` : ''}
${techPlain ? `\n### 🌱 Garden tools\n${techPlain}\n` : ''}
${stats ? `\n### 🌻 GitHub patch\n${stats}\n` : ''}
${appendFooter(data)}`;

    case 'magazine':
      return `<div align="center">

> # **${p.name.toUpperCase()}**
> ### ${p.role.toUpperCase()} ISSUE &middot; ${new Date().getFullYear()}
> *${p.location}*

${social}

</div>

---

### CONTENTS

\`01\` &middot; The Cover Story  
${ss ? '`02` &middot; Currently  \n' : ''}\
${techPlain ? '`03` &middot; The Stack  \n' : ''}\
${stats ? '`04` &middot; The Numbers  \n' : ''}

---
${sb ? `\n## 01 &middot; The Cover Story\n> *"${p.bio}"*\n` : ''}
${ss ? `\n## 02 &middot; Currently\n| | |\n|:--|:--|\n| **Building** | ${p.currentlyWorking} |\n| **Learning** | ${p.learning} |\n| **Open to** | ${p.collaboration} |\n| **Off the record** | ${p.funFact} |\n` : ''}
${techPlain ? `\n## 03 &middot; The Stack\n${techPlain}\n` : ''}
${stats ? `\n## 04 &middot; The Numbers\n${stats}\n` : ''}

---

<sub>**FOOTNOTES.** This profile is a living document &mdash; updated as the work evolves. Reach out via the contact links above.</sub>

${appendFooter(data)}`;

    case 'apidocs':
      return `# \`GET\` /users/${data.github || 'me'}

> Profile resource for **${p.name}** &mdash; ${p.role}.

\`\`\`http
HTTP/1.1 200 OK
Content-Type: application/json
\`\`\`

## Response

\`\`\`json
{
  "name":      "${p.name}",
  "role":      "${p.role}",
  "location":  "${p.location}",
  "available": true
}
\`\`\`

---

## Endpoints
${sb ? `\n### \`GET\` /me/about\n${p.bio}\n` : ''}
${ss ? `\n### \`GET\` /me/now\n| key | value |\n|---|---|\n| \`working_on\` | \`${p.currentlyWorking}\` |\n| \`learning\` | \`${p.learning}\` |\n| \`open_to\` | \`${p.collaboration}\` |\n| \`fun_fact\` | \`${p.funFact}\` |\n` : ''}
${techPlain ? `\n### \`GET\` /me/stack\n${techPlain}\n` : ''}
${social ? `\n### \`GET\` /me/contact\n${social}\n` : ''}
${stats ? `\n### \`GET\` /me/stats\n\`\`\`http\nCache-Control: public, max-age=3600\n\`\`\`\n${stats}\n` : ''}

---
\`\`\`http
X-Author: ${p.name}
\`\`\`
${appendFooter(data)}`;

    case 'resume':
      return `# ${p.name}
**${p.role}** &middot; ${p.location}  
${social}

---
${sb ? `\n## Summary\n${p.bio}\n` : ''}
${ss ? `\n## Currently\n- **Building** &mdash; ${p.currentlyWorking}\n- **Learning** &mdash; ${p.learning}\n- **Seeking** &mdash; collaborators on ${p.collaboration}\n- **Trivia** &mdash; ${p.funFact}\n` : ''}
${techPlain ? `\n## Technical Skills\n${techPlain}\n` : ''}

## Links
- **GitHub** &mdash; [@${data.github || 'mkr-infinity'}](https://github.com/${data.github || 'mkr-infinity'})
${data.linkedin ? `- **LinkedIn** &mdash; ${data.linkedin}\n` : ''}${data.website ? `- **Website** &mdash; ${data.website}\n` : ''}${data.email ? `- **Email** &mdash; ${data.email}\n` : ''}
${stats ? `\n## GitHub Activity\n${stats}\n` : ''}

---
*References available upon request.*
${appendFooter(data)}`;

    case 'changelog':
      return `# ${p.name} &mdash; CHANGELOG
> ${p.role} &middot; ${p.location}

${social}

All notable changes to my career are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/).

---

## [${new Date().getFullYear()}.${new Date().getMonth() + 1}.0] &mdash; Now
${ss ? `### Added\n- 🚀 **Currently building:** ${p.currentlyWorking}\n- 📚 **Currently learning:** ${p.learning}\n\n### Looking for\n- 🤝 Collaborators on **${p.collaboration}**\n\n### Notes\n> ${p.funFact}\n` : ''}

---
${sb ? `\n## [About]\n${p.bio}\n` : ''}

---
${techPlain ? `\n## [Stack]\n${techPlain}\n` : ''}
${stats ? `\n## [Metrics]\n${stats}\n` : ''}

---

> 💡 Versioned per [SemVer](https://semver.org). Breaking changes documented above.
${appendFooter(data)}`;

    case 'zen':
      return `# ${p.name}

${p.role} &middot; ${p.location}

&nbsp;
${sb ? `\n${p.bio}\n\n&nbsp;\n` : ''}
${ss ? `\n**Now.** ${p.currentlyWorking}  \n**Next.** ${p.learning}  \n**Open.** ${p.collaboration}\n\n&nbsp;\n` : ''}
${techPlain ? `\n${techPlain}\n\n&nbsp;\n` : ''}
${social ? `\n${social}\n` : ''}
${stats ? `\n&nbsp;\n\n${stats}\n` : ''}
${appendFooter(data)}`;

    default:
      return profileMarkdown('professional', data);
  }
}

export const templates: Template[] = themes.map((t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  swatch: t.swatch,
  generate: (data: FormData) =>
    (data.readmeType === 'profile' ? profileMarkdown(t.id, data) : projectMarkdown(t.id, data)).trim(),
}));
