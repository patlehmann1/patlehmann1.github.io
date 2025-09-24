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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Adaptable full-stack engineer who thrives in dynamic environments
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
              <h3 className="text-3xl font-bold mb-6 gradient-warm">The Art of Adaptation</h3>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Over 6+ years, I&apos;ve discovered that the best engineers aren&apos;t just masters of code, they&apos;re
                  masters of change. Whether it&apos;s a complete tech stack migration or a sudden pivot in business
                  requirements, I thrive in the chaos and deliver results that matter.
                </p>
                <p>
                  At Global Payments, I&apos;ve worn many hats across three teams: from wrestling with legacy
                  Backbone.js systems to integrating modern Angular microfrontends with Pendo Analytics.
                  Each transition taught me something new about resilience, problem-solving, and the art of
                  making complex systems work together.
                </p>
              </div>
            </div>

            <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 sm:p-6 rounded-r-lg">
              <h4 className="font-bold text-muted-foreground mb-3">🎯 Beyond Code</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Disc golf strategy & precision</li>
                <li>• Christian study & apologetics</li>
                <li>• Family time with Hillary and Adeline</li>
                <li>• Cross-team mentoring</li>
                <li>• Process optimization</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-3 text-primary">The Disc Golf Connection</h4>
              <p className="text-muted-foreground">
                Just like in disc golf, software development is about reading the course, adapting to conditions,
                and making precise decisions under pressure. Whether I&apos;m debugging a complex integration or
                throwing a forehand around a guardian tree, it&apos;s all about finding the right line and executing
                with confidence.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-green-400/5 p-6 rounded-lg border border-green-500/20">
              <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">Optimizing the Developer Lifestyle</h4>
              <p className="text-muted-foreground">
                The same optimization mindset I apply to code applies to health. I&apos;m passionate about whole foods over
                processed shortcuts, strategic movement breaks during deep work sessions, and adjusting calorie intake
                for our naturally sedentary profession. Whether it&apos;s meal prepping for sustained energy, using the
                20-20-20 rule for eye health, or advocating for walking meetings, I believe peak cognitive performance
                starts with intentional wellness choices. The best developers aren&apos;t just efficient with their
                code. They&apos;re efficient with their bodies and minds.
              </p>
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
              <div className="space-y-4 text-sm text-muted-foreground">
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
                  <span>Building systems that scale and adapt</span>
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
                  <div className="text-xs text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-xs text-muted-foreground">Team Transitions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-xs text-muted-foreground">Disc Golf Rounds</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">Remote Ready</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}