"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import { useReducedMotion, createMotionVariants } from "@/hooks/useReducedMotion";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { GitHubIcon } from "@/components/ui/icons/github-icon";
import { LinkedInIcon } from "@/components/ui/icons/linkedin-icon";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/ui/particle-background").then((mod) => ({ default: mod.ParticleBackground })),
  { ssr: false }
);

export function Hero() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = createMotionVariants(prefersReducedMotion);

  return (
    <section className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-grid opacity-20 sm:opacity-30" />

      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-12 pb-16 sm:pb-20">
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

              <h1 className="text-display">
                <span className={cn(
                  theme === "synthwave"
                    ? "gradient-synthwave text-neon-glow"
                    : "gradient-warm text-shadow-glow"
                )}>
                  Patrick
                </span>
                <br />
                <span className={cn(
                  theme === "synthwave"
                    ? "gradient-synthwave text-neon-glow"
                    : "gradient-warm text-shadow-glow"
                )}>Lehmann</span>
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
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/patlehmann1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <GitHubIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com/in/patlehmann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="h-6 w-6" />
                </a>
              </div>

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
      <ScrollIndicator />
    </section>
  );
}