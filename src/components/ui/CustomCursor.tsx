"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";

const subscribePointerFine = (callback: () => void) => {
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

const getPointerFineSnapshot = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

const getServerPointerFineSnapshot = () => false;

export const CustomCursor: React.FC = () => {
  const isSupported = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getServerPointerFineSnapshot
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position refs for 60-120fps requestAnimationFrame loop
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!isSupported) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, select, textarea, [role="button"], article, .interactive-cursor'
        );
        setIsHovering(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop for the trailing ring
    const render = () => {
      const lerp = 0.18; // smooth spring-like trailing factor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);

      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isSupported, isVisible]);

  if (!isSupported) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />

      {/* Outer Damped Trailing Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full border border-indigo-400/60 transition-all duration-200 ease-out backdrop-blur-[0.5px] ${
          isClicking
            ? "w-8 h-8 -ml-4 -mt-4 bg-indigo-500/25 border-indigo-300 scale-90"
            : isHovering
            ? "w-14 h-14 -ml-7 -mt-7 bg-indigo-500/15 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)] scale-110"
            : "w-10 h-10 bg-indigo-500/5 shadow-[0_0_12px_rgba(99,102,241,0.15)]"
        }`}
      />
    </div>
  );
};
