# Newsletter API Proxy - Cloudflare Worker

This directory contains a Cloudflare Worker that acts as a secure proxy between your static website and the Kit.com newsletter API.

## What This Does

**Problem**: Your Kit.com API key was exposed in client-side code, making it vulnerable to abuse.

**Solution**: This worker proxies API requests to Kit.com, keeping your API key secure in Cloudflare's environment variables.

## Files

- `newsletter-worker.js` - The Cloudflare Worker script (API proxy)
- `wrangler.toml` - Worker configuration file
- `DEPLOYMENT.md` - Complete deployment guide
- `README.md` - This file

## Quick Start

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**TL;DR**:
```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
cd cloudflare-worker
wrangler deploy

# Set API key secret
wrangler secret put KIT_API_KEY
# (paste: kit_b2fd0c187a0e1a34f4af47b881a7f53c)
```

## Architecture

```
Your Website (Static)
       ↓
       ↓ POST /subscribe
       ↓ { email, firstName }
       ↓
Cloudflare Worker
       ↓ Adds API Key
       ↓ from env.KIT_API_KEY
       ↓
Kit.com API
```

## Security Features

- ✅ API key stored as encrypted secret in Cloudflare
- ✅ CORS configured for your domains only
- ✅ Input validation (email format, required fields)
- ✅ Error handling and logging
- ✅ No API key exposure in browser/git

## Cost

**Free Tier**: 100,000 requests/day

For a personal newsletter, this is more than enough.

## Local Testing

You can test the worker locally before deploying:

```bash
npm install -g wrangler
wrangler dev
```

This starts a local development server at `http://localhost:8787`

## Updating

Made changes to `newsletter-worker.js`?

```bash
wrangler deploy
```

Changes go live immediately.

## Support

- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Check [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- Visit [Kit.com API Docs](https://developers.kit.com/)
