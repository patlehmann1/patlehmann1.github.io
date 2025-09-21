const fs = require('fs');
const path = require('path');

// Import blog data
const articlesPath = path.join(__dirname, '../src/content/blog/articles.json');
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// Sitemap generation function
function generateSitemap(posts) {
  // Use environment variable or default to localhost for development
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const buildDate = new Date().toISOString();

  // Sort posts by date (newest first)
  const sortedPosts = posts
    .map(article => ({
      ...article,
      content: article.content || ""
    }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Generate static pages
  const staticPages = [
    {
      url: `${siteUrl}/`,
      changefreq: 'monthly',
      priority: '1.0',
      lastmod: buildDate
    },
    {
      url: `${siteUrl}/blog`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: buildDate
    }
  ];

  // Generate blog post pages
  const blogPages = sortedPosts.map(post => {
    const postDate = new Date(post.publishedAt).toISOString();
    return {
      url: `${siteUrl}/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: postDate
    };
  });

  // Combine all pages
  const allPages = [...staticPages, ...blogPages];

  // Generate XML
  const xmlUrls = allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

// Generate sitemap and write to public directory
function generateStaticSitemap() {
  try {
    console.log('🗺️  Generating sitemap...');

    const sitemapXml = generateSitemap(articlesData);
    const outputPath = path.join(__dirname, '../public/sitemap.xml');

    // Ensure public directory exists
    const publicDir = path.dirname(outputPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, sitemapXml, 'utf8');

    console.log(`✅ Sitemap generated successfully at ${outputPath}`);
    console.log(`📊 Included ${articlesData.length + 2} total URLs:`);
    console.log('   • 1 homepage');
    console.log('   • 1 blog listing page');
    console.log(`   • ${articlesData.length} blog posts`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the sitemap generation
generateStaticSitemap();