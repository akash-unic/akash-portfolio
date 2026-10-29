import React from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { SectionConnector } from "@/components/ui/SectionConnector";
import { SceneTracker } from "@/components/ui/SceneTracker";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* 3D Scene HUD Waypoint Tracker (Desktop) */}
      <SceneTracker />

      {/* 1. The Awakening & Origin (#home) */}
      <Hero />

      {/* Narrative Transition: 01 -> 02 */}
      <SectionConnector step="02" label="The Developer &amp; Ethos" />

      {/* 2. The Developer (#about) */}
      <About />

      {/* Narrative Transition: 02 -> 03 */}
      <SectionConnector step="03" label="The Skill Constellation" />

      {/* 3. The Skill Constellation (#skills) */}
      <Skills />

      {/* Narrative Transition: 03 -> 04 */}
      <SectionConnector step="04" label="The Project Gallery" />

      {/* 4. The Project Gallery (#projects) */}
      <Projects />

      {/* Narrative Transition: 04 -> 05 */}
      <SectionConnector step="05" label="Academic &amp; Cadet Rigor" />

      {/* 5. Credentials (#education) */}
      <Education />

      {/* Narrative Transition: 05 -> 06 */}
      <SectionConnector step="06" label="The Final Connection" />

      {/* 6. The Final Connection (#contact) */}
      <Contact />
    </div>
  );
}