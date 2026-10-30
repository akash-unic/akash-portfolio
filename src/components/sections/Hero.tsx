"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData, coreTechnologies } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HologramSphere3D } from "@/components/canvas/HologramSphere3D";
import { useTilt } from "@/hooks/useTilt";
import { useMagnetic } from "@/hooks/useMagnetic";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import {
  ArrowDown,
  Mail,
  Terminal,
  FileCode2,
  FolderGit2,
  ChevronDown,
  GraduationCap,
  Award,
  Sparkles,
  Code2,
} from "lucide-react";

const techDetails: Record<
  string,
  { category: string; dotColor: string; hoverBorder: string; hoverGlow: string }
> = {
  HTML: {
    category: "Structure",
    dotColor: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]",
    hoverBorder: "hover:border-orange-500/40",
    hoverGlow: "hover:shadow-orange-500/10",
  },
  CSS: {
    category: "Styling",
    dotColor: "bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]",
    hoverBorder: "hover:border-indigo-500/40",
    hoverGlow: "hover:shadow-indigo-500/10",
  },
  JavaScript: {
    category: "Logic",
    dotColor: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    hoverBorder: "hover:border-amber-500/40",
    hoverGlow: "hover:shadow-amber-500/10",
  },
  React: {
    category: "UI Engine",
    dotColor: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]",
    hoverBorder: "hover:border-cyan-500/40",
    hoverGlow: "hover:shadow-cyan-500/10",
  },
  "Next.js": {
    category: "Framework",
    dotColor: "bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]",
    hoverBorder: "hover:border-white/40",
    hoverGlow: "hover:shadow-white/10",
  },
  "Tailwind CSS": {
    category: "CSS Engine",
    dotColor: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]",
    hoverBorder: "hover:border-sky-500/40",
    hoverGlow: "hover:shadow-sky-500/10",
  },
  WordPress: {
    category: "CMS",
    dotColor: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]",
    hoverBorder: "hover:border-blue-500/40",
    hoverGlow: "hover:shadow-blue-500/10",
  },
  MongoDB: {
    category: "Database",
    dotColor: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
    hoverBorder: "hover:border-emerald-500/40",
    hoverGlow: "hover:shadow-emerald-500/10",
  },
};

export const Hero: React.FC = () => {
  const { profile } = portfolioData;

  const [heroViewMode, setHeroViewMode] = useState<"3d" | "code">("3d");

  // GSAP ScrollTrigger Refs
  const heroStageRef = useRef<HTMLElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const heroIdentityRef = useRef<HTMLDivElement | null>(null);
  const heroBgBlurRef = useRef<HTMLDivElement | null>(null);
  const heroTelemetryRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const heroSubtitleRef = useRef<HTMLDivElement | null>(null);
  const heroButtonsRef = useRef<HTMLDivElement | null>(null);
  const heroCredentialsRef = useRef<HTMLDivElement | null>(null);
  const heroCenterpieceRef = useRef<HTMLDivElement | null>(null);
  const heroTechConsoleRef = useRef<HTMLDivElement | null>(null);
  const heroScrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const heroPortalFlashRef = useRef<HTMLDivElement | null>(null);

  // Magnetic button hooks
  const magneticButtonRef = useMagnetic<HTMLDivElement>({ strength: 0.22, maxDistance: 16 });

  // 3D tilt & glow refs for code workbench
  const tiltCardRef = useTilt<HTMLDivElement>({ maxTilt: 5, perspective: 1000, scale: 1.01 });
  const workbenchGlowRef = usePointerGlow<HTMLDivElement>({
    glowSize: 420,
    glowColor: "rgba(99, 102, 241, 0.16)",
  });

  const handleWorkbenchRef = (node: HTMLDivElement | null) => {
    tiltCardRef.current = node;
    workbenchGlowRef.current = node;
  };

  // GSAP ScrollTrigger Pinned Scene Transformation Timeline
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Apply cinematic dissolve transformation across all devices (desktop & mobile touchscreens)
    if (!isReducedMotion && heroStageRef.current && heroTitleRef.current) {
      const mm = gsap.matchMedia();

      // Mobile & Tablet (< 1024px):
      // 1. Initial State (scroll 0%): Background is blurred (via heroBgBlurRef at opacity 1).
      // 2. As user scrolls initially: Background blur disappears from 100% to 0% opacity.
      // 3. AFTER the bg disappears 100%: Hero section effect starts (content dissolves into depth).
      // 4. AFTER SOME TIME: Cosmic pause.
      // 5. "3D Interactive Core Developer Console" appears with fade in (opacity 0 -> 1, pure fade, no blur).
      // 6. Active plateau: held visible, centered, and interactive.
      // 7. "3D Interactive Core Developer Console" disappears with fade out (opacity 1 -> 0, pure fade, no blur).
      // 8. AFTER SOME TIME: Cosmic portal passage.
      // 9. Next section appears!
      mm.add("(max-width: 1023px)", () => {
        if (!heroStageRef.current) return;

        const topElements = [heroTelemetryRef.current, heroTitleRef.current].filter(Boolean);
        const middleElements = [heroSubtitleRef.current, heroButtonsRef.current].filter(Boolean);

        // Initial setup for mobile:
        // Background blur starts at 100% opacity
        if (heroBgBlurRef.current) {
          gsap.set(heroBgBlurRef.current, { opacity: 1, display: "block" });
        }

        // Hero content visible with zero blur
        if (topElements.length > 0) {
          gsap.set(topElements, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", pointerEvents: "auto" });
        }
        if (middleElements.length > 0) {
          gsap.set(middleElements, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", pointerEvents: "auto" });
        }
        if (heroCredentialsRef.current) {
          gsap.set(heroCredentialsRef.current, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", pointerEvents: "auto" });
        }
        if (heroScrollIndicatorRef.current) {
          gsap.set(heroScrollIndicatorRef.current, { opacity: 1, y: 0, pointerEvents: "auto" });
        }

        // 3D Interactive Core starts hidden with pure opacity 0 (NO blur)
        if (heroCenterpieceRef.current) {
          gsap.set(heroCenterpieceRef.current, {
            opacity: 0,
            scale: 0.92,
            y: 30,
            filter: "none",
            pointerEvents: "none",
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroStageRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // =========================================================================
        // STEP 1: Background blur disappears from 100% to 0% opacity
        // Timeline range: 0.0 -> 2.0 (duration: 2.0)
        // At 0% scroll: background is blurred.
        // During 0.0 -> 2.0: background blur fades 100% -> 0% opacity, revealing crisp 3D universe!
        // =========================================================================
        if (heroBgBlurRef.current) {
          tl.fromTo(
            heroBgBlurRef.current,
            {
              opacity: 1,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            },
            {
              opacity: 0,
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
              duration: 2.0,
              ease: "power1.inOut",
            },
            0
          );
        }

        // =========================================================================
        // STEP 2: AFTER the bg disappears 100%, THEN hero section effect starts
        // Timeline range: 2.2 -> 4.4 (duration: 2.2)
        // =========================================================================
        if (topElements.length > 0) {
          tl.to(
            topElements,
            {
              scale: 1.12,
              y: -50,
              opacity: 0,
              filter: "blur(6px)",
              duration: 2.2,
              ease: "power2.inOut",
              onComplete: () => {
                topElements.forEach((el) => {
                  if (el) el.style.pointerEvents = "none";
                });
              },
              onReverseComplete: () => {
                topElements.forEach((el) => {
                  if (el) el.style.pointerEvents = "auto";
                });
              },
            },
            2.2
          );
        }

        if (middleElements.length > 0) {
          tl.to(
            middleElements,
            {
              y: 35,
              opacity: 0,
              filter: "blur(4px)",
              duration: 2.2,
              ease: "power1.in",
              onComplete: () => {
                middleElements.forEach((el) => {
                  if (el) el.style.pointerEvents = "none";
                });
              },
              onReverseComplete: () => {
                middleElements.forEach((el) => {
                  if (el) el.style.pointerEvents = "auto";
                });
              },
            },
            2.2
          );
        }

        if (heroCredentialsRef.current) {
          tl.to(
            heroCredentialsRef.current,
            {
              y: 40,
              opacity: 0,
              filter: "blur(6px)",
              duration: 2.2,
              ease: "power2.in",
              onComplete: () => {
                if (heroCredentialsRef.current) heroCredentialsRef.current.style.pointerEvents = "none";
              },
              onReverseComplete: () => {
                if (heroCredentialsRef.current) heroCredentialsRef.current.style.pointerEvents = "auto";
              },
            },
            2.2
          );
        }

        if (heroScrollIndicatorRef.current) {
          tl.to(
            heroScrollIndicatorRef.current,
            {
              y: 20,
              opacity: 0,
              duration: 1.5,
              ease: "power1.in",
            },
            2.2
          );
        }

        // =========================================================================
        // STEP 3: "AFTER SOME TIME" GAP 1 (4.4 -> 5.6)
        // Hero content is completely gone at 4.4.
        // "3D Interactive Core Developer Console" has not appeared yet.
        // User scrolls through pure, unblurred, crystal clear 3D cosmic universe!
        // =========================================================================

        // =========================================================================
        // STEP 4: "3D Interactive Core Developer Console" appears with pure FADE (5.6 -> 6.8)
        // (Pure opacity 0 -> 1 and scale 0.92 -> 1, NO blur filter)
        // Focal plateau: 6.8 -> 8.6
        // =========================================================================
        if (heroCenterpieceRef.current) {
          tl.fromTo(
            heroCenterpieceRef.current,
            {
              opacity: 0,
              scale: 0.92,
              y: 30,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
              onStart: () => {
                if (heroCenterpieceRef.current) heroCenterpieceRef.current.style.pointerEvents = "auto";
              },
              onReverseComplete: () => {
                if (heroCenterpieceRef.current) heroCenterpieceRef.current.style.pointerEvents = "none";
              },
            },
            5.6
          );

          // =========================================================================
          // STEP 5: "3D Interactive Core Developer Console" disappears with pure FADE OUT (8.6 -> 9.8)
          // (Pure opacity 1 -> 0 and scale 1 -> 0.92, NO blur filter)
          // At 9.8, 3D Core is completely gone!
          // =========================================================================
          tl.to(
            heroCenterpieceRef.current,
            {
              opacity: 0,
              scale: 0.92,
              y: -35,
              duration: 1.2,
              ease: "power2.in",
              onComplete: () => {
                if (heroCenterpieceRef.current) heroCenterpieceRef.current.style.pointerEvents = "none";
              },
              onReverseComplete: () => {
                if (heroCenterpieceRef.current) heroCenterpieceRef.current.style.pointerEvents = "auto";
              },
            },
            8.6
          );
        }

        // =========================================================================
        // STEP 6: "AFTER SOME TIME" GAP 2 (9.8 -> 11.6)
        // 3D Core is completely gone at 9.8.
        // Next section has not appeared yet.
        // User travels through unblurred portal tunnel and cosmic stardust.
        // =========================================================================
        if (heroPortalFlashRef.current) {
          tl.fromTo(
            heroPortalFlashRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 0.55, scale: 1.3, duration: 0.8, ease: "power2.out" },
            10.0
          );
          tl.to(
            heroPortalFlashRef.current,
            { opacity: 0, scale: 1.45, duration: 0.6, ease: "power1.in" },
            10.8
          );
        }

        // =========================================================================
        // STEP 7: Next section appears
        // At 11.8 -> 12.0, timeline completes, hero unpins, and Scene 02 appears!
        // =========================================================================
      });

      // Desktop (>= 1024px): Simultaneous side-by-side dissolve preserved with original full fidelity
      mm.add("(min-width: 1024px)", () => {
        // Reset desktop styles
        const topElements = [heroTelemetryRef.current, heroTitleRef.current].filter(Boolean);
        const middleElements = [heroSubtitleRef.current, heroButtonsRef.current].filter(Boolean);

        if (heroBgBlurRef.current) {
          gsap.set(heroBgBlurRef.current, { opacity: 1, display: "block" });
        }
        if (topElements.length > 0) {
          gsap.set(topElements, { opacity: 1, scale: 1, y: 0, filter: "none", pointerEvents: "auto" });
        }
        if (middleElements.length > 0) {
          gsap.set(middleElements, { opacity: 1, scale: 1, y: 0, filter: "none", pointerEvents: "auto" });
        }
        if (heroCenterpieceRef.current) {
          gsap.set(heroCenterpieceRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "none",
            pointerEvents: "auto",
          });
        }
        if (heroCredentialsRef.current) {
          gsap.set(heroCredentialsRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "none",
            pointerEvents: "auto",
          });
        }
        if (heroTechConsoleRef.current) {
          gsap.set(heroTechConsoleRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "none",
            pointerEvents: "auto",
          });
        }
        if (heroScrollIndicatorRef.current) {
          gsap.set(heroScrollIndicatorRef.current, {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroStageRef.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // Background blur disappears initially on scroll
        if (heroBgBlurRef.current) {
          tl.fromTo(
            heroBgBlurRef.current,
            {
              opacity: 1,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            },
            {
              opacity: 0,
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
              duration: 0.35,
              ease: "power1.inOut",
            },
            0
          );
        }

        // 1. Title & Top Telemetry scale smoothly and recede upward into depth
        if (topElements.length > 0) {
          tl.to(
            topElements,
            {
              scale: 1.12,
              y: -50,
              opacity: 0,
              filter: "blur(6px)",
              ease: "power2.inOut",
            },
            0
          );
        }

        // 2. Subtitle, statement and action buttons disperse cleanly
        if (middleElements.length > 0) {
          tl.to(
            middleElements,
            {
              y: 35,
              opacity: 0,
              filter: "blur(4px)",
              ease: "power1.in",
            },
            0
          );
        }

        // 3. Centerpiece (3D Core Sphere & Code dossier) dissolves gracefully into depth
        if (heroCenterpieceRef.current) {
          tl.to(
            heroCenterpieceRef.current,
            {
              scale: 0.9,
              opacity: 0,
              filter: "blur(6px)",
              ease: "power2.in",
            },
            0
          );
        }

        // 4. Verified Credentials Strip resolves and dissolves cleanly
        if (heroCredentialsRef.current) {
          tl.to(
            heroCredentialsRef.current,
            {
              y: 40,
              opacity: 0,
              filter: "blur(6px)",
              ease: "power2.in",
            },
            0
          );
        }

        // 5. Technologies & Core Stack Console resolves and dissolves into cosmic depth
        if (heroTechConsoleRef.current) {
          tl.to(
            heroTechConsoleRef.current,
            {
              y: 50,
              opacity: 0,
              filter: "blur(6px)",
              ease: "power2.in",
            },
            0
          );
        }

        // 6. Cinematic Scroll Indicator dissolves cleanly
        if (heroScrollIndicatorRef.current) {
          tl.to(
            heroScrollIndicatorRef.current,
            {
              y: 20,
              opacity: 0,
              ease: "power1.in",
            },
            0
          );
        }

        // 7. Dimensional portal flash washes through subtly
        if (heroPortalFlashRef.current) {
          tl.fromTo(
            heroPortalFlashRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 0.5, scale: 1.3, ease: "power2.out" },
            0.35
          );
        }
      });

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);

      const handleOrientation = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("orientationchange", handleOrientation, { passive: true });

      return () => {
        clearTimeout(refreshTimer);
        window.removeEventListener("orientationchange", handleOrientation);
        mm.revert();
        ScrollTrigger.refresh();
      };
    }
  }, []);

  return (
    <section
      ref={heroStageRef}
      id="home"
      aria-label="Hero Overview"
      className="relative overflow-clip min-h-[96vh] flex flex-col justify-between pt-8 pb-10 sm:pt-14 sm:pb-14 lg:pt-20 lg:pb-16"
    >
      {/* Initial Background Blur Overlay: At 0% scroll, background is blurred. Fades 100% -> 0% opacity on scroll before Hero effect starts */}
      <div
        ref={heroBgBlurRef}
        className="pointer-events-none fixed inset-0 z-0 will-change-[opacity,backdrop-filter]"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(8, 11, 18, 0.45)",
        }}
        aria-hidden="true"
      />

      {/* Dimensional Portal Energy Flash for Scroll Transition (Optical Radial Glow - No CSS blur to keep 3D background crisp) */}
      <div
        ref={heroPortalFlashRef}
        className="pointer-events-none fixed inset-0 z-10 opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.22) 0%, rgba(99, 102, 241, 0.12) 38%, transparent 68%)",
        }}
        aria-hidden="true"
      />

      <Container size="xl" className="my-auto relative z-10">
        <div
          ref={heroContentRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[560px] sm:min-h-[620px] lg:min-h-0"
        >
          {/* Left Column: Cinematic Spatial Typography & Identity (7 cols) */}
          <div
            ref={heroIdentityRef}
            className="lg:col-span-7 flex flex-col items-start text-left w-full will-change-transform"
          >
            {/* Top HUD Telemetry Strip */}
            <div
              ref={heroTelemetryRef}
              className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 animate-fade-in-up will-change-transform"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.25)] max-w-full">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8] animate-pulse shrink-0" />
                <span className="truncate">WEB DEVELOPER • BCA CHANDIGARH UNIV.</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-mono rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Available for Roles</span>
              </span>
            </div>

            {/* Oversized Cinematic Typography with 3D Depth */}
            <div
              ref={heroTitleRef}
              className="mb-2 will-change-transform w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 backdrop-blur-md mb-2 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>SPATIAL WEB ARCHITECTURE</span>
              </div>
              <h1 className="text-[clamp(2.15rem,8.5vw,4.5rem)] font-black tracking-[-0.03em] text-gradient-metallic drop-shadow-[0_4px_32px_rgba(0,0,0,0.95)] leading-[1.08] break-words">
                {profile.name.toUpperCase()}
              </h1>
              <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-indigo-300 font-bold mt-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8] animate-pulse" />
                <span>{profile.role.toUpperCase()}</span>
              </div>
            </div>

            {/* Cinematic Statement & Subtitle */}
            <div ref={heroSubtitleRef} className="space-y-4 will-change-transform">
              <div className="text-mask-reveal mt-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.2]">
                  <span className="shimmer-headline font-black">
                    Building Digital Experiences.
                  </span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                I&apos;m <strong className="font-semibold text-white">Akash Kumar</strong>, a web developer exploring modern frontend technologies and engineering responsive, high-performance web applications through real-world implementation. BCA student at Chandigarh University.
              </p>
            </div>

            {/* Primary Action Buttons with Magnetic Elasticity */}
            <div
              ref={heroButtonsRef}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto will-change-transform"
            >
              <div ref={magneticButtonRef} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  href="#about"
                  className="w-full sm:w-auto font-bold tracking-wide shadow-2xl shadow-indigo-950/80"
                >
                  <span>Explore Experience</span>
                  <ArrowDown className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-y-1" />
                </Button>
              </div>

              <Button
                variant="secondary"
                size="lg"
                href="#contact"
                className="w-full sm:w-auto font-medium"
              >
                <span>Direct Contact</span>
                <Mail className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            {/* Verified Experience & Credential Strip */}
            <div
              ref={heroCredentialsRef}
              className="mt-10 pt-6 border-t border-white/[0.1] w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 will-change-transform"
            >
              {/* Academic Enrollment Card */}
              <div className="card-glass-specular flex items-center gap-3 p-3.5 rounded-2xl border border-indigo-500/30 transition-all duration-200 hover:border-indigo-400/60 hover:-translate-y-0.5 group shadow-lg shadow-indigo-950/30">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 group-hover:scale-105 group-hover:border-indigo-400/50 transition-all">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight truncate group-hover:text-indigo-200 transition-colors">
                      Chandigarh University
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shrink-0">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      Enrolled
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block truncate">
                    BCA · Semester 3 (Active)
                  </span>
                </div>
              </div>

              {/* NCC Certification Card */}
              <div className="card-glass-specular flex items-center gap-3 p-3.5 rounded-2xl border border-amber-500/30 transition-all duration-200 hover:border-amber-400/60 hover:-translate-y-0.5 group shadow-lg shadow-amber-950/30">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 group-hover:border-amber-400/50 transition-all">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight truncate group-hover:text-amber-200 transition-colors">
                      NCC &apos;A&apos; &amp; &apos;B&apos; Certified
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 shrink-0">
                      Cadet
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block truncate">
                    Discipline &amp; Leadership
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Hologram Core with Switchable Code Dossier (5 cols) */}
          <div
            ref={heroCenterpieceRef}
            className="w-full flex flex-col items-center justify-center will-change-transform lg:col-span-5 max-lg:absolute max-lg:inset-x-0 max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:z-20 max-lg:px-2 max-lg:opacity-0 max-lg:pointer-events-none"
          >
            {/* View Mode Toggle Controls */}
            <div className="mb-3.5 inline-flex p-1 rounded-2xl bg-[#0a0d14]/85 border border-white/[0.12] shadow-xl backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setHeroViewMode("3d")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  heroViewMode === "3d"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-950"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>3D Interactive Core</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroViewMode("code")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                  heroViewMode === "code"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-950"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 text-indigo-300" />
                <span>Developer Console</span>
              </button>
            </div>

            {/* Display Active Centerpiece View */}
            {heroViewMode === "3d" ? (
              <div className="w-full flex justify-center">
                <HologramSphere3D />
              </div>
            ) : (
              <div
                ref={handleWorkbenchRef}
                className="relative w-full max-w-lg lg:max-w-none group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-blue-500/15 to-transparent blur-2xl rounded-3xl -z-10 group-hover:from-indigo-500/30 transition-all duration-300"
                  aria-hidden="true"
                />

                <div className="relative rounded-3xl border border-white/[0.12] bg-[#0e1422]/90 shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl transition-all duration-300 group-hover:border-indigo-500/40">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                    style={{
                      background:
                        "radial-gradient(var(--glow-size, 420px) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color, rgba(99, 102, 241, 0.16)), transparent 70%)",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#0a0d14]/90 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#131926] border border-white/[0.06] text-[11px] font-mono text-zinc-300">
                        <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>akash.profile.ts</span>
                      </div>

                      <div className="flex items-center gap-2 text-zinc-500">
                        <Terminal className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-300">
                      <div className="text-zinc-500 mb-2">
                        {"// Akash Kumar Developer Profile"}
                      </div>
                      <div>
                        <span className="text-indigo-400">const</span>{" "}
                        <span className="text-blue-300">developer</span>:{" "}
                        <span className="text-emerald-400">Profile</span> = &#123;
                      </div>

                      <div className="pl-4 sm:pl-6 space-y-1 my-1">
                        <div>
                          <span className="text-zinc-400">name:</span>{" "}
                          <span className="text-amber-200">&quot;Akash Kumar&quot;</span>,
                        </div>
                        <div>
                          <span className="text-zinc-400">role:</span>{" "}
                          <span className="text-amber-200">&quot;Web Developer&quot;</span>,
                        </div>
                        <div>
                          <span className="text-zinc-400">education:</span> &#123;
                        </div>
                        <div className="pl-4 text-zinc-400">
                          degree: <span className="text-amber-200">&quot;BCA (3rd Sem)&quot;</span>,
                          <br />
                          institution:{" "}
                          <span className="text-amber-200">&quot;Chandigarh University&quot;</span>
                        </div>
                        <div>&#125;,</div>
                        <div>
                          <span className="text-zinc-400">activeProjects:</span> [
                        </div>
                        <div className="pl-4 text-emerald-300">
                          &quot;mikumantra.com&quot;,
                          <br />
                          &quot;psd2ui.com&quot;
                        </div>
                        <div>],</div>
                        <div>
                          <span className="text-zinc-400">cadetCredentials:</span>{" "}
                          <span className="text-indigo-300">
                            [&quot;NCC-A&quot;, &quot;NCC-B&quot;]
                          </span>
                          ,
                        </div>
                        <div>
                          <span className="text-zinc-400">openTo:</span>{" "}
                          <span className="text-blue-300">
                            [&quot;Roles&quot;, &quot;Internships&quot;, &quot;Freelance&quot;]
                          </span>
                        </div>
                      </div>

                      <div>&#125;;</div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0d14]/90 border-t border-white/[0.08] text-[11px] font-mono text-zinc-400">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>branch: main</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Ready to Build</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technologies & Core Stack Console */}
        <div
          ref={heroTechConsoleRef}
          className="mt-14 sm:mt-16 relative rounded-3xl border border-white/[0.1] bg-[#0d121d]/60 backdrop-blur-xl p-5 sm:p-6 shadow-2xl overflow-hidden will-change-transform hidden lg:block"
        >
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 mb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Core Technologies &amp; Capabilities
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Verified Toolkit
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Modern Frontend, Fullstack &amp; CMS Tools</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {coreTechnologies.map((tech) => {
              const meta = techDetails[tech] || {
                category: "Tool",
                dotColor: "bg-indigo-400",
                hoverBorder: "hover:border-indigo-500/40",
                hoverGlow: "hover:shadow-indigo-500/10",
              };

              return (
                <div
                  key={tech}
                  className={`group relative flex flex-col justify-between p-3 rounded-2xl border border-white/[0.08] bg-[#111726]/60 backdrop-blur-md hover:bg-[#182030]/80 ${meta.hoverBorder} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${meta.hoverGlow} cursor-default select-none`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-2 h-2 rounded-full ${meta.dotColor} group-hover:scale-125 transition-transform duration-200`}
                    />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                      {meta.category}
                    </span>
                  </div>

                  <span className="text-xs sm:text-[13px] font-bold font-mono text-zinc-200 group-hover:text-white transition-colors truncate">
                    {tech}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Cinematic Scroll Indicator */}
      <div
        ref={heroScrollIndicatorRef}
        className="mt-8 flex justify-center w-full relative z-10 will-change-transform"
      >
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-widest text-zinc-400 hover:text-indigo-300 transition-colors uppercase group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg p-1.5"
          aria-label="Scroll down to About section"
        >
          <span className="text-[10px] tracking-wider text-indigo-300 font-semibold">
            SCROLL TO ENTER PORTAL
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-indigo-400 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};