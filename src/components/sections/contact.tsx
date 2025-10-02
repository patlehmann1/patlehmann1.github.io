"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Copy, Check } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons/github-icon";
import { LinkedInIcon } from "@/components/ui/icons/linkedin-icon";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";

export function Contact() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedItem(label);
      setToastMessage(`${label} copied!`);
      setShowToast(true);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
          <h2 className="text-heading text-shadow-sm mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-body-large max-w-2xl mx-auto">
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
              <h3 className="text-subheading gradient-warm text-shadow-warm mb-4">Let&apos;s Talk Code</h3>
              <p className="text-body-large text-muted-foreground leading-relaxed">
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
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border rounded-lg hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300">
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                      rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                      className="flex items-center gap-3 sm:gap-4 flex-1 group/link"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all duration-300">
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{link.label}</h4>
                        <p className="text-mono-code text-primary">{link.value}</p>
                        <p className="text-caption text-muted-foreground mt-1">{link.description}</p>
                      </div>
                    </a>
                    <button
                      onClick={() => handleCopy(link.value, link.label)}
                      className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                      aria-label={`Copy ${link.label}`}
                    >
                      {copiedItem === link.label ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </button>
                  </div>
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
                <div className="font-medium text-caption">Location</div>
                <div className="text-caption text-muted-foreground">Palm Bay, FL</div>
              </div>
              <div className="bg-card border rounded-lg p-4 text-center">
                <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="font-medium text-caption">Time Zone</div>
                <div className="text-caption text-muted-foreground">EST (UTC-5)</div>
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
          <p className="text-muted-foreground text-caption">
            Built with Next.js, TypeScript, and Tailwind CSS •
            <span className="ml-1">Demonstrating modern development practices</span>
          </p>
        </motion.div>
      </div>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}