import { cn, formatDate, calculateReadingTime } from '../utils'
import { sortSkillsByLevelAndExperience } from '../skill-utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('px-2 py-1', 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500')
  })

  it('should override conflicting classes with later ones', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })

  it('should handle conditional classes', () => {
    expect(cn('px-2', true && 'py-1', false && 'bg-red-500')).toBe('px-2 py-1')
  })

  it('should handle undefined and null values', () => {
    expect(cn('px-2', undefined, null, 'py-1')).toBe('px-2 py-1')
  })

  it('should handle arrays of classes', () => {
    expect(cn(['px-2', 'py-1'], 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500')
  })

  it('should handle objects with boolean values', () => {
    expect(cn({
      'px-2': true,
      'py-1': false,
      'bg-blue-500': true
    })).toBe('px-2 bg-blue-500')
  })

  it('should handle complex scenarios', () => {
    expect(cn(
      'px-2 py-1',
      'bg-blue-500',
      { 'text-white': true, 'text-black': false },
      ['rounded', 'shadow'],
      false && 'hidden',
      true && 'block'
    )).toBe('px-2 py-1 bg-blue-500 text-white rounded shadow block')
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn(null, undefined, false)).toBe('')
  })

  it('should prioritize later conflicting Tailwind classes', () => {
    expect(cn('text-red-500 bg-blue-100', 'text-green-500 bg-red-100')).toBe('text-green-500 bg-red-100')
    expect(cn('p-4 m-2', 'p-6')).toBe('m-2 p-6')
  })
})

describe('formatDate utility function', () => {
  it('should format valid dates to US locale format', () => {
    // Test the actual behavior regardless of timezone
    const testDate = '2024-01-15T12:00:00.000Z'
    const result = formatDate(testDate)
    expect(result).toMatch(/January \d{1,2}, 2024/)
    expect(result).toContain('2024')
    expect(result).toContain('January')
  })

  it('should format dates consistently', () => {
    // Test that the same input always produces the same output
    const dateInput = '2024-06-15'
    const result1 = formatDate(dateInput)
    const result2 = formatDate(dateInput)
    expect(result1).toBe(result2)
  })

  it('should handle ISO datetime strings', () => {
    const result = formatDate('2024-01-15T10:30:00Z')
    expect(result).toContain('2024')
    expect(result).toContain('January')
  })

  it('should handle different date string formats', () => {
    // Test that different formats are processed
    expect(formatDate('2024/01/15')).toContain('2024')
    expect(formatDate('01/15/2024')).toContain('2024')
  })

  it('should handle leap year dates', () => {
    const result = formatDate('2024-02-29')
    expect(result).toContain('2024')
    expect(result).toContain('February')
  })

  it('should handle invalid date strings gracefully', () => {
    // Invalid dates return "Invalid Date" when formatted
    expect(formatDate('invalid-date')).toBe('Invalid Date')
    expect(formatDate('2024-13-01')).toBe('Invalid Date') // Invalid month
    expect(formatDate('')).toBe('Invalid Date')
  })

  it('should return proper string format for valid dates', () => {
    const result = formatDate('2024-07-04')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
    expect(result).not.toBe('Invalid Date')
  })

  it('should handle edge case years', () => {
    // Test very old and future dates (accounting for timezone differences)
    const oldDate = formatDate('1900-06-15T12:00:00Z') // Use midday to avoid timezone issues
    const futureDate = formatDate('2100-06-15T12:00:00Z')

    expect(oldDate).toMatch(/\d{4}/) // Should contain a 4-digit year
    expect(futureDate).toMatch(/\d{4}/) // Should contain a 4-digit year
    expect(futureDate).toContain('2100') // Future date should work
  })

  it('should use consistent month names', () => {
    const jan = formatDate('2024-01-15')
    const dec = formatDate('2024-12-15')

    expect(jan).toContain('January')
    expect(dec).toContain('December')
  })
})

describe('calculateReadingTime utility function', () => {
  it('should calculate reading time for typical content lengths', () => {
    // Using default 200 words per minute from BLOG_CONFIG
    const shortContent = 'This is a short piece of content with exactly ten words.'
    expect(calculateReadingTime(shortContent)).toBe(1) // 10 words / 200 wpm = 0.05 min, rounded up to 1

    const mediumContent = Array(100).fill('word').join(' ')
    expect(calculateReadingTime(mediumContent)).toBe(1) // 100 words / 200 wpm = 0.5 min, rounded up to 1

    const longContent = Array(400).fill('word').join(' ')
    expect(calculateReadingTime(longContent)).toBe(2) // 400 words / 200 wpm = 2 min exactly
  })

  it('should handle empty and whitespace-only content', () => {
    // Note: The implementation uses content.trim().split(/\s+/).length
    // For empty string: ''.trim().split(/\s+/) returns [''] with length 1
    // So empty content returns Math.ceil(1 / 200) = 1
    expect(calculateReadingTime('')).toBe(1) // Empty content: [''] has length 1
    expect(calculateReadingTime('   ')).toBe(1) // Only whitespace: [''] after trim
    expect(calculateReadingTime('\n\t\r')).toBe(1) // Only whitespace characters: [''] after trim
  })

  it('should handle single word content', () => {
    expect(calculateReadingTime('word')).toBe(1) // 1 word / 200 wpm = 0.005 min, rounded up to 1
    expect(calculateReadingTime('hello')).toBe(1)
  })

  it('should handle content with various whitespace patterns', () => {
    expect(calculateReadingTime('word1   word2\n\nword3\tword4')).toBe(1) // 4 words
    expect(calculateReadingTime('word1\r\nword2   word3')).toBe(1) // 3 words
  })

  it('should handle content with punctuation correctly', () => {
    const contentWithPunctuation = 'Hello, world! This is a test. How are you today?'
    expect(calculateReadingTime(contentWithPunctuation)).toBe(1) // 10 words
  })

  it('should handle very long content accurately', () => {
    const veryLongContent = Array(1000).fill('word').join(' ')
    expect(calculateReadingTime(veryLongContent)).toBe(5) // 1000 words / 200 wpm = 5 min

    const extraLongContent = Array(1500).fill('word').join(' ')
    expect(calculateReadingTime(extraLongContent)).toBe(8) // 1500 words / 200 wpm = 7.5 min, rounded up to 8
  })

  it('should handle content with line breaks and paragraphs', () => {
    const paragraphContent = `
      This is the first paragraph with some words.

      This is the second paragraph with more words.

      And this is the third paragraph.
    `
    // Should count all words regardless of line breaks
    const wordCount = paragraphContent.trim().split(/\s+/).length
    const expectedTime = Math.ceil(wordCount / 200)
    expect(calculateReadingTime(paragraphContent)).toBe(expectedTime)
  })

  it('should handle content with special characters and numbers', () => {
    const specialContent = 'The price is $19.99! Email us at test@example.com or call (555) 123-4567.'
    expect(calculateReadingTime(specialContent)).toBe(1) // Should count numbers and email as words
  })

  it('should handle markdown-like content', () => {
    const markdownContent = '# Title\n\n**Bold text** and *italic text* with [links](http://example.com).'
    expect(calculateReadingTime(markdownContent)).toBe(1) // Should count all words including markdown
  })

  it('should round up partial minutes consistently', () => {
    // Test edge cases around rounding
    const content199Words = Array(199).fill('word').join(' ')
    expect(calculateReadingTime(content199Words)).toBe(1) // 199/200 = 0.995, rounds up to 1

    const content201Words = Array(201).fill('word').join(' ')
    expect(calculateReadingTime(content201Words)).toBe(2) // 201/200 = 1.005, rounds up to 2
  })

  it('should handle typical blog post lengths', () => {
    // Typical short blog post (300-500 words)
    const shortBlogPost = Array(350).fill('word').join(' ')
    expect(calculateReadingTime(shortBlogPost)).toBe(2) // 350/200 = 1.75, rounds up to 2

    // Typical medium blog post (800-1200 words)
    const mediumBlogPost = Array(1000).fill('word').join(' ')
    expect(calculateReadingTime(mediumBlogPost)).toBe(5) // 1000/200 = 5 exactly

    // Typical long blog post (2000+ words)
    const longBlogPost = Array(2500).fill('word').join(' ')
    expect(calculateReadingTime(longBlogPost)).toBe(13) // 2500/200 = 12.5, rounds up to 13
  })
})

describe('sortSkillsByLevelAndExperience utility function', () => {
  const testSkills = [
    { name: "Angular", level: 3, years: "2+ years", description: "Frontend framework" },
    { name: "Bootstrap", level: 5, years: "6+ years", description: "CSS framework" },
    { name: "Jest", level: 5, years: "5+ years", description: "Testing framework" },
    { name: ".NET", level: 5, years: "4+ years", description: "Backend framework" },
    { name: "React", level: 4, years: "6+ years", description: "Frontend library" },
    { name: "Visual Studio", level: 4, years: "4+ years", description: "IDE" },
    { name: "Material-UI", level: 3, years: "2+ years", description: "Component library" },
    { name: "AWS", level: 3, years: "3+ years", description: "Cloud platform" },
  ];

  it('should sort skills by level first (highest to lowest)', () => {
    const sorted = sortSkillsByLevelAndExperience(testSkills);

    // Check that level 5 skills come first
    expect(sorted[0].level).toBe(5);
    expect(sorted[1].level).toBe(5);
    expect(sorted[2].level).toBe(5);

    // Check that level 4 skills come next
    expect(sorted[3].level).toBe(4);
    expect(sorted[4].level).toBe(4);

    // Check that level 3 skills come last
    expect(sorted[5].level).toBe(3);
    expect(sorted[6].level).toBe(3);
    expect(sorted[7].level).toBe(3);
  });

  it('should sort by years of experience within same level (higher years first)', () => {
    const sorted = sortSkillsByLevelAndExperience(testSkills);

    // Among level 5 skills: Bootstrap (6+), Jest (5+), .NET (4+)
    const level5Skills = sorted.filter(skill => skill.level === 5);
    expect(level5Skills[0].name).toBe('Bootstrap'); // 6+ years
    expect(level5Skills[1].name).toBe('Jest'); // 5+ years
    expect(level5Skills[2].name).toBe('.NET'); // 4+ years

    // Among level 4 skills: React (6+), Visual Studio (4+)
    const level4Skills = sorted.filter(skill => skill.level === 4);
    expect(level4Skills[0].name).toBe('React'); // 6+ years
    expect(level4Skills[1].name).toBe('Visual Studio'); // 4+ years
  });

  it('should sort alphabetically by name when level and years are the same', () => {
    const skillsWithSameLevelAndYears = [
      { name: "Zebra", level: 3, years: "2+ years", description: "Test" },
      { name: "Alpha", level: 3, years: "2+ years", description: "Test" },
      { name: "Beta", level: 3, years: "2+ years", description: "Test" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skillsWithSameLevelAndYears);
    expect(sorted[0].name).toBe('Alpha');
    expect(sorted[1].name).toBe('Beta');
    expect(sorted[2].name).toBe('Zebra');
  });

  it('should handle years parsing correctly', () => {
    const skillsWithVariousYears = [
      { name: "Skill1", level: 3, years: "10+ years", description: "Test" },
      { name: "Skill2", level: 3, years: "1+ year", description: "Test" },
      { name: "Skill3", level: 3, years: "5+ years", description: "Test" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skillsWithVariousYears);
    expect(sorted[0].name).toBe('Skill1'); // 10+ years
    expect(sorted[1].name).toBe('Skill3'); // 5+ years
    expect(sorted[2].name).toBe('Skill2'); // 1+ year
  });

  it('should not mutate the original array', () => {
    const originalSkills = [...testSkills];
    const sorted = sortSkillsByLevelAndExperience(testSkills);

    expect(testSkills).toEqual(originalSkills);
    expect(sorted).not.toBe(testSkills); // Different reference
  });

  it('should handle empty array', () => {
    const sorted = sortSkillsByLevelAndExperience([]);
    expect(sorted).toEqual([]);
  });

  it('should handle single skill', () => {
    const singleSkill = [{ name: "Solo", level: 3, years: "2+ years", description: "Test" }];
    const sorted = sortSkillsByLevelAndExperience(singleSkill);
    expect(sorted).toEqual(singleSkill);
    expect(sorted).not.toBe(singleSkill); // Different reference
  });

  it('should handle edge cases in years parsing', () => {
    const skillsWithEdgeCases = [
      { name: "Normal", level: 3, years: "5+ years", description: "Test" },
      { name: "NoNumber", level: 3, years: "years", description: "Test" },
      { name: "Empty", level: 3, years: "", description: "Test" },
      { name: "DoubleDigit", level: 3, years: "15+ years", description: "Test" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skillsWithEdgeCases);
    expect(sorted[0].name).toBe('DoubleDigit'); // 15+ years
    expect(sorted[1].name).toBe('Normal'); // 5+ years
    // Empty and NoNumber should fall back to 0 and then sort alphabetically
    expect(sorted[2].name).toBe('Empty'); // 0 years (alphabetically before NoNumber)
    expect(sorted[3].name).toBe('NoNumber'); // 0 years
  });

  it('should handle real-world skills data correctly', () => {
    // Test with actual skills from the app
    const realSkills = [
      { name: "TypeScript", level: 5, years: "6+ years", description: "Type-safe JavaScript" },
      { name: "JavaScript", level: 5, years: "6+ years", description: "Dynamic web development" },
      { name: "C#", level: 5, years: "4+ years", description: "Backend language" },
      { name: "SQL", level: 4, years: "6+ years", description: "Database queries" },
    ];

    const sorted = sortSkillsByLevelAndExperience(realSkills);

    // Level 5 skills should come first, sorted by years then alphabetically
    expect(sorted[0].level).toBe(5);
    expect(sorted[1].level).toBe(5);
    expect(sorted[2].level).toBe(5);

    // Among level 5 with 6+ years: JavaScript and TypeScript (alphabetical)
    const level5With6Years = sorted.filter(s => s.level === 5 && s.years === "6+ years");
    expect(level5With6Years[0].name).toBe('JavaScript'); // J comes before T
    expect(level5With6Years[1].name).toBe('TypeScript');

    // C# should come after (4+ years)
    expect(sorted[2].name).toBe('C#');

    // SQL should be last (level 4)
    expect(sorted[3].name).toBe('SQL');
    expect(sorted[3].level).toBe(4);
  });
})