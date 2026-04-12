# ⚡ Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Step 1: Initial Setup (1 minute)

```bash
cd portfolio
npm install
```

## Step 2: Update Configuration (1 minute)

Edit `config.json`:

```json
{
  "username": "YOUR_GITHUB_USERNAME",
  "override": {
    "title": "Your Professional Title (optional)",
    "linkedin": "https://linkedin.com/in/yourprofile (optional)"
  }
}
```

**That's it!** These fields auto-fetch from GitHub:
- ✅ Name
- ✅ Bio
- ✅ Email
- ✅ Location
- ✅ Website
- ✅ Twitter

👉 Learn more: [AUTO_FETCH_GUIDE.md](AUTO_FETCH_GUIDE.md)

## Step 3: Fetch Your Data (30 seconds)

```bash
npm run fetch-data
```

✅ Creates `public/data/profile.json`, `repos.json`, `starred.json`

## Step 4: Preview Locally (1 minute)

```bash
npm run dev
```

Open http://localhost:3000 in your browser

## Step 5: Deploy to Netlify (1 minute)

### Option A: Connect GitHub (Recommended)

1. Push to GitHub: `git push`
2. Go to https://netlify.com
3. Click "Add new project" → "Import existing project"
4. Select your repository
5. Netlify auto-detects settings
6. Click "Deploy" 🎉

### Option B: Manual Deploy

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

## You're Done! 🎉

Your portfolio is now live and automatically updating weekly!

---

## What's Next?

- [ ] Customize colors in `tailwind.config.mjs`
- [ ] Add more sections to `src/pages/index.astro`
- [ ] Set up custom domain in Netlify
- [ ] Share your portfolio link

## Common Tasks

### Update data immediately

```bash
npm run fetch-data
npm run build
netlify deploy --prod
```

Or trigger GitHub Actions:
GitHub → Actions → "Update Portfolio Data" → Run workflow

### Change theme colors

Edit `tailwind.config.mjs` and change `primary` colors

### Hide certain repos

Add to `config.json`:

```json
"hiddenRepos": ["private-repo", "test-project"]
```

### Feature specific repos

Add to `config.json`:

```json
"featuredRepos": ["my-best-project", "showcase"]
```

### Add demo/live links

Add to `config.json`:

```json
"projects": {
  "my-repo": {
    "demo": "https://demo.example.com",
    "live": "https://live.example.com"
  }
}
```

---

## Troubleshooting

### Data not showing?

1. Run `npm run fetch-data` locally
2. Check `public/data/` files exist
3. Verify `config.json` has correct GitHub username

### Build fails?

```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Netlify build error?

1. Check Netlify deployment logs
2. Verify `netlify.toml` looks correct
3. Try local build first

---

**Questions?** Check README.md for detailed documentation.

**Ready to show the world?** Share your portfolio URL! 🚀
