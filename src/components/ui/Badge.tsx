import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "contrast";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  accent: "bg-indigo-500/15 text-indigo-200 border-indigo-400/30 backdrop-blur-md shadow-[0_0_12px_rgba(99,102,241,0.2)]",
  neutral: "bg-white/[0.06] text-zinc-200 border-white/[0.14] backdrop-blur-md",
  success: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.2)]",
  warning: "bg-amber-500/15 text-amber-300 border-amber-400/30 backdrop-blur-md shadow-[0_0_12px_rgba(245,158,11,0.2)]",
  contrast: "bg-slate-200/90 text-slate-900 border-slate-300 backdrop-blur-md",
};

const dotClasses: Record<BadgeVariant, string> = {
  accent: "bg-indigo-400",
  neutral: "bg-zinc-400",
  success: "bg-emerald-400 animate-pulse",
  warning: "bg-amber-400",
  contrast: "bg-slate-700",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "accent",
  size = "sm",
  dot = false,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-medium rounded-full border transition-colors select-none",
        size === "sm"
          ? "px-2.5 py-0.5 text-[11px] gap-1.5"
          : "px-3 py-1 text-xs gap-2",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotClasses[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
