import React from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero (#home) */}
      <Hero />

      {/* 2. About (#about) */}
      <About />

      {/* 3. Skills (#skills) */}
      <Skills />

      {/* 4. Projects (#projects) */}
      <Projects />

      {/* 5. Education & Achievements (#education) */}
      <Education />

      {/* 6. Contact (#contact) */}
      <Contact />
    </div>
  );
}
