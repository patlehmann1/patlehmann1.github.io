import { cn, formatDate, calculateReadingTime } from '../utils'

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