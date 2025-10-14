"use client";

import { useState, useEffect } from "react";
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
import Image from "next/image";

const ParticleBackground = dynamic(
  () => import("@/components/ui/particle-background").then((mod) => ({ default: mod.ParticleBackground })),
  { ssr: false }
);

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = createMotionVariants(prefersReducedMotion);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-grid opacity-20 sm:opacity-30" />

      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6 md:pt-4 lg:pt-6 pb-16 sm:pb-20">
        <div className="flex justify-center pt-8 sm:pt-10 md:pt-8 lg:pt-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6 min-w-0">
            <motion.div
              variants={motionVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
                <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52">
                  <Image
                    src="/images/headshot.webp"
                    alt="Patrick Lehmann headshot"
                    fill
                    priority
                    className={cn(
                      "rounded-full",
                      "border-4",
                      "transition-all duration-300",
                      "object-cover",
                      mounted && theme === "synthwave"
                        ? "border-[#00d9ff] shadow-[0_0_20px_rgba(0,217,255,0.5),0_0_40px_rgba(255,0,255,0.3)]"
                        : "border-primary/30 shadow-warm"
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 text-primary font-550 tracking-wide text-caption">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Focused on enterprise analytics & international solutions
              </div>

              <h1 className="text-display">
                <span className={cn(
                  mounted && theme === "synthwave"
                    ? "gradient-synthwave text-neon-glow"
                    : "gradient-warm text-shadow-glow"
                )}>
                  Patrick
                </span>
                <br />
                <span className={cn(
                  mounted && theme === "synthwave"
                    ? "gradient-synthwave text-neon-glow"
                    : "gradient-warm text-shadow-glow"
                )}>Lehmann</span>
              </h1>

              <div className="text-subheading font-350 text-muted-foreground">
                <Typewriter
                  className="font-mono"
                  texts={[
                    "Faith Driven Developer",
                    "Full-Stack Engineer",
                    "Problem Solver",
                    "AI-Enhanced Programmer",
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
              className="flex flex-col items-center gap-4 sm:gap-5"
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