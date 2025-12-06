# GitHub Pages Migration Guide

## Executive Summary

**YES, your site IS compatible with GitHub Pages migration!** ✅

However, there are important trade-offs to consider. This document provides a comprehensive analysis of compatibility, migration steps, and recommendations.

---

## Compatibility Analysis

### ✅ What Makes This Site Compatible

1. **Static Single-Page Application**: Your site is a single-page CV with no dynamic routes
2. **No Server-Side Features**: No API routes, server-side rendering (SSR), or incremental static regeneration (ISR)
3. **Static Export Capable**: Next.js can generate a fully static HTML/CSS/JS bundle
4. **App Router with Static Content**: Using Next.js App Router but all pages are pre-rendered at build time
5. **No Backend Dependencies**: All data is client-side from `resume-data.tsx`

### ⚠️ Key Differences & Trade-offs

#### 1. **Analytics & Monitoring**

**Current (Vercel):**
- `@vercel/analytics` - Full analytics integration
- `@vercel/speed-insights` - Real-time performance monitoring

**GitHub Pages:**
- ❌ Vercel Analytics won't work (requires Vercel infrastructure)
- ❌ Speed Insights won't work (requires Vercel infrastructure)
- ✅ Alternative: Use Google Analytics, Plausible, or Umami
- ✅ Alternative: Use web-vitals library with custom reporting

**Action Required:**
- Remove or replace `@vercel/analytics` and `@vercel/speed-insights`
- Add alternative analytics solution (Google Analytics 4, Plausible, Fathom, etc.)

#### 2. **Build Configuration**

**Current:**
```javascript
// next.config.js
output: "standalone"  // Optimized for Vercel/Docker deployment
```

**GitHub Pages Required:**
```javascript
output: "export"  // Required for static HTML export
```

**Impact:**
- Must change `output` from `"standalone"` to `"export"`
- Will generate static HTML files in `out/` directory
- Image optimization will be different (no automatic optimization)

#### 3. **Image Optimization**

**Current (Vercel):**
- Automatic image optimization via Vercel's Image Optimization API
- Supports AVIF, WebP format conversion
- Responsive image generation
- On-demand optimization

**GitHub Pages:**
- ❌ No automatic image optimization
- ✅ Must use `unoptimized: true` or pre-optimize images manually
- ✅ Can use next-image-export-optimizer package as alternative

**Configuration Change Required:**
```javascript
// next.config.js
images: {
  unoptimized: true,  // Required for static export
}
```

#### 4. **Base Path & Asset Prefix**

**If deploying to `username.github.io/repo-name`:**
- Must set `basePath` in next.config.js
- All routes and assets will be prefixed

**If deploying to custom domain or `username.github.io`:**
- No base path needed
- Works same as Vercel

#### 5. **Deployment Speed & CDN**

**Vercel:**
- ⚡ Deploy on git push (~30-60 seconds)
- Global CDN with edge network (300+ locations)
- Automatic preview deployments for PRs
- Instant rollbacks

**GitHub Pages:**
- 🐢 Deploy via GitHub Actions (~2-5 minutes)
- GitHub's CDN (limited locations compared to Vercel)
- Manual preview deployment setup needed
- Manual rollbacks (revert commits)

#### 6. **Custom Domain & SSL**

**Both Support:**
- ✅ Custom domains
- ✅ Free SSL certificates
- ✅ Automatic HTTPS

**Differences:**
- Vercel: Automatic SSL with instant activation
- GitHub Pages: SSL takes ~24 hours for custom domains

#### 7. **Environment Variables**

**Current:**
- May use environment variables in build process
- Vercel manages env vars through dashboard

**GitHub Pages:**
- Use GitHub Secrets in Actions workflow
- Must configure in `.github/workflows/deploy.yml`

---

## Migration Steps

### Step 1: Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better debugging
  reactStrictMode: true,

  // CHANGED: Use export mode for static site generation
  output: "export",

  // CHANGED: Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-slot",
    ],
  },

  // Optional: Only needed if deploying to github.io/repo-name
  // basePath: "/repo-name",
  // assetPrefix: "/repo-name",
};

module.exports = nextConfig;
```

### Step 2: Replace Analytics

**Option A: Remove Analytics (Simplest)**

In `src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// REMOVED: import { Analytics } from "@vercel/analytics/react";
// REMOVED: import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import React from "react";

// ... metadata ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
        {/* REMOVED: <Analytics /> */}
        {/* REMOVED: <SpeedInsights /> */}
      </body>
    </html>
  );
}
```

**Option B: Replace with Google Analytics**

1. Install package:
```bash
yarn add @next/third-parties
```

2. Update layout.tsx:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

**Option C: Use Plausible Analytics (Privacy-Friendly)**

1. Install:
```bash
yarn add next-plausible
```

2. Add to layout.tsx:
```typescript
import PlausibleProvider from 'next-plausible'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <PlausibleProvider domain="sbarkar.com">
        <body>
          {children}
        </body>
      </PlausibleProvider>
    </html>
  );
}
```

### Step 3: Update package.json

Remove Vercel dependencies:
```bash
yarn remove @vercel/analytics @vercel/speed-insights
```

Add build script for static export:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next build",
    "start": "next start",
    "lint": "eslint ."
  }
}
```

### Step 4: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "yarn"

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build with Next.js
        run: yarn build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 5: Configure GitHub Pages

1. Go to your repository Settings
2. Navigate to "Pages" in the left sidebar
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
4. Save the settings

### Step 6: Deploy

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

The GitHub Action will automatically build and deploy your site.

### Step 7: Custom Domain (Optional)

If using a custom domain (sbarkar.com):

1. Create `public/CNAME` file:
```
sbarkar.com
```

2. Configure DNS:
   - For apex domain (sbarkar.com):
     ```
     A     185.199.108.153
     A     185.199.109.153
     A     185.199.110.153
     A     185.199.111.153
     ```
   - For www subdomain:
     ```
     CNAME www.sbarkar.com → username.github.io
     ```

3. In GitHub Pages settings, add your custom domain

---

## Feature Comparison Table

| Feature | Vercel | GitHub Pages |
|---------|--------|--------------|
| **Static Site Hosting** | ✅ Excellent | ✅ Excellent |
| **Custom Domains** | ✅ Yes | ✅ Yes |
| **Free SSL/HTTPS** | ✅ Yes | ✅ Yes |
| **Build Time** | ⚡ 30-60s | 🐢 2-5min |
| **CDN Performance** | ⚡ Global Edge (300+ locations) | ✅ Good (fewer locations) |
| **Analytics** | ✅ Built-in | ❌ Need 3rd party |
| **Image Optimization** | ✅ Automatic | ❌ Manual or 3rd party |
| **Preview Deployments** | ✅ Automatic | ⚠️ Manual setup |
| **Deployment Rollback** | ✅ Instant | ⚠️ Manual (git revert) |
| **Build Logs** | ✅ Detailed | ✅ Via GitHub Actions |
| **Cost** | ✅ Free (generous limits) | ✅ Free (unlimited) |
| **Bandwidth** | 100GB/month (free tier) | Unlimited |
| **Build Minutes** | 6,000 min/month | 2,000-3,000 min/month (free tier) |

---

## Recommendations

### ✅ Migrate to GitHub Pages If:

1. **Cost is a concern**: GitHub Pages is completely free with unlimited bandwidth
2. **Simple analytics are sufficient**: Basic Google Analytics or similar is enough
3. **You prefer GitHub-centric workflow**: Everything in one place
4. **Build time is not critical**: 2-5 minute deploys are acceptable
5. **You want to reduce external dependencies**: No Vercel account needed

### ⚠️ Stay on Vercel If:

1. **You need advanced analytics**: Vercel Analytics provides detailed insights
2. **Performance monitoring is critical**: Speed Insights are valuable
3. **Fast deployments matter**: 30-60 second deploys vs 2-5 minutes
4. **Image optimization is important**: Automatic AVIF/WebP conversion
5. **You use preview deployments heavily**: Automatic PR previews are very convenient
6. **Global CDN performance is critical**: Vercel's edge network is faster

---

## Performance Considerations

### Image Optimization Solutions for GitHub Pages

Since Next.js Image Optimization won't work on GitHub Pages, consider:

**Option 1: Pre-optimize images manually**
- Use tools like Squoosh, ImageOptim, or Sharp
- Generate WebP/AVIF versions yourself
- Commit optimized images to repository

**Option 2: Use next-image-export-optimizer**
```bash
yarn add next-image-export-optimizer
```

This generates optimized images at build time.

**Option 3: Use external image CDN**
- Cloudinary (free tier available)
- imgix
- ImageKit

---

## Estimated Migration Time

- **Configuration changes**: 15-30 minutes
- **Testing locally**: 15 minutes
- **GitHub Actions setup**: 15 minutes
- **DNS configuration (if custom domain)**: 5 minutes + 24 hours propagation
- **Total active work**: ~1 hour
- **Total including DNS**: ~25 hours

---

## Testing Migration Locally

Before deploying, test the static export:

```bash
# Build static export
yarn build

# The output will be in the 'out' directory
ls -la out/

# Test locally with a simple HTTP server
npx serve out

# Open http://localhost:3000 to verify
```

Verify:
- ✅ All pages load correctly
- ✅ All images display
- ✅ Links work correctly
- ✅ Styles are applied
- ✅ Print layout works (Cmd/Ctrl+P)

---

## Rollback Plan

If migration doesn't work as expected:

1. **Quick Rollback**: Revert the commit and redeploy to Vercel
2. **Keep both**: Run GitHub Pages for testing while keeping Vercel as primary
3. **Gradual migration**: Use GitHub Pages for staging, Vercel for production

---

## Conclusion

Your site is **fully compatible** with GitHub Pages! The migration is straightforward because:

1. ✅ Pure static content (no SSR, ISR, or API routes)
2. ✅ Single-page CV with no dynamic routes
3. ✅ All data is compile-time static
4. ✅ No server-side dependencies

**Main downsides:**
1. Loss of Vercel Analytics and Speed Insights (but replaceable)
2. No automatic image optimization (but not critical for a CV site with few images)
3. Slower deployment times (but not critical for infrequent updates)

**Recommendation**: If you're looking to consolidate services and reduce dependencies, **GitHub Pages is an excellent choice** for this site. The migration is low-risk and fully reversible.
