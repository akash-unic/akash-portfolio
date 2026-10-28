import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  surface?: "canvas-base" | "canvas-subtle" | "contrast-light";
  spacing?: "default" | "compact" | "spacious";
  className?: string;
  children: React.ReactNode;
}

const surfaceClasses = {
  "canvas-base": "bg-[#0a0d14] text-[#f8fafc]",
  "canvas-subtle": "bg-[#0f1420] text-[#f8fafc] border-y border-white/[0.06]",
  "contrast-light": "bg-[#f8fafc] text-[#0f172a] shadow-inner",
};

const spacingClasses = {
  compact: "py-10 sm:py-14",
  default: "py-16 sm:py-24",
  spacious: "py-20 sm:py-32",
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
        "relative w-full transition-colors",
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
