"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";

export function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 sm:opacity-30" />
      <div className="hidden sm:block absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
      <div className="hidden sm:block absolute bottom-20 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float-slower" />
      <div className="sm:hidden absolute top-10 right-4 w-32 h-32 bg-primary/3 rounded-full blur-2xl animate-float" />
      <div className="sm:hidden absolute bottom-10 left-4 w-40 h-40 bg-primary/2 rounded-full blur-2xl animate-float-slow" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-8 sm:pt-12 pb-16 sm:pb-20">
        <div className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh]">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-3 text-primary font-medium">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Focused on enterprise analytics & international solutions
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Patrick
                <br />
                <span className="gradient-warm">Lehmann</span>
              </h1>

              <div className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground">
                <Typewriter
                  texts={[
                    "Full-Stack Engineer",
                    "Problem Solver",
                    "AI Development Advocate",
                    "Team Collaborator"
                  ]}
                  speed={80}
                  deleteSpeed={40}
                  delayBetween={2500}
                />
              </div>

              <div className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-muted-foreground">
                6+ years crafting scalable applications with C#/.NET, TypeScript, and modern frameworks.
                I thrive in dynamic environments and deliver consistent value through technological shifts.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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