"use client";

import React, { useRef, useEffect } from "react";
import { portfolioData, coreTechnologies } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
  Code2,
  Sparkles,
} from "lucide-react";

// Tech metadata for enhanced styling, brand dots, and categorization
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
    category: "UI Library",
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

  // Magnetic button ref for primary CTA with clamped movement
  const magneticButtonRef = useMagnetic<HTMLDivElement>({ strength: 0.22, maxDistance: 16 });

  // 3D tilt ref for code workbench card
  const tiltCardRef = useTilt<HTMLDivElement>({ maxTilt: 5, perspective: 1000, scale: 1.01 });

  // Pointer-reactive gradient glow for workbench
  const workbenchGlowRef = usePointerGlow<HTMLDivElement>({ glowSize: 400, glowColor: "rgba(99, 102, 241, 0.15)" });

  const handleWorkbenchRef = (node: HTMLDivElement | null) => {
    tiltCardRef.current = node;
    workbenchGlowRef.current = node;
  };

  // Pointer spotlight ref (direct DOM update for zero React re-renders)
  const heroRef = useRef<HTMLElement | null>(null);
  const heroSpotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!heroRef.current || !heroSpotlightRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const rawX = ((e.clientX - rect.left) / rect.width) * 100;
        const rawY = ((e.clientY - rect.top) / rect.height) * 100;
        // Clamp to safe percentage range [0, 100]
        const clampedX = Math.max(0, Math.min(100, rawX));
        const clampedY = Math.max(0, Math.min(100, rawY));

        heroSpotlightRef.current.style.background = `radial-gradient(circle 500px at ${clampedX.toFixed(1)}% ${clampedY.toFixed(1)}%, rgba(99, 102, 241, 0.12), transparent 70%)`;
        rafId = null;
      });
    };

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isFinePointer && !isReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Hero Overview"
      className="relative overflow-clip min-h-[92vh] flex flex-col justify-between pt-10 pb-8 sm:pt-16 sm:pb-12 lg:pt-24 lg:pb-16 border-b border-white/[0.06]"
    >
      {/* Subtle pointer-following interactive spotlight on fine-pointer devices */}
      <div
        ref={heroSpotlightRef}
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 opacity-60"
        style={{
          background: "radial-gradient(circle 500px at 50% 30%, rgba(99, 102, 241, 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient ambient glow fallback */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 w-[min(650px,95vw)] h-[380px] bg-gradient-to-b from-indigo-600/15 via-blue-600/10 to-transparent blur-3xl rounded-full -z-20 animate-ambient"
        aria-hidden="true"
      />

      <Container size="xl" className="my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Editorial Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow & Status */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2.5 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-semibold tracking-wider uppercase rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                WEB DEVELOPER • BCA STUDENT
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            </div>

            {/* Oversized Name Header with Cinematic Mask Shimmer */}
            <div className="overflow-hidden mb-2 animate-fade-in-up [animation-delay:60ms]">
              <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-indigo-400 font-semibold mb-1">
                Portfolio of
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white/95">
                {profile.name}
              </h2>
            </div>

            {/* Headline with Masked Typography Reveal */}
            <div className="text-mask-reveal mt-2">
              <h1 className="masked-line text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f8fafc] leading-[1.12]">
                <span className="inline-block">I build</span>{" "}
                <span className="inline-block shimmer-headline font-black">
                  modern digital
                </span>{" "}
                <span className="inline-block">experiences.</span>
              </h1>
            </div>

            {/* Supporting Copy with Masked Line Reveal */}
            <div className="text-mask-reveal mt-6">
              <p className="masked-line text-base sm:text-lg lg:text-xl text-[#94a3b8] leading-relaxed max-w-2xl font-normal">
                I&apos;m <strong className="font-semibold text-[#f8fafc]">{profile.name}</strong>, a web developer exploring modern frontend technologies and building responsive web experiences through real-world projects.
              </p>
            </div>

            {/* Action CTA Buttons with Magnetic Snap */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto animate-fade-in-up [animation-delay:240ms]">
              <div ref={magneticButtonRef} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  href="#projects"
                  className="w-full sm:w-auto shadow-lg shadow-indigo-950/40 font-semibold"
                >
                  <span>Explore My Work</span>
                  <ArrowDown className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                </Button>
              </div>

              <Button
                variant="secondary"
                size="lg"
                href="#contact"
                className="w-full sm:w-auto font-medium"
              >
                <span>Let&apos;s Connect</span>
                <Mail className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            {/* Verified Experience & Credential Strip */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 animate-fade-in-up [animation-delay:300ms]">
              {/* Academic Enrollment Card */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/[0.08] via-[#131926]/80 to-[#101623]/80 backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/40 hover:-translate-y-0.5 group shadow-sm shadow-indigo-950/30">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 group-hover:scale-105 group-hover:border-indigo-400/50 transition-all">
                  <GraduationCap className="w-4 h-4" />
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
                  <span className="text-[11px] font-mono text-zinc-400 block truncate">
                    BCA · 3rd Semester
                  </span>
                </div>
              </div>

              {/* NCC Certification Card */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.08] via-[#131926]/80 to-[#101623]/80 backdrop-blur-sm transition-all duration-200 hover:border-amber-400/40 hover:-translate-y-0.5 group shadow-sm shadow-amber-950/30">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 group-hover:border-amber-400/50 transition-all">
                  <Award className="w-4 h-4" />
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
                  <span className="text-[11px] font-mono text-zinc-400 block truncate">
                    Discipline &amp; Leadership
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Developer Code Composition with 3D Tilt & Pointer Glow (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full animate-fade-in-up [animation-delay:200ms]">
            <div
              ref={handleWorkbenchRef}
              className="relative w-full max-w-lg lg:max-w-none group cursor-pointer"
            >
              {/* Subtle background glow behind the card */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 via-blue-500/10 to-transparent blur-2xl rounded-2xl -z-10 group-hover:from-indigo-500/25 group-hover:via-blue-500/20 transition-all duration-300"
                aria-hidden="true"
              />

              {/* Code Workbench Window Component with Pointer-Reactive Gradient */}
              <div className="relative rounded-2xl border border-white/[0.12] bg-[#101623]/95 shadow-2xl shadow-black/70 overflow-hidden backdrop-blur-md transition-all duration-300 group-hover:border-indigo-500/40">
                {/* Pointer-Reactive Radial Gradient Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background:
                      "radial-gradient(var(--glow-size, 400px) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color, rgba(99, 102, 241, 0.15)), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0a0d14] border-b border-white/[0.08]">
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

                {/* Editor Code Body */}
                <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-300">
                  <div className="text-zinc-500 mb-2">
                    {"// Akash Kumar Developer Manifesto"}
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
                      institution: <span className="text-amber-200">&quot;Chandigarh University&quot;</span>
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
                      <span className="text-zinc-400">discipline:</span>{" "}
                      <span className="text-indigo-300">[&quot;NCC-A&quot;, &quot;NCC-B&quot;]</span>,
                    </div>
                    <div>
                      <span className="text-zinc-400">openTo:</span>{" "}
                      <span className="text-blue-300">[&quot;Jobs&quot;, &quot;Internships&quot;, &quot;Freelance&quot;]</span>
                    </div>
                  </div>

                  <div>&#125;;</div>
                </div>

                {/* Window Footer / Status Bar */}
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
        </div>
      </div>

        {/* Enhanced Technologies & Core Stack Console */}
        <div className="mt-14 sm:mt-16 relative rounded-2xl border border-white/[0.08] bg-[#0d121d]/75 backdrop-blur-md p-5 sm:p-6 shadow-2xl shadow-black/40 overflow-hidden animate-fade-in-up [animation-delay:350ms]">
          {/* Subtle top edge gradient line */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
            aria-hidden="true"
          />

          {/* Console Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 mb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Technologies &amp; Core Stack
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Production Ready
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Verified Frontend &amp; Web Development Toolkit</span>
            </div>
          </div>

          {/* Interactive Technology Pills Grid */}
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
                  className={`group relative flex flex-col justify-between p-3 rounded-xl border border-white/[0.08] bg-[#131926]/80 hover:bg-[#182030] ${meta.hoverBorder} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${meta.hoverGlow} cursor-default select-none`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-2 h-2 rounded-full ${meta.dotColor} group-hover:scale-125 transition-transform duration-200`} />
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

      {/* Elegant Scroll Indicator */}
      <div className="mt-8 flex justify-center w-full animate-fade-in-up [animation-delay:400ms]">
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-1 text-[11px] font-mono tracking-widest text-zinc-400 hover:text-indigo-300 transition-colors uppercase group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg p-1"
          aria-label="Scroll down to About section"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-indigo-400 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};
