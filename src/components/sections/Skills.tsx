"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";
import { useTilt } from "@/hooks/useTilt";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import {
  Code,
  Sparkles,
  Database,
  FileSpreadsheet,
  Keyboard,
  Check,
  Layers,
  ShieldCheck,
} from "lucide-react";

// Individual 3D Dimensional Skill Card Component
interface SkillCategoryCardProps {
  category: {
    id: string;
    title: string;
    description: string;
    skills: string[];
  };
  index: number;
}

const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category, index }) => {
  const tiltRef = useTilt<HTMLDivElement>({ maxTilt: 5, perspective: 1000, scale: 1.02 });
  const glowRef = usePointerGlow<HTMLDivElement>({
    glowSize: 380,
    glowColor: "rgba(99, 102, 241, 0.16)",
  });

  const handleRef = (node: HTMLDivElement | null) => {
    tiltRef.current = node;
    glowRef.current = node;
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "frontend":
        return <Code className="w-5 h-5 text-indigo-400" />;
      case "modern-web":
        return <Sparkles className="w-5 h-5 text-sky-400" />;
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
    <div
      ref={handleRef}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`card-glass-specular relative rounded-3xl border border-white/[0.12] p-6 sm:p-7 transition-all duration-300 hover:border-indigo-400/60 hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col justify-between group overflow-hidden ${
        category.id === "frontend" ? "sm:col-span-2 border-indigo-500/40" : ""
      }`}
    >
      {/* Specular Bevel Line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-indigo-400/60 transition-all duration-300"
        aria-hidden="true"
      />

      {/* Pointer Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background:
            "radial-gradient(var(--glow-size, 380px) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color, rgba(99, 102, 241, 0.16)), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/[0.1] group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-colors shadow-inner">
            {getCategoryIcon(category.id)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
              {category.title}
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              {category.skills.length} Verified {category.skills.length === 1 ? "Tool" : "Tools"}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed font-normal">
          {category.description}
        </p>
      </div>

      {/* Skill Pills */}
      <div className="relative z-10 pt-4 border-t border-white/[0.08]">
        <ul className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <li
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-[#131b2e]/85 text-slate-200 border border-white/[0.12] shadow-sm hover:border-indigo-400/50 hover:text-white hover:bg-[#18243e] transition-all duration-150"
            >
              <Check className="w-3 h-3 text-indigo-400 shrink-0" aria-hidden="true" />
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const { skillCategories } = portfolioData;
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.02,
    rootMargin: "100px 0px 50px 0px",
  });
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredCategories =
    selectedFilter === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedFilter);

  return (
    <Section
      id="skills"
      surface="canvas-subtle"
      spacing="spacious"
      className="scroll-mt-20 border-b border-white/[0.08] relative min-h-[85vh] flex flex-col justify-center"
    >
      {/* Ambient Lighting Cones (Contained overflow prevents horizontal scroll without clipping section content) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/[0.05] blur-3xl"
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
            {/* Left Column: Sticky Narrative & Core Philosophy (4 cols) */}
            <div className="lg:col-span-4 sticky-scene-panel space-y-6">
              <SectionHeading
                chapter="03 // THE SKILL CONSTELLATION"
                badge="Dimensional Architecture"
                title="Capabilities &amp; Tech Constellation"
                description="An interconnected constellation of modern frontend tools, reactive libraries, and data engines actively utilized in verified production builds. Authentic skills without fabricated percentage meters."
              />

              {/* Scope & Philosophy Callout Card */}
              <div className="card-glass-specular p-6 rounded-3xl border border-white/[0.12] space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Core Philosophy
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Every listed skill reflects genuine implementation in verified repository commits, production storefronts, or academic coursework—not tutorial skimming or arbitrary progress meters.
                </p>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    5 Structured Groups
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    11 Verified Tools
                  </span>
                </div>
              </div>

              {/* Category Filter Switcher */}
              <div className="card-glass-specular p-2.5 rounded-2xl border border-white/[0.12] space-y-1.5 shadow-lg">
                <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider px-3 pt-1 block">
                  Category Filter
                </span>
                <div className="flex overflow-x-auto sm:overflow-visible sm:flex-wrap gap-1.5 pb-1 sm:pb-0 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setSelectedFilter("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                      selectedFilter === "all"
                        ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-950/80"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    All Groups
                  </button>

                  {skillCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                        selectedFilter === cat.id
                          ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-950/80"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3D Dimensional Capability Cards (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 min-h-[460px] lg:min-h-[540px] items-start">
              {filteredCategories.map((category, index) => (
                <SkillCategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};