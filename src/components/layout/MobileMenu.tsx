"use client";

import React, { useEffect, useState, useRef, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import {
  X,
  ArrowUpRight,
  Sparkles,
  Check,
  Copy,
  Mail,
  ChevronRight,
  Compass,
} from "lucide-react";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (href: string) => void;
}

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}) => {
  const { profile, navigation, socials } = portfolioData;
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const [copied, setCopied] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scene metadata for rich storytelling
  const sceneDescriptions: Record<string, string> = {
    home: "The Awakening & Origin",
    about: "The Developer & Ethos",
    skills: "Constellation of Verified Tools",
    projects: "Featured Showcase & Case Studies",
    education: "Academic & Cadet Rigor",
    contact: "Transmission & Direct Opportunities",
  };

  // Lock body scroll securely while menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const handleInitiateClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 380);
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleInitiateClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleInitiateClose]);

  const handleItemClick = (href: string) => {
    setIsClosing(true);
    setTimeout(() => {
      onNavigate(href);
      onClose();
      setIsClosing(false);
    }, 280);
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const shouldRender = isOpen || isClosing;

  if (!mounted || !shouldRender) return null;

  return createPortal(
    <div
      ref={containerRef}
      id="mobile-navigation-portal"
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic Mobile Navigation"
      className={`fixed inset-0 z-[100] md:hidden flex flex-col justify-between overflow-y-auto overscroll-contain transition-all duration-500 ease-out ${
        shouldRender
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0 invisible"
      }`}
      style={{
        clipPath:
          isOpen && !isClosing
            ? "circle(160% at calc(100% - 2.5rem) 2.5rem)"
            : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        transition: "clip-path 0.52s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
        background: "radial-gradient(ellipse 120% 90% at 85% 10%, #0d1428 0%, #060813 65%, #04050a 100%)",
      }}
    >
      {/* Layer 1: Ambient Luminous Portals */}
      <div
        className="pointer-events-none absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full bg-indigo-500/20 blur-[100px] animate-portal-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-28 w-[380px] h-[380px] rounded-full bg-cyan-500/15 blur-[90px]"
        aria-hidden="true"
      />

      {/* Layer 2: Architectural Subtle Coordinate Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-20"
        aria-hidden="true"
      />

      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-5 py-4 border-b border-white/[0.08] backdrop-blur-xl bg-[#060813]/60">
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("#home");
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Akash Kumar - Return to Top"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-950/60 border border-white/20">
            <span className="tracking-tighter font-mono text-xs select-none">AK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm tracking-tight">
              {profile.name}
            </span>
            <span className="text-[10px] font-mono text-indigo-300 -mt-0.5 tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Portal Navigator</span>
            </span>
          </div>
        </Link>

        {/* Close Button with Tactile Hover/Tap Feedback */}
        <button
          type="button"
          onClick={handleInitiateClose}
          className="relative group p-2.5 rounded-2xl border border-white/[0.14] bg-[#101728]/90 text-zinc-300 hover:text-white active:scale-90 transition-all duration-150 shadow-lg shadow-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Close navigation menu"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <X className="w-5 h-5 text-zinc-200 group-hover:text-cyan-300 group-hover:rotate-90 transition-all duration-300" />
          </div>
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Center Navigation Scene List */}
      <nav
        aria-label="Mobile Scene Navigation"
        className="relative z-10 flex-1 px-5 py-6 flex flex-col justify-center space-y-2.5 max-w-lg mx-auto w-full"
      >
        <div className="flex items-center justify-between px-2 mb-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Select Destination</span>
          </span>
          <span className="text-indigo-400">06 Verified Scenes</span>
        </div>

        {navigation.map((item, index) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId;
          const stepNum = `0${index + 1}`;
          const description = sceneDescriptions[sectionId] || "Explore Section";

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.href);
              }}
              style={{
                animationDelay: `${index * 55 + 80}ms`,
              }}
              className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isOpen ? "animate-menu-item" : ""
              } ${
                isActive
                  ? "border-cyan-400/50 bg-gradient-to-r from-indigo-600/25 via-[#131b2e]/90 to-[#0c1220] shadow-xl shadow-indigo-950/60"
                  : "border-white/[0.08] bg-[#0c1222]/60 hover:border-white/[0.18] hover:bg-[#12192e]/80 active:bg-[#16203a]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active Scene Specular Line */}
              {isActive && (
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
                  aria-hidden="true"
                />
              )}

              <div className="flex items-center gap-3.5 min-w-0">
                {/* Number Badge */}
                <span
                  className={`font-mono text-xs font-bold px-2 py-1 rounded-lg border transition-colors ${
                    isActive
                      ? "text-cyan-300 bg-cyan-500/15 border-cyan-400/30"
                      : "text-slate-400 bg-white/[0.04] border-white/[0.06] group-hover:text-white group-hover:border-white/[0.14]"
                  }`}
                >
                  {stepNum}
                </span>

                <div className="min-w-0">
                  <span
                    className={`block text-lg sm:text-xl font-bold tracking-tight transition-colors truncate ${
                      isActive
                        ? "text-white group-hover:text-cyan-200"
                        : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-[11px] font-mono text-slate-400 truncate mt-0.5">
                    {description}
                  </span>
                </div>
              </div>

              {/* Trailing Icon or Active Beacon */}
              <div className="flex items-center gap-2 shrink-0 ml-2">
                {isActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Active</span>
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                )}
              </div>
            </a>
          );
        })}
      </nav>

      {/* Bottom Dossier & Quick Actions */}
      <div className="relative z-20 px-5 pt-4 pb-6 border-t border-white/[0.08] backdrop-blur-xl bg-[#060813]/80 space-y-3.5 max-w-lg mx-auto w-full">
        {/* Quick Email Pill with Copy Feedback */}
        <div className="p-3 rounded-2xl bg-[#0b1020]/90 border border-white/[0.1] flex items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="text-xs font-mono text-slate-300 hover:text-white truncate"
            >
              {profile.email}
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="p-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.1] active:scale-95 transition-all shrink-0 flex items-center gap-1 text-[11px] font-mono"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Primary CTA & Socials Row */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick("#contact");
            }}
            className="flex-1 justify-center font-bold shadow-xl shadow-indigo-950/80 min-h-[46px]"
          >
            <Sparkles className="w-4 h-4 mr-1.5 text-cyan-300" />
            <span>Initiate Direct Contact</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>

          {/* Direct Social Links */}
          <div className="flex items-center gap-1.5">
            {socials
              .filter((s) => s.platform !== "Email")
              .map((soc) => (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl border border-white/[0.12] bg-[#0c1222] hover:bg-[#131b2e] text-slate-300 hover:text-white flex items-center justify-center active:scale-95 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={`Visit Akash Kumar's ${soc.platform} profile`}
                >
                  {soc.platform === "GitHub" ? (
                    <GitHubIcon className="w-4 h-4" />
                  ) : (
                    <LinkedInIcon className="w-4 h-4" />
                  )}
                </a>
              ))}
          </div>
        </div>

        {/* Telemetry Status Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Roles &amp; Freelance</span>
          </span>
          <span>BCA 3rd Sem · CU</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
