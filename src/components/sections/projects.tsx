"use client";

import { motion } from "framer-motion";
import { GitHubIcon } from "@/components/ui/icons/github-icon";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  href: string;
}

const projects: Project[] = [
  {
    title: "fl-launches",
    description: "A terminal app that shows the next rocket launches from Cape Canaveral. It pulls from the Launch Library 2 API and installs with Homebrew.",
    technologies: ["Go", "Launch Library 2", "Homebrew"],
    href: "https://github.com/patlehmann1/space_coast_fl_launches",
  },
  {
    title: "daily-verse",
    description: "Prints a Bible verse in your terminal, either random or the same one all day. You can filter by book or testament, and the verses ship inside a single binary.",
    technologies: ["Go", "Homebrew"],
    href: "https://github.com/patlehmann1/daily-verse",
  },
  {
    title: "This Site",
    description: "My portfolio and blog. It has six themes, articles you can listen to, and a chiptune soundtrack you can turn on from the header.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Jest"],
    href: "https://github.com/patlehmann1/patlehmann1.github.io",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-heading text-shadow-sm mb-4">Side Projects</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
            Things I build on my own time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 pixel-box pixel-box-raised project-card flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-body text-muted-foreground mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary text-caption rounded-full font-medium tech-badge"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" className="self-start" asChild>
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
