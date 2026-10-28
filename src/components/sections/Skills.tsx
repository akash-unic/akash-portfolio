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
      className="scroll-mt-20 border-b border-white/[0.06] relative overflow-hidden"
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
          <SectionHeading
            badge="Technical Skills"
            title="Tools &amp; Capabilities"
            description="Technologies and workflow tools I actively utilize for building websites, managing content, and handling structured documents. Honest representations without fake percentage bars."
          />

          {/* 5-Category Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={category.id}
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
                className={`rounded-2xl border border-white/[0.08] bg-[#131926]/90 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#182032] motion-safe:hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/20 flex flex-col justify-between group ${
                  category.id === "frontend" ? "md:col-span-2 lg:col-span-2" : ""
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

                  <p className="text-xs sm:text-sm text-[#94a3b8] mb-6 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Tag Badges */}
                <ul className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
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
      </Container>
    </Section>
  );
};
