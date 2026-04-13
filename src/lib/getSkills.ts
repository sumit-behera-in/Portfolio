import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface SkillItem {
  name: string;
  icon: string;
}

export type SkillsConfig = Record<string, SkillItem[]>;

const skillsConfigPath = fileURLToPath(new URL('../../skills_config.json', import.meta.url));

export function loadSkillsConfig(): SkillsConfig {
  try {
    const raw = readFileSync(skillsConfigPath, 'utf-8');
    const parsed = JSON.parse(raw) as SkillsConfig;
    return parsed || {};
  } catch {
    return {};
  }
}

export function getTotalSkillCount(skillsByCategory: SkillsConfig): number {
  return Object.values(skillsByCategory).reduce((count, group) => count + group.length, 0);
}
