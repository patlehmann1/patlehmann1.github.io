import { Metadata } from "next";
import { Code2, Code, Globe2, Settings } from "lucide-react";
import { OG_PREVIEW_TECH_STACK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "OG Preview - Patrick Lehmann",
  robots: {
    index: false,
    follow: false,
  },
};

interface TechStackItem {
  name: string;
  icon: React.ReactNode;
  years: string;
}

/**
 * Open Graph Preview Component
 *
 * Generates a social media preview image template at 1200x630px dimensions.
 * This component is designed to be screenshot for use as an Open Graph image.
 *
 * @returns JSX.Element - Fixed-size preview template
 */
export default function OGPreview() {
  const techStack: TechStackItem[] = [
    { name: "C#/.NET", icon: <Code2 className="w-5 h-5" />, years: OG_PREVIEW_TECH_STACK[0].years },
    { name: "TypeScript", icon: <Code className="w-5 h-5" />, years: OG_PREVIEW_TECH_STACK[1].years },
    { name: "React", icon: <Globe2 className="w-5 h-5" />, years: OG_PREVIEW_TECH_STACK[2].years },
    { name: "Angular", icon: <Settings className="w-5 h-5" />, years: OG_PREVIEW_TECH_STACK[3].years },
  ];

  return (
    <div className="w-[1200px] h-[630px] bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-16 right-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-16 left-16 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-12 text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-primary font-medium text-lg">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Focused on enterprise analytics & international solutions
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Patrick
            <br />
            <span className="gradient-warm">Lehmann</span>
          </h1>

          <p className="text-3xl font-light text-muted-foreground">
            Full-Stack Software Engineer
          </p>
        </div>

        {/* Key Message */}
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-muted-foreground leading-relaxed">
            6+ years helping teams navigate technical changes and ship reliable software
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex justify-center gap-6 mt-8">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 bg-card/50 border border-border/30 rounded-lg px-4 py-3 shadow-warm backdrop-blur-sm"
            >
              <div className="text-primary">
                {tech.icon}
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm text-foreground">
                  {tech.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {tech.years}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-border/30">
          <div className="text-lg font-medium text-foreground">
            patricklehmann.io
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
          <div className="text-lg text-muted-foreground">
            contact@patricklehmann.io
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-6 right-6 text-xs text-muted-foreground/60">
        Built with Next.js • TypeScript • Tailwind CSS
      </div>
    </div>
  );
}