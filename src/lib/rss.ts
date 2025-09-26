import { BlogPost } from './types';

export function generateRSSFeed(posts: BlogPost[]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://patricklehmann.io';
  const buildDate = new Date().toUTCString();

  const rssItems = posts.map(post => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const pubDate = new Date(post.publishedAt).toUTCString();

    const escapeXml = (str: string) => {
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