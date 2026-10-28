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
    "bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm shadow-indigo-950/40 border border-indigo-400/30 motion-safe:active:scale-[0.98]",
  secondary:
    "bg-[#131926] text-zinc-100 hover:bg-[#192233] border border-white/[0.12] hover:border-white/[0.2] motion-safe:active:scale-[0.98]",
  outline:
    "bg-transparent text-zinc-200 border border-white/[0.16] hover:bg-white/[0.05] hover:border-white/[0.3] motion-safe:active:scale-[0.98]",
  ghost:
    "bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.06] motion-safe:active:scale-[0.98]",
  contrast:
    "bg-[#0f172a] text-white hover:bg-slate-800 shadow-sm border border-slate-900 motion-safe:active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5 min-h-[40px] sm:min-h-[36px]",
  md: "px-4.5 py-2.5 text-sm font-medium rounded-xl gap-2 min-h-[44px]",
  lg: "px-6 py-3.5 text-base font-semibold rounded-xl gap-2.5 min-h-[48px]",
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
