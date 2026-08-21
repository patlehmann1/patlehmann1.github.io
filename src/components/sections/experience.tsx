"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { ResumeDownloadButton } from "../ui/resume-download-button";

export function Experience() {
  const experiences = [
    {
      company: "US Office of Personnel Management",
      position: "Software Engineer",
      period: "Starting September 2026",
      upcoming: true,
      teams: [
        {
          name: "US Tech Force",
          period: "September 2026",
          highlights: [
            "Joining a 2-year federal initiative bringing private-sector technologists into government to modernize legacy IT systems",
            "Placed at OPM as part of US Tech Force, working to address capability gaps and drive technical modernization across federal systems"
          ]
        }
      ]
    },
    {
      company: "Global Payments Inc.",
      position: "Software Developer",
      period: "April 2022 - Present",
      upcoming: false,
      teams: [
        {
          name: "Genius Retail POS",
          period: "January 2025 - Present",
          highlights: [
            "Implemented Pendo Analytics and OneTrust Cookie Consent across a portal serving 22,000+ merchants, integrating via postMessage-based iframe micro-frontend architecture",
            "Integrated analytics into Angular microfrontends, leveraging cross-team expertise",
            "Implementing international authentication solutions for UK/Ireland market entry using Azure AD B2C",
            "Serve as team GitHub Copilot SME, introducing AI-assisted development workflows that reduced PR cycle time by 40%+",
            "Collaborate with stakeholders to ensure first-time-right delivery"
          ]
        },
        {
          name: "Heartland Retail POS",
          period: "January 2024 - January 2025",
          highlights: [
            "Maintained complex legacy codebase (React.js class components within Backbone.js views)",
            "Delivered critical bug fixes and system stability improvements while managing technical debt"
          ]
        },
        {
          name: "Heartland Retail Online",
          period: "April 2022 - January 2024",
          highlights: [
            "Developed features integrating e-commerce with POS using TypeScript, Node.js, and Angular",
            "Evolved from backend to full-stack role, gaining Angular proficiency and UI expertise",
            "Optimized CI/CD pipelines with GitHub Actions for streamlined AWS deployments"
          ]
        }
      ]
    },
    {
      company: "Homes.com",
      position: "Software Developer",
      period: "January 2019 - April 2022",
      upcoming: false,
      teams: [
        {
          name: "Full-Stack Development",
          period: "January 2019 - April 2022",
          highlights: [
            "Transitioned from Node.js microservices to C#/.NET full-stack development following CoStar Group acquisition",
            "Built RESTful APIs, contributed to migration from monolithic ColdFusion to scalable Node.js microservices architecture",
            "Implemented Kubernetes logging systems and database integrations (MongoDB, SQL Server, Solr)"
          ]
        }
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-shadow-sm mb-4">Professional Experience</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
            7+ years building fintech and enterprise systems across payments, real estate, and e-commerce
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              🚀 Next Chapter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-caption text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="text-primary">🏛️</span>
                <span>Joining OPM as a Software Engineer through US Tech Force</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">🔧</span>
                <span>Two-year federal initiative modernizing legacy IT systems</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">🤝</span>
                <span>Bringing private-sector engineering practices into government</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((exp, expIndex) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: expIndex * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`hidden sm:block absolute left-6 top-8 w-4 h-4 rounded-full border-4 border-background shadow-warm ${exp.upcoming ? "bg-blue-500" : "bg-primary"}`} />

                <div className="ml-0 sm:ml-20">
                  <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-bold mb-2 gradient-warm">
                          {exp.company}
                        </h3>
                        <div className="flex items-center gap-4 text-body-large text-muted-foreground">
                          <span>{exp.position}</span>
                          <span className="hidden md:inline">•</span>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                            {exp.upcoming && (
                              <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full font-medium">
                                Upcoming
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    {exp.teams.map((team, teamIndex) => (
                      <motion.div
                        key={team.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (expIndex * 0.2) + (teamIndex * 0.1) }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        <div className={`bg-card border rounded-lg p-6 shadow-warm hover:shadow-lg transition-all duration-300${exp.upcoming ? " border-dashed" : ""}`}>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h4 className="text-xl font-semibold">{team.name}</h4>
                            <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full mt-2 md:mt-0">
                              {team.period}
                            </span>
                          </div>

                          <div className="grid gap-3">
                            {team.highlights.map((highlight, highlightIndex) => (
                              <motion.div
                                key={highlightIndex}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: (expIndex * 0.2) + (teamIndex * 0.1) + (highlightIndex * 0.05) }}
                                viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-body leading-relaxed">{highlight}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <p className="text-body-large font-medium text-primary mb-2">
              Consistent Impact Across Teams
            </p>
            <p className="text-body text-muted-foreground">
              7+ years shipping production systems at Global Payments and Homes.com — and starting September 2026,
              joining OPM&apos;s US Tech Force to modernize federal systems.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <ResumeDownloadButton />
        </motion.div>
      </div>
    </section>
  );
}