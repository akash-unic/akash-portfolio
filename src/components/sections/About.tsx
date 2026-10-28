"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useInView } from "@/hooks/useInView";
import { useTilt } from "@/hooks/useTilt";
import {
  GraduationCap,
  Code2,
  Compass,
  Cpu,
  Target,
  ShieldCheck,
} from "lucide-react";

export const About: React.FC = () => {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const tiltCardRef = useTilt<HTMLDivElement>({ maxTilt: 5, perspective: 1000, scale: 1.01 });

  return (
    <Section
      id="about"
      surface="canvas-base"
      spacing="default"
      className="scroll-mt-20 border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container size="xl">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeading
            badge="About Akash"
            title="Curious Student. Practical Builder."
            description="A developing web developer pursuing a BCA at Chandigarh University, turning foundational computer science principles into responsive, real-world web applications."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Editorial Story (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-[#94a3b8] leading-relaxed text-base sm:text-lg">
              <p>
                I am currently in <strong className="text-[#f8fafc] font-semibold">Semester 3 of my Bachelor of Computer Applications (BCA)</strong> at <strong className="text-[#f8fafc] font-semibold">Chandigarh University</strong>. Alongside my academic coursework, I dedicate my time to hands-on web development, exploring modern frontend tools and translating visual designs into clean, functional code.
              </p>

              <p>
                My development journey is centered on <strong className="text-zinc-200 font-medium">practical implementation and continuous learning</strong>. Rather than getting stuck in tutorial loops, I learn by building—constructing live projects, solving component layout hurdles, and optimizing user interactions across different screen sizes.
              </p>

              <p>
                Whether engineering dynamic UI components in <strong className="text-indigo-300 font-mono text-sm">React</strong> and <strong className="text-indigo-300 font-mono text-sm">Next.js</strong>, crafting utility-first styles with <strong className="text-blue-300 font-mono text-sm">Tailwind CSS</strong>, or configuring content on <strong className="text-zinc-200 font-mono text-sm">WordPress</strong>, I focus on clean structure, readable code, and honest problem-solving.
              </p>

              {/* Core Values / Work Ethic */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#131926]/60 transition-all duration-300 hover:border-indigo-500/30 hover:bg-[#182032] motion-safe:hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-950/20">
                  <Target className="w-5 h-5 text-indigo-400 mb-2" />
                  <h4 className="text-sm font-semibold text-[#f8fafc]">Implementation First</h4>
                  <p className="text-xs text-[#94a3b8] mt-1">Applying concepts directly to production-deployed projects.</p>
                </div>

                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#131926]/60 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#182032] motion-safe:hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950/20">
                  <Compass className="w-5 h-5 text-blue-400 mb-2" />
                  <h4 className="text-sm font-semibold text-[#f8fafc]">Active Growth</h4>
                  <p className="text-xs text-[#94a3b8] mt-1">Continuously refining frontend patterns and technical depth.</p>
                </div>

                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#131926]/60 transition-all duration-300 hover:border-emerald-500/30 hover:bg-[#182032] motion-safe:hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/20">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                  <h4 className="text-sm font-semibold text-[#f8fafc]">Structured Rigor</h4>
                  <p className="text-xs text-[#94a3b8] mt-1">Disciplined routine honed through military cadet training.</p>
                </div>
              </div>
            </div>

            {/* Structured Quick-Facts Card (5 cols) with 3D Tilt */}
            <div className="lg:col-span-5" ref={tiltCardRef}>
              <Card surface="elevated" className="space-y-6 border-white/[0.1] shadow-2xl transition-all duration-300 hover:border-indigo-500/40">
                <div>
                  <Badge variant="accent" size="sm" dot>
                    Developer Profile
                  </Badge>
                  <h3 className="text-xl font-bold text-[#f8fafc] mt-2 tracking-tight">
                    Akash Kumar
                  </h3>
                  <p className="text-xs font-mono text-[#94a3b8] mt-0.5">
                    Web Developer · BCA Student
                  </p>
                </div>

                <div className="space-y-4 text-xs font-mono border-y border-white/[0.08] py-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#94a3b8] flex items-center gap-1.5 shrink-0">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      University:
                    </span>
                    <span className="text-right text-[#f8fafc] font-medium">
                      Chandigarh University
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#94a3b8] flex items-center gap-1.5 shrink-0">
                      <Cpu className="w-3.5 h-3.5 text-blue-400" />
                      Semester:
                    </span>
                    <span className="text-right text-indigo-300 font-medium">
                      BCA — Semester 3
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#94a3b8] flex items-center gap-1.5 shrink-0">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      Primary Focus:
                    </span>
                    <span className="text-right text-[#f8fafc] font-medium">
                      Modern Frontend Development
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#94a3b8] flex items-center gap-1.5 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      Credentials:
                    </span>
                    <span className="text-right text-amber-300 font-medium">
                      NCC &apos;A&apos; &amp; &apos;B&apos; Certificates
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#94a3b8] leading-relaxed">
                  <span className="font-semibold text-zinc-300 block mb-1">
                    Goals &amp; Availability:
                  </span>
                  Seeking junior developer roles, internships, and freelance projects where I can contribute to real web products and learn alongside experienced teams.
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
