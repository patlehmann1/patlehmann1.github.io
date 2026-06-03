"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  company: string;
  description: string;
  period: string;
  impact: string;
  technologies: string[];
  highlights: string[];
  link?: string;
}

export function Projects() {
  const projects: Project[] = [
    {
      title: "Enterprise Analytics Integration",
      company: "Global Payments Inc.",
      description: "Full-stack implementation of Pendo Analytics and OneTrust Cookie Consent across a portal serving 22,000+ merchants, integrated via postMessage-based iframe micro-frontend architecture.",
      period: "2025",
      impact: "Analytics and cookie compliance deployed across 22,000+ merchant portal with zero platform downtime",
      technologies: ["Angular", "TypeScript", "C#/.NET", "Pendo", "OneTrust Cookie Consent"],
      highlights: [
        "postMessage iframe micro-frontend integration",
        "Cross-team collaboration and expertise leveraging",
        "First-time-right delivery methodology"
      ]
    },
    {
      title: "E-commerce POS Integration Platform",
      company: "Global Payments Inc.",
      description: "Developed comprehensive features integrating e-commerce systems with point-of-sale solutions, enabling seamless omnichannel retail experiences.",
      period: "2022-2024",
      impact: "Streamlined retail operations for thousands of merchants",
      technologies: ["TypeScript", "Node.js", "Angular", "AWS", "GitHub Actions"],
      highlights: [
        "Backend to full-stack role evolution",
        "CI/CD pipeline optimization",
        "Complex system integration management"
      ]
    },
    {
      title: "Legacy System Modernization",
      company: "Homes.com",
      description: "Contributed to migration from monolithic ColdFusion system to scalable Node.js microservices architecture, improving system performance and maintainability.",
      period: "2019-2021",
      impact: "Reduced system complexity and improved scalability",
      technologies: ["Node.js", "MongoDB", "SQL Server", "Kubernetes"],
      highlights: [
        "Contributed to monolithic-to-microservices migration",
        "Cross-platform technology transition",
        "Database integration and optimization"
      ]
    },
    {
      title: "Lehmann Digital — Multi-Tenant Client Portal",
      company: "Lehmann Digital (Founder)",
      description: "Founder-built SaaS client portal from scratch. Multi-tenancy via shared database with tenant-scoped rows, JWT authentication, REST API in Go/Gin, Next.js frontend.",
      period: "2024–Present",
      impact: "Serves freelance clients with a branded, secure portal — built and deployed entirely by one engineer.",
      technologies: ["Go", "Gin", "PostgreSQL", "Next.js", "Railway", "Vercel", "Cloudflare"],
      highlights: [
        "Multi-tenancy via shared database with tenant-scoped rows",
        "JWT authentication with Go/Gin REST API",
        "Full-stack solo build: Railway backend, Vercel frontend, Cloudflare DNS"
      ],
      link: "https://lehmanndigital.com"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-shadow-sm mb-4">Key Projects</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
            Professional achievements showcasing technical leadership and business impact
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg border shadow-sm project-card group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-caption text-muted-foreground mb-2">
                    <Users className="h-4 w-4" />
                    <span>{project.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-caption text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.period}</span>
                  </div>
                </div>
              </div>

              <p className="text-body text-muted-foreground mb-4">{project.description}</p>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">Business Impact</span>
                </div>
                <p className="text-body text-muted-foreground pl-6">{project.impact}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="flex items-start gap-2 text-body text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0 highlight-dot" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-caption rounded-full font-medium tech-badge"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live
                  </a>
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
            <h3 className="text-subheading font-semibold text-primary mb-4">
              Consistent Value Delivery
            </h3>
            <p className="text-body text-muted-foreground mb-6 max-w-3xl mx-auto">
              Each project reflects real business impact: shipping to 22,000+ merchants, building production
              systems as a solo founder, and improving developer workflows at scale.
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:contact@patricklehmann.io">
                <ExternalLink className="mr-2 h-4 w-4" />
                Discuss Your Next Project
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}