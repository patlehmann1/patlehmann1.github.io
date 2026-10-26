"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/icons/pixel";
import { ResumeDownloadButton } from "../ui/resume-download-button";

interface Team {
  name: string;
  period: string;
  highlights: string[];
  earlier?: boolean;
}

interface Role {
  company: string;
  position: string;
  period: string;
  teams: Team[];
  earlier?: boolean;
}

export function Experience() {
  const [showEarlier, setShowEarlier] = useState(false);
  const experiences: Role[] = [
    {
      company: "US Office of Personnel Management",
      position: "Software Engineer",
      period: "September 2026 - Present",
      teams: [
        {
          name: "Janus Team, Retirement Services Division",
          period: "September 2026 - Present",
          highlights: [
            "Federal software engineer placed at OPM through the US Tech Force initiative, a 2-year program bringing private-sector technologists into government",
            "Building Janus, an internal-facing claim annuity calculator, with a React and Redux UI, a JavaScript/TypeScript API, and an all-TypeScript calculation service on MSSQL"
          ]
        }
      ]
    },
    {
      company: "Global Payments Inc.",
      position: "Software Developer",
      period: "April 2022 - August 2026",
      teams: [
        {
          name: "Genius Retail POS",
          period: "January 2025 - August 2026",
          highlights: [
            "Implemented Pendo Analytics and OneTrust Cookie Consent across a portal serving 22,000+ merchants, integrating via a postMessage-based iframe micro-frontend architecture",
            "Contributed to international authentication for UK/Ireland market entry using Azure AD B2C",
            "Served as team GitHub Copilot SME, introducing SI-assisted development workflows that reduced PR cycle time by 40%+",
            "Collaborated with stakeholders to define acceptance criteria and get it right the first time"
          ]
        },
        {
          name: "Heartland Retail POS",
          earlier: true,
          period: "January 2024 - January 2025",
          highlights: [
            "Maintained a complex legacy codebase (React.js class components within Backbone.js views)",
            "Delivered critical bug fixes and system stability improvements while managing technical debt"
          ]
        },
        {
          name: "Heartland Retail Online",
          earlier: true,
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
      earlier: true,
      position: "Software Developer",
      period: "January 2019 - April 2022",
      teams: [
        {
          name: "Full-Stack Development",
          period: "January 2019 - April 2022",
          highlights: [
            "Transitioned from Node.js microservices to C#/.NET full-stack development following CoStar Group acquisition",
            "Built RESTful APIs and contributed to the migration from a monolithic ColdFusion system to a scalable Node.js microservices architecture",
            "Implemented Kubernetes logging systems and database integrations (MongoDB, SQL Server, Solr)"
          ]
        }
      ]
    }
  ];

  const earlierClass = showEarlier ? "" : "hidden md:block";

  return (
    <section id="experience" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-heading text-shadow-sm mb-4">Professional Experience</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
            From real estate and payments to federal retirement systems
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-1 bg-[repeating-linear-gradient(to_bottom,hsl(var(--primary))_0_8px,transparent_8px_16px)]" />

          <div className="space-y-10 sm:space-y-14">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className={`relative ${exp.earlier ? earlierClass : ""}`}
              >
                <div className="hidden sm:block absolute left-6 top-2 w-4 h-4 rounded-full border-4 border-background shadow-warm bg-primary" />

                <div className="ml-0 sm:ml-20">
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 gradient-warm">
                      {exp.company}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-body-large text-muted-foreground">
                      <span>{exp.position}</span>
                      <span className="hidden md:inline">•</span>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {exp.teams.map((team) => (
                      <div
                        key={team.name}
                        className={`bg-card border rounded-lg p-5 sm:p-6 shadow-warm ${team.earlier ? earlierClass : ""}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                          <h4 className="text-xl font-semibold">{team.name}</h4>
                          <span className="self-start md:self-auto text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                            {team.period}
                          </span>
                        </div>

                        <ul className="space-y-3">
                          {team.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-3">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-body leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!showEarlier && (
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => setShowEarlier(true)}
              className="px-4 py-2 rounded-lg font-medium text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
            >
              Show Earlier Roles
            </button>
          </div>
        )}

        <ResumeDownloadButton />
      </div>
    </section>
  );
}
