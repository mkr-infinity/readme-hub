import { useState, useEffect } from 'react';

export type ReadmeType = 'project' | 'profile';

export interface ProjectFields {
  projectName: string;
  tagline: string;
  description: string;
  features: string;
  installation: string;
  usage: string;
  screenshots: string;
  contributing: string;
  license: string;
  bannerUrl: string;
}

export interface ProfileFields {
  name: string;
  role: string;
  location: string;
  bio: string;
  currentlyWorking: string;
  learning: string;
  collaboration: string;
  funFact: string;
  showStats: boolean;
  showTopLangs: boolean;
  showStreak: boolean;
  showTrophies: boolean;
  showVisitors: boolean;
  bannerUrl: string;
}

export interface SupportLinks {
  buyMeCoffee: string;
  followGithub: string;
}

export interface SectionToggles {
  pFeatures: boolean;
  pTechStack: boolean;
  pInstall: boolean;
  pUsage: boolean;
  pScreenshots: boolean;
  pContributing: boolean;
  pLicense: boolean;
  pContact: boolean;
  prBio: boolean;
  prStatus: boolean;
  prTechStack: boolean;
  prStats: boolean;
  prContact: boolean;
}

export interface FormData {
  readmeType: ReadmeType;
  project: ProjectFields;
  profile: ProfileFields;
  techStack: string[];
  categorizeTech: boolean;
  collapsibleTech: boolean;
  author: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  includeSupportFooter: boolean;
  support: SupportLinks;
  sections: SectionToggles;
}

export interface AppState {
  formData: FormData;
  selectedTemplate: string;
  customMarkdown: string;
  editedAt: number | null;
}

export const DEFAULT_BUYMEACOFFEE = 'https://buymeacoffee.com/mkr_infinity';
export const DEFAULT_FOLLOW_GITHUB = 'https://github.com/mkr-infinity/';

export const defaultSections: SectionToggles = {
  pFeatures: true,
  pTechStack: true,
  pInstall: true,
  pUsage: true,
  pScreenshots: true,
  pContributing: true,
  pLicense: true,
  pContact: true,
  prBio: true,
  prStatus: true,
  prTechStack: true,
  prStats: true,
  prContact: true,
};

const defaultProject: ProjectFields = {
  projectName: 'My Awesome Project',
  tagline: 'A short, punchy description of what this does.',
  description: 'A brief description of what this project does, who it is for, and why it matters.',
  features: '- Lightning-fast performance\n- Beautifully designed UI\n- Fully customizable themes',
  installation: 'npm install my-awesome-project',
  usage: 'import { feature } from "my-awesome-project";\n\nfeature();',
  screenshots: '',
  contributing: 'Pull requests are welcome. For major changes, please open an issue first.',
  license: 'MIT',
  bannerUrl: '',
};

const defaultProfile: ProfileFields = {
  name: 'Your Name',
  role: 'Full-Stack Developer',
  location: 'Earth',
  bio: 'I build things for the web. Passionate about clean code and great design.',
  currentlyWorking: 'A side project I am very excited about.',
  learning: 'New patterns and the latest in web tooling.',
  collaboration: 'Open source projects in TypeScript or Rust.',
  funFact: 'I drink way too much coffee.',
  showStats: true,
  showTopLangs: true,
  showStreak: true,
  showTrophies: false,
  showVisitors: false,
  bannerUrl: '',
};

const defaultFormData: FormData = {
  readmeType: 'project',
  project: defaultProject,
  profile: defaultProfile,
  techStack: ['react', 'typescript', 'tailwindcss', 'vite'],
  categorizeTech: true,
  collapsibleTech: true,
  author: 'Your Name',
  email: '',
  website: '',
  github: 'mkr-infinity',
  linkedin: '',
  twitter: '',
  includeSupportFooter: true,
  support: {
    buyMeCoffee: '',
    followGithub: '',
  },
  sections: defaultSections,
};

const defaultState: AppState = {
  formData: defaultFormData,
  selectedTemplate: 'professional',
  customMarkdown: '',
  editedAt: null,
};

export const STORE_KEY = 'readmehub:state';

function migrate(raw: any): AppState {
  if (!raw || typeof raw !== 'object') return defaultState;
  const fd = raw.formData || {};

  const techStack: string[] = Array.isArray(fd.techStack)
    ? fd.techStack.filter((s: unknown) => typeof s === 'string')
    : typeof fd.techStack === 'string'
      ? fd.techStack.split(',').map((s: string) => s.trim().toLowerCase()).filter(Boolean)
      : defaultFormData.techStack;

  const project: ProjectFields = {
    ...defaultProject,
    ...(fd.project || {}),
    projectName: fd.project?.projectName ?? fd.projectName ?? defaultProject.projectName,
    tagline: fd.project?.tagline ?? fd.tagline ?? defaultProject.tagline,
    description: fd.project?.description ?? fd.description ?? defaultProject.description,
    features: fd.project?.features ?? fd.features ?? defaultProject.features,
    installation: fd.project?.installation ?? fd.installation ?? defaultProject.installation,
    usage: fd.project?.usage ?? fd.usage ?? defaultProject.usage,
    screenshots: fd.project?.screenshots ?? fd.screenshots ?? defaultProject.screenshots,
    contributing: fd.project?.contributing ?? fd.contributing ?? defaultProject.contributing,
    license: fd.project?.license ?? fd.license ?? defaultProject.license,
    bannerUrl: fd.project?.bannerUrl ?? defaultProject.bannerUrl,
  };

  const profile: ProfileFields = {
    ...defaultProfile,
    ...(fd.profile || {}),
  };

  const support: SupportLinks = {
    buyMeCoffee: fd.support?.buyMeCoffee ?? '',
    followGithub: fd.support?.followGithub ?? '',
  };

  const sections: SectionToggles = {
    ...defaultSections,
    ...(fd.sections || {}),
  };

  return {
    selectedTemplate: raw.selectedTemplate || defaultState.selectedTemplate,
    customMarkdown: typeof raw.customMarkdown === 'string' ? raw.customMarkdown : '',
    editedAt: typeof raw.editedAt === 'number' ? raw.editedAt : null,
    formData: {
      readmeType: fd.readmeType === 'profile' ? 'profile' : 'project',
      project,
      profile,
      techStack,
      categorizeTech: typeof fd.categorizeTech === 'boolean' ? fd.categorizeTech : true,
      collapsibleTech: typeof fd.collapsibleTech === 'boolean' ? fd.collapsibleTech : true,
      author: fd.author ?? defaultFormData.author,
      email: fd.email ?? defaultFormData.email,
      website: fd.website ?? defaultFormData.website,
      github: fd.github ?? (typeof fd.socialLinks === 'string' ? extractGithubUser(fd.socialLinks) : defaultFormData.github),
      linkedin: fd.linkedin ?? defaultFormData.linkedin,
      twitter: fd.twitter ?? defaultFormData.twitter,
      includeSupportFooter: typeof fd.includeSupportFooter === 'boolean' ? fd.includeSupportFooter : true,
      support,
      sections,
    },
  };
}

function extractGithubUser(url: string): string {
  try {
    const match = url.match(/github\.com\/([^/?#]+)/i);
    return match ? match[1] : '';
  } catch {
    return '';
  }
}

export function useStore() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (!stored) return defaultState;
      return migrate(JSON.parse(stored));
    } catch (e) {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  const updateFormData = (data: Partial<FormData>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...data },
      editedAt: Date.now(),
    }));
  };

  const updateProject = (data: Partial<ProjectFields>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, project: { ...prev.formData.project, ...data } },
      editedAt: Date.now(),
    }));
  };

  const updateProfile = (data: Partial<ProfileFields>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, profile: { ...prev.formData.profile, ...data } },
      editedAt: Date.now(),
    }));
  };

  const updateSupport = (data: Partial<SupportLinks>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, support: { ...prev.formData.support, ...data } },
      editedAt: Date.now(),
    }));
  };

  const updateSections = (data: Partial<SectionToggles>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, sections: { ...prev.formData.sections, ...data } },
      editedAt: Date.now(),
    }));
  };

  const setTemplate = (templateId: string) => {
    setState((prev) => ({
      ...prev,
      selectedTemplate: templateId,
      customMarkdown: '',
      editedAt: Date.now(),
    }));
  };

  const setCustomMarkdown = (markdown: string) => {
    setState((prev) => ({
      ...prev,
      customMarkdown: markdown,
      editedAt: Date.now(),
    }));
  };

  const reset = () => {
    setState(defaultState);
  };

  return {
    state,
    updateFormData,
    updateProject,
    updateProfile,
    updateSupport,
    updateSections,
    setTemplate,
    setCustomMarkdown,
    reset,
  };
}
