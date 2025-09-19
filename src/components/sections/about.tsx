"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Adaptable full-stack engineer who thrives in dynamic environments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Delivering Value Through Change</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Over the past 6+ years, I&apos;ve built my career on a simple principle: delivering consistent
                business value regardless of technological shifts or organizational changes.
              </p>
              <p>
                At Global Payments, I&apos;ve successfully navigated three different teams and tech stacks
                in 3.5 years - from legacy systems to cutting-edge analytics platforms.
                Each transition has strengthened my ability to quickly adapt and contribute meaningfully
                to new domains.
              </p>
              <p>
                I champion modern development practices including AI-assisted development with GitHub
                Copilot and Claude Code, helping teams streamline processes and reduce bottlenecks while
                maintaining high quality standards.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me on the disc golf course working on precision and strategy -
                skills that translate perfectly to software development.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold text-lg mb-2">Technical Leadership</h4>
              <p className="text-muted-foreground text-sm">
                Leading complex integrations like Pendo Analytics across enterprise-scale applications
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold text-lg mb-2">Legacy System Navigation</h4>
              <p className="text-muted-foreground text-sm">
                Expert at maintaining and modernizing complex codebases while managing technical debt
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold text-lg mb-2">AI-Assisted Development</h4>
              <p className="text-muted-foreground text-sm">
                Pioneering modern development practices to improve team efficiency and code quality
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}