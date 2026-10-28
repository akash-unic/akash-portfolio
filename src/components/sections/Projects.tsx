"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useInView } from "@/hooks/useInView";
import { useMagnetic } from "@/hooks/useMagnetic";
import { ShieldCheck, ChevronLeft, ChevronRight, Layers, ArrowRight } from "lucide-react";

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const galleryTrackRef = useRef<HTMLDivElement | null>(null);

  // Magnetic button hooks for gallery controls
  const magneticPrevRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 12 });
  const magneticNextRef = useMagnetic<HTMLButtonElement>({ strength: 0.2, maxDistance: 12 });

  // Scroll to selected project slide
  const scrollToProject = useCallback((index: number) => {
    if (!galleryTrackRef.current) return;
    const track = galleryTrackRef.current;
    const slideWidth = track.clientWidth;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollTo({
      left: index * slideWidth,
      behavior: isReducedMotion ? "auto" : "smooth",
    });

    setActiveProjectIndex(index);
  }, []);

  // Sync active project index on horizontal swipe or scroll
  useEffect(() => {
    const track = galleryTrackRef.current;
    if (!track) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const slideWidth = track.clientWidth;
        if (slideWidth > 0) {
          const newIndex = Math.round(track.scrollLeft / slideWidth);
          if (newIndex >= 0 && newIndex < projects.length && newIndex !== activeProjectIndex) {
            setActiveProjectIndex(newIndex);
          }
        }
        rafId = null;
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      track.removeEventListener("scroll", handleScroll);
    };
  }, [projects.length, activeProjectIndex]);

  const handleNext = () => {
    const nextIndex = (activeProjectIndex + 1) % projects.length;
    scrollToProject(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeProjectIndex - 1 + projects.length) % projects.length;
    scrollToProject(prevIndex);
  };

  return (
    <Section
      id="projects"
      surface="canvas-subtle"
      spacing="default"
      className="scroll-mt-20 border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div
        className="pointer-events-none absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.03] blur-3xl"
        aria-hidden="true"
      />

      <Container size="xl">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            {/* Left Column: Sticky Gallery Controller & Verified Index (4 cols) */}
            <div className="lg:col-span-4 sticky-scene-panel space-y-6">
              <SectionHeading
                chapter="04 // PROTOTYPES & BUILDS"
                badge="Interactive Showcase"
                title="Featured Projects &amp; Case Studies"
                description="In-depth breakdowns of real web platforms, highlighting frontend architecture, verified technology stacks, and honest individual contributions without fabricated metrics."
              />

              {/* Gallery Navigation & Switcher Card */}
              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#131926]/90 backdrop-blur-sm space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Gallery Switcher</span>
                  </span>

                  {/* Slide Step Badge */}
                  <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    0{activeProjectIndex + 1} / 0{projects.length}
                  </span>
                </div>

                {/* Interactive Project Selector Tabs */}
                <div className="space-y-2.5" role="tablist" aria-label="Project Gallery Tabs">
                  {projects.map((project, idx) => {
                    const isActive = activeProjectIndex === idx;
                    return (
                      <button
                        key={project.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`gallery-slide-${project.id}`}
                        onClick={() => scrollToProject(idx)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                          isActive
                            ? "border-indigo-500/40 bg-indigo-500/15 shadow-md shadow-indigo-950/40"
                            : "border-white/[0.06] bg-[#0a0d14]/60 hover:border-white/[0.15] hover:bg-white/[0.04]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-indigo-400">
                              0{idx + 1}.
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {project.title}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#94a3b8] block mt-0.5">
                            {idx === 0 ? "Next.js · MongoDB · E-Commerce" : "HTML5 · CSS3 · Responsive"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Viewing
                            </span>
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Gallery Slide Arrow Controls */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      ref={magneticPrevRef}
                      type="button"
                      onClick={handlePrev}
                      className="p-2 rounded-xl border border-white/[0.08] bg-[#0a0d14] text-zinc-300 hover:text-white hover:border-indigo-400/40 hover:bg-white/[0.06] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                      aria-label="Previous project in gallery"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      ref={magneticNextRef}
                      type="button"
                      onClick={handleNext}
                      className="p-2 rounded-xl border border-white/[0.08] bg-[#0a0d14] text-zinc-300 hover:text-white hover:border-indigo-400/40 hover:bg-white/[0.06] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                      aria-label="Next project in gallery"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-zinc-400">
                    Use arrows or swipe
                  </span>
                </div>

                {/* Verification Notice */}
                <div className="pt-3 border-t border-white/[0.08] flex items-start gap-2.5 text-xs text-[#94a3b8] font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">
                    Source repositories and alternate cloud deployments verified against local checkouts.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Scroll-Linked Horizontal Sequence Gallery Track (8 cols) */}
            <div className="lg:col-span-8 w-full min-w-0">
              {/* Gallery Horizontal Snap Track */}
              <div
                ref={galleryTrackRef}
                tabIndex={0}
                aria-label="Project Gallery Carousel"
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none touch-pan-x gap-6 sm:gap-8 pb-4 scroll-smooth focus:outline-none rounded-2xl"
              >
                {projects.map((project, idx) => (
                  <div
                    key={project.id}
                    id={`gallery-slide-${project.id}`}
                    role="tabpanel"
                    aria-label={`Project 0${idx + 1}: ${project.title}`}
                    className="w-full min-w-full shrink-0 snap-center transition-opacity duration-300"
                  >
                    {/* Visual Slide Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                          FEATURED 0{idx + 1}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 truncate max-w-[200px] sm:max-w-none">
                          {project.category}
                        </span>
                      </div>

                      <span className="text-xs font-mono text-zinc-500">
                        Slide {idx + 1} of {projects.length}
                      </span>
                    </div>

                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>

              {/* Bottom Gallery Progress Indicators */}
              <div className="mt-4 flex items-center justify-between px-2 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  {projects.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => scrollToProject(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 ${
                        activeProjectIndex === idx
                          ? "w-8 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Jump to slide 0${idx + 1}`}
                    />
                  ))}
                </div>

                <span className="text-[11px] text-zinc-500 hidden sm:inline">
                  Interactive Horizontal Sequence · Touch &amp; Click Enabled
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
