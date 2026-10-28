"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useInView } from "@/hooks/useInView";
import { useTilt } from "@/hooks/useTilt";
import {
  BookOpen,
  CheckCircle2,
  Shield,
  Medal,
} from "lucide-react";

export const Education: React.FC = () => {
  const { education, achievements } = portfolioData;
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const bcaTiltRef = useTilt<HTMLDivElement>({ maxTilt: 4, perspective: 1100, scale: 1.01 });
  const nccTiltRef = useTilt<HTMLDivElement>({ maxTilt: 4, perspective: 1100, scale: 1.01 });

  return (
    <Section
      id="education"
      surface="canvas-base"
      spacing="default"
      className="scroll-mt-20 border-b border-white/[0.06] relative overflow-clip"
    >
      {/* Subtle ambient accent */}
      <div
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-600/[0.03] blur-3xl"
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
            {/* Left Column: Sticky Narrative & Discipline Track (4 cols) */}
            <div className="lg:col-span-4 sticky-scene-panel space-y-6">
              <SectionHeading
                chapter="05 // CREDENTIALS"
                badge="Academic &amp; Cadet Rigor"
                title="Education &amp; NCC Achievements"
                description="Academic foundation in computer applications paired with certified military cadet training in the National Cadet Corps."
              />

              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#131926]/80 backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Discipline &amp; Focus
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Cadet training instills operational punctuality, accountability under pressure, and squad communication that directly reinforces engineering reliability.
                </p>
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Chandigarh Univ.</span>
                  <span>NCC Certified</span>
                </div>
              </div>
            </div>

            {/* Right Column: Academic Track & NCC Credentials (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Higher Degree: BCA */}
              <div ref={bcaTiltRef}>
                <Card surface="elevated" className="relative overflow-hidden border-indigo-500/30 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-950/20">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <Badge variant="accent" size="sm" dot>
                      Higher Education
                    </Badge>
                    <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      Semester 3 (Active)
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-[#f8fafc]">
                    {education[0].degree}
                  </h4>
                  <p className="text-sm font-semibold text-zinc-300 mt-1">
                    {education[0].institution}
                  </p>

                  <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
                    {education[0].details}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                      CS Fundamentals
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                      Programming Logic
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                      Database Systems
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                      Web Technologies
                    </span>
                  </div>
                </Card>
              </div>

              {/* 12th & 10th Completed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {education.slice(1).map((item) => (
                  <Card key={item.degree} surface="default" className="p-5 transition-all duration-200 hover:border-white/[0.2] hover:bg-[#182032]">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <Badge variant="neutral" size="sm">
                        {item.status}
                      </Badge>
                    </div>

                    <h5 className="text-sm font-bold text-[#f8fafc]">
                      {item.degree}
                    </h5>

                    <p className="mt-2 text-xs text-[#94a3b8] leading-relaxed">
                      {item.details}
                    </p>
                  </Card>
                ))}
              </div>

              {/* NCC Military Cadet Achievements */}
              <div ref={nccTiltRef}>
                <Card surface="default" className="space-y-6 border-amber-500/20 transition-all duration-300 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-950/20">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/25 shrink-0">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#f8fafc]">
                        National Cadet Corps (NCC)
                      </h4>
                      <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                        Military cadet training developing leadership, physical discipline, drill execution, team coordination, and civic duty.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {achievements.map((ach) => (
                      <div
                        key={ach.title}
                        className="p-4 rounded-xl border border-white/[0.08] bg-[#0a0d14]/70 transition-colors hover:border-amber-400/30 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <Medal className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="text-sm font-bold text-[#f8fafc]">
                                {ach.title}
                              </span>
                            </div>
                            <Badge variant="warning" size="sm">
                              Verified
                            </Badge>
                          </div>

                          <span className="text-[11px] font-mono text-amber-400/90 block mb-1">
                            {ach.badge}
                          </span>

                          <p className="text-xs text-[#94a3b8] leading-relaxed">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Demonstrated discipline, operational rigor &amp; punctuality</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
