"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Patrick Lehmann
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Full-Stack Software Engineer
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            6+ years building scalable applications with C#/.NET, TypeScript, and modern JavaScript frameworks.
            I deliver consistent business value through changing technologies and organizational transitions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <Button size="lg" asChild>
            <a href="mailto:patlehmann1@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="animate-bounce"
        >
          <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}