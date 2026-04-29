import React, { useMemo, useState } from 'react';
import { TECH_OPTIONS, TechItem, findTech } from '@/lib/tech-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RobustImage } from '@/components/robust-image';
import { Check, X, Plus, Search } from 'lucide-react';

interface TechPickerProps {
  selected: string[];
  onChange: (next: string[]) => void;
}

const CATEGORIES: { id: TechItem['category'] | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'language', label: 'Languages' },
  { id: 'framework', label: 'Frameworks' },
  { id: 'styling', label: 'Styling' },
  { id: 'database', label: 'Databases' },
  { id: 'devops', label: 'DevOps' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI' },
  { id: 'tools', label: 'Tools' },
];

function iconUrls(slug: string, color: string): string[] {
  return [
    `https://cdn.simpleicons.org/${slug}/white`,
    `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`,
    `https://img.shields.io/badge/-${encodeURIComponent(slug)}-${color}?style=flat-square&logo=${slug}&logoColor=white`,
  ];
}

export function TechPicker({ selected, onChange }: TechPickerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<TechItem['category'] | 'all'>('all');
  const [customInput, setCustomInput] = useState('');

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TECH_OPTIONS.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (!q) return true;
      return t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q);
    });
  }, [query, category]);

  const toggle = (slug: string) => {
    const next = selectedSet.has(slug)
      ? selected.filter((s) => s !== slug)
      : [...selected, slug];
    onChange(next);
  };

  const selectAllVisible = () => {
    const visibleSlugs = filtered.map((t) => t.slug);
    const merged = Array.from(new Set([...selected, ...visibleSlugs]));
    onChange(merged);
  };

  const clearAll = () => onChange([]);

  const addCustom = () => {
    const slug = customInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!slug) return;
    if (!selectedSet.has(slug)) onChange([...selected, slug]);
    setCustomInput('');
  };

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 90+ technologies..."
              className="pl-10 font-mono"
            />
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={selectAllVisible} className="rounded-none border-2 font-mono uppercase text-xs whitespace-nowrap">
              <Check className="w-4 h-4 mr-1" /> Select all
            </Button>
            <Button type="button" variant="outline" onClick={clearAll} className="rounded-none border-2 font-mono uppercase text-xs whitespace-nowrap">
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border-2 transition-colors ${
                category === c.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-foreground/30 hover:border-foreground hover:bg-card'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected summary */}
      <div className="flex items-center justify-between border-2 border-foreground/20 bg-card/40 p-3">
        <div className="font-mono text-xs uppercase tracking-wider">
          <span className="text-primary font-bold">{selected.length}</span> selected
        </div>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1.5 max-w-[70%] justify-end">
            {selected.slice(0, 6).map((s) => (
              <span key={s} className="font-mono text-[10px] uppercase px-2 py-0.5 bg-primary/10 border border-primary/40 text-primary">
                {findTech(s).name}
              </span>
            ))}
            {selected.length > 6 && (
              <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-muted text-muted-foreground border border-foreground/20">
                +{selected.length - 6} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Logo grid */}
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 max-h-[460px] overflow-y-auto p-1">
        {filtered.map((t) => {
          const isSelected = selectedSet.has(t.slug);
          return (
            <button
              type="button"
              key={t.slug}
              onClick={() => toggle(t.slug)}
              aria-pressed={isSelected}
              className={`group relative aspect-square flex flex-col items-center justify-center gap-2 p-3 border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/15 shadow-[3px_3px_0_0_hsl(var(--primary))]'
                  : 'border-foreground/30 hover:border-foreground hover:bg-card hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_hsl(var(--foreground))]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
              )}
              <div className="w-9 h-9 flex items-center justify-center">
                <RobustImage
                  sources={iconUrls(t.slug, t.color)}
                  alt={t.name}
                  className="w-full h-full object-contain"
                  fallback={
                    <div
                      className="w-9 h-9 flex items-center justify-center text-[10px] font-mono font-bold text-white"
                      style={{ background: `#${t.color}` }}
                    >
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                  }
                />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-tight text-center leading-tight">
                {t.name}
              </span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 font-mono text-sm text-muted-foreground">
            No tech matches "{query}". Add it as custom below.
          </div>
        )}
      </div>

      {/* Custom add */}
      <div className="border-t-2 border-foreground/20 pt-4">
        <label className="font-mono uppercase font-bold text-xs tracking-wider block mb-2">
          Add custom tech
        </label>
        <div className="flex gap-2">
          <Input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustom();
              }
            }}
            placeholder="e.g. solidjs, qwik, htmx..."
            className="font-mono"
          />
          <Button type="button" onClick={addCustom} className="rounded-none border-2 font-mono uppercase text-xs">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
