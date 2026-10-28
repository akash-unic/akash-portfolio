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
  accent: "bg-indigo-500/10 text-indigo-300 border-indigo-500/25",
  neutral: "bg-white/[0.05] text-zinc-300 border-white/[0.1]",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  contrast: "bg-slate-200/80 text-slate-800 border-slate-300/80",
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
