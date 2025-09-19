"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Coffee } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20 sm:opacity-30" />
      <div className="hidden sm:block absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-20 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      {/* Mobile background elements */}
      <div className="sm:hidden absolute top-10 right-4 w-32 h-32 bg-primary/3 rounded-full blur-2xl" />
      <div className="sm:hidden absolute bottom-10 left-4 w-40 h-40 bg-primary/2 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center min-h-[70vh] sm:min-h-[80vh]">
          {/* Main content - left side */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-primary font-medium">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Focused on enterprise analytics & international solutions
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Patrick
                <br />
                <span className="gradient-warm">Lehmann</span>
              </h1>

              <div className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground">
                Full-Stack Engineer
              </div>

              <div className="max-w-none sm:max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground break-words">
                6+ years crafting scalable applications with C#/.NET, TypeScript, and modern frameworks.
                I thrive in dynamic environments and deliver consistent value through technological shifts.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <Button size="lg" className="shadow-warm hover:shadow-lg transition-all duration-300 min-w-0 flex-shrink" asChild>
                <a href="mailto:patlehmann1@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Let&apos;s Connect
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/patlehmann1" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://linkedin.com/in/patlehmann" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Side info - right side */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6 mt-8 lg:mt-0 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="bg-card border rounded-lg p-6 shadow-warm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Coffee className="h-4 w-4" />
                  Currently Working On
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div>🔧 Pendo Analytics integration at Global Payments</div>
                  <div>🌍 International auth solutions for UK/Ireland markets</div>
                  <div>🤖 Championing AI-assisted development practices</div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6 shadow-warm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Based In
                </h3>
                <div className="text-sm text-muted-foreground">
                  Palm Bay, Florida • Remote-focused
                </div>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <div className="text-sm font-medium text-primary">Fun Fact</div>
                <div className="text-sm text-muted-foreground mt-1">
                  When I&apos;m not coding, you&apos;ll find me on the disc golf course working on precision and strategy.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}