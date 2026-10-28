"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribeCapabilities = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mqlFine = window.matchMedia("(pointer: fine)");
  const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  mqlFine.addEventListener("change", callback);
  mqlMotion.addEventListener("change", callback);
  return () => {
    mqlFine.removeEventListener("change", callback);
    mqlMotion.removeEventListener("change", callback);
  };
};

const getInteractiveCapableSnapshot = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

const getServerSnapshot = () => false;

export const AtmosphericBackground: React.FC = () => {
  const isInteractive = useSyncExternalStore(
    subscribeCapabilities,
    getInteractiveCapableSnapshot,
    getServerSnapshot
  );

  const [mousePos, setMousePos] = useState({ x: 50, y: 20 });
  const [scrollYOffset, setScrollYOffset] = useState(0);

  const mouseRef = useRef({ x: 50, y: 20 });
  const currentPosRef = useRef({ x: 50, y: 20 });
  const rafId = useRef<number | null>(null);
  const isLoopRunning = useRef(false);

  useEffect(() => {
    if (!isInteractive) return;

    // Smooth lerp loop for the global ambient spotlight
    const render = () => {
      const lerp = 0.08; // very smooth, soft trailing factor
      const dx = mouseRef.current.x - currentPosRef.current.x;
      const dy = mouseRef.current.y - currentPosRef.current.y;

      currentPosRef.current.x += dx * lerp;
      currentPosRef.current.y += dy * lerp;

      setMousePos({
        x: Number(currentPosRef.current.x.toFixed(2)),
        y: Number(currentPosRef.current.y.toFixed(2)),
      });

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafId.current = requestAnimationFrame(render);
      } else {
        isLoopRunning.current = false;
        rafId.current = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;

      mouseRef.current.x = Math.max(0, Math.min(100, xPercent));
      mouseRef.current.y = Math.max(0, Math.min(100, yPercent));

      if (!isLoopRunning.current) {
        isLoopRunning.current = true;
        rafId.current = requestAnimationFrame(render);
      }
    };

    let scrollRaf: number | null = null;
    const onScroll = () => {
      if (scrollRaf !== null) return;
      scrollRaf = requestAnimationFrame(() => {
        // Subtle clamped parallax offset (max 60px)
        const offset = Math.min(60, window.scrollY * 0.035);
        setScrollYOffset(offset);
        scrollRaf = null;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);

      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);
    };
  }, [isInteractive]);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none -z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Multi-Stop Layered Ambient Gradients */}
      <div
        className="absolute inset-0 bg-[#0a0d14]"
        style={{
          backgroundImage: `
            radial-gradient(circle 800px at 50% -100px, rgba(99, 102, 241, 0.08), transparent 70%),
            radial-gradient(circle 600px at 85% 45%, rgba(59, 130, 246, 0.04), transparent 60%),
            radial-gradient(circle 700px at 15% 75%, rgba(99, 102, 241, 0.04), transparent 65%)
          `,
        }}
      />

      {/* Layer 2: Pointer-Reactive Ambient Spotlight (fine pointer only) */}
      {isInteractive && (
        <div
          className="absolute inset-0 transition-opacity duration-700 opacity-60"
          style={{
            background: `radial-gradient(circle 650px at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.09), transparent 70%)`,
          }}
        />
      )}

      {/* Layer 3: Subtle Architectural Grid & Dot Matrix with Vignette */}
      <div className="absolute inset-0 bg-subtle-grid mask-radial-vignette opacity-70" />
      <div className="absolute inset-0 bg-dot-matrix mask-radial-vignette opacity-40" />

      {/* Layer 4: Abstract Geometric Developer Orbit Rings (Subtle Parallax) */}
      <div
        className="absolute top-1/4 -right-28 sm:-right-20 w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] opacity-[0.14] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(0, ${scrollYOffset}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full animate-slow-spin text-indigo-400"
        >
          {/* Outer dashed orbit */}
          <circle
            cx="300"
            cy="300"
            r="280"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          {/* Middle solid orbit */}
          <circle
            cx="300"
            cy="300"
            r="210"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2 6"
          />
          {/* Inner orbit */}
          <circle
            cx="300"
            cy="300"
            r="140"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Cardinal crosshairs */}
          <line x1="300" y1="10" x2="300" y2="35" stroke="currentColor" strokeWidth="1.5" />
          <line x1="300" y1="565" x2="300" y2="590" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="300" x2="35" y2="300" stroke="currentColor" strokeWidth="1.5" />
          <line x1="565" y1="300" x2="590" y2="300" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Layer 5: Precision Registration Crosshairs in Corners */}
      <div className="absolute top-6 left-6 text-indigo-400/20 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-6 right-6 text-indigo-400/20 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute bottom-6 left-6 text-indigo-400/20 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute bottom-6 right-6 text-indigo-400/20 font-mono text-xs select-none">
        +
      </div>
    </div>
  );
};
