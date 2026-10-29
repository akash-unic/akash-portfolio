import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  surface?: "canvas-base" | "canvas-subtle" | "contrast-light";
  spacing?: "default" | "compact" | "spacious";
  className?: string;
  children: React.ReactNode;
}

const surfaceClasses = {
  "canvas-base": "bg-transparent text-[#f8fafc]",
  "canvas-subtle": "bg-gradient-to-b from-white/[0.02] via-[#0d121d]/40 to-transparent text-[#f8fafc] border-y border-white/[0.08] backdrop-blur-[2px]",
  "contrast-light": "bg-white/[0.06] backdrop-blur-xl text-[#f8fafc] border-y border-white/[0.15]",
};

const spacingClasses = {
  compact: "py-12 sm:py-16",
  default: "py-16 sm:py-24 lg:py-28",
  spacious: "py-24 sm:py-32 lg:py-40",
};

export const Section: React.FC<SectionProps> = ({
  surface = "canvas-base",
  spacing = "default",
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn(
        "relative w-full transition-colors isolate",
        surfaceClasses[surface],
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
