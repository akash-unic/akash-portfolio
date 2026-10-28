import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  label,
  className,
  ...props
}) => {
  if (!label) {
    return (
      <hr
        className={cn("w-full border-t border-white/[0.08] my-8", className)}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn("relative flex items-center justify-center my-8 w-full", className)}
      {...props}
    >
      <div className="grow border-t border-white/[0.08]" />
      <span className="shrink-0 px-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-[#0a0d14]">
        {label}
      </span>
      <div className="grow border-t border-white/[0.08]" />
    </div>
  );
};
