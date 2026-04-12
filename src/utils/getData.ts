import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../public/data');

export function loadProfileData() {
  try {
    const filePath = path.join(dataDir, 'profile.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
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
