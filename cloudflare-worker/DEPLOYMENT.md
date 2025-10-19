# Cloudflare Worker Deployment Guide

This guide walks you through deploying the newsletter API proxy to Cloudflare Workers.

## Why Cloudflare Workers?

- **Free Tier**: 100,000 requests/day (more than enough for a personal newsletter)
- **Global CDN**: Fast response times worldwide
- **Secure**: API key stored as environment variable, never exposed
- **Simple**: No server management required
- **Works with GitHub Pages**: Your main site stays static

---

## Prerequisites

- Cloudflare account (free tier is fine)
- Your Kit.com API key
- Node.js installed (v16 or later)

---

## Step 1: Create Cloudflare Account

1. Go to [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Sign up for a free account
3. Verify your email address

---

## Step 2: Install Wrangler CLI

Wrangler is Cloudflare's official CLI for managing Workers.

```bash
npm install -g wrangler
```

Verify installation:
```bash
wrangler --version
```

---

## Step 3: Authenticate Wrangler

```bash
wrangler login
```

This will open your browser and prompt you to log in to Cloudflare. Once logged in, Wrangler will have access to deploy workers to your account.

---

## Step 4: Deploy the Worker

Navigate to the `cloudflare-worker` directory:

```bash
cd cloudflare-worker
```

Deploy the worker:

```bash
wrangler deploy
```

You should see output like:
```
Total Upload: xx.xx KiB / gzip: xx.xx KiB
Uploaded newsletter-api (x.xx sec)
Published newsletter-api (x.xx sec)
  https://newsletter-api.<your-subdomain>.workers.dev
```

**Copy the worker URL** - you'll need it in the next step!

---

## Step 5: Set Your Kit.com API Key

The API key must be set as a secret (encrypted environment variable):

```bash
wrangler secret put KIT_API_KEY
```

When prompted, paste your Kit.com API key:
```
kit_b2fd0c187a0e1a34f4af47b881a7f53c
```

Press Enter. The secret is now securely stored in Cloudflare.

---

## Step 6: Update Your Newsletter Component

Now update your Next.js project to use the Cloudflare Worker.

### Option A: Environment Variable (Recommended)

Create or update `.env.local` in your project root:

```bash
NEXT_PUBLIC_NEWSLETTER_API_URL=https://newsletter-api.<your-subdomain>.workers.dev
```

**Replace `<your-subdomain>`** with your actual worker URL from Step 4.

### Option B: Hardcode (Quick Test)

Edit `src/components/newsletter/newsletter-signup.tsx`:

```typescript
const WORKER_URL = 'https://newsletter-api.<your-subdomain>.workers.dev';
```

Replace the placeholder URL with your actual worker URL.

---

## Step 7: Test Locally

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your site (usually `http://localhost:3000`)

3. Find the newsletter signup form

4. Try subscribing with a test email:
   - First Name: `Test`
   - Email: `your-email@example.com`

5. Check for success message

6. Verify in your Kit.com dashboard that the subscriber was added

---

## Step 8: Deploy Your Site

Once everything works locally:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Cloudflare Worker for secure newsletter API"
   git push
   ```

2. Your GitHub Pages site will automatically rebuild with the new configuration

---

## Troubleshooting

### Worker not deploying

**Error**: `Authentication required`
```bash
wrangler login
```

**Error**: `No wrangler.toml found`
Make sure you're in the `cloudflare-worker/` directory.

### CORS errors in browser

Check that your domain is listed in `allowedOrigins` in `newsletter-worker.js`:

```javascript
const allowedOrigins = [
  'https://patricklehmann.io',
  'https://www.patricklehmann.io',
  'http://localhost:3000',
];
```

Add your production domain if it's different.

### API key not working

**Error**: `Server configuration error`

Make sure you set the secret correctly:
```bash
wrangler secret put KIT_API_KEY
```

List all secrets to verify:
```bash
wrangler secret list
```

### Worker URL not working

Verify the worker is deployed:
```bash
wrangler deployments list
```

Test the worker directly with curl:
```bash
curl -X POST https://newsletter-api.<your-subdomain>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}'
```

---

## Advanced Configuration

### Custom Domain

Instead of `newsletter-api.<your-subdomain>.workers.dev`, you can use your own domain:

1. Add your domain to Cloudflare (if not already)
2. In Cloudflare dashboard, go to Workers & Pages → newsletter-api → Settings → Triggers
3. Add a custom domain: `api.patricklehmann.io` or `newsletter-api.patricklehmann.io`
4. Update your `.env.local` with the new URL

### Rate Limiting

To prevent abuse, you can add rate limiting:

```javascript
// In newsletter-worker.js
const RATE_LIMIT = 5; // requests per minute per IP
const RATE_WINDOW = 60 * 1000; // 1 minute
```

See Cloudflare's rate limiting documentation for implementation details.

### Monitoring

View worker analytics in the Cloudflare dashboard:
- Workers & Pages → newsletter-api → Metrics
- See requests, errors, and performance

---

## Updating the Worker

If you make changes to `newsletter-worker.js`:

```bash
cd cloudflare-worker
wrangler deploy
```

Changes are live immediately (no cache to clear).

---

## Cost & Limits

**Cloudflare Workers Free Tier**:
- ✅ 100,000 requests/day
- ✅ 10ms CPU time per request
- ✅ 128 MB memory
- ✅ Unlimited workers

For a personal newsletter, you'll likely never exceed the free tier.

If you do, the paid tier is $5/month for 10 million requests/month.

---

## Security Best Practices

1. ✅ **Never commit API keys to git** - Always use `wrangler secret`
2. ✅ **Keep CORS restrictive** - Only allow your own domains
3. ✅ **Validate input** - The worker validates email format and required fields
4. ✅ **Monitor usage** - Check Cloudflare analytics regularly

---

## Need Help?

- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/
- Kit.com API Docs: https://developers.kit.com/
- Cloudflare Community: https://community.cloudflare.com/

---

## Summary

Once deployed, your setup will look like this:

```
Static Site (GitHub Pages)
        ↓
Cloudflare Worker (API Proxy)
        ↓
Kit.com API (Newsletter Service)
```

✅ API key is secure (never exposed to browsers)
✅ Site stays fully static
✅ Free tier covers typical usage
✅ Fast global performance
