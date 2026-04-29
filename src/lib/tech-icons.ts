export interface TechItem {
  slug: string;
  name: string;
  color: string;
  category: 'language' | 'framework' | 'styling' | 'database' | 'devops' | 'tools' | 'mobile' | 'ai';
}

export const TECH_OPTIONS: TechItem[] = [
  { slug: 'typescript', name: 'TypeScript', color: '3178C6', category: 'language' },
  { slug: 'javascript', name: 'JavaScript', color: 'F7DF1E', category: 'language' },
  { slug: 'python', name: 'Python', color: '3776AB', category: 'language' },
  { slug: 'go', name: 'Go', color: '00ADD8', category: 'language' },
  { slug: 'rust', name: 'Rust', color: 'DEA584', category: 'language' },
  { slug: 'java', name: 'Java', color: 'ED8B00', category: 'language' },
  { slug: 'kotlin', name: 'Kotlin', color: '7F52FF', category: 'language' },
  { slug: 'swift', name: 'Swift', color: 'FA7343', category: 'language' },
  { slug: 'ruby', name: 'Ruby', color: 'CC342D', category: 'language' },
  { slug: 'php', name: 'PHP', color: '777BB4', category: 'language' },
  { slug: 'cplusplus', name: 'C++', color: '00599C', category: 'language' },
  { slug: 'csharp', name: 'C#', color: '512BD4', category: 'language' },
  { slug: 'dart', name: 'Dart', color: '0175C2', category: 'language' },
  { slug: 'lua', name: 'Lua', color: '2C2D72', category: 'language' },
  { slug: 'elixir', name: 'Elixir', color: '4B275F', category: 'language' },

  { slug: 'react', name: 'React', color: '61DAFB', category: 'framework' },
  { slug: 'nextdotjs', name: 'Next.js', color: '000000', category: 'framework' },
  { slug: 'vuedotjs', name: 'Vue', color: '4FC08D', category: 'framework' },
  { slug: 'nuxtdotjs', name: 'Nuxt', color: '00DC82', category: 'framework' },
  { slug: 'angular', name: 'Angular', color: 'DD0031', category: 'framework' },
  { slug: 'svelte', name: 'Svelte', color: 'FF3E00', category: 'framework' },
  { slug: 'solid', name: 'Solid', color: '2C4F7C', category: 'framework' },
  { slug: 'astro', name: 'Astro', color: 'BC52EE', category: 'framework' },
  { slug: 'remix', name: 'Remix', color: '000000', category: 'framework' },
  { slug: 'nodedotjs', name: 'Node.js', color: '339933', category: 'framework' },
  { slug: 'deno', name: 'Deno', color: '000000', category: 'framework' },
  { slug: 'bun', name: 'Bun', color: 'FBF0DF', category: 'framework' },
  { slug: 'express', name: 'Express', color: '000000', category: 'framework' },
  { slug: 'nestjs', name: 'NestJS', color: 'E0234E', category: 'framework' },
  { slug: 'fastify', name: 'Fastify', color: '000000', category: 'framework' },
  { slug: 'fastapi', name: 'FastAPI', color: '009688', category: 'framework' },
  { slug: 'django', name: 'Django', color: '092E20', category: 'framework' },
  { slug: 'flask', name: 'Flask', color: '000000', category: 'framework' },
  { slug: 'rubyonrails', name: 'Rails', color: 'CC0000', category: 'framework' },
  { slug: 'laravel', name: 'Laravel', color: 'FF2D20', category: 'framework' },
  { slug: 'spring', name: 'Spring', color: '6DB33F', category: 'framework' },

  { slug: 'tailwindcss', name: 'Tailwind', color: '06B6D4', category: 'styling' },
  { slug: 'sass', name: 'Sass', color: 'CC6699', category: 'styling' },
  { slug: 'css3', name: 'CSS', color: '1572B6', category: 'styling' },
  { slug: 'html5', name: 'HTML', color: 'E34F26', category: 'styling' },
  { slug: 'styledcomponents', name: 'Styled', color: 'DB7093', category: 'styling' },
  { slug: 'framer', name: 'Framer', color: '0055FF', category: 'styling' },

  { slug: 'vite', name: 'Vite', color: '646CFF', category: 'tools' },
  { slug: 'webpack', name: 'Webpack', color: '8DD6F9', category: 'tools' },
  { slug: 'esbuild', name: 'esbuild', color: 'FFCF00', category: 'tools' },
  { slug: 'turbo', name: 'Turbo', color: 'EF4444', category: 'tools' },
  { slug: 'pnpm', name: 'pnpm', color: 'F69220', category: 'tools' },
  { slug: 'npm', name: 'npm', color: 'CB3837', category: 'tools' },
  { slug: 'yarn', name: 'Yarn', color: '2C8EBB', category: 'tools' },
  { slug: 'eslint', name: 'ESLint', color: '4B32C3', category: 'tools' },
  { slug: 'prettier', name: 'Prettier', color: 'F7B93E', category: 'tools' },
  { slug: 'jest', name: 'Jest', color: 'C21325', category: 'tools' },
  { slug: 'vitest', name: 'Vitest', color: '6E9F18', category: 'tools' },
  { slug: 'cypress', name: 'Cypress', color: '17202C', category: 'tools' },
  { slug: 'playwright', name: 'Playwright', color: '2EAD33', category: 'tools' },
  { slug: 'storybook', name: 'Storybook', color: 'FF4785', category: 'tools' },

  { slug: 'mongodb', name: 'MongoDB', color: '47A248', category: 'database' },
  { slug: 'postgresql', name: 'Postgres', color: '4169E1', category: 'database' },
  { slug: 'mysql', name: 'MySQL', color: '4479A1', category: 'database' },
  { slug: 'redis', name: 'Redis', color: 'DC382D', category: 'database' },
  { slug: 'sqlite', name: 'SQLite', color: '003B57', category: 'database' },
  { slug: 'firebase', name: 'Firebase', color: 'FFCA28', category: 'database' },
  { slug: 'supabase', name: 'Supabase', color: '3FCF8E', category: 'database' },
  { slug: 'planetscale', name: 'PlanetScale', color: '000000', category: 'database' },
  { slug: 'prisma', name: 'Prisma', color: '2D3748', category: 'database' },
  { slug: 'drizzle', name: 'Drizzle', color: 'C5F74F', category: 'database' },
  { slug: 'graphql', name: 'GraphQL', color: 'E10098', category: 'database' },

  { slug: 'docker', name: 'Docker', color: '2496ED', category: 'devops' },
  { slug: 'kubernetes', name: 'Kubernetes', color: '326CE5', category: 'devops' },
  { slug: 'amazonaws', name: 'AWS', color: '232F3E', category: 'devops' },
  { slug: 'googlecloud', name: 'GCP', color: '4285F4', category: 'devops' },
  { slug: 'microsoftazure', name: 'Azure', color: '0078D4', category: 'devops' },
  { slug: 'vercel', name: 'Vercel', color: '000000', category: 'devops' },
  { slug: 'netlify', name: 'Netlify', color: '00C7B7', category: 'devops' },
  { slug: 'cloudflare', name: 'Cloudflare', color: 'F38020', category: 'devops' },
  { slug: 'githubactions', name: 'GH Actions', color: '2088FF', category: 'devops' },
  { slug: 'nginx', name: 'Nginx', color: '009639', category: 'devops' },
  { slug: 'git', name: 'Git', color: 'F05032', category: 'devops' },
  { slug: 'github', name: 'GitHub', color: '181717', category: 'devops' },
  { slug: 'gitlab', name: 'GitLab', color: 'FC6D26', category: 'devops' },

  { slug: 'flutter', name: 'Flutter', color: '02569B', category: 'mobile' },
  { slug: 'reactnative', name: 'React Native', color: '61DAFB', category: 'mobile' },
  { slug: 'expo', name: 'Expo', color: '000020', category: 'mobile' },
  { slug: 'ios', name: 'iOS', color: '000000', category: 'mobile' },
  { slug: 'android', name: 'Android', color: '34A853', category: 'mobile' },

  { slug: 'tensorflow', name: 'TensorFlow', color: 'FF6F00', category: 'ai' },
  { slug: 'pytorch', name: 'PyTorch', color: 'EE4C2C', category: 'ai' },
  { slug: 'openai', name: 'OpenAI', color: '412991', category: 'ai' },
  { slug: 'huggingface', name: 'Hugging Face', color: 'FFD21E', category: 'ai' },
  { slug: 'langchain', name: 'LangChain', color: '1C3C3C', category: 'ai' },

  { slug: 'figma', name: 'Figma', color: 'F24E1E', category: 'tools' },
  { slug: 'notion', name: 'Notion', color: '000000', category: 'tools' },
  { slug: 'linear', name: 'Linear', color: '5E6AD2', category: 'tools' },
  { slug: 'slack', name: 'Slack', color: '4A154B', category: 'tools' },
];

export const TECH_BY_SLUG: Record<string, TechItem> = TECH_OPTIONS.reduce((acc, t) => {
  acc[t.slug] = t;
  return acc;
}, {} as Record<string, TechItem>);

export function findTech(slug: string): TechItem {
  return TECH_BY_SLUG[slug] || {
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    color: '6366F1',
    category: 'tools',
  };
}

export function techIconUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${slug}/white`;
}

export function techIconUrlColor(slug: string, color: string): string {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}
