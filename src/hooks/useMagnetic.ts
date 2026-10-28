"use client";

import { useRef, useEffect } from "react";

export interface UseMagneticOptions {
  strength?: number; // How far the element moves toward the mouse (default 0.25)
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>({
  strength = 0.25,
}: UseMagneticOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) return;

    let bounds: DOMRect | null = null;

    const onMouseEnter = () => {
      bounds = element.getBoundingClientRect();
      element.style.transition = "transform 0.15s ease-out";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = element.getBoundingClientRect();

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      element.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
    };

    const onMouseLeave = () => {
      bounds = null;
      element.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
      element.style.transform = "translate3d(0, 0, 0)";
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);
      element.style.transform = "";
      element.style.transition = "";
    };
  }, [strength]);

  return ref;
}
