import React from 'react';
import { Link } from 'wouter';
import { Logo } from '@/components/logo';
import { Home, ArrowLeft, FileCode } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-background text-foreground px-4 relative overflow-hidden">
      {/* Background noise */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-20" aria-hidden />
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size={52} />
        </div>

        {/* 404 display */}
        <div className="relative mb-6">
          <div
            className="font-mono font-bold leading-none select-none"
            style={{ fontSize: 'clamp(5rem, 20vw, 9rem)', color: 'transparent', WebkitTextStroke: '2px hsl(var(--foreground) / 0.12)' }}
            aria-hidden
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-mono font-bold text-primary" style={{ fontSize: 'clamp(5rem, 20vw, 9rem)' }}>
              404
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="border-2 border-foreground bg-card p-6 mb-8 shadow-[6px_6px_0_0_hsl(var(--primary))]">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">/// Page not found</div>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3">
            This page doesn't exist.
          </h1>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            The URL you visited isn't a page on ReadmeHub. Maybe a typo, maybe an old link. Let's get you back.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-foreground bg-primary text-primary-foreground px-6 py-3 font-mono text-sm uppercase tracking-wider font-bold hover:bg-primary/90 transition-colors shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[6px_6px_0_0_hsl(var(--foreground))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <Home className="w-4 h-4" /> Go to Home
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center justify-center gap-2 border-2 border-foreground bg-card text-foreground px-6 py-3 font-mono text-sm uppercase tracking-wider font-bold hover:bg-foreground hover:text-background transition-colors shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[6px_6px_0_0_hsl(var(--foreground))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <FileCode className="w-4 h-4" /> Browse templates
          </Link>
        </div>

        {/* Subtle footer */}
        <div className="mt-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          README<span className="text-primary">HUB</span> &middot; Beautiful README generator
        </div>
      </div>
    </div>
  );
}
