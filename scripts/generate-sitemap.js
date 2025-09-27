const fs = require('fs');
const path = require('path');

// Read site URL from constants
const constantsPath = path.join(__dirname, '../src/lib/constants.ts');
const constantsContent = fs.readFileSync(constantsPath, 'utf8');
const siteUrlMatch = constantsContent.match(/export const SITE_URL = "([^"]+)"/);
const SITE_URL = siteUrlMatch ? siteUrlMatch[1] : 'https://patricklehmann.io';

// Import blog data
const articlesPath = path.join(__dirname, '../src/content/blog/articles.json');
const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// Sitemap generation function
function generateSitemap(posts) {
  const siteUrl = SITE_URL;
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
    },
    {
      url: 'https://newsletter.patricklehmann.io',
      changefreq: 'monthly',
      priority: '0.6',
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
    console.log(`📊 Included ${articlesData.length + 3} total URLs:`);
    console.log('   • 1 homepage');
    console.log('   • 1 blog listing page');
    console.log('   • 1 newsletter landing page');
    console.log(`   • ${articlesData.length} blog posts`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the sitemap generation
generateStaticSitemap();