# GitHub Pages Migration Checklist

Quick reference checklist for migrating from Vercel to GitHub Pages.

## Pre-Migration

- [ ] Read full migration guide: `GITHUB_PAGES_MIGRATION.md`
- [ ] Backup current deployment (if needed)
- [ ] Decide on analytics solution (Google Analytics, Plausible, or none)
- [ ] Review custom domain setup (if applicable)

## Code Changes

### 1. Update next.config.js

- [ ] Change `output: "standalone"` to `output: "export"`
- [ ] Add `images: { unoptimized: true }`
- [ ] Add `basePath` if deploying to `username.github.io/repo-name` (skip if custom domain)
- [ ] Remove or comment out image optimization settings

### 2. Update src/app/layout.tsx

- [ ] Remove `import { Analytics } from "@vercel/analytics/react"`
- [ ] Remove `import { SpeedInsights } from "@vercel/speed-insights/next"`
- [ ] Remove `<Analytics />` component
- [ ] Remove `<SpeedInsights />` component
- [ ] Add new analytics solution (if chosen)

### 3. Update package.json

- [ ] Run `yarn remove @vercel/analytics @vercel/speed-insights`
- [ ] Add analytics package if using alternative (optional)
- [ ] Verify scripts are correct

### 4. Create GitHub Actions Workflow

- [ ] Create `.github/workflows/deploy.yml`
- [ ] Copy workflow configuration from migration guide
- [ ] Verify Node.js version is correct (20)
- [ ] Ensure artifact path is `./out`

### 5. Custom Domain Setup (if applicable)

- [ ] Create `public/CNAME` with your domain
- [ ] Configure DNS A records or CNAME
- [ ] Add custom domain in GitHub Pages settings

## Testing

- [ ] Install dependencies: `yarn install --frozen-lockfile`
- [ ] Build static export: `yarn build`
- [ ] Verify `out/` directory is created
- [ ] Test locally: `npx serve out`
- [ ] Check all pages load correctly
- [ ] Verify images display
- [ ] Test links work
- [ ] Test print layout (Cmd/Ctrl+P)
- [ ] Run linter: `yarn lint`

## Deployment

### GitHub Repository Settings

- [ ] Go to repository Settings → Pages
- [ ] Set Source to "GitHub Actions"
- [ ] Save settings

### Deploy

- [ ] Commit all changes: `git add .`
- [ ] Create commit: `git commit -m "Configure for GitHub Pages deployment"`
- [ ] Push to main: `git push origin main`
- [ ] Monitor GitHub Actions workflow (Actions tab)
- [ ] Wait for deployment to complete (~2-5 minutes)
- [ ] Visit deployed site

### Custom Domain (if applicable)

- [ ] Add custom domain in GitHub Pages settings
- [ ] Wait for DNS propagation (~24 hours)
- [ ] Verify HTTPS certificate is active
- [ ] Test site at custom domain

## Post-Migration Verification

- [ ] Site loads at GitHub Pages URL
- [ ] All pages work correctly
- [ ] Images display properly
- [ ] Links are functional
- [ ] Analytics tracking works (if configured)
- [ ] Print layout works
- [ ] Mobile responsive design works
- [ ] Custom domain works (if configured)
- [ ] HTTPS works

## Cleanup (Optional)

- [ ] Remove or archive Vercel project
- [ ] Update documentation/README with new deployment URL
- [ ] Update any external links to the site
- [ ] Archive `vercel.json` or remove if not needed

## Rollback Plan (if needed)

If something goes wrong:

1. [ ] Revert commits: `git revert HEAD`
2. [ ] Re-add Vercel dependencies: `yarn add @vercel/analytics @vercel/speed-insights`
3. [ ] Restore `next.config.js` to original
4. [ ] Restore `layout.tsx` to original
5. [ ] Push changes: `git push origin main`
6. [ ] Redeploy to Vercel

## Estimated Time

- Configuration: 30 minutes
- Testing: 15 minutes
- Deployment: 5 minutes + 2-5 min build
- DNS (if custom domain): 24 hours propagation
- **Total**: ~1 hour active work

## Notes

- Build time on GitHub Pages is longer (2-5 min vs 30-60s on Vercel)
- No automatic preview deployments (need manual setup)
- No automatic image optimization
- Unlimited bandwidth on GitHub Pages (vs 100GB on Vercel free tier)
- All features of your current site will work perfectly

## Support

- GitHub Pages docs: https://docs.github.com/pages
- Next.js static export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Migration guide: See `GITHUB_PAGES_MIGRATION.md`
