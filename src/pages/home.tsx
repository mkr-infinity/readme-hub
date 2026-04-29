import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { STORE_KEY } from '@/lib/store';
import { templates } from '@/lib/templates';
import { ArrowRight, Sparkles, FileCode, User, Palette, Eye, Download, Coffee, Github, Star, Layers, Pencil, X } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (parsed?.editedAt) setHasDraft(true);
    } catch {}
  }, []);

  const dismissDraft = () => {
    if (!confirm('Discard your saved draft? This cannot be undone.')) return;
    localStorage.removeItem(STORE_KEY);
    setHasDraft(false);
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-foreground">
        <div className="absolute inset-0 pointer-events-none scanlines opacity-20" aria-hidden />
        <div className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full bg-primary/15 blob pointer-events-none" aria-hidden />
        <div className="absolute -bottom-24 right-0 w-[440px] h-[440px] rounded-full bg-accent/12 blob pointer-events-none" style={{ animationDelay: '-4s' }} aria-hidden />

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-foreground bg-card font-mono text-[11px] uppercase tracking-widest"
            >
              <span className="w-2 h-2 bg-primary blink shrink-0" /> Open source &middot; Free forever
            </motion.div>

            {hasDraft && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 border-2 border-primary bg-primary/10 px-3 py-2 max-w-fit"
              >
                <Pencil className="w-4 h-4 text-primary shrink-0" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-foreground">
                  You have a saved draft
                </span>
                <button
                  type="button"
                  onClick={() => setLocation('/editor')}
                  className="font-mono text-[11px] uppercase tracking-wider font-bold text-primary hover:underline"
                >
                  Continue &rarr;
                </button>
                <button
                  type="button"
                  onClick={dismissDraft}
                  aria-label="Discard draft"
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-sans font-bold leading-[0.95] tracking-tighter uppercase"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
            >
              Beautiful
              <br />
              <span className="inline-block bg-primary text-primary-foreground px-3 -rotate-1 border-4 border-foreground my-1.5">
                README
              </span>
              <br />
              <span className="shimmer-text">files in seconds.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-lg md:text-xl font-mono max-w-xl border-l-4 border-accent pl-5 text-foreground/85"
            >
              Pick a bold theme, fill a smart form, and export a Markdown file the open-source community will actually open. Project READMEs and GitHub profile READMEs &mdash; 15 themes, one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => setLocation('/templates')}
                className="text-base h-14 px-7 brutal-btn bg-primary text-primary-foreground hover:bg-primary rounded-none uppercase font-bold tracking-wider"
              >
                <Palette className="w-5 h-5 mr-2" /> Start from template
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation('/form')}
                className="text-base h-14 px-7 brutal-btn bg-card text-foreground hover:bg-card rounded-none uppercase font-bold tracking-wider"
              >
                <FileCode className="w-5 h-5 mr-2" /> Build with form
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-6 pt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              <div className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-primary" /> 15 themes</div>
              <div className="flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-primary" /> 90+ logos</div>
              <div className="flex items-center gap-2"><Eye className="w-3.5 h-3.5 text-primary" /> Live preview</div>
            </motion.div>
          </div>

          {/* Hero card — mockup of a README output */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:block float"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-accent border-2 border-foreground -rotate-3" />
              <div className="relative bg-card border-2 border-foreground p-5 shadow-[12px_12px_0_0_hsl(var(--foreground))]">
                {/* Window chrome */}
                <div className="flex items-center gap-2 pb-3 border-b border-foreground/20 mb-4">
                  <span className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="w-3 h-3 rounded-full bg-accent" />
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="ml-auto font-mono text-[10px] uppercase text-muted-foreground">README.md</span>
                </div>
                {/* Mock README content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Logo size={36} />
                    <div>
                      <div className="font-sans text-base font-bold uppercase tracking-tight">ReadmeHub</div>
                      <div className="font-mono text-[10px] text-muted-foreground">The README generator devs love.</div>
                    </div>
                  </div>
                  {/* Fake badges */}
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { label: 'MIT', color: 'bg-primary/80' },
                      { label: 'Open Source', color: 'bg-accent/80' },
                      { label: 'Free', color: 'bg-foreground/20' },
                    ].map(b => (
                      <span key={b.label} className={`px-2 py-0.5 ${b.color} font-mono text-[9px] uppercase font-bold rounded-sm text-foreground`}>{b.label}</span>
                    ))}
                  </div>
                  {/* Fake markdown lines */}
                  <div className="space-y-1.5 pt-1">
                    {[100, 80, 95, 65, 85].map((w, i) => (
                      <div
                        key={i}
                        className="h-1.5 rounded-full bg-foreground/10"
                        style={{ width: `${w}%`, background: i === 0 ? 'hsl(var(--primary)/0.5)' : undefined }}
                      />
                    ))}
                  </div>
                  {/* Fake code block */}
                  <div className="bg-background border border-foreground/20 p-2 font-mono text-[9px] text-primary space-y-0.5 rounded-sm">
                    <div className="text-muted-foreground">$ git clone repo</div>
                    <div>$ pnpm install</div>
                    <div>$ pnpm dev<span className="blink ml-0.5">_</span></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TWO MODES */}
      <section className="border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">/// Choose your flavor</div>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Two kinds of README.</h2>
            </div>
            <p className="font-mono text-sm text-muted-foreground max-w-md">
              Whatever you ship &mdash; a project repo or your GitHub profile &mdash; the form adapts to the right fields.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ModeCard
              icon={<FileCode className="w-8 h-8" />}
              eyebrow="01"
              title="Project README"
              description="Tagline, features, install, usage, contributing &mdash; everything a great project doc needs. Pick a theme, generate beautiful badges from your tech stack, and ship."
              cta="Build a project README"
              onClick={() => {
                localStorage.setItem('readmehub:next-type', 'project');
                setLocation('/form');
              }}
            />
            <ModeCard
              accent
              icon={<User className="w-8 h-8" />}
              eyebrow="02"
              title="GitHub Profile README"
              description="The README pinned to your GitHub profile. Bio, what you're building, what you're learning, your tech stack with logos, and live GitHub stats &mdash; all in one beautiful page."
              cta="Build a profile README"
              onClick={() => {
                localStorage.setItem('readmehub:next-type', 'profile');
                setLocation('/form');
              }}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b-2 border-foreground bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="mb-10">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">/// How it works</div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Three steps. No friction.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <StepCard step="01" title="Pick a theme" desc="15 structurally distinct templates &mdash; from Brutalist to API Reference to Resume. Or skip to the form and a theme will be applied." icon={<Palette className="w-6 h-6" />} />
            <StepCard step="02" title="Fill the form" desc="Smart, multi-step form that adapts to project or profile. Click logos for your tech stack &mdash; no typing required." icon={<FileCode className="w-6 h-6" />} />
            <StepCard step="03" title="Edit &amp; export" desc="Live side-by-side preview. Tweak the raw markdown, then copy or download as README.md." icon={<Download className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* TEMPLATE PREVIEW STRIP */}
      <section className="border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">/// Theme gallery</div>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">15 themes. One vibe each.</h2>
            </div>
            <Link href="/templates" className="font-mono text-sm uppercase tracking-wider underline underline-offset-4 hover:text-primary inline-flex items-center gap-2">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {templates.map((tpl, i) => (
              <motion.button
                key={tpl.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setLocation(`/editor?template=${tpl.id}`)}
                className="group brutal-card text-left overflow-hidden"
              >
                <div
                  className="aspect-[4/3] relative overflow-hidden"
                  style={{ background: tpl.swatch.bg }}
                >
                  {/* Template number badge */}
                  <div
                    className="absolute top-2 left-2 font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 z-10"
                    style={{ background: tpl.swatch.ink, color: tpl.swatch.bg }}
                  >
                    T{String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 z-10" style={{ background: tpl.swatch.accent }} />

                  {/* Mini README mockup */}
                  <div className="absolute inset-0 flex flex-col p-3 pt-8 gap-1">
                    {/* Title line */}
                    <div className="h-2 w-3/4 rounded-sm opacity-90" style={{ background: tpl.swatch.ink }} />
                    {/* Subtitle/divider */}
                    <div className="h-px w-full opacity-30" style={{ background: tpl.swatch.ink }} />
                    {/* Body lines */}
                    <div className="h-1.5 w-full rounded-sm opacity-40 mt-0.5" style={{ background: tpl.swatch.ink }} />
                    <div className="h-1.5 w-5/6 rounded-sm opacity-30" style={{ background: tpl.swatch.ink }} />
                    <div className="h-1.5 w-4/5 rounded-sm opacity-30" style={{ background: tpl.swatch.ink }} />
                    {/* Accent badges row */}
                    <div className="flex gap-1 mt-1">
                      <div className="h-2 w-6 rounded-sm opacity-80" style={{ background: tpl.swatch.accent }} />
                      <div className="h-2 w-8 rounded-sm opacity-60" style={{ background: tpl.swatch.ink }} />
                      <div className="h-2 w-5 rounded-sm opacity-50" style={{ background: tpl.swatch.accent }} />
                    </div>
                    {/* Code block hint */}
                    <div className="mt-0.5 p-1.5 opacity-60 rounded-sm" style={{ background: tpl.swatch.ink + '22', border: `1px solid ${tpl.swatch.ink}44` }}>
                      <div className="h-1 w-2/3 rounded-sm opacity-70" style={{ background: tpl.swatch.accent }} />
                      <div className="h-1 w-1/2 rounded-sm opacity-50 mt-0.5" style={{ background: tpl.swatch.ink }} />
                    </div>
                  </div>

                  {/* Hover overlay with name */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: tpl.swatch.bg + 'dd' }}>
                    <span className="font-mono font-bold text-xs uppercase tracking-tight text-center px-2 leading-tight" style={{ color: tpl.swatch.ink }}>
                      {tpl.name}
                    </span>
                  </div>
                </div>
                <div className="p-3 border-t-2 border-foreground bg-card">
                  <div className="font-mono text-[10px] font-bold text-foreground mb-0.5 uppercase truncate">{tpl.name}</div>
                  <div className="font-mono text-[9px] text-muted-foreground line-clamp-2 leading-relaxed">{tpl.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="border-b-2 border-foreground bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 md:pt-12 pb-4">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">/// 90+ technologies, ready to badge</div>
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter">Click. Logo. Done.</h2>
        </div>
        <TechMarquee />
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-10 md:pb-12 text-center">
          <Link href="/form" className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider underline underline-offset-4 hover:text-primary">
            Pick yours <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="border-b-2 border-foreground bg-card">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            Built with love. <span className="text-accent">Free forever.</span>
          </h2>
          <p className="font-mono text-base text-muted-foreground max-w-2xl mx-auto mb-8">
            ReadmeHub is open source. If it saves you time, consider starring the repo or buying a coffee &mdash; both keep the lights on.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com/mkr-infinity/readme-hub" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-3 font-mono text-sm uppercase font-bold bg-primary text-primary-foreground brutal-btn">
              <Star className="w-4 h-4" /> Star the repo
            </a>
            <a href="https://buymeacoffee.com/mkr_infinity" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-3 font-mono text-sm uppercase font-bold bg-accent text-accent-foreground brutal-btn">
              <Coffee className="w-4 h-4" /> Buy a coffee
            </a>
            <a href="https://github.com/mkr-infinity/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-3 font-mono text-sm uppercase font-bold bg-card brutal-btn">
              <Github className="w-4 h-4" /> Follow
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ModeCard({
  icon, eyebrow, title, description, cta, onClick, accent,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className={`text-left p-6 md:p-8 border-2 border-foreground transition-all ${
        accent ? 'bg-accent text-accent-foreground' : 'bg-card text-foreground'
      } shadow-[6px_6px_0_0_hsl(var(--foreground))] hover:shadow-[8px_8px_0_0_hsl(var(--foreground))]`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 flex items-center justify-center border-2 border-foreground ${accent ? 'bg-foreground text-background' : 'bg-primary text-primary-foreground'}`}>
          {icon}
        </div>
        <span className="font-mono text-2xl font-bold opacity-60">{eyebrow}</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3">{title}</h3>
      <p className={`font-mono text-sm leading-relaxed mb-6 ${accent ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>
        {description}
      </p>
      <div className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider font-bold border-b-2 border-current pb-1">
        {cta} <ArrowRight className="w-4 h-4" />
      </div>
    </motion.button>
  );
}

function TechMarquee() {
  const slugs = [
    'react', 'typescript', 'javascript', 'nodedotjs', 'python', 'go', 'rust', 'tailwindcss',
    'nextdotjs', 'vite', 'svelte', 'vuedotjs', 'astro', 'docker', 'kubernetes', 'postgresql',
    'mongodb', 'redis', 'graphql', 'firebase', 'amazonaws', 'googlecloud', 'vercel', 'netlify',
    'github', 'gitlab', 'figma', 'linear', 'tensorflow', 'pytorch', 'openai', 'anthropic',
  ];
  const Row = ({ reverse = false }: { reverse?: boolean }) => (
    <div className="flex gap-3 shrink-0 marquee" style={reverse ? { animationDirection: 'reverse', animationDuration: '55s' } : { animationDuration: '65s' }}>
      {[...slugs, ...slugs].map((s, i) => (
        <div
          key={`${s}-${i}`}
          className="shrink-0 w-16 h-16 md:w-20 md:h-20 border-2 border-foreground/30 bg-card flex items-center justify-center hover:border-primary hover:-translate-y-1 transition-transform"
        >
          <img
            src={`https://cdn.simpleicons.org/${s}/white`}
            alt={s}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-80 hover:opacity-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${s}.svg`;
            }}
          />
        </div>
      ))}
    </div>
  );
  return (
    <div className="space-y-3 py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex"><Row /></div>
      <div className="flex"><Row reverse /></div>
    </div>
  );
}

function StepCard({ step, title, desc, icon }: { step: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="bg-background border-2 border-foreground p-6 shadow-[4px_4px_0_0_hsl(var(--primary))]">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 flex items-center justify-center border-2 border-foreground bg-primary text-primary-foreground">
          {icon}
        </div>
        <span className="font-mono text-3xl font-bold opacity-30">{step}</span>
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{title}</h3>
      <p className="font-mono text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
