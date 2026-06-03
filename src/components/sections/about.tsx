"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-shadow-sm mb-4">About Me</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
            Senior full-stack engineer with 7+ years building fintech and enterprise systems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-subheading gradient-warm text-shadow-warm mb-6">Impact at Scale</h3>
              <div className="space-y-6 text-body-large text-muted-foreground">
                <p>
                  I build production systems in C#/.NET and TypeScript that process payments and serve merchants at
                  scale. At Global Payments, I shipped Pendo Analytics and OneTrust Cookie Consent across a portal
                  used by 22,000+ merchants &mdash; integrating across Angular microfrontends via postMessage-based
                  iframe architecture &mdash; and contributed to UK and Ireland market expansion using Azure AD B2C
                  authentication.
                </p>
                <p>
                  Beyond Global Payments, I founded Lehmann Digital, a multi-tenant client portal built from scratch
                  in Go, PostgreSQL, and Next.js. I&apos;ve also served as my team&apos;s GitHub Copilot SME,
                  introducing AI-assisted workflows that cut PR cycle time by 40%+.
                </p>
              </div>
            </div>

            <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 sm:p-6 rounded-r-lg">
              <h4 className="font-bold text-muted-foreground mb-3">🎯 Beyond Code</h4>
              <ul className="space-y-2 text-caption text-muted-foreground">
                <li>• Disc golf strategy & precision</li>
                <li>• Christian study & apologetics</li>
                <li>• Family time with Hillary and Adeline</li>
                <li>• Cross-team mentoring</li>
                <li>• Process optimization</li>
              </ul>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 mt-8 lg:mt-0"
          >
            <div className="bg-card border rounded-lg p-6 shadow-warm">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                What Drives Me
              </h4>
              <div className="space-y-4 text-caption text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-xs mt-1">01</span>
                  <span>Living out my Christian faith through work and service</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-xs mt-1">02</span>
                  <span>Solving complex problems with elegant solutions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-xs mt-1">03</span>
                  <span>Mentoring teams through technological transitions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-xs mt-1">04</span>
                  <span>Shipping production systems that serve real businesses</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono text-xs mt-1">05</span>
                  <span>Championing modern development practices</span>
                </div>
              </div>
            </div>

<div className="bg-muted/30 border rounded-lg p-6">
              <h4 className="font-bold text-lg mb-4">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">6+</div>
                  <div className="text-caption text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">22K+</div>
                  <div className="text-caption text-muted-foreground">Merchants Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">40%</div>
                  <div className="text-caption text-muted-foreground">Faster PR Cycles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-caption text-muted-foreground">Remote Ready</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}