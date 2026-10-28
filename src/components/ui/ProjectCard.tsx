"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DetailedProject } from "@/types/portfolio";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import { useTilt } from "@/hooks/useTilt";
import { useMagnetic } from "@/hooks/useMagnetic";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import {
  ExternalLink,
  Globe,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Code2,
  Layers,
  Wrench,
  ShieldAlert,
} from "lucide-react";

export interface ProjectCardProps {
  project: DetailedProject;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const { caseStudy } = project;

  // 3D card tilt hook
  const tiltCardRef = useTilt<HTMLElement>({ maxTilt: 4, perspective: 1100, scale: 1.01 });

  // Pointer-reactive gradient glow hook
  const glowRef = usePointerGlow<HTMLElement>({ glowSize: 450, glowColor: "rgba(99, 102, 241, 0.14)" });

  // Combined ref callback
  const handleRef = (node: HTMLElement | null) => {
    tiltCardRef.current = node;
    glowRef.current = node;
  };

  // Magnetic button hook for primary live demo button
  const magneticBtnRef = useMagnetic<HTMLDivElement>({ strength: 0.22, maxDistance: 14 });

  // Real project image and logo assets from verified local checkouts
  const projectImageSrc =
    project.id === "mikumantra"
      ? "/images/projects/mikumantra-banner.png"
      : "/images/projects/psd2ui-preview.jpg";

  const projectLogoSrc =
    project.id === "mikumantra"
      ? "/images/projects/mikumantra-logo.svg"
      : "/images/projects/psd2ui-logo.png";

  return (
    <article
      ref={handleRef}
      className={`group relative rounded-2xl border border-white/[0.08] bg-[#131926]/90 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/30 flex flex-col justify-between ${
        className || ""
      }`}
    >
      {/* Pointer-Reactive Ambient Gradient Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background:
            "radial-gradient(var(--glow-size, 450px) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color, rgba(99, 102, 241, 0.14)), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Browser Chrome Header Mockup */}
        <div className="border-b border-white/[0.08] bg-[#0a0d14] p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Verified Project Logo Icon */}
              <div className="relative w-5 h-5 rounded overflow-hidden bg-white/5 p-0.5 border border-white/10 hidden sm:block">
                <Image
                  src={projectLogoSrc}
                  alt={`${project.title} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="px-3 py-1 rounded-md bg-[#131926] border border-white/[0.06] text-[11px] font-mono text-zinc-300 truncate max-w-[180px] sm:max-w-xs flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="truncate">{project.liveUrl}</span>
            </div>

            <Badge variant="accent" size="sm">
              {project.category}
            </Badge>
          </div>

          {/* Authentic Project Image Showcase with Elegant Reveal & Zoom */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#101623] border border-white/[0.06]">
            <Image
              src={projectImageSrc}
              alt={`${project.title} live interface preview`}
              fill
              priority={project.id === "mikumantra"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Subtle Gradient Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14]/90 via-[#0a0d14]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

            {/* Floating Live Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium rounded-full bg-[#0a0d14]/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Production Live</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="accent" size="sm">
              {project.contributionBadge}
            </Badge>
            {project.alternateUrl && (
              <Badge variant="neutral" size="sm">
                Includes Vercel Mirror
              </Badge>
            )}
          </div>

          <h3 className="text-2xl font-bold text-[#f8fafc] tracking-tight group-hover:text-indigo-300 transition-colors">
            {project.title}
          </h3>

          <p className="mt-1 text-sm font-medium text-zinc-300">
            {project.tagline}
          </p>

          <p className="mt-3 text-sm text-[#94a3b8] leading-relaxed">
            {project.summary}
          </p>

          {/* Verified Tech Stack */}
          <div className="mt-5">
            <span className="text-[11px] font-mono uppercase text-zinc-400 block mb-2 font-semibold">
              Verified Technologies:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.verifiedTechStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-zinc-200 border border-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions & Case Study Toggle */}
      <div className="px-6 pb-6 sm:px-7 sm:pb-7">
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-2.5">
          <div ref={magneticBtnRef}>
            <Button
              variant="primary"
              size="sm"
              href={project.liveUrl}
              isExternal
              className="font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Button>
          </div>

          {project.alternateUrl && (
            <Button
              variant="outline"
              size="sm"
              href={project.alternateUrl}
              isExternal
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Vercel Demo</span>
            </Button>
          )}

          {project.repositoryUrl && (
            <Button
              variant="secondary"
              size="sm"
              href={project.repositoryUrl}
              isExternal
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>Repository</span>
            </Button>
          )}

          <button
            type="button"
            onClick={() => setShowCaseStudy(!showCaseStudy)}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-expanded={showCaseStudy}
            aria-controls={`case-study-${project.id}`}
          >
            <span>{showCaseStudy ? "Hide Details" : "Case Study"}</span>
            {showCaseStudy ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Collapsible Detailed Case Study Drawer */}
        {showCaseStudy && (
          <div
            id={`case-study-${project.id}`}
            className="mt-6 pt-6 border-t border-white/[0.08] space-y-6 text-left animate-in fade-in duration-200"
          >
            {/* 1. Project Overview */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-indigo-400 font-semibold mb-1">
                <Code2 className="w-3.5 h-3.5" />
                <span>1. Project Overview</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {caseStudy.overview}
              </p>
            </div>

            {/* 2. Problem or Goal */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-blue-400 font-semibold mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>2. Problem &amp; Objective</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {caseStudy.problemOrGoal}
              </p>
            </div>

            {/* 3. My Actual Contribution */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>3. My Actual Contribution</span>
              </div>
              <ul className="space-y-1.5">
                {caseStudy.myContribution.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Implementation Approach */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-indigo-300 font-semibold mb-2">
                <Wrench className="w-3.5 h-3.5" />
                <span>4. Implementation Approach</span>
              </div>
              <ul className="space-y-1.5">
                {caseStudy.implementationApproach.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Key Challenges & Solutions */}
            {caseStudy.challengesAndSolutions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-semibold mb-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>5. Key Challenges &amp; Technical Solutions</span>
                </div>
                <div className="space-y-3">
                  {caseStudy.challengesAndSolutions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0a0d14]/70 space-y-1.5"
                    >
                      <div className="text-xs font-semibold text-rose-300">
                        <span className="text-zinc-500">Challenge: </span>
                        {item.challenge}
                      </div>
                      <div className="text-xs text-emerald-300">
                        <span className="text-zinc-500">Solution: </span>
                        {item.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Transparency Notes (Information to confirm / privacy) */}
            {caseStudy.toConfirmNotes && caseStudy.toConfirmNotes.length > 0 && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-2 text-xs text-zinc-400">
                <ShieldAlert className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-zinc-300 block">
                    Authenticity &amp; Privacy Note:
                  </span>
                  {caseStudy.toConfirmNotes.map((note, idx) => (
                    <p key={idx} className="text-[11px] leading-relaxed">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
