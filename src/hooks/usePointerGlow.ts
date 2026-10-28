"use client";

import { useEffect, useRef } from "react";

export interface UsePointerGlowOptions {
  glowSize?: number; // Radial gradient radius in px (default 380)
  glowColor?: string; // Color string (default rgba(99, 102, 241, 0.14))
  borderGlowColor?: string; // Border accent color (default rgba(99, 102, 241, 0.35))
  clamped?: boolean;
}

export function usePointerGlow<T extends HTMLElement = HTMLDivElement>({
  glowSize = 380,
  glowColor = "rgba(99, 102, 241, 0.12)",
  borderGlowColor = "rgba(129, 140, 248, 0.3)",
}: UsePointerGlowOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window === "undefined") return;

    // Strict fine-pointer and reduced-motion checks
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) {
      return;
    }

    let rafId: number | null = null;
    let rect: DOMRect | null = null;
    let isHovering = false;

    const onMouseEnter = () => {
      isHovering = true;
      rect = element.getBoundingClientRect();
      element.style.setProperty("--glow-opacity", "1");
      element.style.setProperty("--glow-size", `${glowSize}px`);
      element.style.setProperty("--glow-color", glowColor);
      element.style.setProperty("--border-glow-color", borderGlowColor);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      // Throttle via requestAnimationFrame only when mouse moves
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!rect) rect = element.getBoundingClientRect();

        // Clamp pointer coordinates inside element boundaries
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;

        const clampedX = Math.max(0, Math.min(rect.width, rawX));
        const clampedY = Math.max(0, Math.min(rect.height, rawY));

        element.style.setProperty("--mouse-x", `${clampedX.toFixed(1)}px`);
        element.style.setProperty("--mouse-y", `${clampedY.toFixed(1)}px`);

        rafId = null;
      });
    };

    const onMouseLeave = () => {
      isHovering = false;
      rect = null;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      element.style.setProperty("--glow-opacity", "0");
    };

    element.addEventListener("mouseenter", onMouseEnter, { passive: true });
    element.addEventListener("mousemove", onMouseMove, { passive: true });
    element.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      element.style.removeProperty("--mouse-x");
      element.style.removeProperty("--mouse-y");
      element.style.removeProperty("--glow-opacity");
      element.style.removeProperty("--glow-size");
      element.style.removeProperty("--glow-color");
      element.style.removeProperty("--border-glow-color");
    };
  }, [glowSize, glowColor, borderGlowColor]);

  return ref;
}
