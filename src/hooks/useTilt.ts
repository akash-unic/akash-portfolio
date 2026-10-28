"use client";

import { useRef, useEffect } from "react";

export interface UseTiltOptions {
  maxTilt?: number; // max tilt degrees (default 6 degrees for subtle, elegant effect)
  perspective?: number; // perspective in px (default 1000)
  scale?: number; // subtle scale factor on hover (default 1.015)
  speed?: number; // transition speed in ms (default 300)
}

export function useTilt<T extends HTMLElement = HTMLDivElement>({
  maxTilt = 6,
  perspective = 1000,
  scale = 1.015,
  speed = 300,
}: UseTiltOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Only apply tilt on devices with fine pointers (mouse), disable on touch or reduced motion
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) return;

    let bounds: DOMRect | null = null;
    let rafId: number | null = null;

    const onMouseEnter = () => {
      bounds = element.getBoundingClientRect();
      element.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      element.style.willChange = "transform";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!bounds) bounds = element.getBoundingClientRect();

        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const tiltX = -(percentY * maxTilt);
        const tiltY = percentX * maxTilt;

        element.style.transform = `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
        rafId = null;
      });
    };

    const onMouseLeave = () => {
      bounds = null;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      element.style.transition = `transform ${speed * 1.5}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      element.style.transform = "";
      element.style.transition = "";
      element.style.willChange = "";
    };
  }, [maxTilt, perspective, scale, speed]);

  return ref;
}
