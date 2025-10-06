interface Skill {
  name: string;
  level: number;
  years: string;
  description: string;
}

export function sortSkillsByLevelAndExperience(skills: Skill[]): Skill[] {
  return [...skills].sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level;
    }

    const aYears = parseInt(a.years.match(/(\d+)/)?.[1] || '0');
    const bYears = parseInt(b.years.match(/(\d+)/)?.[1] || '0');
    if (aYears !== bYears) {
      return bYears - aYears;
    }

    return a.name.localeCompare(b.name);
  });
}
