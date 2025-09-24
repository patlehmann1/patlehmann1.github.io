"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons/github-icon";
import { LinkedInIcon } from "@/components/ui/icons/linkedin-icon";
import { Button } from "@/components/ui/button";

export function Contact() {
  const contactLinks = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "contact@patricklehmann.io",
      href: "mailto:contact@patricklehmann.io",
      description: "Best way to reach me"
    },
    {
      icon: <LinkedInIcon className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/patlehmann",
      href: "https://linkedin.com/in/patlehmann",
      description: "Professional network and experience"
    },
    {
      icon: <GitHubIcon className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/patlehmann1",
      href: "https://github.com/patlehmann1",
      description: "Code repositories and projects"
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I enjoy connecting with fellow developers, discussing technical challenges, and exploring
            interesting projects. Feel free to reach out if you&apos;d like to chat about technology, share ideas, or collaborate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-warm">Let&apos;s Talk Code</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Got a tricky legacy system that needs untangling? Working on a modern architecture challenge?
                I enjoy discussing technical problems and sharing what I&apos;ve learned along the way.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border rounded-lg hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:scale-105 hover:-translate-y-1 transition-all duration-300 transform"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{link.label}</h4>
                      <p className="text-sm text-primary font-mono">{link.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 mt-8 lg:mt-0"
          >

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4 text-center">
                <MapPin className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="font-medium text-sm">Location</div>
                <div className="text-xs text-muted-foreground">Palm Bay, FL</div>
              </div>
              <div className="bg-card border rounded-lg p-4 text-center">
                <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="font-medium text-sm">Time Zone</div>
                <div className="text-xs text-muted-foreground">EST (UTC-5)</div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="shadow-warm hover:shadow-lg transition-all duration-300" asChild>
                <a href="mailto:contact@patricklehmann.io">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS •
            <span className="ml-1">Demonstrating modern development practices</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}