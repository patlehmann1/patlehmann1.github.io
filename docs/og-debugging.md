# Open Graph Debugging Guide

This guide helps diagnose and fix issues when your Open Graph images don't appear on social media platforms.

## 🔍 Quick Diagnostic Checklist

Before using debugging tools, verify these basics:

### ✅ File Verification
- [ ] Confirm `public/og-image.png` exists and has content (not 0 bytes)
- [ ] Image dimensions are exactly 1200x630 pixels
- [ ] File size is reasonable (under 5MB, ideally under 1MB)
- [ ] Image format is PNG or JPG

### ✅ URL Testing
- [ ] Direct image URL loads in browser: `https://patricklehmann.io/og-image.png`
- [ ] No 404 errors or redirects
- [ ] Image loads without authentication

### ✅ Meta Tag Verification
- [ ] View page source and confirm meta tags are present
- [ ] Meta tags use absolute URLs (not relative paths)
- [ ] No syntax errors in meta tag attributes

## 🛠️ Platform-Specific Debugging Tools

### Facebook/Meta Debugging
1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Enter your website URL: `https://patricklehmann.io`
   - Click "Debug" to see what Facebook crawlers see
   - Click "Scrape Again" to force refresh if needed
   - Look for errors or warnings about images

2. **Common Facebook Issues**:
   - Image too small (minimum 200x200px)
   - Image file size too large (max 5MB)
   - Server response too slow (>5 seconds)
   - Image URL returns non-200 HTTP status

### Twitter/X Debugging
1. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Enter your website URL: `https://patricklehmann.io`
   - Preview how cards appear
   - Check for validation errors

2. **Common Twitter Issues**:
   - Missing `twitter:card` meta tag
   - Image not accessible to Twitter bot
   - Incorrect image dimensions for card type

### LinkedIn Debugging
1. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
   - Enter your website URL: `https://patricklehmann.io`
   - View how content appears on LinkedIn
   - Force cache refresh if needed

2. **Common LinkedIn Issues**:
   - Image aspect ratio not optimal (1.91:1 preferred)
   - Missing Open Graph tags (LinkedIn relies heavily on OG)
   - Cache not refreshed after updates

## 🔧 Manual Testing Commands

### Test Image Accessibility
```bash
# Check if image is accessible
curl -I https://patricklehmann.io/og-image.png

# Should return 200 OK with image/png content-type
```

### Verify Meta Tags in Browser
1. Open your site: `https://patricklehmann.io`
2. View page source (Ctrl+U / Cmd+U)
3. Search for "og:image" and "twitter:image"
4. Verify URLs are absolute and correct

### Test with curl (Advanced)
```bash
# See what social media crawlers see
curl -A "facebookexternalhit/1.1" https://patricklehmann.io
curl -A "Twitterbot/1.0" https://patricklehmann.io
```

## 🚨 Common Issues & Solutions

### Issue: Image Appears Locally But Not on Social Media
**Cause**: Social platforms can't access the image
**Solutions**:
- Verify image is deployed to production
- Check CDN/hosting configuration
- Ensure no authentication required for image access

### Issue: Old Image Still Shows After Update
**Cause**: Social platforms cache aggressively
**Solutions**:
- Use platform debugging tools to force refresh
- Wait 24-48 hours for natural cache expiration
- Consider adding cache-busting parameter: `og-image.png?v=2`

### Issue: Meta Tags Missing in View Source
**Cause**: Client-side rendering or build issues
**Solutions**:
- Verify Next.js metadata API is working
- Check if explicit meta tags are rendered
- Ensure production build includes meta tags

### Issue: Image Dimensions Wrong
**Cause**: Image doesn't meet platform requirements
**Solutions**:
- Facebook: minimum 200x200px, recommended 1200x630px
- Twitter: minimum 144x144px, recommended 1200x630px
- LinkedIn: recommended aspect ratio 1.91:1

## 📱 Platform-Specific Requirements

### Facebook/Meta
- **Minimum Size**: 200x200px
- **Recommended Size**: 1200x630px (1.91:1 ratio)
- **Maximum Size**: 5MB
- **Formats**: JPG, PNG, GIF
- **Requirements**: Publicly accessible, no login required

### Twitter/X
- **Summary Card**: 120x120px minimum
- **Summary Large Image**: 300x157px minimum, 1200x630px recommended
- **Maximum Size**: 5MB
- **Formats**: JPG, PNG, WEBP, GIF
- **Requirements**: Absolute URL required

### LinkedIn
- **Recommended Size**: 1200x627px (1.91:1 ratio)
- **Minimum Size**: 400x200px
- **Maximum Size**: 5MB
- **Formats**: JPG, PNG
- **Requirements**: High quality, professional appearance

## 🔄 Cache Clearing Steps

### Force Social Media Cache Refresh
1. **Facebook**: Use Sharing Debugger → Click "Scrape Again"
2. **Twitter**: Use Card Validator → Click "Preview Card"
3. **LinkedIn**: Use Post Inspector → Click "Inspect"

### Browser Cache Clearing
1. Clear browser cache completely
2. Test in incognito/private browsing mode
3. Test from different device/network

### CDN Cache Clearing
If using a CDN (Cloudflare, AWS CloudFront, etc.):
1. Clear CDN cache for your domain
2. Wait for cache TTL to expire
3. Verify image loads with fresh headers

## 📊 Testing Checklist

After making changes, test in this order:

1. ✅ **Direct Image URL Test**
   - Visit: `https://patricklehmann.io/og-image.png`
   - Verify image loads and displays correctly

2. ✅ **Meta Tag Verification**
   - View source of your homepage
   - Confirm all OG and Twitter meta tags present
   - Verify absolute URLs in meta tags

3. ✅ **Facebook Debugging**
   - Test in Facebook Sharing Debugger
   - Force scrape if needed
   - Verify no errors or warnings

4. ✅ **Twitter Testing**
   - Test in Twitter Card Validator
   - Verify card preview appears correctly

5. ✅ **LinkedIn Testing**
   - Test in LinkedIn Post Inspector
   - Verify professional appearance

6. ✅ **Real-World Testing**
   - Share actual post on each platform
   - Verify image appears as expected
   - Check on mobile and desktop views

## 📞 Need Help?

If issues persist after following this guide:

1. Check browser developer console for errors
2. Verify your hosting/CDN configuration
3. Consider using a different image format (PNG ↔ JPG)
4. Test with a simplified test image to isolate issues
5. Ensure your domain SSL certificate is valid

Remember: Social media platforms can take 24-48 hours to refresh cached content, so be patient after making changes!