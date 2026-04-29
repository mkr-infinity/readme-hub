import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TechPicker } from '@/components/tech-picker';
import {
  useStore, ReadmeType, ProjectFields, ProfileFields, FormData, SupportLinks,
  SectionToggles, DEFAULT_BUYMEACOFFEE, DEFAULT_FOLLOW_GITHUB,
} from '@/lib/store';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, FileCode, User, Sparkles, Github, Linkedin,
  Mail, Globe, Twitter, Coffee, Layers, FoldVertical, EyeOff, Eye,
  BarChart2, Star, Zap, BookOpen, Wrench, Hash,
} from 'lucide-react';

const STEP_LABELS_PROJECT = ['Type', 'Basics', 'Content', 'Tech Stack', 'Author'];
const STEP_LABELS_PROFILE = ['Type', 'About you', 'Currently', 'Tech Stack', 'Connect'];

export default function FormPage() {
  const { state, updateFormData, updateProject, updateProfile, updateSupport, updateSections } = useStore();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const next = localStorage.getItem('readmehub:next-type');
    if (next === 'project' || next === 'profile') {
      updateFormData({ readmeType: next as ReadmeType });
      localStorage.removeItem('readmehub:next-type');
      setStep(1);
    }
  }, []);

  const fd = state.formData;
  const isProfile = fd.readmeType === 'profile';
  const labels = isProfile ? STEP_LABELS_PROFILE : STEP_LABELS_PROJECT;
  const totalSteps = labels.length;

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const finish = () => setLocation('/editor');

  const sec = fd.sections;
  const toggleSec = (key: keyof SectionToggles) => updateSections({ [key]: !sec[key] });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">/// Build your README</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-3">
            {step === 0 ? 'Pick a flavor.' : isProfile ? 'Profile README' : 'Project README'}
          </h1>
          <p className="font-mono text-sm md:text-base text-muted-foreground">
            {step === 0
              ? 'Two kinds of README — pick the one you want to build first.'
              : 'Step ' + (step + 1) + ' of ' + totalSteps + ' — toggle sections off to exclude them from the README.'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {labels.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 shrink-0 px-3 py-2 border-2 font-mono text-[10px] md:text-xs uppercase tracking-wider transition-colors ${
                  i === step
                    ? 'bg-primary text-primary-foreground border-primary font-bold'
                    : i < step
                      ? 'bg-card border-foreground/40 text-foreground'
                      : 'border-foreground/20 text-muted-foreground hover:border-foreground/40'
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center bg-foreground/10 text-current font-bold">
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                {label}
              </button>
            ))}
          </div>
          <div className="h-1 bg-card border border-foreground/20">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${fd.readmeType}-${step}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18 }}
            className="border-2 border-foreground bg-card p-5 md:p-8 shadow-[6px_6px_0_0_hsl(var(--foreground))]"
          >
            {step === 0 && (
              <StepType
                value={fd.readmeType}
                onChoose={(t) => {
                  updateFormData({ readmeType: t });
                  setStep(1);
                }}
              />
            )}

            {step === 1 && !isProfile && (
              <StepProjectBasics value={fd.project} onChange={updateProject} />
            )}
            {step === 2 && !isProfile && (
              <StepProjectContent
                value={fd.project}
                onChange={updateProject}
                sec={sec}
                toggleSec={toggleSec}
              />
            )}
            {step === 3 && (
              <StepTech
                selected={fd.techStack}
                categorize={fd.categorizeTech}
                collapsible={fd.collapsibleTech}
                onChange={(arr) => updateFormData({ techStack: arr })}
                onCategorize={(v) => updateFormData({ categorizeTech: v })}
                onCollapsible={(v) => updateFormData({ collapsibleTech: v })}
                isProfile={isProfile}
                showTechStack={isProfile ? sec.prTechStack : sec.pTechStack}
                onToggleTechStack={() => toggleSec(isProfile ? 'prTechStack' : 'pTechStack')}
              />
            )}
            {step === 4 && !isProfile && (
              <StepProjectAuthor
                data={fd}
                onChange={updateFormData}
                onSupportChange={updateSupport}
                sec={sec}
                toggleSec={toggleSec}
              />
            )}

            {step === 1 && isProfile && (
              <StepProfileAbout
                value={fd.profile}
                github={fd.github}
                onChange={updateProfile}
                onGithubChange={(v) => updateFormData({ github: v })}
                sec={sec}
                toggleSec={toggleSec}
              />
            )}
            {step === 2 && isProfile && (
              <StepProfileCurrently
                value={fd.profile}
                github={fd.github}
                onChange={updateProfile}
                sec={sec}
                toggleSec={toggleSec}
              />
            )}
            {step === 4 && isProfile && (
              <StepProfileConnect
                data={fd}
                onChange={updateFormData}
                onProfileChange={updateProfile}
                onSupportChange={updateSupport}
                sec={sec}
                toggleSec={toggleSec}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="flex items-center justify-between mt-6 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={back}
            disabled={step === 0}
            className="border-2 border-foreground rounded-none font-mono uppercase font-bold tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground hidden sm:block">
            Step {step + 1} / {totalSteps}
          </div>

          {step < totalSteps - 1 ? (
            <Button
              type="button"
              onClick={next}
              className="border-2 border-foreground rounded-none bg-primary text-primary-foreground hover:bg-primary font-mono uppercase font-bold tracking-wider brutal-btn"
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={finish}
              className="border-2 border-foreground rounded-none bg-accent text-accent-foreground hover:bg-accent font-mono uppercase font-bold tracking-wider brutal-btn"
            >
              <Sparkles className="w-4 h-4 mr-2" /> Generate README
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}

/* =============================================================================
   STEP COMPONENTS
============================================================================= */

function StepType({ value, onChoose }: { value: ReadmeType; onChoose: (t: ReadmeType) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold uppercase tracking-tight">What are you documenting?</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <TypeCard
          active={value === 'project'}
          icon={<FileCode className="w-7 h-7" />}
          title="Project README"
          desc="A README for a repo. Project name, tagline, install, usage, contributing, license."
          onClick={() => onChoose('project')}
        />
        <TypeCard
          active={value === 'profile'}
          icon={<User className="w-7 h-7" />}
          accent
          title="Profile README"
          desc="The README pinned to your GitHub profile. Bio, what you build, your stack, live GitHub stats."
          onClick={() => onChoose('profile')}
        />
      </div>
    </div>
  );
}

function TypeCard({
  active, icon, title, desc, onClick, accent,
}: {
  active: boolean; icon: React.ReactNode; title: string; desc: string; onClick: () => void; accent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-6 border-2 transition-all ${
        active
          ? `border-primary ${accent ? 'bg-accent/15' : 'bg-primary/15'} shadow-[6px_6px_0_0_hsl(var(--primary))]`
          : 'border-foreground/40 hover:border-foreground hover:bg-background hover:shadow-[6px_6px_0_0_hsl(var(--foreground))]'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 flex items-center justify-center border-2 border-foreground ${accent ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
          {icon}
        </div>
        {active && (
          <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground border-2 border-foreground">
            <Check className="w-5 h-5" strokeWidth={3} />
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{title}</h3>
      <p className="font-mono text-sm text-muted-foreground">{desc}</p>
    </button>
  );
}

/* PROJECT STEPS */

function StepProjectBasics({ value, onChange }: { value: ProjectFields; onChange: (v: Partial<ProjectFields>) => void }) {
  return (
    <div className="space-y-5">
      <SectionTitle eyebrow="01" title="Basics" hint="The headline and subheadline of your repo." />
      <Field label="Project name">
        <Input value={value.projectName} onChange={(e) => onChange({ projectName: e.target.value })} className="brutal-input font-mono" />
      </Field>
      <Field label="Tagline" hint="One short sentence — shows up under the title.">
        <Input value={value.tagline} onChange={(e) => onChange({ tagline: e.target.value })} className="brutal-input font-mono" />
      </Field>
      <Field label="Description" hint="A paragraph explaining what your project does and who it's for.">
        <Textarea value={value.description} onChange={(e) => onChange({ description: e.target.value })} className="brutal-input font-mono min-h-[110px]" />
      </Field>
      <Field label="Banner image URL (optional)" hint="A hero image at the top. Leave blank for a generated one.">
        <Input value={value.bannerUrl} onChange={(e) => onChange({ bannerUrl: e.target.value })} placeholder="https://..." className="brutal-input font-mono" />
      </Field>
    </div>
  );
}

function StepProjectContent({
  value, onChange, sec, toggleSec,
}: {
  value: ProjectFields;
  onChange: (v: Partial<ProjectFields>) => void;
  sec: SectionToggles;
  toggleSec: (k: keyof SectionToggles) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionTitle eyebrow="02" title="Content" hint="Toggle each section to include or skip it in your README." />

      <SectionBlock title="Features" icon={<Star className="w-3.5 h-3.5" />} enabled={sec.pFeatures} onToggle={() => toggleSec('pFeatures')}>
        <Field label="Features (markdown list)" hint="Use - or * for bullets.">
          <Textarea value={value.features} onChange={(e) => onChange({ features: e.target.value })} className="brutal-input font-mono min-h-[110px]" />
        </Field>
      </SectionBlock>

      <SectionBlock title="Installation" icon={<Wrench className="w-3.5 h-3.5" />} enabled={sec.pInstall} onToggle={() => toggleSec('pInstall')}>
        <Field label="Installation command or instructions">
          <Textarea value={value.installation} onChange={(e) => onChange({ installation: e.target.value })} className="brutal-input font-mono min-h-[80px]" />
        </Field>
      </SectionBlock>

      <SectionBlock title="Usage" icon={<Zap className="w-3.5 h-3.5" />} enabled={sec.pUsage} onToggle={() => toggleSec('pUsage')}>
        <Field label="Usage example or code snippet">
          <Textarea value={value.usage} onChange={(e) => onChange({ usage: e.target.value })} className="brutal-input font-mono min-h-[110px]" />
        </Field>
      </SectionBlock>

      <SectionBlock title="Screenshots" icon={<Eye className="w-3.5 h-3.5" />} enabled={sec.pScreenshots} onToggle={() => toggleSec('pScreenshots')}>
        <Field label="Screenshots (markdown)" hint='e.g. ![alt text](https://...)'>
          <Textarea value={value.screenshots} onChange={(e) => onChange({ screenshots: e.target.value })} placeholder="![alt](https://...)" className="brutal-input font-mono min-h-[70px]" />
        </Field>
      </SectionBlock>

      <div className="grid sm:grid-cols-2 gap-4">
        <SectionBlock title="Contributing" icon={<BookOpen className="w-3.5 h-3.5" />} enabled={sec.pContributing} onToggle={() => toggleSec('pContributing')}>
          <Field label="Contributing guidelines">
            <Textarea value={value.contributing} onChange={(e) => onChange({ contributing: e.target.value })} className="brutal-input font-mono min-h-[80px]" />
          </Field>
        </SectionBlock>
        <SectionBlock title="License" icon={<Hash className="w-3.5 h-3.5" />} enabled={sec.pLicense} onToggle={() => toggleSec('pLicense')}>
          <Field label="License">
            <Input value={value.license} onChange={(e) => onChange({ license: e.target.value })} className="brutal-input font-mono" />
          </Field>
        </SectionBlock>
      </div>
    </div>
  );
}

function StepProjectAuthor({
  data, onChange, onSupportChange, sec, toggleSec,
}: {
  data: FormData;
  onChange: (v: Partial<FormData>) => void;
  onSupportChange: (v: Partial<SupportLinks>) => void;
  sec: SectionToggles;
  toggleSec: (k: keyof SectionToggles) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle eyebrow="04" title="Author" hint="Who built it and where to find you." />

      <SectionBlock title="Contact & Author" icon={<User className="w-3.5 h-3.5" />} enabled={sec.pContact} onToggle={() => toggleSec('pContact')}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Author name">
            <Input value={data.author} onChange={(e) => onChange({ author: e.target.value })} className="brutal-input font-mono" />
          </Field>
          <Field label="GitHub username">
            <SocialInput icon={<Github className="w-4 h-4" />} value={data.github} onChange={(v) => onChange({ github: v })} placeholder="username" />
          </Field>
          <Field label="Email">
            <SocialInput icon={<Mail className="w-4 h-4" />} value={data.email} onChange={(v) => onChange({ email: v })} placeholder="you@example.com" />
          </Field>
          <Field label="Website">
            <SocialInput icon={<Globe className="w-4 h-4" />} value={data.website} onChange={(v) => onChange({ website: v })} placeholder="https://..." />
          </Field>
          <Field label="Twitter / X">
            <SocialInput icon={<Twitter className="w-4 h-4" />} value={data.twitter} onChange={(v) => onChange({ twitter: v })} placeholder="@handle" />
          </Field>
          <Field label="LinkedIn">
            <SocialInput icon={<Linkedin className="w-4 h-4" />} value={data.linkedin} onChange={(v) => onChange({ linkedin: v })} placeholder="username or full URL" />
          </Field>
        </div>
      </SectionBlock>

      <FooterToggle data={data} onChange={onChange} onSupportChange={onSupportChange} />
    </div>
  );
}

/* PROFILE STEPS */

function StepProfileAbout({
  value, github, onChange, onGithubChange, sec, toggleSec,
}: {
  value: ProfileFields;
  github: string;
  onChange: (v: Partial<ProfileFields>) => void;
  onGithubChange: (v: string) => void;
  sec: SectionToggles;
  toggleSec: (k: keyof SectionToggles) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle eyebrow="01" title="About you" hint="The header of your GitHub profile." />

      {/* GitHub username — prominent, always visible */}
      <div className="border-2 border-primary bg-primary/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Github className="w-4 h-4 text-primary" />
          <span className="font-mono uppercase font-bold text-xs tracking-wider text-primary">GitHub Username</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-primary/70 border border-primary/30 px-2 py-0.5">
            Powers all stats
          </span>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none font-mono text-sm">@</div>
          <Input
            value={github}
            onChange={(e) => onGithubChange(e.target.value.replace(/^@/, ''))}
            placeholder="your-github-username"
            className="brutal-input font-mono pl-7"
          />
        </div>
        {github && (
          <p className="font-mono text-[11px] text-primary/80 mt-2">
            ✓ Stats widgets will pull from: github.com/{github}
          </p>
        )}
        {!github && (
          <p className="font-mono text-[11px] text-muted-foreground mt-2">
            Enter your username so GitHub stats, streak charts, and trophy widgets work correctly.
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Display name">
          <Input value={value.name} onChange={(e) => onChange({ name: e.target.value })} className="brutal-input font-mono" />
        </Field>
        <Field label="Role / Title">
          <Input value={value.role} onChange={(e) => onChange({ role: e.target.value })} placeholder="e.g. Full-Stack Developer" className="brutal-input font-mono" />
        </Field>
        <Field label="Location">
          <Input value={value.location} onChange={(e) => onChange({ location: e.target.value })} placeholder="e.g. Berlin" className="brutal-input font-mono" />
        </Field>
        <Field label="Banner image URL (optional)">
          <Input value={value.bannerUrl} onChange={(e) => onChange({ bannerUrl: e.target.value })} placeholder="https://..." className="brutal-input font-mono" />
        </Field>
      </div>

      <SectionBlock title="Bio" icon={<User className="w-3.5 h-3.5" />} enabled={sec.prBio} onToggle={() => toggleSec('prBio')}>
        <Field label="Short bio" hint="2-3 sentences about you.">
          <Textarea value={value.bio} onChange={(e) => onChange({ bio: e.target.value })} className="brutal-input font-mono min-h-[110px]" />
        </Field>
      </SectionBlock>
    </div>
  );
}

function StepProfileCurrently({
  value, github, onChange, sec, toggleSec,
}: {
  value: ProfileFields;
  github: string;
  onChange: (v: Partial<ProfileFields>) => void;
  sec: SectionToggles;
  toggleSec: (k: keyof SectionToggles) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionTitle eyebrow="02" title="Right now" hint="Status fields and GitHub stat widgets." />

      <SectionBlock title="Status" icon={<Zap className="w-3.5 h-3.5" />} enabled={sec.prStatus} onToggle={() => toggleSec('prStatus')}>
        <div className="space-y-4">
          <Field label="Currently working on">
            <Input value={value.currentlyWorking} onChange={(e) => onChange({ currentlyWorking: e.target.value })} className="brutal-input font-mono" />
          </Field>
          <Field label="Currently learning">
            <Input value={value.learning} onChange={(e) => onChange({ learning: e.target.value })} className="brutal-input font-mono" />
          </Field>
          <Field label="Looking to collaborate on">
            <Input value={value.collaboration} onChange={(e) => onChange({ collaboration: e.target.value })} className="brutal-input font-mono" />
          </Field>
          <Field label="Fun fact">
            <Input value={value.funFact} onChange={(e) => onChange({ funFact: e.target.value })} className="brutal-input font-mono" />
          </Field>
        </div>
      </SectionBlock>

      <SectionBlock title="GitHub Stats Widgets" icon={<BarChart2 className="w-3.5 h-3.5" />} enabled={sec.prStats} onToggle={() => toggleSec('prStats')}>
        {github ? (
          <div className="space-y-3">
            <p className="font-mono text-[11px] text-primary">
              ✓ Widgets will use: github.com/{github}
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              <ToggleRow label="Stats card" checked={value.showStats} onChange={(v) => onChange({ showStats: v })} />
              <ToggleRow label="Top languages" checked={value.showTopLangs} onChange={(v) => onChange({ showTopLangs: v })} />
              <ToggleRow label="Streak stats" checked={value.showStreak} onChange={(v) => onChange({ showStreak: v })} />
              <ToggleRow label="Trophies" checked={value.showTrophies} onChange={(v) => onChange({ showTrophies: v })} />
              <ToggleRow label="Profile views counter" checked={value.showVisitors} onChange={(v) => onChange({ showVisitors: v })} />
            </div>
          </div>
        ) : (
          <div className="border border-foreground/20 bg-card p-3">
            <p className="font-mono text-xs text-muted-foreground">
              Go back to <b>About you</b> and enter your GitHub username to enable stat widgets.
            </p>
          </div>
        )}
      </SectionBlock>
    </div>
  );
}

function StepProfileConnect({
  data, onChange, onProfileChange, onSupportChange, sec, toggleSec,
}: {
  data: FormData;
  onChange: (v: Partial<FormData>) => void;
  onProfileChange: (v: Partial<ProfileFields>) => void;
  onSupportChange: (v: Partial<SupportLinks>) => void;
  sec: SectionToggles;
  toggleSec: (k: keyof SectionToggles) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle eyebrow="04" title="Connect" hint="Where people can find and follow you." />

      <SectionBlock title="Contact & Social Links" icon={<Github className="w-3.5 h-3.5" />} enabled={sec.prContact} onToggle={() => toggleSec('prContact')}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="GitHub username" hint="Used for stats widgets too.">
            <SocialInput icon={<Github className="w-4 h-4" />} value={data.github} onChange={(v) => onChange({ github: v })} placeholder="username" />
          </Field>
          <Field label="Email">
            <SocialInput icon={<Mail className="w-4 h-4" />} value={data.email} onChange={(v) => onChange({ email: v })} placeholder="you@example.com" />
          </Field>
          <Field label="Website">
            <SocialInput icon={<Globe className="w-4 h-4" />} value={data.website} onChange={(v) => onChange({ website: v })} placeholder="https://..." />
          </Field>
          <Field label="Twitter / X">
            <SocialInput icon={<Twitter className="w-4 h-4" />} value={data.twitter} onChange={(v) => onChange({ twitter: v })} placeholder="@handle" />
          </Field>
          <Field label="LinkedIn">
            <SocialInput icon={<Linkedin className="w-4 h-4" />} value={data.linkedin} onChange={(v) => onChange({ linkedin: v })} placeholder="username or full URL" />
          </Field>
        </div>
      </SectionBlock>

      <FooterToggle data={data} onChange={onChange} onSupportChange={onSupportChange} />
    </div>
  );
}

/* TECH STEP */

function StepTech({
  selected, categorize, collapsible, onChange, onCategorize, onCollapsible,
  isProfile, showTechStack, onToggleTechStack,
}: {
  selected: string[];
  categorize: boolean;
  collapsible: boolean;
  onChange: (arr: string[]) => void;
  onCategorize: (v: boolean) => void;
  onCollapsible: (v: boolean) => void;
  isProfile: boolean;
  showTechStack: boolean;
  onToggleTechStack: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <SectionTitle eyebrow="03" title="Tech stack" hint="Click logos to pick the tools your project / profile uses." />
      </div>

      <SectionBlock
        title="Tech Stack Section"
        icon={<Layers className="w-3.5 h-3.5" />}
        enabled={showTechStack}
        onToggle={onToggleTechStack}
      >
        {/* Categorization controls */}
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <label className={`flex items-start gap-3 p-3 border-2 cursor-pointer transition-colors ${
            categorize ? 'border-primary bg-primary/10' : 'border-foreground/30 bg-card hover:border-foreground/60'
          }`}>
            <Checkbox
              checked={categorize}
              onCheckedChange={(v) => onCategorize(!!v)}
              className="rounded-none border-2 border-foreground mt-0.5"
            />
            <div className="min-w-0">
              <div className="font-mono uppercase font-bold text-xs tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" /> Group by category
              </div>
              <div className="font-mono text-[11px] text-muted-foreground mt-1 leading-relaxed">
                Output sections like <b>Frontend</b>, <b>Backend</b>, <b>DevOps</b> instead of one big row.
              </div>
            </div>
          </label>

          <label className={`flex items-start gap-3 p-3 border-2 cursor-pointer transition-colors ${
            !categorize ? 'opacity-40 cursor-not-allowed' : ''
          } ${
            categorize && collapsible ? 'border-accent bg-accent/10' : 'border-foreground/30 bg-card hover:border-foreground/60'
          }`}>
            <Checkbox
              checked={collapsible}
              disabled={!categorize}
              onCheckedChange={(v) => onCollapsible(!!v)}
              className="rounded-none border-2 border-foreground mt-0.5"
            />
            <div className="min-w-0">
              <div className="font-mono uppercase font-bold text-xs tracking-wider flex items-center gap-2">
                <FoldVertical className="w-3.5 h-3.5" /> Collapsible sections
              </div>
              <div className="font-mono text-[11px] text-muted-foreground mt-1 leading-relaxed">
                Each category becomes a click-to-expand <code>&lt;details&gt;</code> block in the README.
              </div>
            </div>
          </label>
        </div>

        <TechPicker selected={selected} onChange={onChange} />
      </SectionBlock>
    </div>
  );
}

/* =============================================================================
   SHARED UI COMPONENTS
============================================================================= */

function SectionBlock({
  title, icon, enabled, onToggle, children,
}: {
  title: string;
  icon?: React.ReactNode;
  enabled: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`border-2 transition-all ${enabled ? 'border-foreground/40' : 'border-foreground/15'}`}>
      <div className={`flex items-center justify-between px-3 py-2.5 border-b border-foreground/20 ${enabled ? 'bg-card' : 'bg-muted/30'}`}>
        <div className="flex items-center gap-2">
          <div className={`transition-colors ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}>{icon}</div>
          <span className={`font-mono uppercase text-[11px] font-bold tracking-wider transition-colors ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</span>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`flex items-center gap-1.5 px-2.5 py-1 border font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
            enabled
              ? 'border-primary/50 text-primary bg-primary/10 hover:bg-primary/20'
              : 'border-foreground/20 text-muted-foreground bg-card hover:border-foreground/40'
          }`}
        >
          {enabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          {enabled ? 'Included' : 'Skipped'}
        </button>
      </div>
      {enabled ? (
        <div className="p-4 space-y-4">{children}</div>
      ) : (
        <div className="px-4 py-3 flex items-center gap-2">
          <EyeOff className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <p className="font-mono text-xs text-muted-foreground">This section will not appear in your README. Toggle to re-enable it.</p>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ eyebrow, title, hint }: { eyebrow: string; title: string; hint?: string }) {
  return (
    <div className="border-b-2 border-foreground pb-3 mb-2">
      <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">/// {eyebrow}</div>
      <h2 className="text-2xl font-bold uppercase tracking-tight">{title}</h2>
      {hint && <p className="font-mono text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-mono uppercase font-bold text-xs tracking-wider">{label}</Label>
      {children}
      {hint && <p className="font-mono text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function SocialInput({
  icon, value, onChange, placeholder,
}: {
  icon: React.ReactNode; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">{icon}</div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="brutal-input font-mono pl-10"
      />
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className={`flex items-center justify-between gap-3 px-3 py-3 border-2 cursor-pointer transition-colors ${
      checked ? 'border-primary bg-primary/10' : 'border-foreground/30 bg-card hover:border-foreground/60'
    }`}>
      <span className="font-mono uppercase text-xs tracking-wider font-bold">{label}</span>
      <Checkbox checked={checked} onCheckedChange={(v) => onChange(!!v)} className="rounded-none border-2 border-foreground" />
    </label>
  );
}

function FooterToggle({
  data, onChange, onSupportChange,
}: {
  data: FormData; onChange: (v: Partial<FormData>) => void; onSupportChange: (v: Partial<SupportLinks>) => void;
}) {
  return (
    <div className={`border-2 transition-colors ${
      data.includeSupportFooter ? 'border-accent bg-accent/10' : 'border-foreground/30 bg-card'
    }`}>
      <label className="flex items-start gap-3 p-4 cursor-pointer">
        <Checkbox
          checked={data.includeSupportFooter}
          onCheckedChange={(v) => onChange({ includeSupportFooter: !!v })}
          className="rounded-none border-2 border-foreground mt-0.5"
        />
        <div className="min-w-0">
          <div className="font-mono uppercase font-bold text-xs tracking-wider flex items-center gap-2">
            <Coffee className="w-3.5 h-3.5" /> Include support footer
          </div>
          <div className="font-mono text-[11px] text-muted-foreground mt-1 leading-relaxed">
            Adds a tasteful "Buy me a coffee" + "Follow on GitHub" block at the bottom of your README.
            Leave the links blank to use ReadmeHub's defaults.
          </div>
        </div>
      </label>

      {data.includeSupportFooter && (
        <div className="border-t-2 border-foreground/20 p-4 grid sm:grid-cols-2 gap-3">
          <Field label="Buy Me a Coffee URL" hint={`Empty → ${DEFAULT_BUYMEACOFFEE}`}>
            <SocialInput
              icon={<Coffee className="w-4 h-4" />}
              value={data.support?.buyMeCoffee || ''}
              onChange={(v) => onSupportChange({ buyMeCoffee: v })}
              placeholder={DEFAULT_BUYMEACOFFEE}
            />
          </Field>
          <Field label="Follow on GitHub" hint={`Empty → uses your username (or ${DEFAULT_FOLLOW_GITHUB})`}>
            <SocialInput
              icon={<Github className="w-4 h-4" />}
              value={data.support?.followGithub || ''}
              onChange={(v) => onSupportChange({ followGithub: v })}
              placeholder="username or full URL"
            />
          </Field>
        </div>
      )}
    </div>
  );
}
