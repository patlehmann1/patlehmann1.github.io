# GitHub Actions Workflows

This directory contains automated workflows for the portfolio site.

## Workflows

### `deploy.yml` - Production Deployment
Deploys the Next.js site to GitHub Pages with quality gates (linting, type checking, tests, security audit).

**Triggers**: Push to master branch

### `pr-quality-checks.yml` - Pull Request Quality Gates
Runs quality checks on pull requests.

**Triggers**: Pull request creation/update

### `notify-new-blog-post.yml` - Email Notifications for New Posts
Automatically detects new blog posts and sends email notifications to subscribers via Kit.com.

**Triggers**:
- Push to master (when `src/content/blog/articles.json` changes)
- Manual workflow dispatch (with dry-run option)

## Setup: Blog Post Email Notifications

### Prerequisites
1. Kit.com account with API access
2. Subscribers in your Kit.com account

### Configuration Steps

#### 1. Get Your Kit.com API Key
1. Log in to [Kit.com](https://app.kit.com)
2. Go to Settings → Account Settings
3. Navigate to "API" section
4. Copy your API key (starts with `kit_`)

#### 2. Add API Key to GitHub Secrets
1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `KIT_API_KEY`
5. Value: Paste your Kit.com API key
6. Click "Add secret"

#### 3. Test with Dry Run
Before sending real emails, test the workflow:

1. Go to Actions tab in your repository
2. Select "Notify Subscribers of New Blog Post"
3. Click "Run workflow"
4. Keep "Dry run mode" checked ✅
5. Click "Run workflow"

This will process new posts and create HTML email previews without actually sending emails. Download the preview artifacts to see what the emails will look like.

#### 4. Go Live
Once you're happy with the preview:

1. The workflow will run automatically when you push a new blog post to master
2. It detects new posts by comparing `src/content/blog/articles.json` with the previous commit
3. For each new post, it sends a broadcast email to all Kit.com subscribers

### How It Works

**Detection Logic:**
- Compares current `articles.json` with previous commit
- Identifies new posts by slug (posts not in previous version)
- Only processes truly new posts (prevents duplicate emails)

**Email Content:**
- Subject: "New Post: {title}"
- HTML email with post title, excerpt (first 200 chars), and "Read More" button
- Links to your live site: `https://patricklehmann.io/blog/{slug}`
- Professional styling with your brand colors

**Safety Features:**
- ✅ Dry-run mode for testing without sending
- ✅ Only triggers on `articles.json` changes (not every commit)
- ✅ Validates API key before sending
- ✅ Detailed logging of all actions

### Troubleshooting

**"KIT_API_KEY secret not configured" error:**
- Make sure you added the secret in repository settings
- Secret name must be exactly `KIT_API_KEY` (case-sensitive)

**"No new posts detected" message:**
- The workflow only sends emails for posts added since the last commit
- If you updated an existing post (not added a new one), no email is sent
- This is intentional to prevent duplicate notifications

**API errors (401, 403, etc.):**
- Check that your Kit.com API key is valid and hasn't expired
- Verify your Kit.com account has API access enabled
- Check Kit.com API status at https://status.kit.com

### Manual Testing

You can manually trigger the workflow anytime from the Actions tab:
1. Go to Actions → "Notify Subscribers of New Blog Post"
2. Click "Run workflow"
3. Choose dry-run mode for testing
4. View the email previews in the workflow artifacts

### API Documentation

For more details on the Kit.com API:
- [Kit Developer Documentation](https://developers.kit.com/)
- [Kit API v4 Reference](https://developers.kit.com/v4)

## Support

If you encounter issues with the workflows:
1. Check the workflow run logs in the Actions tab
2. Review the error messages and troubleshooting section above
3. Verify all secrets are configured correctly
4. Test with dry-run mode first before sending live emails
