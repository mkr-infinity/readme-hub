import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '@/components/logo';
import { CursorFollower } from '@/components/cursor-follower';
import { Menu, X, Github, Coffee, Star, AlertCircle } from 'lucide-react';

const NAV_LINKS = [
  { href: '/templates', label: 'Templates' },
  { href: '/form', label: 'Form' },
  { href: '/editor', label: 'Editor' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans overflow-x-hidden">
      <CursorFollower />
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <Logo size={32} />
            <span className="font-mono text-base sm:text-xl font-bold uppercase tracking-tight leading-none truncate">
              README<span className="text-primary">HUB</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 font-mono text-sm uppercase tracking-wider transition-colors ${
                  location === link.href
                    ? 'text-primary font-bold'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://buymeacoffee.com/mkr_infinity"
              target="_blank"
              rel="noreferrer"
              className="ml-3 inline-flex items-center gap-2 border-2 border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-wider font-bold bg-accent text-accent-foreground brutal-btn"
            >
              <Coffee className="w-3.5 h-3.5" /> Coffee
            </a>
            <a
              href="https://github.com/mkr-infinity/readme-hub"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-wider font-bold bg-primary text-primary-foreground brutal-btn"
            >
              <Star className="w-3.5 h-3.5" /> Star
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border-2 border-foreground bg-card hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95 shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" strokeWidth={3} /> : <Menu className="w-5 h-5" strokeWidth={3} />}
          </button>
        </div>

        {/* MOBILE MENU — plain conditional render, no framer-motion */}
        {mobileOpen && (
          <div className="md:hidden border-t-2 border-foreground bg-background">
            <nav className="flex flex-col px-3 py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-3.5 font-mono text-sm uppercase tracking-wider border-b border-foreground/20 ${
                    location === link.href ? 'text-primary font-bold' : 'text-foreground/85 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 mb-2 grid grid-cols-2 gap-2">
                <a
                  href="https://buymeacoffee.com/mkr_infinity"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-foreground px-3 py-3 font-mono text-xs uppercase tracking-wider font-bold bg-accent text-accent-foreground brutal-btn"
                >
                  <Coffee className="w-4 h-4" /> Buy Coffee
                </a>
                <a
                  href="https://github.com/mkr-infinity/readme-hub"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-foreground px-3 py-3 font-mono text-xs uppercase tracking-wider font-bold bg-primary text-primary-foreground brutal-btn"
                >
                  <Star className="w-4 h-4" /> Star Repo
                </a>
              </div>
              <a
                href="https://github.com/mkr-infinity/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mb-2 inline-flex items-center justify-center gap-2 border-2 border-foreground px-3 py-2.5 font-mono text-xs uppercase tracking-wider font-bold bg-card hover:bg-foreground hover:text-background transition-colors"
              >
                <Github className="w-4 h-4" /> Follow @mkr-infinity
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t-2 border-foreground bg-card">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-2.5 order-1">
            <Logo size={26} />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-tight font-bold leading-none">
              README<span className="text-primary">HUB</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground order-3 md:order-2">
            <a href="https://github.com/mkr-infinity/readme-hub" target="_blank" rel="noreferrer" className="hover:text-primary inline-flex items-center gap-1.5 transition-colors">
              <Star className="w-3 h-3" /> Star
            </a>
            <a href="https://buymeacoffee.com/mkr_infinity" target="_blank" rel="noreferrer" className="hover:text-accent inline-flex items-center gap-1.5 transition-colors">
              <Coffee className="w-3 h-3" /> Coffee
            </a>
            <a href="https://github.com/mkr-infinity/" target="_blank" rel="noreferrer" className="hover:text-primary inline-flex items-center gap-1.5 transition-colors">
              <Github className="w-3 h-3" /> Follow
            </a>
            <a href="https://github.com/mkr-infinity/readme-hub/issues/new" target="_blank" rel="noreferrer" className="hover:text-primary inline-flex items-center gap-1.5 transition-colors">
              <AlertCircle className="w-3 h-3" /> Issue
            </a>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground order-2 md:order-3 text-center md:text-right">
            Made by <a href="https://github.com/mkr-infinity/" target="_blank" rel="noreferrer" className="hover:text-primary">mkr_infinity</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
