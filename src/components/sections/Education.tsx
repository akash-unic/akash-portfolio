"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { useInView } from "@/hooks/useInView";
import { useTilt } from "@/hooks/useTilt";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import {
  BookOpen,
  CheckCircle2,
  Shield,
  Medal,
} from "lucide-react";

export const Education: React.FC = () => {
  const { education, achievements } = portfolioData;
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.02,
    rootMargin: "100px 0px 50px 0px",
  });

  // 3D Tilt refs
  const bcaTiltRef = useTilt<HTMLDivElement>({ maxTilt: 4.5, perspective: 1100, scale: 1.015 });
  const nccTiltRef = useTilt<HTMLDivElement>({ maxTilt: 4.5, perspective: 1100, scale: 1.015 });

  const bcaGlowRef = usePointerGlow<HTMLDivElement>({
    glowSize: 420,
    glowColor: "rgba(99, 102, 241, 0.15)",
  });
  const nccGlowRef = usePointerGlow<HTMLDivElement>({
    glowSize: 420,
    glowColor: "rgba(245, 158, 11, 0.15)",
  });

  const handleBcaRef = (node: HTMLDivElement | null) => {
    bcaTiltRef.current = node;
    bcaGlowRef.current = node;
  };

  const handleNccRef = (node: HTMLDivElement | null) => {
    nccTiltRef.current = node;
    nccGlowRef.current = node;
  };

  return (
    <Section
      id="education"
      surface="canvas-base"
      spacing="spacious"
      className="scroll-mt-20 border-b border-white/[0.08] relative min-h-[85vh] flex flex-col justify-center"
    >
      {/* Subtle ambient lighting (Contained overflow prevents horizontal scroll without clipping section content) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/[0.04] blur-3xl"
          aria-hidden="true"
        />
      </div>

      <Container size="xl">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            {/* Left Column: Sticky Narrative & Discipline Track (4 cols) */}
            <div className="lg:col-span-4 sticky-scene-panel space-y-6">
              <SectionHeading
                chapter="05 // CREDENTIALS &amp; RIGOR"
                badge="Academic &amp; Cadet Rigor"
                title="Education &amp; NCC Honors"
                description="Academic foundation in computer applications paired with certified military cadet training in the National Cadet Corps."
              />

              {/* Discipline & Focus Callout */}
              <div className="card-glass-specular p-6 rounded-3xl border border-white/[0.12] space-y-3.5 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Discipline &amp; Focus
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Cadet training instills operational punctuality, accountability under pressure, and team coordination that directly reinforces software engineering reliability.
                </p>
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-white">Chandigarh Univ.</span>
                  <span className="text-amber-300">NCC &apos;A&apos; &amp; &apos;B&apos; Certified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Academic Track & NCC Credentials (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Higher Degree: BCA */}
              <div
                ref={handleBcaRef}
                className="card-glass-specular relative rounded-3xl border border-indigo-500/40 p-6 sm:p-7 transition-all duration-300 hover:border-indigo-400/60 hover:shadow-2xl hover:shadow-indigo-950/40 overflow-hidden group"
              >
                {/* Specular Bevel Line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
                  aria-hidden="true"
                />

                {/* Pointer glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background:
                      "radial-gradient(var(--glow-size, 420px) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color, rgba(99, 102, 241, 0.15)), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <Badge variant="accent" size="sm" dot>
                      Higher Education
                    </Badge>
                    <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-3 py-0.5 rounded-full border border-indigo-500/25">
                      Semester 3 (Currently Enrolled)
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                    {education[0].degree}
                  </h4>
                  <p className="text-sm font-semibold text-indigo-300 mt-1">
                    {education[0].institution}
                  </p>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                    {education[0].details}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap gap-2 text-xs font-mono text-slate-200">
                    <span className="px-3 py-1 rounded-xl bg-[#131b2e]/85 border border-white/[0.12]">
                      CS Fundamentals
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-[#131b2e]/85 border border-white/[0.12]">
                      Programming Logic
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-[#131b2e]/85 border border-white/[0.12]">
                      Database Systems
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-[#131b2e]/85 border border-white/[0.12]">
                      Modern Web Technologies
                    </span>
                  </div>
                </div>
              </div>

              {/* 12th & 10th Completed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {education.slice(1).map((item) => (
                  <div
                    key={item.degree}
                    className="card-glass-specular p-5 sm:p-6 rounded-2xl border border-white/[0.1] transition-all duration-200 hover:border-white/[0.25]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <Badge variant="neutral" size="sm">
                        {item.status}
                      </Badge>
                    </div>

                    <h5 className="text-sm sm:text-base font-bold text-white">
                      {item.degree}
                    </h5>

                    <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>

              {/* NCC Military Cadet Credentials */}
              <div
                ref={handleNccRef}
                className="card-glass-specular relative rounded-3xl border border-amber-500/40 p-6 sm:p-7 transition-all duration-300 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-950/40 overflow-hidden group space-y-6"
              >
                {/* Specular Bevel Line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
                  aria-hidden="true"
                />

                {/* Pointer glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background:
                      "radial-gradient(var(--glow-size, 420px) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color, rgba(245, 158, 11, 0.15)), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0 shadow-inner">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        National Cadet Corps (NCC)
                      </h4>
                      <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                        Military cadet training emphasizing leadership, physical discipline, drill precision, team cooperation, and civic duty.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {achievements.map((ach) => (
                      <div
                        key={ach.title}
                        className="p-4 rounded-2xl border border-white/[0.08] bg-[#0a0d14]/75 transition-colors hover:border-amber-400/40 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <Medal className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="text-sm font-bold text-white">
                                {ach.title}
                              </span>
                            </div>
                            <Badge variant="warning" size="sm">
                              Verified
                            </Badge>
                          </div>

                          <span className="text-[11px] font-mono text-amber-300 block mb-1">
                            {ach.badge}
                          </span>

                          <p className="text-xs text-[#94a3b8] leading-relaxed">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Demonstrated drill precision, squad leadership &amp; operational rigor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};