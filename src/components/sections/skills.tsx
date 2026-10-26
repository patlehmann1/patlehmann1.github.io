"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Languages",
    skills: ["C#", "TypeScript", "JavaScript", "SQL", "Go", "Bash"],
  },
  {
    title: "Frameworks",
    skills: [".NET", "ASP.NET Core", "Node.js", "Express.js", "Hapi.js", "React", "Redux", "Angular", "Material-UI", "Bootstrap"],
  },
  {
    title: "Data & APIs",
    skills: ["REST APIs", "Swagger/OpenAPI", "SQL Server", "MongoDB", "MySQL", "Redis", "Firebase", "RabbitMQ", "Amazon SQS"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "GitHub Actions", "CI/CD", "AWS", "AWS Lambda", "Azure", "Kubernetes", "Terraform", "Linux", "Nginx", "Datadog"],
  },
  {
    title: "Tools",
    skills: ["Git", "Jest", "Postman", "VS Code", "Visual Studio", "Claude Code", "GitHub Copilot"],
  },
  {
    title: "Practices",
    skills: ["SI-assisted development", "Legacy modernization", "Micro-frontends", "Accessibility", "Testing", "Code review", "Technical writing"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-heading text-shadow-sm mb-4">Technical Skills</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
            The tools I reach for most, strongest first
          </p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-card border rounded-lg shadow-warm divide-y divide-border"
        >
          {skillGroups.map((group) => (
            <div key={group.title} className="grid gap-3 p-4 sm:p-6 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <dt className="font-semibold text-primary">{group.title}</dt>
              <dd className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-caption rounded-full tech-badge">
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
