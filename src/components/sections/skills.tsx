"use client";

import { motion } from "framer-motion";
import { Code, Database, Cloud, Wrench } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="h-6 w-6" />,
      skills: ["C#", "TypeScript", "JavaScript", "SQL"]
    },
    {
      title: "Frameworks",
      icon: <Wrench className="h-6 w-6" />,
      skills: [".NET", "Angular", "React", "Node.js", "Express.js"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      skills: ["Azure", "Docker", "Kubernetes", "CI/CD", "GitHub Actions"]
    },
    {
      title: "Data & APIs",
      icon: <Database className="h-6 w-6" />,
      skills: ["SQL Server", "MongoDB", "Redis", "REST APIs", "JWT"]
    }
  ];

  const practices = [
    "Agile/Scrum Development",
    "Test-Driven Development",
    "Code Review & Mentoring",
    "AI-Assisted Development (GitHub Copilot, Claude Code)",
    "Legacy System Modernization",
    "Cross-Team Collaboration"
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Modern full-stack technologies with a focus on scalability and maintainability
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg border shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-primary">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-muted/50 rounded-lg p-8"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Development Practices & Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {practices.map((practice, index) => (
              <motion.div
                key={practice}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border"
              >
                <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                <span className="text-sm font-medium">{practice}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-lg p-6">
            <p className="text-lg font-medium text-blue-600 mb-2">
              AI-Assisted Development Pioneer
            </p>
            <p className="text-muted-foreground">
              Championing modern development practices with GitHub Copilot and Claude Code to streamline
              workflows, improve code quality, and accelerate delivery across development teams.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}