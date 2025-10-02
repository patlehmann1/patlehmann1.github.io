const TTS_REPLACEMENTS: Record<string, string> = {
  'homes.com': 'homes dot com',
  'Homes.com': 'Homes dot com',
  'CoStar': 'co star',
  'CoStar Group': 'co star group',
  'Global Payments': 'global payments',
  'Global Payments Inc.': 'global payments inc',
  'React.js': 'react jay ess',
  'React': 'react',
  'Node.js': 'node jay ess',
  'Node': 'node',
  'Angular': 'angular',
  'Backbone.js': 'backbone jay ess',
  'Backbone': 'backbone',
  'Express.js': 'express jay ess',
  'Express': 'express',
  'C# .NET': 'C sharp dot net',
  'C#': 'C sharp',
  'TypeScript': 'type script',
  'JavaScript': 'java script',
  'GitHub': 'git hub',
  'npm': 'N P M',
  'API': 'A P I',
  'REST API': 'rest A P I',
  'GraphQL': 'graph Q L',
  'JSON': 'J son',
  'HTML': 'H T M L',
  'CSS': 'C S S',
  'SQL': 'sequel',
  'NoSQL': 'no sequel',
  'MongoDB': 'mongo D B',
  'PostgreSQL': 'postgres Q L',
  'MySQL': 'my sequel',
  'AWS': 'A W S',
  'Azure': 'azure',
  'Google Cloud': 'google cloud',
  'Docker': 'docker',
  'Kubernetes': 'koo ber net ease',
  'CI/CD': 'C I C D',
  'DevOps': 'dev ops',
  'JWT': 'J W T',
  'OAuth': 'oh auth',
  'HTTPS': 'H T T P S',
  'HTTP': 'H T T P',
  'URL': 'U R L',
  'URI': 'U R I',
  'DNS': 'D N S',
  'SSL': 'S S L',
  'TLS': 'T L S',
  'TCP/IP': 'T C P I P',
  'UDP': 'U D P',
  'SSH': 'S S H',
  'FTP': 'F T P',
  'SMTP': 'S M T P',
  'IMAP': 'I map',
  'POP3': 'pop three',
  'IDE': 'I D E',
  'CLI': 'C L I',
  'GUI': 'gooey',
  'UI': 'U I',
  'UX': 'U X',
  'SPA': 'single page application',
  'SSR': 'server side rendering',
  'CSR': 'client side rendering',
  'SEO': 'S E O',
  'DOM': 'dom',
  'BOM': 'bom',
  'AJAX': 'ajax',
  'XML': 'X M L',
  'YAML': 'yaml',
  'TOML': 'tom L',
  'Regex': 'reg ex',
  'RegEx': 'reg ex',
  'RegExp': 'reg ex',
  'OOP': 'O O P',
  'FP': 'functional programming',
  'SOLID': 'solid',
  'DRY': 'D R Y',
  'KISS': 'kiss',
  'YAGNI': 'yag knee',
  'TDD': 'T D D',
  'BDD': 'B D D',
  'E2E': 'end to end',
  'QA': 'Q A',
};

export function preprocessForTTS(content: string): string {
  let processed = content;

  for (const [term, replacement] of Object.entries(TTS_REPLACEMENTS)) {
    const regex = new RegExp(escapeRegExp(term), 'g');
    processed = processed.replace(regex, replacement);
  }

  return processed;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\s*>\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function prepareTTSContent(content: string, ttsContent?: string): string {
  const textToUse = ttsContent || content;
  const preprocessed = preprocessForTTS(textToUse);
  return stripMarkdown(preprocessed);
}