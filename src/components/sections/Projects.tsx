"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useInView } from "@/hooks/useInView";
import { ShieldCheck } from "lucide-react";

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

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
            {/* Left Column: Sticky Case Study Controller & Verification Track (4 cols) */}
            <div className="lg:col-span-4 sticky-scene-panel space-y-6">
              <SectionHeading
                chapter="04 // PROTOTYPES & BUILDS"
                badge="Verified Builds"
                title="Featured Projects &amp; Case Studies"
                description="In-depth breakdowns of real web platforms, highlighting frontend architecture, verified technology stacks, and honest individual contributions without fabricated metrics."
              />

              {/* Case Study Index Selector */}
              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#131926]/80 backdrop-blur-sm space-y-4">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                  Showcase Index
                </span>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">01. MikuMantra</span>
                      <span className="text-[11px] font-mono text-indigo-300">Next.js · MongoDB · E-Commerce</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Live
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-white/[0.08] bg-[#0a0d14]/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">02. PSD2UI</span>
                      <span className="text-[11px] font-mono text-zinc-400">HTML5 · CSS3 · Responsive</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Live
                    </span>
                  </div>
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

            {/* Right Column: Layered Detailed Project Cards (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {projects.map((project, idx) => (
                <div key={project.id} className="relative">
                  {/* Visual Project Number Pill */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                      CASE 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {project.category}
                    </span>
                  </div>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
