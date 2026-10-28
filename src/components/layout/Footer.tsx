"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import { Mail, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { profile, navigation, socials } = portfolioData;
  const currentYear = 2026;

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <GitHubIcon className="w-4 h-4" />;
      case "linkedin":
        return <LinkedInIcon className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#080b11] text-[#94a3b8] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Grid: Brand & Useful Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl"
              aria-label="Akash Kumar - Return to Top"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-950/40 group-hover:scale-105 transition-transform duration-150">
                <span className="tracking-tighter font-mono text-xs">AK</span>
              </div>
              <span className="font-bold text-base text-[#f8fafc] tracking-tight group-hover:text-indigo-300 transition-colors">
                {profile.name}
              </span>
            </Link>

            <p className="text-sm text-[#94a3b8] max-w-sm leading-relaxed">
              Web developer and BCA student at Chandigarh University building responsive, high-performance web applications through hands-on implementation.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for internships, roles &amp; freelance</span>
            </div>
          </div>

          {/* Quick Section Navigation Links (4 cols) */}
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3 font-semibold">
              Navigation
            </span>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#94a3b8] hover:text-[#f8fafc] hover:underline underline-offset-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1 -mx-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social Profiles (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3 font-semibold">
              Connect
            </span>
            <div className="flex flex-col gap-2">
              {socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/[0.08] bg-[#131926]/70 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/[0.18] hover:bg-[#182032] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  aria-label={`Open Akash Kumar's ${social.platform} profile`}
                >
                  {getSocialIcon(social.platform)}
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Closing Line, and Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>
              © {currentYear} {profile.name}. All rights reserved.
            </p>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <p className="text-zinc-500">
              Built with Next.js 16, React 19 &amp; Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-zinc-500 hidden md:inline">
              Crafted with engineering clarity
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-[#131926]/60 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
