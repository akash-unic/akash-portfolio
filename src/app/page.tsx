import React from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { SectionConnector } from "@/components/ui/SectionConnector";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* 1. Origin & Overview (#home) */}
      <Hero />

      {/* Narrative Transition: 01 -> 02 */}
      <SectionConnector step="02" label="Trajectory &amp; Ethos" />

      {/* 2. Trajectory (#about) */}
      <About />

      {/* Narrative Transition: 02 -> 03 */}
      <SectionConnector step="03" label="Capabilities &amp; Stack" />

      {/* 3. Capabilities (#skills) */}
      <Skills />

      {/* Narrative Transition: 03 -> 04 */}
      <SectionConnector step="04" label="Prototypes &amp; Builds" />

      {/* 4. Verified Builds (#projects) */}
      <Projects />

      {/* Narrative Transition: 04 -> 05 */}
      <SectionConnector step="05" label="Academic &amp; Cadet Rigor" />

      {/* 5. Credentials (#education) */}
      <Education />

      {/* Narrative Transition: 05 -> 06 */}
      <SectionConnector step="06" label="Direct Engagement" />

      {/* 6. Direct Engagement (#contact) */}
      <Contact />
    </div>
  );
}
