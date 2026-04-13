import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../public/data');
const projectMappingPath = path.join(__dirname, '../../list_mapping.json');
const configPath = path.join(__dirname, '../../config.json');

type Repo = { name: string; [key: string]: any };
type Mapping = Record<string, string[]>;

function loadConfigData() {
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading config data:', error);
  }
  return {};
}

export function loadProfileData() {
  try {
    const filePath = path.join(dataDir, 'profile.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const config = loadConfigData();
      const social = config.social || {};
      const githubUrl =
        social.github
          ? social.github.startsWith('http')
            ? social.github
            : `https://github.com/${social.github}`
          : data.githubUrl || '';
      return {
        ...data,
        githubUrl,
        linkedin: social.linkedin || data.linkedin || '',
        twitter: social.twitter || data.twitter || '',
        email: social.email || data.email || ''
      };
    }
  } catch (error) {
    console.error('Error loading profile data:', error);
  }
  return null;
}

export function loadReposData() {
  try {
    const filePath = path.join(dataDir, 'repos.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading repos data:', error);
  }
  return { owned: [], featured: [], count: 0 };
}

export function getLastUpdated(): string | null {
  try {
    let latestTimestamp: string | null = null;

    // Check profile.json
    const profilePath = path.join(dataDir, 'profile.json');
    if (fs.existsSync(profilePath)) {
      const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
      if (profileData.stats?.lastUpdated) {
        latestTimestamp = profileData.stats.lastUpdated;
      }
    }

    // Check repos.json
    const reposPath = path.join(dataDir, 'repos.json');
    if (fs.existsSync(reposPath)) {
      const reposData = JSON.parse(fs.readFileSync(reposPath, 'utf-8'));
      if (reposData.lastUpdated && (!latestTimestamp || reposData.lastUpdated > latestTimestamp)) {
        latestTimestamp = reposData.lastUpdated;
      }
    }

    return latestTimestamp;
  } catch (error) {
    console.error('Error getting last updated timestamp:', error);
    return null;
  }
}

export function loadProjectMapping(): Mapping {
  try {
    if (fs.existsSync(projectMappingPath)) {
      const data = fs.readFileSync(projectMappingPath, 'utf-8');
      const mapping = JSON.parse(data);
      return typeof mapping === 'object' && mapping !== null ? mapping as Mapping : {};
    }
  } catch (error) {
    console.error('Error loading project mapping:', error);
  }
  return {};
}

export function getMappedRepos(repos: Repo[], mapping: Mapping) {
  if (!mapping || typeof mapping !== 'object') return [];

  const seen = new Set<string>();
  const mapped: Repo[] = [];

  for (const category of Object.keys(mapping)) {
    const repoNames = Array.isArray(mapping[category]) ? mapping[category] : [];
    for (const repoName of repoNames) {
      const repo = repos.find((item) => item.name === repoName);
      if (repo && !seen.has(repo.name)) {
        mapped.push({ ...repo, featured: true });
        seen.add(repo.name);
      }
    }
  }

  return mapped;
}

export function getReposForCategory(repos: Repo[], category: string, mapping: Mapping) {
  const repoNames = Array.isArray(mapping?.[category]) ? mapping[category] : [];
  return repoNames
    .map((repoName) => repos.find((repo) => repo.name === repoName))
    .filter((repo): repo is Repo => Boolean(repo))
    .map((repo) => ({ ...repo, featured: true }));
}

export function formatCategoryLabel(key: string) {
  const labels: Record<string, string> = {
    go: 'Go',
    sapbtp: 'SAP BTP',
    ml: 'Machine Learning',
    android: 'Android'
  };
  if (!key || typeof key !== 'string') return '';
  return labels[key.toLowerCase()] || key.replace(/[-_]/g, ' ').replace(/\b\w/g, (value) => value.toUpperCase());
}

export function formatProjectName(name: string) {
  if (!name || typeof name !== 'string') return '';
  return name.replace(/[-_]/g, ' ');
}

export function loadStarredData() {
  try {
    const filePath = path.join(dataDir, 'starred.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading starred data:', error);
  }
  return { repos: [], count: 0 };
}

export function getMockProfileData() {
  return {
    username: 'your-username',
    name: 'Your Name',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    bio: 'Software Developer | Open Source Enthusiast',
    location: 'San Francisco, CA',
    email: 'your.email@example.com',
    website: 'https://yourwebsite.com',
    company: 'Your Company',
    followers: 100,
    following: 50,
    publicRepos: 10,
    twitterHandle: 'yourhandle',
    githubUrl: 'https://github.com/your-username',
    title: 'Full Stack Developer',
    linkedin: 'https://linkedin.com/in/yourprofile',
    twitter: 'https://twitter.com/yourhandle',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stats: {
      totalProjects: 10,
      totalStars: 100,
      followers: 100,
      languages: ['JavaScript', 'Python', 'Go'],
      lastUpdated: new Date().toISOString()
    },
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Docker']
  };
}

export function getMockReposData() {
  return {
    owned: [
      {
        name: 'awesome-project',
        owner: 'your-username',
        description: 'An awesome project built with modern technologies',
        url: 'https://github.com/your-username/awesome-project',
        stars: 150,
        forks: 20,
        language: 'JavaScript',
        topics: ['react', 'typescript', 'tailwind'],
        featured: true,
        demo: 'https://demo.example.com',
        live: 'https://live.example.com',
        image: 'https://opengraph.githubassets.com/1/your-username/awesome-project',
        updatedAt: new Date().toISOString(),
        isOwned: true
      }
    ],
    featured: [],
    count: 1
  };
}
