# DNS Configuration for barkar.ch

## Problem
Your website is successfully building and deploying to GitHub Pages, but it's not accessible at `barkar.ch` because DNS records are not configured.

## Solution: Configure DNS Records

You need to configure DNS records at your domain registrar (wherever you purchased barkar.ch).

### Required DNS Records

#### Option 1: Using Apex Domain (barkar.ch) - Recommended
Add these **4 A records** pointing to GitHub Pages IP addresses:

```
Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.108.153

Type: A  
Name: @ (or leave blank for root domain)
Value: 185.199.109.153

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.110.153

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.111.153
```

#### Option 2: Using www Subdomain (www.barkar.ch)
Add this **CNAME record**:

```
Type: CNAME
Name: www
Value: sbarkar.github.io
```

### Steps to Configure DNS

1. **Log into your domain registrar** (e.g., Namecheap, GoDaddy, Google Domains, Cloudflare, etc.)

2. **Find DNS Management** section for barkar.ch

3. **Remove any existing A or CNAME records** that conflict with the above

4. **Add the 4 A records** as shown above (Option 1)
   - OR add the CNAME record for www (Option 2)
   - You can also add both for maximum compatibility

5. **Save/Apply changes**

6. **Wait for DNS propagation** (can take 5 minutes to 48 hours, typically 1-2 hours)

### Verify DNS Configuration

After adding the DNS records, you can check if they're propagating using these tools:

- **whatsmydns.net**: https://whatsmydns.net/#A/barkar.ch
- **DNS Checker**: https://dnschecker.org/#A/barkar.ch
- **Command line**: `dig barkar.ch` or `nslookup barkar.ch`

### GitHub Pages Settings

1. Go to your repository on GitHub: https://github.com/sbarkar/barkar.ch

2. Navigate to **Settings** → **Pages**

3. Under **Custom domain**, verify that `barkar.ch` is entered

4. Make sure **Enforce HTTPS** is checked (wait for DNS to propagate first)

5. Your repository already has the `CNAME` file in the `public/` directory with `barkar.ch`, so this is already configured correctly in the code.

## Current Status

- ✅ GitHub Actions deployment: **Working**
- ✅ Build artifacts: **Generated successfully**  
- ✅ GitHub Pages deployment: **Active**
- ✅ CNAME file in repository: **Present** (`public/CNAME`)
- ❌ DNS configuration: **Missing** (you need to add the records above)

## Expected Outcome

Once DNS records are configured and propagated:
- `https://barkar.ch` → Your CV website
- `https://www.barkar.ch` → Your CV website (if you added the CNAME)
- `https://sbarkar.github.io/barkar.ch` → Will redirect to barkar.ch

## Common Issues

### Site deploys but redirects to wrong domain
- **Cause**: GitHub Pages custom domain setting doesn't match the CNAME file
- **Solution**: Go to Repository Settings → Pages and update the "Custom domain" field to match your CNAME file (barkar.ch)
- **How to verify**: Check deployment logs - they should show `Evaluated environment url: http://barkar.ch/`

### "Domain does not resolve" error in GitHub Pages
- **Cause**: DNS records not yet propagated
- **Solution**: Wait longer (up to 48 hours), or verify records are correct

### Certificate errors (HTTPS not working)
- **Cause**: HTTPS certificate not issued yet
- **Solution**: Wait for DNS to fully propagate, then GitHub will auto-issue the certificate

### Redirect loop
- **Cause**: Conflicting DNS records or CDN settings
- **Solution**: Remove all old records, keep only the 4 A records listed above

## References

- [GitHub Docs: Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Docs: Troubleshooting custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

## Support

If you continue to have issues after configuring DNS:

1. Check your domain registrar's documentation for how to add DNS records
2. Verify the records are added correctly using whatsmydns.net
3. Check GitHub Pages settings in your repository
4. Wait the full propagation time (up to 48 hours)
