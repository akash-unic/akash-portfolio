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
  const [isOverText, setIsOverText] = useState(false);

  // Position refs for high-performance physics
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);
  const isLoopRunning = useRef(false);

  useEffect(() => {
    if (!isSupported) return;

    // Follower spring/lerp physics tick: runs ONLY when follower hasn't caught up
    const render = () => {
      const lerp = 0.18; // smooth damping factor
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      ringPos.current.x += dx * lerp;
      ringPos.current.y += dy * lerp;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x.toFixed(1)}px, ${ringPos.current.y.toFixed(1)}px, 0)`;
      }

      // Check if follower has reached resting position (within 0.15px)
      if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
        animFrameId.current = requestAnimationFrame(render);
      } else {
        // Snap to exact target and SLEEP loop to save CPU/battery
        ringPos.current.x = mousePos.current.x;
        ringPos.current.y = mousePos.current.y;
        if (cursorRingRef.current) {
          cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x.toFixed(1)}px, ${ringPos.current.y.toFixed(1)}px, 0)`;
        }
        isLoopRunning.current = false;
        animFrameId.current = null;
      }
    };

    const startAnimationLoop = () => {
      if (!isLoopRunning.current) {
        isLoopRunning.current = true;
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      // Clamp coordinates to viewport boundaries strictly
      const clampedX = Math.max(0, Math.min(window.innerWidth, e.clientX));
      const clampedY = Math.max(0, Math.min(window.innerHeight, e.clientY));

      mousePos.current.x = clampedX;
      mousePos.current.y = clampedY;

      // Center precision dot moves immediately for zero input lag
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
      }

      if (!isVisible) setIsVisible(true);

      // Contextual inspection: links/buttons vs body text
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, select, textarea, [role="button"], article, .interactive-cursor'
        );
        setIsHovering(!!interactive);

        // Detect text zones (paragraphs, headings) to soften follower for unhindered text selection
        const textTarget = target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, code, pre');
        setIsOverText(!!textTarget && !interactive);
      }

      // Awaken the lagging follower loop
      startAnimationLoop();
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
        isLoopRunning.current = false;
      }
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);

      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
        isLoopRunning.current = false;
      }
    };
  }, [isSupported, isVisible]);

  if (!isSupported) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.85)] pointer-events-none select-none"
      />

      {/* Lagging Trailing Ring Follower with Adaptive Context */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full border border-indigo-400/60 transition-[width,height,margin,border-color,background-color,opacity] duration-200 ease-out backdrop-blur-[0.5px] pointer-events-none select-none ${
          isClicking
            ? "w-8 h-8 -ml-4 -mt-4 bg-indigo-500/25 border-indigo-300 scale-90"
            : isHovering
            ? "w-14 h-14 -ml-7 -mt-7 bg-indigo-500/15 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)] scale-110"
            : isOverText
            ? "w-7 h-7 -ml-3.5 -mt-3.5 bg-indigo-500/5 border-indigo-300/40 opacity-40"
            : "w-10 h-10 bg-indigo-500/5 shadow-[0_0_12px_rgba(99,102,241,0.15)] opacity-80"
        }`}
      />
    </div>
  );
};
