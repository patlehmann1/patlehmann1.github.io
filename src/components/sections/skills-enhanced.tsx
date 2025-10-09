"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Code, Database, Cloud, Wrench, Star, Settings, Search, X } from "lucide-react";
import { sortSkillsByLevelAndExperience } from "@/lib/skill-utils";
import { useDebounce } from "@/hooks/useDebounce";

interface Skill {
  name: string;
  level: number;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAllPractices, setShowAllPractices] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const sortedSkillCategories = useMemo(() => {
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
          name: "Bootstrap",
          level: 5,
          years: "6+ years",
          description: "Responsive CSS framework for rapid prototyping"
        },
        {
          name: "React",
          level: 4,
          years: "6+ years",
          description: "Modern React with hooks and Next.js"
        },
        {
          name: "ASP.NET Core",
          level: 4,
          years: "4+ years",
          description: "Modern cross-platform web API framework"
        },
        {
          name: "Angular",
          level: 3,
          years: "2+ years",
          description: "Large-scale frontend applications with TypeScript"
        },
        {
          name: "Material-UI",
          level: 3,
          years: "2+ years",
          description: "React component library with Material Design"
        }
      ]
    },
    {
      title: "Infrastructure & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      description: "Infrastructure and deployment expertise",
      skills: [
        {
          name: "Docker",
          level: 4,
          years: "3+ years",
          description: "Containerization and deployment automation"
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
        },
        {
          name: "AWS",
          level: 3,
          years: "3+ years",
          description: "Amazon Web Services for scalable cloud solutions"
        },
        {
          name: "AWS Lambda",
          level: 3,
          years: "2+ years",
          description: "Serverless computing for event-driven applications"
        },
        {
          name: "Azure",
          level: 2,
          years: "1+ year",
          description: "Cloud services, deployment, and infrastructure"
        },
        {
          name: "Kubernetes",
          level: 2,
          years: "6+ years",
          description: "Container orchestration and scaling"
        },
        {
          name: "Terraform",
          level: 2,
          years: "1+ year",
          description: "Infrastructure as Code for automated provisioning"
        },
        {
          name: "Datadog",
          level: 2,
          years: "1+ year",
          description: "Application monitoring and observability platform"
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
        },
        {
          name: "Jest",
          level: 5,
          years: "5+ years",
          description: "JavaScript testing framework for unit and integration tests"
        },
        {
          name: "VS Code",
          level: 5,
          years: "6+ years",
          description: "Primary code editor with extensive extension ecosystem"
        },
        {
          name: "Visual Studio",
          level: 4,
          years: "4+ years",
          description: "Integrated development environment for .NET development"
        },
        {
          name: "Bash",
          level: 3,
          years: "4+ years",
          description: "Shell scripting for automation and server management"
        }
      ]
    },
    {
      title: "Data & APIs",
      icon: <Database className="h-6 w-6" />,
      description: "Database and API integration technologies",
      skills: [
        {
          name: "REST APIs",
          level: 5,
          years: "6+ years",
          description: "API design, implementation, and documentation"
        },
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
          name: "MySQL",
          level: 4,
          years: "5+ years",
          description: "Relational database for high-performance applications"
        },
        {
          name: "Redis",
          level: 3,
          years: "2+ years",
          description: "Caching and session storage solutions"
        },
        {
          name: "Firebase",
          level: 3,
          years: "2+ years",
          description: "Real-time database and backend-as-a-service platform"
        },
        {
          name: "RabbitMQ",
          level: 3,
          years: "2+ years",
          description: "Message broker for asynchronous communication"
        },
        {
          name: "Amazon SQS",
          level: 3,
          years: "2+ years",
          description: "Managed message queuing for distributed systems"
        }
      ]
    }
    ];

    return skillCategories.map(category => ({
      ...category,
      skills: sortSkillsByLevelAndExperience(category.skills)
    }));
  }, []);

  const practices = [
    "Agile/Scrum Development",
    "Test-Driven Development",
    "Code Review & Mentoring",
    "AI-Assisted Development (GitHub Copilot, Claude Code)",
    "Legacy System Modernization",
    "Cross-Team Collaboration",
    "Point-of-Sale (POS) System Development",
    "E-commerce Platform Architecture",
    "Real Estate Technology Solutions",
    "Payment Processing Integration",
    "Continuous Integration/Continuous Deployment (CI/CD)",
    "Performance Optimization & Monitoring",
    "Accessibility (a11y) Best Practices",
    "Security-First Development",
    "Documentation & Technical Writing",
    "Pair Programming",
    "Refactoring & Technical Debt Management",
    "Design Systems & Component Libraries",
    "Responsive & Mobile-First Design",
    "SEO Optimization & Web Vitals",
    "API Design & Integration",
    "Database Design & Optimization",
    "Cloud Deployment & Infrastructure",
    "Stakeholder Communication",
    "Technical Requirements Gathering",
    "Open Source Contribution"
  ];

  const renderStars = useCallback((level: number) => {
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
  }, []);

  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName);
  }, []);

  const filteredCategories = useMemo(() => {
    let categoriesToFilter = sortedSkillCategories;

    if (selectedCategory !== "all") {
      categoriesToFilter = sortedSkillCategories.filter(cat => cat.title === selectedCategory);
    }

    return categoriesToFilter.map(category => ({
      ...category,
      skills: category.skills.filter(skill => {
        const matchesSearch = debouncedSearch === "" ||
          skill.name.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesLevel = selectedLevel === null || skill.level === selectedLevel;
        return matchesSearch && matchesLevel;
      })
    })).filter(category => category.skills.length > 0);
  }, [sortedSkillCategories, debouncedSearch, selectedLevel, selectedCategory]);

  const hasActiveFilters = debouncedSearch !== "" || selectedLevel !== null;

  const totalSkillsCount = sortedSkillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const filteredSkillsCount = filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedLevel(null);
    setSelectedCategory("all");
  }, []);

  const visiblePractices = showAllPractices ? practices : practices.slice(0, 12);
  const categoryTabs = ["all", ...sortedSkillCategories.map(cat => cat.title)];


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
          <h2 className="text-heading text-shadow-sm mb-4">Technical Skills</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
            Modern full-stack technologies with a focus on scalability and maintainability
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedCategory(tab)}
                  aria-label={tab === "all" ? "Show all skills" : `Filter by ${tab} category`}
                  aria-pressed={selectedCategory === tab}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === tab
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card border border-border hover:border-primary hover:shadow-md'
                  }`}
                >
                  {tab === "all" ? "All Skills" : tab}
                </button>
              ))}
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedLevel(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLevel === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:border-primary'
                }`}
              >
                All Levels
              </button>
              <button
                onClick={() => setSelectedLevel(5)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedLevel === 5
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:border-primary'
                }`}
              >
                Expert <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </button>
              <button
                onClick={() => setSelectedLevel(4)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLevel === 4
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:border-primary'
                }`}
              >
                Advanced
              </button>
              <button
                onClick={() => setSelectedLevel(3)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLevel === 3
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:border-primary'
                }`}
              >
                Intermediate
              </button>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg p-3">
                <span className="text-sm text-primary">
                  Showing {filteredSkillsCount} of {totalSkillsCount} skills
                </span>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
            </div>
          </div>
        </motion.div>

        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg mb-4">No skills found matching your criteria</p>
            <button
              onClick={handleClearFilters}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
        <div className="space-y-16">
          {filteredCategories.map((category, categoryIndex) => {
            return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-subheading text-shadow-sm">{category.title}</h3>
                  <p className="text-muted-foreground text-caption">{category.description}</p>
                </div>
              </div>

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
                    onMouseEnter={() => handleSkillHover(skill.name)}
                    onMouseLeave={() => handleSkillHover(null)}
                  >
                    <div className="bg-card border rounded-lg p-4 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{skill.name}</h4>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {skill.years}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(skill.level)}
                        <span className="text-caption text-muted-foreground">
                          {skill.level}/5
                        </span>
                      </div>


                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-black/90 text-white text-caption rounded-lg z-10">
                          {skill.description}
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
          })}
        </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-card border rounded-lg p-6 sm:p-8 shadow-warm"
        >
          <h3 className="text-subheading font-bold mb-6 text-center">Development Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePractices.map((practice, index) => (
              <motion.div
                key={practice}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200"
              >
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-body leading-relaxed">{practice}</span>
              </motion.div>
            ))}
          </div>

          {!showAllPractices && practices.length > 12 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllPractices(true)}
                aria-label={`Expand to show all ${practices.length} development practices`}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                Show All {practices.length} Practices
              </button>
            </div>
          )}

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
            <p className="text-body text-muted-foreground">
              Embracing modern AI tools to enhance productivity, code quality, and team collaboration while maintaining engineering best practices
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}