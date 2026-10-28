import React from "react";
import { cn } from "@/lib/utils";

export type CardSurface = "default" | "elevated" | "contrast-light";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

const surfaceClasses: Record<CardSurface, string> = {
  default: "bg-[#131926]/90 text-zinc-100 border-white/[0.08]",
  elevated: "bg-[#182032] text-zinc-100 border-white/[0.14] shadow-xl shadow-black/40",
  "contrast-light":
    "bg-[#f8fafc] text-[#0f172a] border-slate-200/90 shadow-lg shadow-black/5",
};

export const Card: React.FC<CardProps> = ({
  surface = "default",
  interactive = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8 transition-all duration-200",
        surfaceClasses[surface],
        interactive &&
          "hover:border-indigo-500/40 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-950/20 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("mb-4 flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cn("text-xl font-bold tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, children, ...props }) => {
  return (
    <p
      className={cn("text-sm text-zinc-400 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return <div className={cn("space-y-4", className)} {...props}>{children}</div>;
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("mt-6 pt-6 border-t border-white/[0.08] flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
};
