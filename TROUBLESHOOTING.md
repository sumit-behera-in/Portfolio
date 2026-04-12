# 🔧 Troubleshooting Guide

## 🚨 Common Issues & Solutions

### Issue: "Data not showing on portfolio"

**Symptoms:**
- Profile shows "Your Full Name"
- No repositories displayed
- Empty skills list

**Solutions:**

1. **Check if data files exist:**
   ```bash
   ls -la public/data/
   ```
   Should show: `profile.json`, `repos.json`, `starred.json`

2. **Manually fetch data:**
   ```bash
   npm run fetch-data
   ```

3. **Verify config.json:**
   - Check `username` is correct
   - Check it's your actual GitHub username
   - No spaces or special characters

4. **Check GitHub API:**
   ```bash
   curl https://api.github.com/users/YOUR_USERNAME
   ```
   Should return your profile data

**If still not working:**
- Delete `public/data/*.json`
- Run `npm run fetch-data` again
- Check console for errors

---

### Issue: "GitHub Actions workflow fails"

**Symptoms:**
- Red X on workflow run
- Data not updating weekly

**Solutions:**

1. **Check workflow logs:**
   - Go to GitHub → Actions → "Update Portfolio Data"
   - Click failed run
   - Expand "Fetch GitHub data" step
   - Read error message

2. **Common errors:**
   - "Bad credentials" → Add GITHUB_TOKEN
   - "Not Found" → Check username in config.json
   - "API rate limit" → Add token for higher limit

3. **Add GITHUB_TOKEN:**
   - Go to Settings → Secrets → Actions
   - Click "New repository secret"
   - Name: `GITHUB_TOKEN`
   - Get token from: https://github.com/settings/tokens
   - Save

4. **Re-run workflow:**
   - Go to Actions → "Update Portfolio Data"
   - Click "Run workflow" → "main" → "Run workflow"

---

### Issue: "Build fails locally"

**Symptoms:**
- `npm run build` shows errors
- `npm run dev` won't start

**Solutions:**

1. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   npm run build
   ```

2. **Check Node version:**
   ```bash
   node --version
   ```
   Should be 18+

3. **Check for syntax errors:**
   - Look at error message
   - File and line number mentioned
   - Review that file

4. **Common errors:**
   - `astro not found` → `npm install` not run
   - `ENOENT` → Missing file or data
   - `PORT in use` → Kill process or change port

---

### Issue: "Netlify build fails"

**Symptoms:**
- Build status shows "Failed" on Netlify
- Deployment cancelled

**Solutions:**

1. **Check Netlify logs:**
   - Netlify dashboard → Site
   - Click "Deploys" tab
   - Click failed deploy
   - Click "Deploy log" (button)
   - Scroll to find error

2. **Common fixes:**
   - Run `npm install` locally
   - Run `npm run build` locally (test locally first)
   - Check `netlify.toml` for typos
   - Verify Node version in netlify.toml (18.17.0)

3. **Manual fix:**
   ```bash
   npm install
   npm run build
   netlify deploy --prod --dir=dist
   ```

4. **Clear Netlify cache:**
   - Site settings → Build & deploy
   - Click "Clear cache and rebuild"

---

### Issue: "Dark mode not working"

**Symptoms:**
- Toggle button doesn't work
- Dark mode reverts after refresh

**Solutions:**

1. **Check browser console:**
   - Press F12
   - Check Console tab
   - Look for JavaScript errors

2. **Clear localStorage:**
   - Press F12
   - Go to Application tab
   - Find localhost
   - Clear localStorage
   - Refresh page

3. **Check browser support:**
   - Make sure JavaScript is enabled
   - Try in different browser
   - Try in incognito window

4. **Check HTML element:**
   - Press F12
   - Check if `<html>` has `class="dark"`
   - Look for CSS being applied

---

### Issue: "Images not loading"

**Symptoms:**
- Project images show broken icon
- Avatar doesn't display

**Solutions:**

1. **Check image URLs:**
   - Open `public/data/profile.json`
   - Check if URLs are valid
   - Try in browser (click URL)

2. **GitHub OpenGraph images:**
   - GitHub provides project images
   - If repo is private, won't work
   - Make repo public temporarily

3. **Avatar URL:**
   - Should be `https://avatars.githubusercontent.com/u/...`
   - If broken, GitHub API issue
   - Try running `npm run fetch-data` again

---

### Issue: "Slow loading/performance issues"

**Symptoms:**
- Page takes 5+ seconds to load
- Navigation feels sluggish

**Solutions:**

1. **Check network:**
   - F12 → Network tab
   - Refresh page
   - Look for slow requests
   - Check file sizes

2. **Check GitHub API:**
   - API call taking long?
   - Add GITHUB_TOKEN for faster responses
   - Check GitHub API status: https://www.githubstatus.com

3. **Optimize images:**
   - Make sure project images are optimized
   - Use compression tools if needed

4. **Check Netlify:**
   - Site settings → Analytics
   - Check deployment size
   - Should be < 1MB

---

### Issue: "Config.json not working"

**Symptoms:**
- config.json changes don't appear
- Overrides not applied
- Custom links not showing

**Solutions:**

1. **Check JSON syntax:**
   - Open config.json in editor
   - Look for syntax errors
   - Use JSON validator: https://jsonlint.com

2. **Verify format:**
   ```json
   {
     "username": "correct-value",
     "override": { ... }
   }
   ```

3. **Rebuild needed:**
   ```bash
   npm run fetch-data
   npm run build
   ```

4. **Common mistakes:**
   - Missing commas
   - Extra commas
   - Missing quotes
   - Trailing commas in arrays

---

### Issue: "Website doesn't show projects"

**Symptoms:**
- Projects page empty
- No repositories listed
- Featured section blank

**Solutions:**

1. **Run data fetch:**
   ```bash
   npm run fetch-data
   ```

2. **Check for hidden repos:**
   - Look in `config.json`
   - Check `hiddenRepos` array
   - Remove if incorrectly added

3. **Check featured repos:**
   - `config.json` has `featuredRepos`
   - Those repos must exist on GitHub
   - Check spelling matches exactly

4. **Public repos required:**
   - Only public repos show
   - Make repos public if needed

---

### Issue: "Custom domain not working"

**Symptoms:**
- Custom domain shows error
- DNS not resolving

**Solutions:**

1. **Wait for DNS propagation:**
   - Takes 5 minutes to 48 hours
   - Usually < 2 hours
   - Wait and try again

2. **Check DNS settings:**
   - Netlify provides DNS records
   - Go to Site settings → Domain settings
   - Follow setup instructions exactly
   - Use provided DNS records

3. **Verify with DNS checker:**
   - https://mxtoolbox.com/mxlookup.aspx
   - Type your domain
   - Should resolve to Netlify

---

### Issue: "GitHub API rate limit exceeded"

**Symptoms:**
- Workflow fails with rate limit error
- Can't fetch data

**Solutions:**

1. **Add GITHUB_TOKEN:**
   - Increases limit from 60 to 5,000 requests/hour
   - Go to https://github.com/settings/tokens
   - Generate classic token
   - Select `public_repo` scope
   - Add to repo secrets as `GITHUB_TOKEN`

2. **Wait for limit reset:**
   - Resets hourly at top of hour
   - Or wait 1 hour from first request

3. **Check usage:**
   - Check last request time
   - Reduce request frequency if needed

---

### Issue: "Netlify auto-deploy not working"

**Symptoms:**
- Pushing code doesn't trigger build
- GitHub Actions runs but Netlify doesn't build

**Solutions:**

1. **Check Netlify settings:**
   - Site settings → Build & deploy
   - Verify GitHub integration active
   - Verify correct repository selected

2. **Manual rebuild:**
   - Netlify → Deploys tab
   - Click "Trigger deploy" → "Deploy site"

3. **Re-connect GitHub:**
   - Site settings → Build & deploy
   - Disconnect GitHub
   - Reconnect
   - Authorize access

4. **Webhook verification:**
   - GitHub Settings → Webhooks
   - Should see Netlify webhook
   - Check delivery status

---

### Issue: "Node version mismatch"

**Symptoms:**
- Build fails with Node version error
- Netlify fails but local works

**Solutions:**

1. **Check netlify.toml:**
   ```toml
   [build.environment]
   NODE_VERSION = "18.17.0"
   ```

2. **Ensure matches local:**
   ```bash
   node --version
   ```

3. **Update netlify.toml:**
   - Update NODE_VERSION to match
   - Use version 18 or higher

4. **Redeploy:**
   - Clear cache and rebuild

---

### Issue: "Components not rendering"

**Symptoms:**
- Sections missing from homepage
- Blank areas where content should be

**Solutions:**

1. **Check page file:**
   - Open `src/pages/index.astro`
   - Verify all components imported
   - Verify components not commented out

2. **Component file exists:**
   - Check `src/components/` folder
   - Verify .astro files exist
   - Check spelling matches imports

3. **Data loading:**
   - Components need data from JSON
   - Verify JSON files exist
   - Verify data has required fields

---

### Issue: "Responsive design broken"

**Symptoms:**
- Mobile view looks wrong
- Tablet view broken
- Layout doesn't shift

**Solutions:**

1. **Clear browser cache:**
   - F12 → Network tab
   - Check "Disable cache"
   - Refresh page

2. **Hard refresh:**
   - Windows: Ctrl+Shift+R
   - Mac: Cmd+Shift+R

3. **Check in different device:**
   - F12 → Device toolbar
   - Try different device presets
   - Test actual phone

4. **Check Tailwind:**
   - Verify `tailwind.config.mjs` exists
   - Check `src/styles/global.css` has Tailwind directives
   - Rebuild: `npm run build`

---

## 📞 Getting More Help

### Resources

1. **Official Docs:**
   - README.md - Full documentation
   - QUICK_START.md - Fast setup
   - DEPLOYMENT.md - Netlify deployment

2. **Specific Issues:**
   - GitHub Actions: `.github/workflows/update.yml`
   - Netlify: `netlify.toml`
   - Astro: `astro.config.mjs`
   - Tailwind: `tailwind.config.mjs`

3. **External Help:**
   - Astro Docs: https://docs.astro.build
   - Tailwind Docs: https://tailwindcss.com/docs
   - GitHub Actions Docs: https://docs.github.com/en/actions
   - Netlify Docs: https://docs.netlify.com

### Debug Steps

When reporting issues, include:
1. Error message (exact text)
2. Steps to reproduce
3. Browser/Node version
4. OS (Windows/Mac/Linux)
5. Console errors (F12)
6. Workflow logs (GitHub Actions)

---

**Still stuck?** Check individual guides:
- README.md
- QUICK_START.md
- DEPLOYMENT.md
- FEATURES.md

You've got this! 💪
