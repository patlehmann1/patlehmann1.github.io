import { preprocessForTTS, stripMarkdown, prepareTTSContent } from '../tts-utils';

describe('tts-utils', () => {
  describe('preprocessForTTS', () => {
    it('should replace homes.com with homes dot com', () => {
      const input = 'Check out homes.com for more info';
      const result = preprocessForTTS(input);
      expect(result).toBe('Check out homes dot com for more info');
    });

    it('should replace C# with C sharp', () => {
      const input = 'I love programming in C#';
      const result = preprocessForTTS(input);
      expect(result).toBe('I love programming in C sharp');
    });

    it('should replace C# .NET with C sharp dot net', () => {
      const input = 'Transitioning to C# .NET was challenging';
      const result = preprocessForTTS(input);
      expect(result).toBe('Transitioning to C sharp dot net was challenging');
    });

    it('should replace multiple technical terms', () => {
      const input = 'We use TypeScript, JavaScript, and C# at homes.com';
      const result = preprocessForTTS(input);
      expect(result).toContain('type script');
      expect(result).toContain('java script');
      expect(result).toContain('C sharp');
      expect(result).toContain('homes dot com');
    });

    it('should handle case-sensitive replacements', () => {
      const input = 'Homes.com and homes.com are the same';
      const result = preprocessForTTS(input);
      expect(result).toContain('Homes dot com');
      expect(result).toContain('homes dot com');
    });

    it('should not replace partial matches', () => {
      const input = 'This is homesick, not homes.com';
      const result = preprocessForTTS(input);
      expect(result).toContain('homesick');
      expect(result).toContain('homes dot com');
    });
  });

  describe('stripMarkdown', () => {
    it('should remove code blocks', () => {
      const input = '# Title\n\n```javascript\nconst x = 1;\n```\n\nText';
      const result = stripMarkdown(input);
      expect(result).not.toContain('const x = 1');
      expect(result).toContain('Title');
      expect(result).toContain('Text');
    });

    it('should remove inline code', () => {
      const input = 'Use `console.log()` to debug';
      const result = stripMarkdown(input);
      expect(result).not.toContain('`');
      expect(result).toContain('Use');
      expect(result).toContain('to debug');
    });

    it('should remove headers', () => {
      const input = '## My Header\n\nSome content';
      const result = stripMarkdown(input);
      expect(result).not.toContain('##');
      expect(result).toContain('My Header');
    });

    it('should remove bold and italic formatting', () => {
      const input = 'This is **bold** and *italic*';
      const result = stripMarkdown(input);
      expect(result).toBe('This is bold and italic');
    });

    it('should convert links to text only', () => {
      const input = 'Check out [my website](https://example.com)';
      const result = stripMarkdown(input);
      expect(result).toBe('Check out my website');
    });

    it('should remove images', () => {
      const input = 'Here is an image: ![alt text](image.png)';
      const result = stripMarkdown(input);
      expect(result).toBe('Here is an image:');
    });
  });

  describe('prepareTTSContent', () => {
    it('should use ttsContent when provided', () => {
      const content = 'Original content with homes.com and C#';
      const ttsContent = 'Modified content with homes dot com and C sharp';
      const result = prepareTTSContent(content, ttsContent);
      expect(result).toContain('homes dot com');
      expect(result).toContain('C sharp');
    });

    it('should preprocess regular content when ttsContent is not provided', () => {
      const content = 'Content with homes.com and C#';
      const result = prepareTTSContent(content);
      expect(result).toContain('homes dot com');
      expect(result).toContain('C sharp');
    });

    it('should strip markdown from content', () => {
      const content = '## Header\n\nUse C# for `backend` development';
      const result = prepareTTSContent(content);
      expect(result).not.toContain('##');
      expect(result).not.toContain('`');
      expect(result).toContain('C sharp');
    });

    it('should apply both stripping and preprocessing', () => {
      const content = '**Bold text** about C# at homes.com with `code`';
      const result = prepareTTSContent(content);
      expect(result).not.toContain('**');
      expect(result).not.toContain('`');
      expect(result).toContain('C sharp');
      expect(result).toContain('homes dot com');
    });
  });
});