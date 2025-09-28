"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import { useReducedMotion, createMotionVariants } from "@/hooks/useReducedMotion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = createMotionVariants(prefersReducedMotion);

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 sm:opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-12 pb-16 sm:pb-20">
        <div className="flex items-center justify-center min-h-[70vh] sm:min-h-[60vh]">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 min-w-0">
            <motion.div
              variants={motionVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-3 text-primary font-550 tracking-wide text-caption">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Focused on enterprise analytics & international solutions
              </div>

              <h1 className="text-display gradient-warm text-shadow-glow">
                Patrick
                <br />
                <span className="gradient-warm">Lehmann</span>
              </h1>

              <div className="text-subheading font-350 text-muted-foreground">
                <Typewriter
                  texts={[
                    "Faith Driven Developer",
                    "Full-Stack Engineer",
                    "Problem Solver",
                    "AI-Enhanced Development Advocate",
                    "Team Collaborator"
                  ]}
                  speed={80}
                  deleteSpeed={40}
                  delayBetween={2500}
                />
              </div>

              <div className="max-w-2xl mx-auto text-body-large text-muted-foreground">
                I&apos;ve spent 6+ years helping teams navigate technical changes and ship reliable software
                using C#/.NET, TypeScript, and modern frameworks.
              </div>
            </motion.div>

            <motion.div
              variants={motionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
              className="flex justify-center"
            >
              <Button size="lg" className="shadow-warm hover:shadow-lg transition-all duration-300 min-w-0 flex-shrink" asChild>
                <a href="mailto:contact@patricklehmann.io">
                  <Mail className="mr-2 h-4 w-4" />
                  Let&apos;s Connect
                </a>
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}