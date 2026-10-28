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
          <SectionHeading
            badge="Verified Builds"
            title="Featured Projects &amp; Case Studies"
            description="In-depth breakdowns of real web platforms, highlighting frontend architecture, verified technology stacks, and honest individual contributions without fabricated metrics."
          />

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Verification & Transparency Banner */}
          <div className="mt-12 p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#0a0d14]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#94a3b8] backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                All project URLs, deployments, and repositories verified against local Git checkouts.
              </span>
            </div>
            <span className="text-[11px] text-zinc-500">
              MikuMantra Vercel URL verified as alternate cloud deployment.
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
};
