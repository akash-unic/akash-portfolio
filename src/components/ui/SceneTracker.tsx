"use client";

import React, { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export const SceneTracker: React.FC = () => {
  const { navigation } = portfolioData;
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
        setScrollProgress(Math.round(progress));

        const scrollPosition = window.scrollY + window.innerHeight * 0.35;
        const sections = navigation.map((item) => item.href.replace("#", ""));

        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const el = document.getElementById(sectionId);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sectionId);
            break;
          }
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigation]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Cinematic Scene Waypoint Navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* Telemetry Altitude Stamp */}
      <div className="px-2 py-1 rounded-md bg-[#0a0d14]/80 border border-white/[0.08] backdrop-blur-md text-[10px] font-mono text-zinc-400 mb-1">
        <span>DEPTH {scrollProgress}%</span>
      </div>

      {/* Navigation Waypoint Nodes */}
      <nav className="flex flex-col gap-2.5 items-end">
        {navigation.map((item, index) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => scrollToSection(sectionId)}
              className="group flex items-center gap-3 py-1 focus:outline-none"
              aria-label={`Jump to Scene 0${index + 1}: ${item.label}`}
            >
              {/* Tooltip Label on Hover or Active */}
              <span
                className={`text-[11px] font-mono uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "opacity-100 text-indigo-300 font-bold"
                    : "opacity-0 group-hover:opacity-100 text-zinc-400"
                }`}
              >
                0{index + 1} {"//"} {item.label}
              </span>

              {/* Waypoint Dot */}
              <div
                className={`transition-all duration-200 rounded-full flex items-center justify-center ${
                  isActive
                    ? "w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-400"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/50 group-hover:scale-125"
                }`}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8] animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};