"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";
import {
  Code,
  Sparkles,
  Database,
  FileSpreadsheet,
  Keyboard,
  Check,
} from "lucide-react";

export const Skills: React.FC = () => {
  const { skillCategories } = portfolioData;
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "frontend":
        return <Code className="w-5 h-5 text-indigo-400" />;
      case "modern-web":
        return <Sparkles className="w-5 h-5 text-blue-400" />;
      case "cms-data":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "productivity":
        return <FileSpreadsheet className="w-5 h-5 text-amber-400" />;
      case "additional":
        return <Keyboard className="w-5 h-5 text-violet-400" />;
      default:
        return <Code className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <Section
      id="skills"
      surface="canvas-subtle"
      spacing="default"
      className="scroll-mt-20 border-b border-white/[0.06] relative overflow-clip"
    >
      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-600/[0.04] blur-3xl"
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
            {/* Left Column: Sticky Narrative & Capability Scope (4 cols) */}
            <div className="lg:col-span-4 sticky-scene-panel space-y-6">
              <SectionHeading
                chapter="03 // CAPABILITIES"
                badge="Technical Skills"
                title="Tools &amp; Capabilities"
                description="Technologies and workflow tools I actively utilize for building websites, managing content, and handling structured documents. Honest representations without fake percentage bars."
              />

              {/* Scope & Authenticity Callout */}
              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#131926]/80 backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Core Philosophy
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Every listed skill reflects real-world usage in verified repository commits or academic coursework, not tutorial skimming or animated fake meters.
                </p>
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>5 Structured Groups</span>
                  <span>11 Verified Tools</span>
                </div>
              </div>
            </div>

            {/* Right Column: Staggered Capability Cards (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skillCategories.map((category, index) => (
                <div
                  key={category.id}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                  className={`rounded-2xl border border-white/[0.08] bg-[#131926]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#182032] motion-safe:hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20 flex flex-col justify-between group ${
                    category.id === "frontend" ? "sm:col-span-2 border-indigo-500/20" : ""
                  }`}
                >
                  <div>
                    {/* Header with Icon and Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors">
                        {getCategoryIcon(category.id)}
                      </div>
                      <h3 className="text-lg font-bold text-[#f8fafc] tracking-tight group-hover:text-indigo-300 transition-colors">
                        {category.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#94a3b8] mb-5 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Tag Badges */}
                  <ul className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/[0.04] text-zinc-200 border border-white/[0.08] shadow-sm hover:border-indigo-400/40 hover:text-white hover:bg-white/[0.08] transition-colors"
                      >
                        <Check className="w-3 h-3 text-indigo-400 shrink-0" aria-hidden="true" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
