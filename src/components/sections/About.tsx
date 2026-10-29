"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";
import { useTilt } from "@/hooks/useTilt";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import {
  GraduationCap,
  Code2,
  Compass,
  Cpu,
  Target,
  ShieldCheck,
  Sparkles,
  Award,
  Terminal,
} from "lucide-react";

export const About: React.FC = () => {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.02,
    rootMargin: "100px 0px 50px 0px",
  });
  const tiltCardRef = useTilt<HTMLDivElement>({ maxTilt: 6, perspective: 1100, scale: 1.02 });
  const glowRef = usePointerGlow<HTMLDivElement>({
    glowSize: 450,
    glowColor: "rgba(99, 102, 241, 0.18)",
  });

  const handleDossierRef = (node: HTMLDivElement | null) => {
    tiltCardRef.current = node;
    glowRef.current = node;
  };

  return (
    <Section
      id="about"
      surface="canvas-base"
      spacing="spacious"
      className="scroll-mt-20 border-b border-white/[0.08] relative min-h-[85vh] flex flex-col justify-center"
    >
      {/* Cinematic Ambient Accent Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.05] blur-3xl"
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
          <SectionHeading
            chapter="02 // THE DEVELOPER &amp; ETHOS"
            badge="About Akash"
            title="Curious Student. Practical Builder."
            description="A dedicated web developer pursuing a Bachelor of Computer Applications at Chandigarh University, translating foundational computer science principles into responsive, real-world web applications."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            {/* Main Editorial Story (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-[#94a3b8] leading-relaxed text-base sm:text-lg">
              <p>
                I am currently in <strong className="text-white font-semibold">Semester 3 of my Bachelor of Computer Applications (BCA)</strong> at <strong className="text-white font-semibold">Chandigarh University</strong>. Alongside rigorous academic coursework, I dedicate my hours to hands-on web development, exploring modern frontend tools and translating complex visual designs into clean, resilient code.
              </p>

              <p>
                My development journey is centered on <strong className="text-zinc-200 font-medium">practical implementation over passive watching</strong>. Rather than getting stuck in tutorial loops, I learn by building—constructing live commercial platforms, solving responsive layout challenges, and optimizing state workflows across mobile and desktop viewports.
              </p>

              <p>
                Whether engineering dynamic UI components in <strong className="text-indigo-300 font-mono text-sm">React</strong> and <strong className="text-indigo-300 font-mono text-sm">Next.js</strong>, architecting utility-first systems with <strong className="text-sky-300 font-mono text-sm">Tailwind CSS</strong>, or managing content with <strong className="text-zinc-200 font-mono text-sm">WordPress</strong> and <strong className="text-emerald-300 font-mono text-sm">MongoDB</strong>, I prioritize clean architecture, readable structure, and honest engineering.
              </p>

              {/* 3 Core Pillars with 3D Card Hover Depth */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card-glass-specular p-4 rounded-2xl border border-white/[0.1] transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#151f33]/80 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-950/40 group">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 group-hover:border-indigo-400/50 transition-all">
                    <Target className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                    Implementation First
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Applying concepts directly to production-deployed web applications.
                  </p>
                </div>

                <div className="card-glass-specular p-4 rounded-2xl border border-white/[0.1] transition-all duration-300 hover:border-blue-500/50 hover:bg-[#151f33]/80 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-950/40 group">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 group-hover:border-blue-400/50 transition-all">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
                    Continuous Growth
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Consistently refining frontend architecture, TypeScript, and modern web UI.
                  </p>
                </div>

                <div className="card-glass-specular p-4 rounded-2xl border border-white/[0.1] transition-all duration-300 hover:border-amber-500/50 hover:bg-[#151f33]/80 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-950/40 group">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 group-hover:border-amber-400/50 transition-all">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                    Cadet Rigor
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Disciplined punctuality honed through military cadet training.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Holographic 3D ID Dossier (5 cols) */}
            <div className="lg:col-span-5 sticky-scene-panel" ref={handleDossierRef}>
              <div className="card-glass-specular relative rounded-3xl border border-white/[0.14] p-6 sm:p-7 shadow-2xl shadow-black/80 overflow-hidden transition-all duration-300 hover:border-indigo-400/60 group">
                {/* Specular Bevel Top Edge */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent"
                  aria-hidden="true"
                />

                {/* Pointer-Reactive Radial Gradient Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background:
                      "radial-gradient(var(--glow-size, 450px) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color, rgba(99, 102, 241, 0.18)), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-6">
                  {/* Holographic Dossier Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" />
                        AUTHENTIC DOSSIER
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        Akash Kumar
                      </h3>
                      <p className="text-xs font-mono text-indigo-300 mt-0.5">
                        Web Developer · BCA 3rd Sem
                      </p>
                    </div>

                    {/* Security Hologram Stamp */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shadow-inner group-hover:rotate-6 transition-transform">
                      <Sparkles className="w-6 h-6 text-indigo-300" />
                    </div>
                  </div>

                  {/* Telemetry Metrics Table */}
                  <div className="space-y-3.5 text-xs font-mono border-y border-white/[0.08] py-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                        University:
                      </span>
                      <span className="text-right text-white font-medium">
                        Chandigarh University
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                        <Cpu className="w-3.5 h-3.5 text-blue-400" />
                        Status:
                      </span>
                      <span className="text-right text-indigo-300 font-medium">
                        BCA — Semester 3 (Active)
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                        <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                        Primary Focus:
                      </span>
                      <span className="text-right text-white font-medium">
                        Modern Web Development
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        Credentials:
                      </span>
                      <span className="text-right text-amber-300 font-medium">
                        NCC &apos;A&apos; &amp; &apos;B&apos; Certificates
                      </span>
                    </div>
                  </div>

                  {/* Career Objective & Engagement Statement */}
                  <div className="text-xs text-slate-300 leading-relaxed p-3.5 rounded-2xl bg-[#080c16]/80 border border-white/[0.08]">
                    <span className="font-bold text-white block mb-1 flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-emerald-400" />
                      Goals &amp; Availability:
                    </span>
                    Open to junior developer roles, internships, and freelance projects where I can apply modern frontend skills and contribute meaningfully to real products.
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