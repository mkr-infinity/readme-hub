import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useStore, ReadmeType } from '@/lib/store';
import { templates } from '@/lib/templates';
import { Preview } from '@/components/preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Copy, Download, RefreshCcw, FileCode, User, Eye, Pencil, ChevronLeft, ChevronRight, HelpCircle, Github, Moon, X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';

export default function Editor() {
  const { state, setTemplate, setCustomMarkdown, reset, updateFormData } = useStore();
  const { toast } = useToast();
  const [location] = useLocation();

  useEffect(() => {
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const params = new URLSearchParams(search);
    const tplParam = params.get('template');
    if (tplParam && templates.some((t) => t.id === tplParam) && tplParam !== state.selectedTemplate) {
      setTemplate(tplParam);
    }
  }, []);

  const currentTemplate = useMemo(
    () => templates.find((t) => t.id === state.selectedTemplate) || templates[0],
    [state.selectedTemplate],
  );

  const generated = useMemo(
    () => currentTemplate.generate(state.formData),
    [currentTemplate, state.formData],
  );

  const [localMarkdown, setLocalMarkdown] = useState(state.customMarkdown || generated);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const [previewStyle, setPreviewStyle] = useState<'github' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'github';
    return (localStorage.getItem('readmehub:preview-style') as 'github' | 'dark') || 'github';
  });

  // Resizable split state (percentage for left panel width)
  const [splitPct, setSplitPct] = useState(50);
  const isDragging = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPct(Math.min(Math.max(pct, 20), 80));
    };
    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('readmehub:preview-style', previewStyle);
  }, [previewStyle]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (state.customMarkdown || state.editedAt) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state.customMarkdown, state.editedAt]);

  useEffect(() => {
    if (!state.customMarkdown) {
      setLocalMarkdown(generated);
    }
  }, [generated, state.customMarkdown]);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalMarkdown(val);
    setCustomMarkdown(val);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localMarkdown);
      toast({
        title: 'Copied to clipboard',
        description: 'Paste it as your README.md',
        className: 'rounded-none border-2 border-foreground font-mono uppercase',
      });
    } catch {
      toast({ title: 'Could not copy', description: 'Try downloading instead.' });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([localMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm('Reset edits and re-generate from your form data?')) {
      setCustomMarkdown('');
      setLocalMarkdown(currentTemplate.generate(state.formData));
    }
  };

  const handleHardReset = () => {
    if (confirm('Wipe ALL data and start fresh?')) {
      reset();
      setLocalMarkdown(templates[0].generate({ ...state.formData, readmeType: 'project' }));
    }
  };

  const setType = (t: ReadmeType) => {
    updateFormData({ readmeType: t });
    setCustomMarkdown('');
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOOLBAR */}
        <div className="border-b-2 border-foreground bg-card">
          <div className="max-w-[1400px] mx-auto pl-3 md:pl-5 h-14 flex items-center gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="hidden md:inline-flex shrink-0 items-center justify-center w-9 h-9 border-2 border-foreground bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            <div className="hidden lg:flex items-center gap-2 min-w-0 shrink">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">EDITOR</div>
              <span className="font-mono text-foreground/40">/</span>
              <div className="font-mono text-xs uppercase tracking-tight font-bold truncate">{currentTemplate.name}</div>
            </div>

            <div className="flex-1 hidden md:block" />

            {/* Type switcher */}
            <div className="flex items-center gap-1 border-2 border-foreground p-0.5 bg-background shrink-0">
              <button
                onClick={() => setType('project')}
                className={`flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                  state.formData.readmeType === 'project' ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" /> Project
              </button>
              <button
                onClick={() => setType('profile')}
                className={`flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                  state.formData.readmeType === 'profile' ? 'bg-accent text-accent-foreground' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Profile
              </button>
            </div>

            <div className="flex gap-1.5 shrink-0 pr-3 md:pr-5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHelpOpen(true)}
                className="rounded-none border-2 border-foreground font-mono uppercase text-[10px] shrink-0 w-9 h-9 p-0"
                aria-label="How to use"
                title="How to use this README"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="rounded-none border-2 border-foreground font-mono uppercase text-[10px] shrink-0">
                <RefreshCcw className="w-3.5 h-3.5 sm:mr-1.5" /><span className="hidden sm:inline">Reset</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopy} className="rounded-none border-2 border-foreground font-mono uppercase text-[10px] brutal-btn shrink-0">
                <Copy className="w-3.5 h-3.5 sm:mr-1.5" /><span className="hidden sm:inline">Copy</span>
              </Button>
              <Button size="sm" onClick={handleDownload} className="rounded-none border-2 border-foreground bg-primary text-primary-foreground hover:bg-primary font-mono uppercase text-[10px] brutal-btn shrink-0">
                <Download className="w-3.5 h-3.5 sm:mr-1.5" /><span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          </div>
        </div>

        {/* MAIN AREA */}
        <div className="flex-1 flex overflow-hidden">
          {/* SIDEBAR */}
          {sidebarOpen && (
            <aside className="hidden md:flex w-60 border-r-2 border-foreground bg-card flex-col overflow-hidden shrink-0">
              <div className="p-3 border-b-2 border-foreground bg-background">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">/// Theme</div>
                <div className="font-mono text-sm font-bold uppercase truncate">{currentTemplate.name}</div>
              </div>
              <ScrollArea className="flex-1">
                <div className="flex flex-col">
                  {templates.map((tpl, i) => (
                    <button
                      key={tpl.id}
                      onClick={() => setTemplate(tpl.id)}
                      className={`flex items-center gap-3 p-3 text-left border-b border-foreground/15 transition-colors ${
                        state.selectedTemplate === tpl.id
                          ? 'bg-primary/15 text-primary border-l-4 border-l-primary font-bold'
                          : 'hover:bg-background border-l-4 border-l-transparent'
                      }`}
                    >
                      <div
                        className="w-9 h-9 shrink-0 border-2 border-foreground/30 flex items-center justify-center font-mono text-[9px] font-bold"
                        style={{ background: tpl.swatch.bg, color: tpl.swatch.ink }}
                      >
                        T{String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="min-w-0">
                        <div className="font-sans text-xs uppercase tracking-tight truncate">{tpl.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground truncate">{tpl.id}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-3 border-t-2 border-foreground bg-background space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => (window.location.href = `${import.meta.env.BASE_URL}form`)}
                  className="w-full rounded-none border-2 border-foreground font-mono uppercase text-[10px]"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit form
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleHardReset}
                  className="w-full rounded-none border-2 border-destructive text-destructive font-mono uppercase text-[10px]"
                >
                  Wipe all
                </Button>
              </div>
            </aside>
          )}

          {/* DESKTOP SPLIT — resizable */}
          <div ref={containerRef} className="hidden md:flex flex-1 overflow-hidden relative select-none">
            {/* Editor panel */}
            <div
              className="flex flex-col bg-background overflow-hidden"
              style={{ width: `${splitPct}%` }}
            >
              <div className="px-4 h-9 flex items-center border-b border-foreground/20 font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">
                <Pencil className="w-3 h-3 mr-2" /> Markdown source
              </div>
              <textarea
                value={localMarkdown}
                onChange={handleMarkdownChange}
                spellCheck={false}
                className="w-full flex-1 p-5 font-mono text-[13px] leading-relaxed resize-none bg-background text-foreground focus:outline-none"
              />
            </div>

            {/* Drag handle */}
            <div
              onMouseDown={onMouseDown}
              className="group relative z-10 flex items-center justify-center w-2 shrink-0 border-x border-foreground/20 bg-card hover:bg-primary/20 cursor-col-resize transition-colors"
              title="Drag to resize panels"
            >
              <div className="flex flex-col gap-0.5 pointer-events-none">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-0.5 h-3 bg-foreground/30 group-hover:bg-primary rounded-full transition-colors" />
                ))}
              </div>
            </div>

            {/* Preview panel */}
            <div
              className="flex flex-col bg-card overflow-hidden"
              style={{ width: `${100 - splitPct}%` }}
            >
              <div className="px-4 h-9 flex items-center justify-between border-b border-foreground/20 font-mono text-[10px] uppercase tracking-widest text-muted-foreground gap-2 shrink-0">
                <div className="flex items-center min-w-0">
                  <Eye className="w-3 h-3 mr-2 shrink-0" /> <span className="truncate">Live preview</span>
                </div>
                <PreviewStyleToggle value={previewStyle} onChange={setPreviewStyle} />
              </div>
              <div className="flex-1 overflow-auto">
                <div className={`p-6 ${previewStyle === 'github' ? 'bg-[#f6f8fa] min-h-full' : ''}`}>
                  <div className="max-w-3xl mx-auto">
                    <Preview content={localMarkdown} githubStyle={previewStyle === 'github'} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE TABS */}
          <div className="flex md:hidden flex-1 overflow-hidden min-w-0">
            <Tabs defaultValue="editor" className="flex-1 flex flex-col w-full min-w-0">
              <TabsList className="w-full rounded-none border-b-2 border-foreground bg-transparent p-0 h-11 shrink-0">
                <TabsTrigger value="editor" className="flex-1 rounded-none border-r-2 border-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none font-mono uppercase text-xs">
                  <Pencil className="w-3.5 h-3.5 mr-1.5" /> Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex-1 rounded-none data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none font-mono uppercase text-xs">
                  <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
                </TabsTrigger>
                <TabsTrigger value="themes" className="flex-1 rounded-none border-l-2 border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none font-mono uppercase text-xs">
                  Themes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="flex-1 m-0 data-[state=active]:flex flex-col relative min-w-0">
                <textarea
                  value={localMarkdown}
                  onChange={handleMarkdownChange}
                  spellCheck={false}
                  className="w-full h-full p-4 font-mono text-[13px] resize-none bg-background text-foreground focus:outline-none"
                />
              </TabsContent>

              <TabsContent value="preview" className="flex-1 m-0 data-[state=active]:flex flex-col relative bg-card min-w-0 overflow-hidden">
                <div className="px-3 h-9 flex items-center justify-end border-b border-foreground/20 bg-background shrink-0">
                  <PreviewStyleToggle value={previewStyle} onChange={setPreviewStyle} />
                </div>
                <div className="flex-1 overflow-auto w-full">
                  <div className={`p-3 ${previewStyle === 'github' ? 'bg-[#f6f8fa] min-h-full' : ''} overflow-x-hidden`}>
                    <div className="max-w-full overflow-x-hidden">
                      <Preview content={localMarkdown} githubStyle={previewStyle === 'github'} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="themes" className="flex-1 m-0 data-[state=active]:flex flex-col relative bg-card min-w-0">
                <div className="flex-1 overflow-auto w-full">
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {templates.map((tpl, i) => (
                      <button
                        key={tpl.id}
                        onClick={() => setTemplate(tpl.id)}
                        className={`text-left p-3 border-2 ${
                          state.selectedTemplate === tpl.id
                            ? 'border-primary bg-primary/10'
                            : 'border-foreground/30 bg-background'
                        }`}
                      >
                        <div className="aspect-[16/10] border-2 border-foreground/30 mb-2 flex items-center justify-center" style={{ background: tpl.swatch.bg, color: tpl.swatch.ink }}>
                          <span className="font-mono text-[9px] uppercase font-bold">T{String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <div className="font-mono text-[11px] font-bold uppercase">{tpl.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} type={state.formData.readmeType} githubUser={state.formData.github} />
    </Layout>
  );
}

function PreviewStyleToggle({ value, onChange }: { value: 'github' | 'dark'; onChange: (v: 'github' | 'dark') => void }) {
  return (
    <div className="flex items-center border-2 border-foreground/40 p-0.5 bg-background">
      <button
        type="button"
        onClick={() => onChange('github')}
        title="GitHub-style preview (light)"
        className={`flex items-center gap-1 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold transition-colors ${
          value === 'github' ? 'bg-foreground text-background' : 'text-foreground/60 hover:text-foreground'
        }`}
      >
        <Github className="w-3 h-3" /> GitHub
      </button>
      <button
        type="button"
        onClick={() => onChange('dark')}
        title="Dark editor preview"
        className={`flex items-center gap-1 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold transition-colors ${
          value === 'dark' ? 'bg-primary text-primary-foreground' : 'text-foreground/60 hover:text-foreground'
        }`}
      >
        <Moon className="w-3 h-3" /> Dark
      </button>
    </div>
  );
}

function HelpDialog({
  open, onOpenChange, type, githubUser,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  type: ReadmeType;
  githubUser: string;
}) {
  const isProfile = type === 'profile';
  const repoName = isProfile ? (githubUser || 'your-username') : 'your-repo-name';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-2 border-foreground rounded-none bg-card max-w-2xl max-h-[90vh] overflow-y-auto shadow-[8px_8px_0_0_hsl(var(--primary))]">
        <DialogHeader>
          <div className="font-mono text-xs uppercase tracking-widest text-primary mb-1">/// How to use</div>
          <DialogTitle className="font-sans text-2xl md:text-3xl uppercase tracking-tight font-bold">
            Ship your {isProfile ? 'profile' : 'project'} README
          </DialogTitle>
          <DialogDescription className="font-mono text-xs text-muted-foreground pt-1">
            Two ways to get your generated README onto GitHub. Pick whichever fits your flow.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4 font-mono text-sm">
          <div className="border-2 border-foreground/30 bg-background p-4">
            <div className="text-[10px] uppercase tracking-widest text-primary mb-2 font-bold">
              {isProfile ? '/// Profile README — special repo trick' : '/// Project README — repo root'}
            </div>
            {isProfile ? (
              <p className="leading-relaxed text-foreground/90">
                A <strong className="text-primary">profile README</strong> shows on your GitHub profile page.
                It lives in a special repo whose name is exactly <strong>your username</strong>:
                {' '}<code className="bg-card px-1.5 py-0.5">github.com/{githubUser}/{githubUser}</code>.
              </p>
            ) : (
              <p className="leading-relaxed text-foreground/90">
                A <strong className="text-primary">project README</strong> lives in the root of your repo as
                {' '}<code className="bg-card px-1.5 py-0.5">README.md</code>. GitHub renders it on the repo home page.
              </p>
            )}
          </div>

          <div className="border-2 border-foreground/30 bg-background p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-foreground">A</div>
              <div className="text-sm uppercase tracking-wider font-bold">Copy &amp; paste (fastest)</div>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-foreground/85 leading-relaxed">
              <li>Click the <strong className="text-primary">COPY</strong> button in the toolbar.</li>
              {isProfile ? (
                <>
                  <li>
                    Go to <code className="bg-card px-1.5 py-0.5">github.com/new</code> and create a new repo named exactly{' '}
                    <code className="bg-card px-1.5 py-0.5">{githubUser || 'your-username'}</code> (same as your username).
                  </li>
                  <li>Tick <em>"Initialize with README"</em> and click <strong>Create</strong>.</li>
                </>
              ) : (
                <li>
                  Open your repo on GitHub, click <strong>Add file → Create new file</strong>, and name it{' '}
                  <code className="bg-card px-1.5 py-0.5">README.md</code>.
                </li>
              )}
              <li>Paste the markdown into the editor.</li>
              <li>Scroll down, write a short commit message, and click <strong className="text-accent">Commit changes</strong>.</li>
              <li>Done — refresh {isProfile ? 'your profile' : 'the repo'} to see it live.</li>
            </ol>
          </div>

          <div className="border-2 border-foreground/30 bg-background p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-accent text-accent-foreground flex items-center justify-center font-bold border-2 border-foreground">B</div>
              <div className="text-sm uppercase tracking-wider font-bold">Download &amp; commit locally</div>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-foreground/85 leading-relaxed">
              <li>Click the <strong className="text-primary">DOWNLOAD</strong> button — you'll get a <code className="bg-card px-1.5 py-0.5">README.md</code> file.</li>
              <li>Move it into the root folder of your local repo (replace any existing one).</li>
              <li>
                Run:
                <pre className="bg-[#0E0E12] border-2 border-foreground/40 p-3 mt-1.5 text-[11px] overflow-x-auto">
{`git add README.md
git commit -m "docs: add README"
git push`}
                </pre>
              </li>
              <li>Open <code className="bg-card px-1.5 py-0.5">github.com/{githubUser || 'your-username'}/{repoName}</code> — README is live.</li>
            </ol>
          </div>

          <div className="border-2 border-primary bg-primary/10 p-4">
            <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">/// Tips</div>
            <ul className="list-disc list-inside space-y-1 text-foreground/85 leading-relaxed">
              <li>Use the <strong>GitHub</strong> preview style on the right to see exactly how it'll render on github.com.</li>
              <li>Your edits are saved in this browser — refresh and they'll still be here.</li>
              <li>Switch templates anytime; your form data carries over.</li>
              <li>The badges and stats are live — they fetch from <code className="bg-card px-1 py-0.5">shields.io</code> &amp; <code className="bg-card px-1 py-0.5">github-readme-stats</code> when GitHub renders.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
