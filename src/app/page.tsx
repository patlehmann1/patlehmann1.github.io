import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { SkillsEnhanced } from "@/components/sections/skills-enhanced";
import { Projects } from "@/components/sections/projects";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main className="pt-16 sm:pt-20">
        <Hero />
        <div className="section-divider-gradient" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <SkillsEnhanced />
        <div className="section-divider-gradient" />
        <Projects />
        <div className="section-divider" />
        <Blog />
        <div className="section-divider-gradient" />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}
