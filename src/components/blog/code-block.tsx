"use client";

import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues and reduce bundle size
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then(mod => mod.Prism),
  { ssr: false }
);

// Import themes statically for better TypeScript support
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

// Language display names mapping
const languageNames: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  jsx: 'JSX',
  tsx: 'TSX',
  csharp: 'C#',
  python: 'Python',
  java: 'Java',
  go: 'Go',
  rust: 'Rust',
  sql: 'SQL',
  bash: 'Bash',
  shell: 'Shell',
  json: 'JSON',
  yaml: 'YAML',
  xml: 'XML',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  markdown: 'Markdown',
};

// Language file extension mapping for icon color
const languageColors: Record<string, string> = {
  typescript: 'text-blue-400',
  javascript: 'text-yellow-400',
  jsx: 'text-blue-300',
  tsx: 'text-blue-300',
  csharp: 'text-purple-400',
  python: 'text-green-400',
  java: 'text-red-400',
  go: 'text-cyan-400',
  rust: 'text-orange-400',
  sql: 'text-indigo-400',
  bash: 'text-gray-400',
  shell: 'text-gray-400',
  json: 'text-yellow-300',
  yaml: 'text-pink-400',
  xml: 'text-orange-300',
  html: 'text-orange-500',
  css: 'text-blue-500',
  scss: 'text-pink-500',
  markdown: 'text-gray-300',
};

export function CodeBlock({
  children,
  className,
  language = 'text',
  showLineNumbers = false,
  filename
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const codeContent = typeof children === 'string'
    ? children
    : children?.toString() || '';

  const normalizedLanguage = language.toLowerCase();
  const displayName = languageNames[normalizedLanguage] || language.toUpperCase();
  const languageColor = languageColors[normalizedLanguage] || 'text-gray-400';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Fallback for when syntax highlighter is loading or failed
  const FallbackCode = () => (
    <pre className={cn(
      "bg-card/50 border rounded-lg p-4 overflow-x-auto text-sm font-mono",
      "text-foreground whitespace-pre-wrap",
      className
    )}>
      <code>{codeContent}</code>
    </pre>
  );

  return (
    <div className="relative group mb-6">
      {/* Header with language badge and filename */}
      <div className="flex items-center justify-between bg-muted/30 border border-b-0 rounded-t-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <Code2 className={cn("h-4 w-4", languageColor)} />
          <span className="text-sm font-medium text-muted-foreground">
            {filename || displayName}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
        </div>
      </div>

      {/* Code content */}
      <div className="relative">
        {typeof window !== 'undefined' ? (
          <SyntaxHighlighter
            language={normalizedLanguage}
            style={theme === 'dark' ? vscDarkPlus : oneLight}
            showLineNumbers={showLineNumbers}
            className={cn(
              "!mt-0 !rounded-t-none !rounded-b-lg !border-t-0",
              "!bg-card/80 border border-border",
              className
            )}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderTop: 'none',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              }
            }}
          >
            {codeContent.trim()}
          </SyntaxHighlighter>
        ) : (
          <FallbackCode />
        )}

        {/* Copy button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className={cn(
            "absolute top-3 right-3 h-8 w-8 p-0",
            "opacity-0 group-hover:opacity-100 transition-all duration-200",
            "bg-background/90 hover:bg-background border border-border/50",
            "shadow-sm hover:shadow-md"
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
    </div>
  );
}