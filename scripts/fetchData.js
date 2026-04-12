/**
 * GitHUB DATA FETCHER
 * 
 * AUTO-FETCHED FROM GITHUB PROFILE:
 * ✓ name
 * ✓ bio
 * ✓ email (from GitHub profile)
 * ✓ location
 * ✓ website/blog
 * ✓ twitterHandle
 * ✓ company
 * ✓ followers/following
 * ✓ avatar
 * 
 * OPTIONAL OVERRIDES in config.json:
 * - title (professional title)
 * - linkedin (LinkedIn profile URL)
 * - Any other custom field
 * 
 * Data Priority: config.override > GitHub API > fallback
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration
const configPath = path.join(__dirname, '../config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API = 'https://api.github.com';
const DATA_DIR = path.join(__dirname, '../public/data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
};

async function fetchJSON(url) {
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

async function fetchUserProfile(username) {
  console.log(`📥 Fetching profile for @${username}...`);
  const profile = await fetchJSON(`${GITHUB_API}/users/${username}`);
  
  if (!profile) return null;

  // Merge with config overrides
  const mergedProfile = {
    username: profile.login,
    name: config.override?.name || profile.name || profile.login,
    avatar: profile.avatar_url,
    bio: config.override?.bio || profile.bio || '',
    location: config.override?.location || profile.location || '',
    email: config.override?.email || profile.email || '',
    website: config.override?.website || profile.blog || '',
    company: profile.company || '',
    followers: profile.followers || 0,
    following: profile.following || 0,
    publicRepos: profile.public_repos || 0,
    twitterHandle: profile.twitter_username || '',
    githubUrl: profile.html_url,
    title: config.override?.title || 'Developer',
    linkedin: config.override?.linkedin || config.social?.linkedin || '',
    twitter: config.override?.twitter || config.social?.twitter || '',
    createdAt: profile.created_at,
    updatedAt: new Date().toISOString()
  };

  // Log what was auto-fetched from GitHub
  console.log(`\n✅ AUTO-FETCHED FROM GITHUB:`);
  console.log(`   • Name: ${mergedProfile.name}`);
  console.log(`   • Bio: ${mergedProfile.bio || '(empty)'}`);
  console.log(`   • Email: ${mergedProfile.email || '(private)'}`);
  console.log(`   • Location: ${mergedProfile.location || '(not set)'}`);
  console.log(`   • Website: ${mergedProfile.website || '(not set)'}`);
  console.log(`   • Twitter: ${mergedProfile.twitterHandle || '(not set)'}`);
  console.log(`   • Followers: ${mergedProfile.followers}`);
  
  if (config.override?.title) {
    console.log(`\n⭐ OVERRIDDEN:`);
    console.log(`   • Title: ${config.override.title}`);
  }
  if (config.override?.linkedin) {
    console.log(`   • LinkedIn: ${config.override.linkedin}`);
  }
  console.log('');

  return mergedProfile;
}

async function fetchStarredRepos(username) {
  console.log(`⭐ Fetching starred repositories for @${username}...`);
  
  let repos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `${GITHUB_API}/users/${username}/starred?per_page=100&page=${page}&sort=stars&direction=desc`;
    const pageRepos = await fetchJSON(url);

    if (!pageRepos || pageRepos.length === 0) {
      hasMore = false;
    } else {
      repos = repos.concat(pageRepos);
      page++;
    }
  }

  // Process and normalize repos
  const processedRepos = repos
    .filter(repo => !config.hiddenRepos?.includes(repo.name))
    .map(repo => {
      const projectConfig = config.projects?.[repo.name] || {};
      const languages = repo.language ? [repo.language] : [];
      
      return {
        name: repo.name,
        owner: repo.owner.login,
        description: projectConfig.description || repo.description || 'No description',
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'Unknown',
        topics: repo.topics || [],
        featured: config.featuredRepos?.includes(repo.name) || projectConfig.featured || false,
        demo: projectConfig.demo || null,
        live: projectConfig.live || null,
        image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
        updatedAt: repo.updated_at
      };
    })
    .sort((a, b) => {
      // Sort featured repos first, then by stars
      if (a.featured !== b.featured) {
        return b.featured ? 1 : -1;
      }
      return b.stars - a.stars;
    });

  return processedRepos;
}

async function fetchUserRepos(username) {
  console.log(`📚 Fetching user repositories for @${username}...`);
  
  let repos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const url = `${GITHUB_API}/users/${username}/repos?per_page=100&page=${page}&sort=stars&direction=desc&type=owner`;
    const pageRepos = await fetchJSON(url);

    if (!pageRepos || pageRepos.length === 0) {
      hasMore = false;
    } else {
      repos = repos.concat(pageRepos);
      page++;
    }
  }

  // Process repos
  const processedRepos = repos
    .filter(repo => !repo.archived && !config.hiddenRepos?.includes(repo.name))
    .map(repo => {
      const projectConfig = config.projects?.[repo.name] || {};
      
      return {
        name: repo.name,
        owner: repo.owner.login,
        description: projectConfig.description || repo.description || 'No description',
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || 'Unknown',
        topics: repo.topics || [],
        featured: config.featuredRepos?.includes(repo.name) || projectConfig.featured || false,
        demo: projectConfig.demo || null,
        live: projectConfig.live || null,
        image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
        updatedAt: repo.updated_at,
        isOwned: true
      };
    })
    .sort((a, b) => {
      if (a.featured !== b.featured) {
        return b.featured ? 1 : -1;
      }
      return b.stars - a.stars;
    });

  return processedRepos;
}

function extractSkills(repos, profile) {
  const skills = new Set();

  // Add languages from repos
  repos.forEach(repo => {
    if (repo.language && repo.language !== 'Unknown') {
      skills.add(repo.language);
    }
    if (repo.topics && Array.isArray(repo.topics)) {
      repo.topics.forEach(topic => skills.add(topic));
    }
  });

  // Add configured skills
  if (config.skills?.featured) {
    config.skills.featured.forEach(skill => skills.add(skill));
  }

  return Array.from(skills)
    .filter(skill => !config.skills?.hidden?.includes(skill))
    .slice(0, 20);
}

async function main() {
  try {
    const username = config.username;

    if (!username) {
      throw new Error('GitHub username not found in config.json');
    }

    console.log(`\n🚀 Starting portfolio data update...\n`);

    // Fetch data
    const profile = await fetchUserProfile(username);
    if (!profile) {
      throw new Error('Failed to fetch user profile');
    }

    const userRepos = await fetchUserRepos(username);
    const starredRepos = await fetchStarredRepos(username);

    // Extract skills
    const skills = extractSkills([...userRepos, ...starredRepos], profile);

    // Generate stats
    const stats = {
      totalProjects: userRepos.length,
      totalStars: userRepos.reduce((sum, repo) => sum + repo.stars, 0),
      followers: profile.followers,
      languages: [...new Set(userRepos.map(r => r.language).filter(l => l !== 'Unknown'))],
      lastUpdated: new Date().toISOString()
    };

    // Save profile.json
    const profileData = {
      ...profile,
      stats,
      skills
    };
    fs.writeFileSync(
      path.join(DATA_DIR, 'profile.json'),
      JSON.stringify(profileData, null, 2)
    );
    console.log(`✅ Saved profile.json`);

    // Save repos.json
    const reposData = {
      owned: userRepos,
      featured: userRepos.filter(r => r.featured),
      count: userRepos.length,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(
      path.join(DATA_DIR, 'repos.json'),
      JSON.stringify(reposData, null, 2)
    );
    console.log(`✅ Saved repos.json`);

    // Save starred.json
    const starredData = {
      repos: starredRepos.slice(0, 50), // Top 50 starred
      count: starredRepos.length,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(
      path.join(DATA_DIR, 'starred.json'),
      JSON.stringify(starredData, null, 2)
    );
    console.log(`✅ Saved starred.json`);

    console.log(`\n✨ Portfolio data updated successfully!\n`);
    console.log(`📊 Summary:`);
    console.log(`   • User: ${profile.username}`);
    console.log(`   • Repositories: ${userRepos.length}`);
    console.log(`   • Followers: ${profile.followers}`);
    console.log(`   • Skills: ${skills.length}\n`);

  } catch (error) {
    console.error(`\n❌ Error updating portfolio data:`, error.message);
    process.exit(1);
  }
}

main();
