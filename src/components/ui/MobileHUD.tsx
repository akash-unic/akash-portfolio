"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";

export const MobileHUD: React.FC = () => {
  const { navigation } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [progress, setProgress] = useState(0);

  const sceneNumbers: Record<string, string> = {
    home: "01",
    about: "02",
    skills: "03",
    projects: "04",
    education: "05",
    contact: "06",
  };

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const p = total > 0 ? (scrollY / total) * 100 : 0;
        setProgress(Math.round(p));

        // Show HUD only after scrolling past hero
        setIsVisible(scrollY > 380);

        // Section Spy for current scene
        const scrollPosition = scrollY + window.innerHeight * 0.35;
        const sections = navigation.map((n) => n.href.replace("#", ""));

        for (let i = sections.length - 1; i >= 0; i--) {
          const sid = sections[i];
          const el = document.getElementById(sid);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sid);
            break;
          }
        }

        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [navigation]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Mobile Scene Telemetry and Navigation"
      className={`fixed right-4 z-40 md:hidden pointer-events-auto transition-all duration-300 ease-out select-none ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      }`}
      style={{
        bottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
      }}
    >
      <div className="flex items-center gap-1.5 p-1.5 rounded-full card-glass-specular border border-white/[0.14] bg-[#0c1222]/90 backdrop-blur-xl shadow-2xl shadow-black/80">
        {/* Scene Indicator Capsule */}
        <div className="flex items-center gap-2 pl-2.5 pr-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
          <span className="font-bold text-white tracking-wider">
            SCENE {sceneNumbers[activeSection] || "01"}
          </span>
          <span className="text-zinc-500">/</span>
          <span className="text-indigo-300 font-semibold">{progress}%</span>
        </div>

        {/* Back to Top Quick Action Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="group relative w-8 h-8 rounded-full bg-indigo-600/80 hover:bg-indigo-500 active:scale-90 text-white flex items-center justify-center border border-indigo-400/40 shadow-md shadow-indigo-950 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Back to top of page"
          title="Return to top"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </aside>
  );
};
