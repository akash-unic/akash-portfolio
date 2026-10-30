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
        "relative w-full flex flex-col items-center justify-center py-10 sm:py-14 lg:py-16 pointer-events-none select-none overflow-hidden isolate",
        className
      )}
      aria-hidden="true"
    >
      {/* Top glowing laser line segment */}
      <div className="w-[1.5px] h-10 sm:h-14 bg-gradient-to-b from-transparent via-indigo-500/50 to-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]" />

      {/* Chapter Waypoint Node */}
      <div className="relative my-2 inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-indigo-500/40 bg-[#0d121c]/95 text-[10px] sm:text-xs font-mono font-medium text-indigo-300 shadow-[0_0_24px_rgba(99,102,241,0.25)] backdrop-blur-xl max-w-[92vw]">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8] animate-pulse shrink-0" />
        <span className="font-bold tracking-wider text-white shrink-0">SCENE {step}</span>
        <span className="text-zinc-600 shrink-0">/</span>
        <span className="text-zinc-400 tracking-wider uppercase truncate">{label}</span>
      </div>

      {/* Bottom glowing laser line segment */}
      <div className="w-[1.5px] h-10 sm:h-14 bg-gradient-to-b from-indigo-500 via-indigo-500/50 to-transparent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
    </div>
  );
};