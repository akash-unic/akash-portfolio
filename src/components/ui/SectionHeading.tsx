import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface SectionHeadingProps {
  badge?: string;
  chapter?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onContrast?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  chapter,
  title,
  description,
  align = "left",
  onContrast = false,
  className,
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-10 sm:mb-14",
        isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      <div className={cn("mb-3.5 flex flex-wrap items-center gap-2.5", isCenter && "justify-center")}>
        {chapter && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-indigo-200 bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_6px_#818cf8]" />
            {chapter}
          </span>
        )}
        {badge && (
          <Badge
            variant={onContrast ? "contrast" : "accent"}
            size="md"
            dot
          >
            {badge}
          </Badge>
        )}
      </div>

      <div className="text-mask-reveal">
        <h2
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight",
            onContrast
              ? "text-slate-900"
              : "text-gradient-metallic drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          )}
        >
          {title}
        </h2>
      </div>

      {description && (
        <p
          className={cn(
            "mt-3 text-sm sm:text-base leading-relaxed font-normal",
            onContrast ? "text-slate-600" : "text-slate-300"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
