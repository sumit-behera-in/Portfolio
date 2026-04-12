# 🚀 Deployment Guide

This guide walks you through deploying your portfolio to Netlify.

## Prerequisites

- GitHub account
- Netlify account (free)
- Your repository on GitHub

## Step 1: Prepare Your Repository

1. Make sure you've committed all changes:

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. Create a personal access token on GitHub (optional but recommended):
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select `public_repo` scope
   - Copy the token

## Step 2: Add GitHub Token to Repository (Optional)

1. Go to your repository on GitHub
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `GITHUB_TOKEN`
5. Value: Paste your personal access token
6. Click "Add secret"

This allows the workflow to run with higher rate limits.

## Step 3: Connect to Netlify

### Option A: Automatic Deployment (Recommended)

1. Go to https://netlify.com and log in
2. Click "Add new project"
3. Select "Import an existing project"
4. Choose "GitHub"
5. Authorize Netlify to access your GitHub account
6. Select your portfolio repository

### Option B: Manual Deployment

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy from your project directory:
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Step 4: Configure Build Settings (If Using Option A)

In Netlify dashboard:

1. Go to Site settings → Build & deploy → Build settings
2. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18.17.0 (or higher)

3. Click "Save"

## Step 5: Verify Deployment

1. Netlify will provide you with a URL (e.g., `your-site.netlify.app`)
2. Visit the URL to see your portfolio
3. Check that all content loads correctly

## Step 6: Test GitHub Actions

1. Go to your repository on GitHub
2. Click Actions tab
3. Click "Update Portfolio Data"
4. Click "Run workflow"
5. Wait for workflow to complete (should take ~1 minute)
6. Refresh your Netlify site to see updated data

## Step 7: Custom Domain (Optional)

To use a custom domain:

1. In Netlify dashboard, go to Site settings
2. Click "Domain settings"
3. Click "Add custom domain"
4. Enter your domain
5. Follow DNS configuration instructions

## Automated Workflow

After deployment, the GitHub Actions workflow will:

- ✅ Run every Sunday at midnight (UTC) automatically
- ✅ Fetch latest GitHub data
- ✅ Update JSON files in `public/data/`
- ✅ Commit changes back to repository
- ✅ Trigger Netlify rebuild automatically
- ✅ Deploy updated site

### Manual Updates

To update immediately, go to:
- GitHub → Actions → "Update Portfolio Data" → Run workflow

## Troubleshooting

### Site shows old data

1. Clear Netlify cache:
   - Site settings → Build & deploy → Clear cache and rebuild
2. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Workflow fails to run

1. Check GitHub Actions tab for error details
2. Verify `GITHUB_TOKEN` is properly set
3. Ensure `config.json` has correct username
4. Check workflow file format in `.github/workflows/update.yml`

### API rate limits

- Use a personal access token in `GITHUB_TOKEN`
- Rate limit with token: 5,000 req/hour
- Rate limit without token: 60 req/hour

### Build fails on Netlify

1. Check build logs in Netlify
2. Ensure `netlify.toml` is correct
3. Verify dependencies in `package.json`
4. Try local build: `npm run build`

## Monitoring

### Check Deployment Status

- **GitHub Actions:** Repository → Actions tab
- **Netlify Deploys:** Site → Deploys tab
- Both show real-time logs

### View Errors

1. GitHub Actions → Workflow run details
2. Netlify → Build logs
3. Browser console (F12)

## Rollback

If something goes wrong:

1. **GitHub:** Revert last commit
2. **Netlify:** Click "Published deploys" and select previous version
3. Netlify automatically rebuilds from that commit

## Environment Variables

If needed for future features, add in Netlify:

1. Site settings → Build & deploy → Environment
2. Add variables (e.g., secret API keys)
3. Netlify automatically injects them during build

## Performance Tips

1. **Images:** Auto-optimized by Netlify
2. **Caching:** Browser cache set to 1 year for static files
3. **CDN:** Netlify uses global CDN, no additional setup needed
4. **Compression:** Automatically enabled

## View Live Site

Your portfolio is now live at:
- `https://your-site.netlify.app` (automatic URL)
- `https://your-domain.com` (if using custom domain)

## Next Steps

1. ✅ Share your portfolio link
2. ✅ Add to your GitHub bio
3. ✅ Update resume/LinkedIn
4. ✅ Monitor data updates weekly

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Congratulations! Your portfolio is now live! 🎉**
