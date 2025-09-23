"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Database, Cloud, Wrench, Star, Settings } from "lucide-react";

interface Skill {
  name: string;
  level: number; // 1-5
  years: string;
  description: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: Skill[];
}

export function SkillsEnhanced() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Code className="h-6 w-6" />,
      description: "Core programming languages I use daily",
      skills: [
        {
          name: "C#",
          level: 5,
          years: "4+ years",
          description: "Primary backend language for enterprise applications"
        },
        {
          name: "TypeScript",
          level: 5,
          years: "6+ years",
          description: "Type-safe JavaScript for large-scale applications"
        },
        {
          name: "JavaScript",
          level: 5,
          years: "6+ years",
          description: "Modern ES6+ for dynamic web development"
        },
        {
          name: "SQL",
          level: 4,
          years: "6+ years",
          description: "Database queries, optimization, and design"
        }
      ]
    },
    {
      title: "Frameworks",
      icon: <Wrench className="h-6 w-6" />,
      description: "Modern frameworks for building robust applications",
      skills: [
        {
          name: ".NET",
          level: 5,
          years: "4+ years",
          description: "Enterprise-grade backend development"
        },
        {
          name: "Angular",
          level: 3,
          years: "2+ years",
          description: "Large-scale frontend applications with TypeScript"
        },
        {
          name: "React",
          level: 4,
          years: "6+ years",
          description: "Modern React with hooks and Next.js"
        },
        {
          name: "Node.js",
          level: 5,
          years: "6+ years",
          description: "Server-side JavaScript and API development"
        },
        {
          name: "Express.js",
          level: 5,
          years: "6+ years",
          description: "Web server framework for Node.js"
        },
        {
          name: "Hapi.js",
          level: 5,
          years: "6+ years",
          description: "Rich framework for building applications and services"
        },
        {
          name: "ASP.NET Core",
          level: 4,
          years: "4+ years",
          description: "Modern cross-platform web API framework"
        }
      ]
    },
    {
      title: "Infrastructure & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      description: "Infrastructure and deployment expertise",
      skills: [
        {
          name: "Azure",
          level: 2,
          years: "1+ year",
          description: "Cloud services, deployment, and infrastructure"
        },
        {
          name: "Docker",
          level: 4,
          years: "3+ years",
          description: "Containerization and deployment automation"
        },
        {
          name: "Kubernetes",
          level: 2,
          years: "6+ years",
          description: "Container orchestration and scaling"
        },
        {
          name: "CI/CD",
          level: 4,
          years: "4+ years",
          description: "Automated testing and deployment pipelines"
        },
        {
          name: "GitHub Actions",
          level: 4,
          years: "3+ years",
          description: "Workflow automation and deployment"
        },
        {
          name: "Linux",
          level: 3,
          years: "6+ years",
          description: "Server administration and command line"
        },
        {
          name: "Nginx",
          level: 3,
          years: "5+ years",
          description: "Web server and reverse proxy configuration"
        }
      ]
    },
    {
      title: "Development Tools",
      icon: <Settings className="h-6 w-6" />,
      description: "Essential development and workflow tools",
      skills: [
        {
          name: "Git",
          level: 5,
          years: "6+ years",
          description: "Version control and collaborative development"
        },
        {
          name: "npm",
          level: 5,
          years: "6+ years",
          description: "Node.js package management and build tools"
        },
        {
          name: "Postman",
          level: 5,
          years: "6+ years",
          description: "API testing, development, and collaboration"
        },
        {
          name: "Swagger/OpenAPI",
          level: 5,
          years: "6+ years",
          description: "API documentation and specification standards"
        }
      ]
    },
    {
      title: "Data & APIs",
      icon: <Database className="h-6 w-6" />,
      description: "Database and API integration technologies",
      skills: [
        {
          name: "SQL Server",
          level: 4,
          years: "6+ years",
          description: "Database design, optimization, and management"
        },
        {
          name: "MongoDB",
          level: 4,
          years: "6+ years",
          description: "NoSQL document database for flexible data"
        },
        {
          name: "Redis",
          level: 3,
          years: "2+ years",
          description: "Caching and session storage solutions"
        },
        {
          name: "REST APIs",
          level: 5,
          years: "6+ years",
          description: "API design, implementation, and documentation"
        }
      ]
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

  const renderStars = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= level
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    );
  };

  const ProgressBar = ({ level, skillName }: { level: number; skillName: string }) => (
    <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
      <motion.div
        className="h-2 bg-gradient-to-r from-primary to-primary/80 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${(level / 5) * 100}%` }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </div>
  );

  return (
    <section id="skills" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
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

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    className="relative group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="bg-card border rounded-lg p-4 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{skill.name}</h4>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {skill.years}
                        </span>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(skill.level)}
                        <span className="text-xs text-muted-foreground">
                          {skill.level}/5
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <ProgressBar level={skill.level} skillName={skill.name} />

                      {/* Hover Tooltip */}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-black/90 text-white text-xs rounded-lg z-10"
                        >
                          {skill.description}
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Development Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-card border rounded-lg p-6 sm:p-8 shadow-warm"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Development Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {practices.map((practice, index) => (
              <motion.div
                key={practice}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200"
              >
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-sm leading-relaxed">{practice}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            viewport={{ once: true }}
            className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center"
          >
            <p className="text-primary font-medium mb-2">
              🤖 AI-Forward Development
            </p>
            <p className="text-sm text-muted-foreground">
              Embracing modern AI tools to enhance productivity, code quality, and team collaboration while maintaining engineering best practices
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}