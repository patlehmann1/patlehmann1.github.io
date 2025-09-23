"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Projects() {
  const projects = [
    {
      title: "Enterprise Analytics Integration",
      company: "Global Payments",
      description: "Led full-stack implementation of Pendo Analytics and OneTrust Cookie Consent across enterprise portal, integrating with Angular microfrontends and backend systems.",
      period: "2025",
      impact: "Enhanced user experience tracking across entire platform",
      technologies: ["Angular", "TypeScript", "C#/.NET", "Pendo", "OneTrust Cookie Consent"],
      highlights: [
        "Full-stack implementation from UI to database",
        "Cross-team collaboration and expertise leveraging",
        "First-time-right delivery methodology"
      ]
    },
    {
      title: "E-commerce POS Integration Platform",
      company: "Global Payments",
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
      company: "CoStar Group / Homes.com",
      description: "Architected and led migration from monolithic ColdFusion system to scalable Node.js microservices architecture, improving system performance and maintainability.",
      period: "2019-2022",
      impact: "Reduced system complexity and improved scalability",
      technologies: ["Node.js", "C#/.NET", "MongoDB", "SQL Server", "Kubernetes"],
      highlights: [
        "Monolithic to microservices transformation",
        "Cross-platform technology transition",
        "Database integration and optimization"
      ]
    },
    {
      title: "Legacy Codebase Maintenance",
      company: "Global Payments",
      description: "Maintained and enhanced complex legacy system with React.js class components within Backbone.js views, delivering critical stability improvements.",
      period: "2024-2025",
      impact: "Ensured system stability while managing technical debt",
      technologies: ["React.js", "Backbone.js", "JavaScript", "Legacy Systems"],
      highlights: [
        "Technical debt management",
        "Critical bug resolution",
        "System stability improvements"
      ]
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
              className="bg-card p-8 rounded-lg border shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:scale-105 hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 cursor-pointer transform"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Users className="h-4 w-4" />
                    <span>{project.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.period}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{project.description}</p>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">Business Impact</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{project.impact}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
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
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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
            <h3 className="text-xl font-semibold text-primary mb-4">
              Consistent Value Delivery
            </h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Each project demonstrates my ability to adapt to new technologies, collaborate across teams,
              and deliver meaningful business impact regardless of technical complexity or organizational changes.
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