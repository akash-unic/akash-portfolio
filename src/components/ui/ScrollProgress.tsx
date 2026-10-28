"use client";

import React from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
