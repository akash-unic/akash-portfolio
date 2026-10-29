"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { UniverseCanvas } from "@/components/canvas/UniverseCanvas";

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

  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 50, y: 20 });
  const currentPosRef = useRef({ x: 50, y: 20 });
  const rafId = useRef<number | null>(null);
  const isLoopRunning = useRef(false);

  useEffect(() => {
    if (!isInteractive) return;

    // Smooth lerp loop for the global ambient spotlight
    const render = () => {
      const lerp = 0.08;
      const dx = mouseRef.current.x - currentPosRef.current.x;
      const dy = mouseRef.current.y - currentPosRef.current.y;

      currentPosRef.current.x += dx * lerp;
      currentPosRef.current.y += dy * lerp;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(circle 700px at ${currentPosRef.current.x.toFixed(1)}% ${currentPosRef.current.y.toFixed(1)}%, rgba(99, 102, 241, 0.12), transparent 70%)`;
      }

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

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [isInteractive]);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none -z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: True 3D Spatial WebGL Universe */}
      <UniverseCanvas />

      {/* Layer 2: Protective Reading Scrim (Ensures Content Contrast & Legibility) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 40%, rgba(8, 11, 18, 0.75) 0%, rgba(8, 11, 18, 0.5) 50%, rgba(6, 8, 14, 0.85) 100%)
          `,
        }}
      />

      {/* Layer 3: Interactive Pointer Spotlight (Desktop Fine Pointer Only) */}
      {isInteractive && (
        <div
          ref={spotlightRef}
          className="absolute inset-0 transition-opacity duration-700 opacity-60"
          style={{
            background:
              "radial-gradient(circle 650px at 50% 20%, rgba(99, 102, 241, 0.08), transparent 70%)",
          }}
        />
      )}

      {/* Layer 4: Architectural Cyber Grid with Subtle Center Mask */}
      <div className="absolute inset-0 bg-subtle-grid mask-radial-vignette opacity-25" />

      {/* Layer 5: Precision Registration Crosshairs at Screen Margins */}
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