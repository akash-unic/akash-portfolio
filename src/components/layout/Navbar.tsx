"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { profile, navigation } = portfolioData;

  // Track active section and scroll state with RAF-throttled reflow protection
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);

        // Section spy with cached offsets
        const sections = navigation.map((item) => item.href.replace("#", ""));
        const scrollPosition = window.scrollY + 130;

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

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? "border-b border-white/[0.08] bg-[#080b12]/90 backdrop-blur-xl shadow-lg shadow-black/30"
            : "border-b border-transparent bg-[#080b12]/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* AK Monogram & Wordmark */}
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#home");
              }}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14] rounded-xl p-1"
              aria-label="Akash Kumar - Back to Top"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-950/40 group-hover:scale-105 motion-safe:group-active:scale-95 transition-all duration-150">
                <span className="tracking-tighter font-mono text-sm select-none">AK</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#f8fafc] tracking-tight text-sm sm:text-base group-hover:text-indigo-300 transition-colors">
                  {profile.name}
                </span>
                <span className="text-[11px] text-[#94a3b8] font-mono -mt-0.5 tracking-wide">
                  {profile.role}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-1 bg-[#131926]/80 p-1.5 rounded-full border border-white/[0.08] shadow-inner shadow-black/20"
            >
              {navigation.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-950/50"
                        : "text-[#94a3b8] hover:text-white hover:bg-white/[0.06]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Prominent Desktop Action: Let's Talk */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#contact");
                }}
                className="font-semibold shadow-md shadow-indigo-950/30"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </div>

            {/* Crazy Custom Animated Cyber Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative group p-2.5 rounded-2xl border border-white/[0.14] bg-[#0c1220]/80 hover:border-indigo-400/50 active:scale-90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-md shadow-black/40"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-portal"
            >
              {/* Luminous aura behind button */}
              <span
                className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  isOpen
                    ? "bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.5)] opacity-100"
                    : "bg-transparent group-hover:bg-indigo-500/10 opacity-0 group-hover:opacity-100"
                }`}
              />

              {/* 3 Morphing Cyber Lines */}
              <div className="relative w-5 h-4 flex flex-col justify-between items-center" aria-hidden="true">
                {/* Top Line */}
                <span
                  className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-out origin-center ${
                    isOpen
                      ? "translate-y-[7px] rotate-45 !bg-cyan-300 shadow-[0_0_8px_#38bdf8]"
                      : "group-hover:bg-indigo-200"
                  }`}
                />
                {/* Middle Line */}
                <span
                  className={`w-3.5 h-[2px] bg-indigo-400 rounded-full transition-all duration-200 ease-out self-end ${
                    isOpen ? "opacity-0 scale-x-0" : "group-hover:w-5 group-hover:bg-white"
                  }`}
                />
                {/* Bottom Line */}
                <span
                  className={`w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-out origin-center ${
                    isOpen
                      ? "-translate-y-[7px] -rotate-45 !bg-cyan-300 shadow-[0_0_8px_#38bdf8]"
                      : "group-hover:bg-indigo-200"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Cinematic Portal Mobile Menu (rendered outside header to avoid backdrop-filter trapping) */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activeSection={activeSection}
        onNavigate={handleLinkClick}
      />
    </>
  );
};
