import { generateRSSFeed } from '../rss'
import { BlogPost } from '../types'

describe('RSS utilities', () => {
  const mockPosts: BlogPost[] = [
    {
      slug: 'test-post-1' as any,
      title: 'Test Post 1',
      description: 'This is a test post description',
      content: 'This is the content of the test post',
      publishedAt: '2024-01-15',
      tags: ['react', 'testing'],
      readingTime: 5,
      featured: true
    },
    {
      slug: 'test-post-2' as any,
      title: 'Test Post 2 with <HTML> & "Quotes"',
      description: 'Description with special characters: <>&"\'',
      content: 'Content with special characters',
      publishedAt: '2024-01-10',
      tags: ['javascript', 'web'],
      readingTime: 3,
      featured: false
    }
  ]

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  describe('generateRSSFeed', () => {
    it('should generate valid RSS XML structure', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(rss).toContain('<rss version="2.0"')
      expect(rss).toContain('<channel>')
      expect(rss).toContain('</channel>')
      expect(rss).toContain('</rss>')
    })

    it('should include channel metadata', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<title>Patrick Lehmann - Articles &amp; Insights</title>')
      expect(rss).toContain('<description>Exploring AI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering</description>')
      expect(rss).toContain('<language>en-US</language>')
      expect(rss).toContain('<managingEditor>patlehmann1@gmail.com (Patrick Lehmann)</managingEditor>')
      expect(rss).toContain('<webMaster>patlehmann1@gmail.com (Patrick Lehmann)</webMaster>')
      expect(rss).toContain('<generator>Next.js RSS Generator</generator>')
    })

    it('should use environment site URL when available', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<link>https://example.com</link>')
      expect(rss).toContain('<image>')
      expect(rss).toContain('<url>https://example.com/favicon.svg</url>')
      expect(rss).toContain('href="https://example.com/rss.xml"')
    })

    it('should fallback to localhost when no environment URL is set', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<link>http://localhost:3000</link>')
      expect(rss).toContain('<url>http://localhost:3000/favicon.svg</url>')
      expect(rss).toContain('href="http://localhost:3000/rss.xml"')
    })

    it('should include all post items', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<item>')
      expect(rss).toContain('Test Post 1')
      expect(rss).toContain('Test Post 2 with &lt;HTML&gt; &amp; &quot;Quotes&quot;')
      expect(rss).toContain('This is a test post description')
    })

    it('should escape HTML entities in titles and descriptions', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('&lt;HTML&gt;')
      expect(rss).toContain('&amp;')
      expect(rss).toContain('&quot;Quotes&quot;')
      expect(rss).toContain('special characters: &lt;&gt;&amp;&quot;&#39;')
    })

    it('should generate correct post URLs', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<link>https://example.com/blog/test-post-1</link>')
      expect(rss).toContain('<guid isPermaLink="true">https://example.com/blog/test-post-1</guid>')
      expect(rss).toContain('<link>https://example.com/blog/test-post-2</link>')
      expect(rss).toContain('<guid isPermaLink="true">https://example.com/blog/test-post-2</guid>')
    })

    it('should include publication dates in RFC 2822 format', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<pubDate>')
      expect(rss).toContain('</pubDate>')
      // Should contain properly formatted date strings
      expect(rss).toMatch(/<pubDate>[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT<\/pubDate>/)
    })

    it('should include lastBuildDate and channel pubDate', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<lastBuildDate>')
      expect(rss).toContain('</lastBuildDate>')
      expect(rss).toMatch(/<lastBuildDate>[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT<\/lastBuildDate>/)
    })

    it('should include author information for each post', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<author>patlehmann1@gmail.com (Patrick Lehmann)</author>')
    })

    it('should include post tags as categories', () => {
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<category>react</category>')
      expect(rss).toContain('<category>testing</category>')
      expect(rss).toContain('<category>javascript</category>')
      expect(rss).toContain('<category>web</category>')
    })

    it('should include atom self-link', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
      const rss = generateRSSFeed(mockPosts)

      expect(rss).toContain('<atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml" />')
    })

    it('should handle empty posts array', () => {
      const rss = generateRSSFeed([])

      expect(rss).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(rss).toContain('<channel>')
      expect(rss).toContain('</channel>')
      expect(rss).not.toContain('<item>')
    })

    it('should handle posts with empty tags', () => {
      const postsWithEmptyTags: BlogPost[] = [
        {
          slug: 'no-tags-post' as any,
          title: 'Post Without Tags',
          description: 'A post with no tags',
          content: 'Content',
          publishedAt: '2024-01-01',
          tags: [],
          readingTime: 2
        }
      ]

      const rss = generateRSSFeed(postsWithEmptyTags)

      expect(rss).toContain('<title>Post Without Tags</title>')
      expect(rss).not.toContain('<category>')
    })

    it('should handle posts with special characters in tags', () => {
      const postsWithSpecialTags: BlogPost[] = [
        {
          slug: 'special-tags-post' as any,
          title: 'Post With Special Tags',
          description: 'A post with special character tags',
          content: 'Content',
          publishedAt: '2024-01-01',
          tags: ['C++', 'Node.js', '<script>'],
          readingTime: 2
        }
      ]

      const rss = generateRSSFeed(postsWithSpecialTags)

      expect(rss).toContain('<category>C++</category>')
      expect(rss).toContain('<category>Node.js</category>')
      expect(rss).toContain('<category>&lt;script&gt;</category>')
    })

    it('should properly format dates for different date input formats', () => {
      const postsWithDifferentDates: BlogPost[] = [
        {
          slug: 'iso-date-post' as any,
          title: 'ISO Date Post',
          description: 'Post with ISO date',
          content: 'Content',
          publishedAt: '2024-01-15T10:30:00Z',
          tags: [],
          readingTime: 2
        }
      ]

      const rss = generateRSSFeed(postsWithDifferentDates)

      expect(rss).toContain('<pubDate>')
      expect(rss).toMatch(/<pubDate>[A-Za-z]{3}, 15 Jan 2024 \d{2}:\d{2}:\d{2} GMT<\/pubDate>/)
    })
  })

  describe('XML escaping function', () => {
    it('should escape all required XML entities', () => {
      const testString = 'Test & <tag> "quotes" \'apostrophe\' >'
      const rss = generateRSSFeed([
        {
          slug: 'escape-test' as any,
          title: testString,
          description: testString,
          content: 'Content',
          publishedAt: '2024-01-01',
          tags: [testString],
          readingTime: 1
        }
      ])

      expect(rss).toContain('Test &amp; &lt;tag&gt; &quot;quotes&quot; &#39;apostrophe&#39; &gt;')
    })
  })
})