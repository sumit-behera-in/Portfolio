# 🤖 Automatic GitHub Data Fetching Guide

## How It Works

When you run `npm run fetch-data` or GitHub Actions runs the workflow, the system automatically fetches your GitHub profile data and merges it with your `config.json` settings.

---

## ✅ What Gets Auto-Fetched from GitHub

These fields are **automatically pulled from your GitHub profile** during the GitHub Actions run:

| Field | Source | Example |
|-------|--------|---------|
| **name** | GitHub Profile Name | "John Doe" |
| **bio** | GitHub Bio | "Full Stack Developer" |
| **email** | GitHub Email (public or private) | "john@example.com" |
| **location** | GitHub Location | "San Francisco, CA" |
| **website** | GitHub Blog/Website field | "https://johndoe.com" |
| **twitter** | GitHub Twitter Handle | "@johndoe" |
| **avatar** | GitHub Avatar URL | "https://avatars.githubusercontent.com/u/123..." |
| **company** | GitHub Company | "Tech Corp" |
| **followers** | GitHub Followers Count | 150 |
| **following** | GitHub Following Count | 50 |

**You don't need to set these in config.json!** They're fetched automatically. ✨

---

## 🎯 Optional Overrides in config.json

You can **optionally override** any of these fields if you want something different from your GitHub profile:

```json
{
  "username": "your-github-username",
  "override": {
    "name": "Custom Name (optional)",
    "title": "Your Professional Title (optional)",
    "bio": "Custom bio (optional)",
    "email": "custom@email.com (optional)",
    "location": "Custom location (optional)",
    "website": "Custom website (optional)",
    "linkedin": "https://linkedin.com/in/yourprofile"
  }
}
```

**Important:** Only set these if you want to **override** GitHub data. Leave them empty/remove them to use GitHub data automatically.

---

## 📊 Data Priority

The system uses this priority order:

```
1. config.json override (if set)
2. GitHub API data (if available)
3. Fallback value (empty string or 0)
```

**Example:**
- If you set `"name": "My Custom Name"` in override, it uses that
- If override is empty, it uses the name from GitHub profile
- If GitHub has no name, it falls back to username

---

## 🔄 The Auto-Fetch Process

### During `npm run fetch-data`

```
1. Reads config.json (your GitHub username)
2. Calls GitHub API: GET /users/{username}
3. Extracts profile data
4. Applies any overrides from config.json
5. Merges with repository data
6. Generates public/data/profile.json
```

### During GitHub Actions (Weekly)

```
Every Sunday at midnight (or on push):
1. Checks out repository
2. Installs dependencies
3. Runs npm run fetch-data
4. GitHub API returns your updated profile
5. All fields auto-fetched (name, bio, email, etc.)
6. Any config.json overrides applied
7. JSON files committed to repo
8. Netlify auto-rebuilds
9. Your portfolio updates live
```

---

## 📝 Recommended config.json Setup

We recommend only using config.json to override fields that differ from your GitHub profile:

```json
{
  "username": "sumitpatel",
  "override": {
    "title": "SAP CPI Developer | Open Source Enthusiast",
    "linkedin": "https://linkedin.com/in/sumitpatel"
  },
  "projects": {
    "my-awesome-repo": {
      "featured": true,
      "demo": "https://demo.example.com",
      "live": "https://live.example.com"
    }
  },
  "featuredRepos": ["awesome-project", "cool-library"],
  "hiddenRepos": ["private-repo", "test-project"]
}
```

---

## 🔧 What You Set in config.json

### Essential (Always Set)
```json
"username": "your-github-username"
```

### Recommended (If Different from GitHub)
```json
"override": {
  "title": "Your job title",
  "linkedin": "Your LinkedIn URL"
}
```

### Optional
```json
"projects": { ... },
"featuredRepos": [ ... ],
"hiddenRepos": [ ... ],
"skills": { ... }
```

---

## 📧 About Email

The email field works differently:

1. **GitHub Public Email** (if set in your GitHub settings)
   - Auto-fetched automatically
   - Will show on portfolio

2. **GitHub Private Email** (private account)
   - Still fetched by GitHub API  (with token)
   - Shows on portfolio if you have  token set

3. **Custom Email Override**
   - Set in config.json override if you want different email
   - Takes priority over GitHub email

### Setup for Email

Update GitHub settings:
1. Go to https://github.com/settings/profile
2. Set "Public email" to your preferred email
3. Or leave private and use config.json override
4. Portfolio will display it automatically

---

## 🔐 GitHub Token (For Higher Rate Limits)

Email fetching works better with a GitHub token:

1. Generate token: https://github.com/settings/tokens
2. Select `public_repo` scope
3. Add to GitHub repo secrets as `GITHUB_TOKEN`
4. GitHub Actions will automatically use it

**Without token:** 60 API requests/hour
**With token:** 5,000 API requests/hour

---

## 📊 Example Flow

### Your GitHub Profile
```
Name: John Doe
Bio: Full Stack Developer
Email: john@email.com
Location: San Francisco
Website: https://johndoe.com
Twitter: @johndoe
```

### Your config.json
```json
{
  "username": "johndoe",
  "override": {
    "title": "Sr. Software Engineer at TechCorp"
  }
}
```

### Generated profile.json (After fetch-data)
```json
{
  "name": "John Doe",           ← from GitHub
  "bio": "Full Stack Developer", ← from GitHub
  "email": "john@email.com",    ← from GitHub
  "location": "San Francisco",   ← from GitHub
  "website": "https://johndoe.com", ← from GitHub
  "twitter": "@johndoe",         ← from GitHub
  "title": "Sr. Software Engineer at TechCorp", ← from override
  "avatar": "https://avatars..."  ← from GitHub
}
```

---

## 🎯 Usage Tips

### Tip 1: Keep config.json Minimal
Only set values that differ from GitHub:
```json
{
  "username": "your-username",
  "override": {
    "title": "Your title"
  }
}
```

### Tip 2: Update GitHub Profile First
Instead of using overrides, update your GitHub profile for accuracy:
1. Update name on GitHub
2. Update bio on GitHub
3. Update location on GitHub
4. Add website/blog on GitHub
5. Add email on GitHub
6. All auto-fetches automatically!

### Tip 3: Use Overrides Strategically
Only override when you need something different:
- Professional title (if not on GitHub profile)
- LinkedIn URL (if not on GitHub)
- Hide/feature repos (config.json feature)

### Tip 4: Check Logs During GitHub Actions
When workflow runs, logs show what was auto-fetched:
```
✅ AUTO-FETCHED FROM GITHUB:
   • Name: John Doe
   • Bio: Full Stack Developer
   • Email: john@email.com
   • Location: San Francisco
   • ...

⭐ OVERRIDDEN:
   • Title: Sr. Software Engineer
```

---

## ✨ FAQ

### Q: Will my GitHub email be public?
**A:** No! GitHub email is private by default. Only displays if you set it as "Public email" in your GitHub settings, or provide custom email in config.json.

### Q: What if GitHub field is empty?
**A:** It uses the fallback value (empty string or 0). No errors.

### Q: Can I see what was fetched?
**A:** Yes! Check GitHub Actions logs:
- Repository → Actions → "Update Portfolio Data"
- Click workflow run → view logs
- Logs show all auto-fetched fields

### Q: Can I change auto-fetch schedule?
**A:** Yes! Edit `.github/workflows/update.yml`:
```yaml
schedule:
  - cron: '0 2 * * 1'  # Change to 2 AM Monday
```

### Q: Do I need a GitHub token?
**A:** No, but recommended:
- Without token: 60 requests/hour
- With token: 5,000 requests/hour
- More reliable for larger profiles

### Q: Can I disable auto-fetch?
**A:** Yes, comment out the workflow file or use local `npm run fetch-data` only.

---

## 🚀 Next Steps

1. **Update your GitHub profile** with accurate info
2. **Set config.json username** to your GitHub username
3. **Run `npm run fetch-data`** to test locally
4. **Push to GitHub** and watch Actions run
5. **Check logs** to verify auto-fetch worked
6. **Enjoy** your auto-updating portfolio!

---

## 📚 Related Docs

- [README.md](README.md) - Full documentation
- [config.json](config.json) - Configuration template
- [scripts/fetchData.js](scripts/fetchData.js) - Fetching logic
- [.github/workflows/update.yml](.github/workflows/update.yml) - GitHub Actions

---

**Your portfolio updates automatically from GitHub. No manual updates needed!** 🎉
