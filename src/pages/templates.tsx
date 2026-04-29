import React from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { templates } from '@/lib/templates';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/** A small-scale mock of a README document, styled with the template's own colours */
function MiniReadme({ swatch }: { swatch: { bg: string; ink: string; accent: string } }) {
  return (
    <div className="absolute inset-0 p-3 pt-9 flex flex-col gap-1.5 overflow-hidden">
      {/* H1 title */}
      <div className="h-2.5 w-3/4 rounded-sm" style={{ background: swatch.ink, opacity: 0.9 }} />
      {/* Subtitle */}
      <div className="h-1.5 w-1/2 rounded-sm" style={{ background: swatch.ink, opacity: 0.45 }} />
      {/* Horizontal rule */}
      <div className="h-px w-full mt-0.5" style={{ background: swatch.ink, opacity: 0.25 }} />
      {/* Badge row */}
      <div className="flex gap-1 mt-0.5">
        <div className="h-2 w-8 rounded-sm" style={{ background: swatch.accent, opacity: 0.85 }} />
        <div className="h-2 w-6 rounded-sm" style={{ background: swatch.ink, opacity: 0.4 }} />
        <div className="h-2 w-7 rounded-sm" style={{ background: swatch.accent, opacity: 0.55 }} />
      </div>
      {/* Body lines */}
      <div className="h-1.5 w-full rounded-sm mt-1" style={{ background: swatch.ink, opacity: 0.35 }} />
      <div className="h-1.5 w-5/6 rounded-sm" style={{ background: swatch.ink, opacity: 0.28 }} />
      <div className="h-1.5 w-4/5 rounded-sm" style={{ background: swatch.ink, opacity: 0.22 }} />
      {/* Section header */}
      <div className="h-2 w-2/5 rounded-sm mt-1" style={{ background: swatch.ink, opacity: 0.65 }} />
      {/* Code block */}
      <div
        className="rounded-sm p-1.5 mt-0.5 flex flex-col gap-1"
        style={{ background: swatch.ink + '18', border: `1px solid ${swatch.ink}30` }}
      >
        <div className="h-1 w-3/5 rounded-sm" style={{ background: swatch.accent, opacity: 0.7 }} />
        <div className="h-1 w-2/5 rounded-sm" style={{ background: swatch.ink, opacity: 0.4 }} />
        <div className="h-1 w-1/2 rounded-sm" style={{ background: swatch.accent, opacity: 0.45 }} />
      </div>
    </div>
  );
}

export default function Templates() {
  const [, setLocation] = useLocation();
  const { setTemplate, updateFormData } = useStore();

  const handleSelect = (id: string) => {
    setTemplate(id);
    updateFormData({ readmeType: 'profile' });
    localStorage.setItem('readmehub:next-type', 'profile');
    setLocation('/form');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 w-full">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">/// Theme gallery</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-3">Pick your vibe.</h1>
          <p className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl">
            15 structurally distinct templates. Each one re-arranges your README&apos;s sections, headers, badges, and tone &mdash; not just colors. Switch any time without losing your content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {templates.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.035 }}
              className="brutal-card flex flex-col group cursor-pointer"
              onClick={() => handleSelect(tpl.id)}
            >
              {/* Theme preview */}
              <div
                className="aspect-[16/10] border-b-2 border-foreground relative overflow-hidden"
                style={{ background: tpl.swatch.bg }}
              >
                {/* Corner badge */}
                <div
                  className="absolute top-2.5 left-2.5 font-mono text-[9px] uppercase font-bold px-2 py-0.5 z-10"
                  style={{ background: tpl.swatch.ink, color: tpl.swatch.bg }}
                >
                  T{String(i + 1).padStart(2, '0')}
                </div>
                {/* Accent dot */}
                <div className="absolute top-2.5 right-2.5 flex gap-1 z-10">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: tpl.swatch.accent }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: tpl.swatch.ink, opacity: 0.5 }} />
                </div>

                {/* Mini README document */}
                <MiniReadme swatch={tpl.swatch} />

                {/* Hover: show theme name overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20"
                  style={{ background: tpl.swatch.bg + 'e8' }}
                >
                  <div className="text-center px-3">
                    <div className="font-mono text-[9px] uppercase tracking-widest mb-1.5" style={{ color: tpl.swatch.accent }}>
                      Click to use
                    </div>
                    <div className="font-sans font-bold text-base uppercase tracking-tight" style={{ color: tpl.swatch.ink }}>
                      {tpl.name}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold uppercase tracking-tight">{tpl.name}</h3>
                  <div
                    className="shrink-0 w-5 h-5 rounded-sm mt-0.5"
                    style={{ background: tpl.swatch.accent }}
                    title={`Accent: ${tpl.swatch.accent}`}
                  />
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-5 flex-1 leading-relaxed">{tpl.description}</p>
                <Button
                  onClick={(e) => { e.stopPropagation(); handleSelect(tpl.id); }}
                  className="w-full border-2 border-foreground rounded-none bg-primary text-primary-foreground hover:bg-primary font-mono uppercase font-bold tracking-wider brutal-btn group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                >
                  Use this theme <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
