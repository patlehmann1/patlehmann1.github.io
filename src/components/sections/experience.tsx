"use client";

import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      company: "Global Payments (Heartland)",
      position: "Software Developer",
      period: "April 2022 - Present",
      teams: [
        {
          name: "Genius Retail POS",
          period: "January 2025 - Present",
          highlights: [
            "Lead implementation of Pendo Analytics and OneTrust Cookie Consent across entire portal",
            "Integrated analytics into Angular microfrontends, leveraging cross-team expertise",
            "Implementing international authentication solutions for UK/Ireland market entry using Azure AD B2C",
            "Champion AI-assisted development practices, streamlining code review processes",
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
      company: "CoStar Group / Homes.com",
      position: "Software Developer",
      period: "January 2019 - April 2022",
      teams: [
        {
          name: "Full-Stack Development",
          period: "January 2019 - April 2022",
          highlights: [
            "Transitioned from Node.js microservices to C#/.NET full-stack development following acquisition",
            "Built RESTful APIs and led migration from monolithic ColdFusion to scalable Node.js architecture",
            "Implemented Kubernetes logging systems and database integrations (MongoDB, SQL Server, Solr)"
          ]
        }
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            6+ years of adaptability across multiple teams, technologies, and business domains
          </p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: expIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg border shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {exp.company}
                  </h3>
                  <p className="text-lg text-muted-foreground mt-1">{exp.position}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0">
                  <Calendar className="h-4 w-4" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <div className="space-y-6">
                {exp.teams.map((team, teamIndex) => (
                  <div key={team.name} className="border-l-4 border-primary pl-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h4 className="text-lg font-medium">{team.name}</h4>
                      <span className="text-sm text-muted-foreground">{team.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {team.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <p className="text-lg font-medium text-primary mb-2">
              Adaptability in Action
            </p>
            <p className="text-muted-foreground">
              Successfully navigated 3 different teams and tech stacks at Global Payments,
              demonstrating consistent ability to deliver value through organizational change.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}