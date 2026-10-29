import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "contrast";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "relative bg-gradient-to-b from-indigo-500 to-indigo-600 text-white hover:from-indigo-400 hover:to-indigo-500 shadow-xl shadow-indigo-950/60 border border-indigo-300/40 hover:border-indigo-200 hover:shadow-[0_0_28px_rgba(99,102,241,0.45)] motion-safe:active:scale-[0.98] transition-all duration-200",
  secondary:
    "relative bg-[#0e1424]/90 text-zinc-100 hover:bg-[#151f36] border border-white/[0.14] hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] backdrop-blur-xl motion-safe:active:scale-[0.98] transition-all duration-200",
  outline:
    "relative bg-transparent text-zinc-200 border border-white/[0.2] hover:bg-white/[0.08] hover:border-indigo-400/50 motion-safe:active:scale-[0.98] backdrop-blur-md transition-all duration-200",
  ghost:
    "bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.08] motion-safe:active:scale-[0.98] transition-all duration-200",
  contrast:
    "bg-white text-slate-950 hover:bg-slate-100 shadow-md font-semibold border border-white/60 motion-safe:active:scale-[0.98] transition-all duration-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs font-medium rounded-xl gap-1.5 min-h-[40px] sm:min-h-[36px]",
  md: "px-5 py-2.5 text-sm font-semibold rounded-xl gap-2 min-h-[44px]",
  lg: "px-6 py-3.5 text-base font-bold rounded-xl gap-2.5 min-h-[48px]",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-sans tracking-tight transition-all duration-150 select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href && !disabled) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
