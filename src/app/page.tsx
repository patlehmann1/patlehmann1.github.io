import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { SkillsEnhanced } from "@/components/sections/skills-enhanced";
import { Projects } from "@/components/sections/projects";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pt-16 sm:pt-20">
        <Hero />
        <About />
        <Experience />
        <SkillsEnhanced />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}
