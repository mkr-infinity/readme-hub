import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  withWordmark?: boolean;
}

export function Logo({ size = 36, className = '', withWordmark = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ReadmeHub"
        role="img"
      >
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--foreground))"
          strokeWidth="6"
        />
        <text
          x="50"
          y="48"
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="28"
          fontWeight="800"
          fill="hsl(var(--primary-foreground))"
        >
          MD
        </text>
        <path
          d="M30 64 L50 84 L70 64"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="7"
          fill="none"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <line
          x1="50"
          y1="60"
          x2="50"
          y2="84"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="7"
          strokeLinecap="square"
        />
      </svg>
      {withWordmark && (
        <span className="font-mono text-xl md:text-2xl font-bold uppercase tracking-tight leading-none">
          README<span className="text-primary">HUB</span>
        </span>
      )}
    </div>
  );
}

export function LogoMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  return <Logo size={size} className={className} />;
}
