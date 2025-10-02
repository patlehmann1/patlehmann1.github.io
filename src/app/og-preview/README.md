# Open Graph Preview Image Generator

This page generates a social media preview image template that matches your website's design system.

## How to Create Your Social Media Preview Image

1. **Navigate to the preview page**:
   ```
   http://localhost:3000/og-preview
   ```

2. **Take a screenshot**:
   - Use browser developer tools to set viewport to exactly **1200x630px**
   - Or use a browser extension/tool to capture at this exact size
   - Make sure to capture the full content without any browser UI

3. **Save the screenshot**:
   - Save as `public/og-image.png` in your project root
   - This will automatically be used for social media previews

## Technical Details

- **Dimensions**: 1200x630px (standard Open Graph image size)
- **Design**: Matches your website's warm color palette and design system
- **Content**: Includes your name, title, key message, and tech stack
- **Background**: Subtle grid pattern with floating elements

## Customization

To update the preview image:
1. Edit `/src/app/og-preview/page.tsx`
2. Refresh the preview page
3. Take a new screenshot
4. Replace `public/og-image.png`

The image will automatically appear when sharing your website on:
- Twitter/X
- LinkedIn
- Facebook
- Discord
- Slack
- Other social media platforms