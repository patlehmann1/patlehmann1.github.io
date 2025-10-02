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
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main className="pt-16 sm:pt-20">
        <SectionErrorBoundary sectionName="Hero">
          <Hero />
        </SectionErrorBoundary>
        <div className="section-divider-gradient" />
        <SectionErrorBoundary sectionName="About">
          <About />
        </SectionErrorBoundary>
        <div className="section-divider" />
        <SectionErrorBoundary sectionName="Experience">
          <Experience />
        </SectionErrorBoundary>
        <div className="section-divider" />
        <SectionErrorBoundary sectionName="Skills">
          <SkillsEnhanced />
        </SectionErrorBoundary>
        <div className="section-divider-gradient" />
        <SectionErrorBoundary sectionName="Projects">
          <Projects />
        </SectionErrorBoundary>
        <div className="section-divider" />
        <SectionErrorBoundary sectionName="Blog">
          <Blog />
        </SectionErrorBoundary>
        <div className="section-divider-gradient" />
        <SectionErrorBoundary sectionName="Contact">
          <Contact />
        </SectionErrorBoundary>
      </main>
      <ScrollToTop />
    </>
  );
}
