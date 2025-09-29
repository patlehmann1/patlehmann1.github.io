"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeContent = typeof children === 'string'
      ? children
      : children?.toString() || '';

    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group mb-4">
      <pre className={cn(
        "bg-muted/50 border rounded-lg p-4 overflow-x-auto text-sm",
        "relative",
        className
      )}>
        <code className={language ? `language-${language}` : undefined}>
          {children}
        </code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className={cn(
          "absolute top-2 right-2 h-8 w-8 p-0",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-background/80 hover:bg-background border border-border/50"
        )}
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}