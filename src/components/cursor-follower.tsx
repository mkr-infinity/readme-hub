import React, { useEffect, useRef, useState } from 'react';

/**
 * Smooth cursor-following glow that only shows on pointer devices.
 * Uses CSS transforms + requestAnimationFrame for performance.
 * Hidden on touch-only devices.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const glowPos = useRef({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Don't render on touch-primary devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    // Animation loop — glow lags behind the dot
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      glowPos.current.x = lerp(glowPos.current.x, pos.current.x, 0.08);
      glowPos.current.y = lerp(glowPos.current.y, pos.current.y, 0.08);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x - 200}px, ${glowPos.current.y - 200}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot — sharp, stays right on cursor */}
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />
      {/* Glow — large, lags behind */}
      <div
        ref={glowRef}
        aria-hidden
        className="cursor-glow"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />
    </>
  );
}
