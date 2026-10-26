import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { SITE_CONFIG, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/headshot.jpg`,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "GovernmentOrganization",
    name: "US Office of Personnel Management",
  },
  knowsAbout: ["C#", ".NET", "TypeScript", "React", "Angular", "Node.js"],
  sameAs: [SITE_CONFIG.social.github, SITE_CONFIG.social.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
          <Skills />
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
