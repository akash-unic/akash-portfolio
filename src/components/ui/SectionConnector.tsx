import React from "react";
import { cn } from "@/lib/utils";

export interface SectionConnectorProps {
  step: string;
  label: string;
  className?: string;
}

export const SectionConnector: React.FC<SectionConnectorProps> = ({
  step,
  label,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center py-6 sm:py-8 pointer-events-none select-none overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Top glowing line segment */}
      <div className="w-[1.5px] h-8 sm:h-12 bg-gradient-to-b from-transparent via-indigo-500/40 to-indigo-500/80 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />

      {/* Chapter Beacon Node */}
      <div className="relative my-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-[#0d121c]/90 text-[10px] sm:text-xs font-mono font-medium text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.2)] backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" />
        <span className="font-bold tracking-wider">{step}</span>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400 tracking-wider uppercase">{label}</span>
      </div>

      {/* Bottom glowing line segment */}
      <div className="w-[1.5px] h-8 sm:h-12 bg-gradient-to-b from-indigo-500/80 via-indigo-500/40 to-transparent shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
    </div>
  );
};
