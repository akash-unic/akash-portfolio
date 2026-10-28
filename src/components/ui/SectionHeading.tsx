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
      <div className={cn("mb-3.5 flex items-center gap-2.5", isCenter && "justify-center")}>
        {chapter && (
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
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
            "text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight",
            onContrast ? "text-slate-900" : "text-white"
          )}
        >
          {title}
        </h2>
      </div>

      {description && (
        <p
          className={cn(
            "mt-3 text-sm sm:text-base leading-relaxed",
            onContrast ? "text-slate-600" : "text-zinc-400"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
