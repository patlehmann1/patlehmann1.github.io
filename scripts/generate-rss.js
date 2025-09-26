const fs = require('fs');
const path = require('path');

// Import blog data - we'll need to read the JSON directly since this is Node.js
const articlesPath = path.join(__dirname, '../src/content/blog/articles.json');
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// RSS generation function (adapted from src/lib/rss.ts)
function generateRSSFeed(posts) {
  // Use environment variable or default to localhost for development
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://patricklehmann.io';
  const buildDate = new Date().toUTCString();

  // Sort posts by date (newest first)
  const sortedPosts = posts
    .map(article => ({
      ...article,
      content: article.content || ""
    }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const rssItems = sortedPosts.map(post => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const pubDate = new Date(post.publishedAt).toUTCString();

    // Escape HTML entities for XML
    const escapeXml = (str) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };

    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>contact@patricklehmann.io (Patrick Lehmann)</author>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('')}
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Patrick Lehmann - Articles &amp; Insights</title>
    <description>Exploring AI collaboration, work-life balance, faith-driven development, and lessons learned from modern software engineering</description>
    <link>${siteUrl}</link>
    <language>en-US</language>
    <managingEditor>contact@patricklehmann.io (Patrick Lehmann)</managingEditor>
    <webMaster>contact@patricklehmann.io (Patrick Lehmann)</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <generator>Next.js RSS Generator</generator>
    <image>
      <url>${siteUrl}/favicon.svg</url>
      <title>Patrick Lehmann - Articles &amp; Insights</title>
      <link>${siteUrl}</link>
    </image>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;
}

// Generate RSS and write to public directory
function generateStaticRSS() {
  try {
    console.log('🔄 Generating RSS feed...');

    const rssXml = generateRSSFeed(articlesData);
    const outputPath = path.join(__dirname, '../public/rss.xml');

    // Ensure public directory exists
    const publicDir = path.dirname(outputPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, rssXml, 'utf8');

    console.log(`✅ RSS feed generated successfully at ${outputPath}`);
    console.log(`📊 Included ${articlesData.length} blog posts`);
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    process.exit(1);
  }
}

// Run the RSS generation
generateStaticRSS();