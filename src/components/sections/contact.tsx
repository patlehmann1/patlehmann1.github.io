"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const contactLinks = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "patlehmann1@gmail.com",
      href: "mailto:patlehmann1@gmail.com",
      description: "Best way to reach me for opportunities"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/patlehmann",
      href: "https://linkedin.com/in/patlehmann",
      description: "Professional network and experience"
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/patlehmann1",
      href: "https://github.com/patlehmann1",
      description: "Code repositories and projects"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
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
            Ready to deliver value through your next technical challenge. Let's discuss how my
            adaptability and full-stack expertise can benefit your team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <a
                href={link.href}
                target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                className="block bg-card p-6 rounded-lg border shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <h3 className="font-semibold">{link.label}</h3>
                </div>
                <p className="text-primary font-mono text-sm mb-2">{link.value}</p>
                <p className="text-muted-foreground text-sm">{link.description}</p>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-lg p-8 text-center"
        >
          <h3 className="text-xl font-semibold mb-4">Ready to Start a Conversation?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're looking for a full-stack developer who can navigate complex systems,
            lead technical integrations, or adapt quickly to new challenges, I'd love to hear about
            your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Available for remote or hybrid opportunities</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Open to new opportunities</span>
            </div>
          </div>

          <Button size="lg" asChild>
            <a href="mailto:patlehmann1@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </a>
          </Button>
        </motion.div>

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