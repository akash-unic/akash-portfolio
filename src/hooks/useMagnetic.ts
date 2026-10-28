"use client";

import { useRef, useEffect } from "react";

export interface UseMagneticOptions {
  strength?: number; // How far the element moves toward the mouse (default 0.22)
  maxDistance?: number; // Clamp boundary in px so element cannot wildly displace (default 16)
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>({
  strength = 0.22,
  maxDistance = 16,
}: UseMagneticOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) return;

    let bounds: DOMRect | null = null;
    let rafId: number | null = null;

    const onMouseEnter = () => {
      bounds = element.getBoundingClientRect();
      element.style.transition = "transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!bounds) bounds = element.getBoundingClientRect();

        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        const rawDeltaX = (e.clientX - centerX) * strength;
        const rawDeltaY = (e.clientY - centerY) * strength;

        // Clamp movement strictly to prevent over-extension or distortion
        const clampedX = Math.max(-maxDistance, Math.min(maxDistance, rawDeltaX));
        const clampedY = Math.max(-maxDistance, Math.min(maxDistance, rawDeltaY));

        element.style.transform = `translate3d(${clampedX.toFixed(2)}px, ${clampedY.toFixed(2)}px, 0)`;
        rafId = null;
      });
    };

    const onMouseLeave = () => {
      bounds = null;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      element.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
      element.style.transform = "translate3d(0, 0, 0)";
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

      element.style.transform = "";
      element.style.transition = "";
    };
  }, [strength, maxDistance]);

  return ref;
}
