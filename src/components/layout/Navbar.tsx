"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b border-white/[0.08] bg-[#0a0d14]/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "border-b border-transparent bg-[#0a0d14]/60 backdrop-blur-sm"
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

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14] transition-colors"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop & Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 sm:top-20 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in-up"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="md:hidden fixed inset-x-0 top-16 sm:top-20 bg-[#0a0d14]/98 backdrop-blur-xl border-b border-white/[0.1] z-50 flex flex-col justify-between p-6 shadow-2xl animate-drawer"
          >
            <nav aria-label="Mobile Navigation List" className="flex flex-col space-y-1.5 pt-1">
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
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-150 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                      isActive
                        ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs opacity-50">#{sectionId}</span>
                  </a>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-3 pb-2 mt-4">
              <Button
                variant="primary"
                size="lg"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#contact");
                }}
                className="w-full justify-center shadow-lg shadow-indigo-950/40"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
              <p className="text-center text-xs text-[#94a3b8] font-mono mt-1">
                {profile.email}
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
