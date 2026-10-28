import React from "react";
import { SkillCategory } from "@/types/portfolio";
import { CheckCircle2 } from "lucide-react";

export interface SkillCardProps {
  category: SkillCategory;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ category, className }) => {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#131926]/90 p-6 sm:p-7 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.16] hover:bg-[#182032] ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-bold text-white tracking-tight">{category.title}</h3>
      </div>
      <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
        {category.description}
      </p>

      <ul className="flex flex-wrap gap-2.5">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-white/[0.04] text-zinc-200 border border-white/[0.08] shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
