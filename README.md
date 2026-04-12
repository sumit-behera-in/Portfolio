# 🎯 Developer Portfolio

A modern, production-ready developer portfolio website that automatically generates content from GitHub data using GitHub Actions, with support for manual overrides via a config.json file.

## ✨ Features

- 🚀 **Automated Data Fetching** - Fetches GitHub profile and repositories automatically
- 🔄 **GitHub Actions Integration** - Updates portfolio data weekly or on push
- 🎨 **Modern Design** - Built with Tailwind CSS and fully responsive
- 🌙 **Dark/Light Mode** - Automatic theme detection with toggle
- ⚙️ **Easy Configuration** - Override GitHub data with config.json
- 📱 **Mobile Responsive** - Looks great on all devices
- ⚡ **Lightning Fast** - Static site generation with Astro
- 🚀 **Netlify Ready** - One-click deployment
- 🔐 **SEO Optimized** - OpenGraph and meta tags included

## 🧱 Tech Stack

- **Astro** - Static site generation
- **React** - UI components
- **Tailwind CSS** - Styling
- **GitHub Actions** - Automated data fetching
- **Netlify** - Hosting & deployment

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- GitHub account
- Netlify account (for deployment)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd portfolio
npm install
```

### 2. Configure GitHub Username

Edit `config.json` and update:

```json
{
  "username": "your-github-username",
  "override": {
    "name": "Your Full Name",
    "title": "Your Professional Title",
    "bio": "Short bio about yourself"
  }
}
```

### 3. Fetch Data Locally

```bash
npm run fetch-data
```

This creates JSON files in `public/data/`:
- `profile.json` - Your GitHub profile info
- `repos.json` - Your repositories
- `starred.json` - Starred repositories

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

### 5. Build for Production

```bash
npm run build
npm run preview
```

## 🔧 Configuration

### 🤖 Automatic GitHub Data Fetching

Your portfolio **automatically fetches** these fields from your GitHub profile:
- ✅ Name
- ✅ Bio
- ✅ Email (from GitHub profile)
- ✅ Location
- ✅ Website/Blog
- ✅ Twitter handle
- ✅ Company
- ✅ Followers

**No need to set these in config.json!** They update automatically every week via GitHub Actions.

👉 **Read [AUTO_FETCH_GUIDE.md](AUTO_FETCH_GUIDE.md) for complete details.**

### config.json Setup (Minimal)

```json
{
  "username": "your-github-username",
  "override": {
    "title": "Your Professional Title",
    "linkedin": "https://linkedin.com/in/yourprofile"
  },
  "projects": {
    "repo-name": {
      "demo": "https://demo.example.com",
      "live": "https://live.example.com",
      "featured": true
    }
  },
  "featuredRepos": ["awesome-project"],
  "hiddenRepos": ["private-repo"]
}
```

### Configuration Options

| Field | Type | Auto-Fetched? | Notes |
|-------|------|---------------|-------|
| `username` | string | ❌ | REQUIRED - Your GitHub username |
| `override.name` | string | ✅ | Leave empty to use GitHub name |
| `override.title` | string | ❌ | Optional - for professional title |
| `override.bio` | string | ✅ | Leave empty to use GitHub bio |
| `override.email` | string | ✅ | Leave empty to use GitHub email |
| `override.location` | string | ✅ | Leave empty to use GitHub location |
| `override.website` | string | ✅ | Leave empty to use GitHub blog |
| `override.linkedin` | string | ❌ | Optional - add your LinkedIn |
| `projects` | object | ❌ | Per-project customization |
| `featuredRepos` | array | ❌ | Repos to highlight |
| `hiddenRepos` | array | ❌ | Repos to hide from display |
| `skills` | object | ❌ | Skill categorization |

## 🔐 GitHub Token Setup

For faster API requests without authentication limits:

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select `public_repo` scope
4. Copy the token

### For GitHub Actions

Add token to repository secrets:

1. Go to Repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `GITHUB_TOKEN`
4. Value: Your personal access token

## 🚀 GitHub Actions Setup

The workflow automatically:
- ✅ Runs on push to `main`
- ✅ Runs weekly (every Sunday at midnight)
- ✅ Can be manually triggered
- ✅ Fetches GitHub data
- ✅ Commits updated JSON files

### Workflow File Location

`.github/workflows/update.yml`

### Manual Trigger

Go to Actions → Update Portfolio Data → Run workflow

## 🌐 Netlify Deployment

### Option 1: Connect GitHub Repository

1. Go to [Netlify](https://netlify.com)
2. Click "Add new project" → "Import an existing project"
3. Select your GitHub repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy! 🎉

### Option 2: Manual Deployment

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Netlify Configuration

The `netlify.toml` file includes:
- Build command
- Publish directory
- Node version
- Redirect rules

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.astro          # Hero section
│   │   ├── About.astro         # About section
│   │   ├── Projects.astro      # Featured projects
│   │   ├── Skills.astro        # Skills showcase
│   │   ├── Contact.astro       # Contact section
│   │   ├── Footer.astro        # Footer
│   │   └── ThemeToggle.jsx     # Dark mode toggle
│   ├── layouts/
│   │   └── Layout.astro        # Main layout
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   └── projects.astro      # Projects page
│   ├── styles/
│   │   └── global.css          # Global styles
│   └── utils/
│       └── getData.ts          # Data loading utilities
├── public/
│   └── data/
│       ├── profile.json        # GitHub profile
│       ├── repos.json          # Repositories
│       └── starred.json        # Starred repos
├── scripts/
│   └── fetchData.js            # Data fetching script
├── config.json                 # Portfolio configuration
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── postcss.config.mjs
├── netlify.toml
└── .github/
    └── workflows/
        └── update.yml          # GitHub Actions workflow
```

## 🎨 Customization

### Colors

Edit `tailwind.config.mjs` to change the color scheme:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Change to your brand color
  }
}
```

### Fonts

Update Google Fonts in `src/layouts/Layout.astro`

### Sections

Comment out or remove sections in `src/pages/index.astro`:
- Hero
- About
- Projects
- Skills
- Contact

## 🔍 Data Update Frequency

Default: **Weekly** (every Sunday at midnight UTC)

To change frequency, edit `.github/workflows/update.yml`:

```yaml
schedule:
  - cron: '0 2 * * 1'  # Every Monday at 2 AM
```

[Cron syntax reference](https://crontab.guru)

## 🐛 Troubleshooting

### Data not updating

1. Check workflow runs: Repo → Actions → Update Portfolio Data
2. Verify `GITHUB_TOKEN` is set
3. Check `config.json` has correct username
4. Run locally: `npm run fetch-data`

### GitHub API rate limit

- With token: 5,000 requests/hour
- Without token: 60 requests/hour
- Add token to increase limit

### Build errors

```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install

# Rebuild
npm run build
```

## 📊 Performance

- ✅ Lighthouse score: 95+
- ✅ Page load: <1s
- ✅ Fully optimized images
- ✅ CSS/JS minified
- ✅ Static site generation

## 🔒 Security

- ✅ No server-side code
- ✅ No database
- ✅ No sensitive data exposed
- ✅ Static files only

## 📝 Environment Variables

Create `.env.local` for development:

```env
# Optional for faster local development
GITHUB_TOKEN=your_token_here
```

## 🚀 Tips & Tricks

### Feature Your Best Work

Add to `config.json`:

```json
"featuredRepos": ["best-project", "another-great-project"]
```

### Custom Project Descriptions

Override GitHub descriptions:

```json
"projects": {
  "my-repo": {
    "description": "My custom description here"
  }
}
```

### Hide Private Repos

Add repo names to `hiddenRepos` array.

### Track Repo Progress

GitHub Actions commits are tracked in history - see `git log --oneline`

## 🤝 Contributing

To improve this portfolio system:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your portfolio

## 🎯 Next Steps

1. ✅ Update `config.json` with your info
2. ✅ Run `npm run fetch-data`
3. ✅ Test locally with `npm run dev`
4. ✅ Push to GitHub
5. ✅ Connect to Netlify
6. ✅ Share your portfolio!

## 📞 Support

- 📧 Email: your.email@example.com
- 🐙 GitHub: github.com/your-username
- 🔗 Portfolio: your-portfolio.netlify.app

---

**Happy building! 🚀**

Made with ❤️ using Astro & Tailwind CSS
