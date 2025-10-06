import { sortSkillsByLevelAndExperience } from "../skill-utils";

describe("sortSkillsByLevelAndExperience", () => {
  it("sorts skills by level in descending order", () => {
    const skills = [
      { name: "Skill A", level: 3, years: "2+ years", description: "Description A" },
      { name: "Skill B", level: 5, years: "3+ years", description: "Description B" },
      { name: "Skill C", level: 4, years: "1+ year", description: "Description C" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skills);

    expect(sorted[0].name).toBe("Skill B");
    expect(sorted[1].name).toBe("Skill C");
    expect(sorted[2].name).toBe("Skill A");
  });

  it("sorts skills with same level by years of experience", () => {
    const skills = [
      { name: "Skill A", level: 5, years: "2+ years", description: "Description A" },
      { name: "Skill B", level: 5, years: "5+ years", description: "Description B" },
      { name: "Skill C", level: 5, years: "3+ years", description: "Description C" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skills);

    expect(sorted[0].name).toBe("Skill B");
    expect(sorted[1].name).toBe("Skill C");
    expect(sorted[2].name).toBe("Skill A");
  });

  it("sorts skills with same level and years alphabetically by name", () => {
    const skills = [
      { name: "C#", level: 5, years: "4+ years", description: "Description" },
      { name: "TypeScript", level: 5, years: "4+ years", description: "Description" },
      { name: "JavaScript", level: 5, years: "4+ years", description: "Description" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skills);

    expect(sorted[0].name).toBe("C#");
    expect(sorted[1].name).toBe("JavaScript");
    expect(sorted[2].name).toBe("TypeScript");
  });

  it("does not mutate the original array", () => {
    const skills = [
      { name: "Skill A", level: 3, years: "2+ years", description: "Description A" },
      { name: "Skill B", level: 5, years: "3+ years", description: "Description B" },
    ];

    const original = [...skills];
    sortSkillsByLevelAndExperience(skills);

    expect(skills).toEqual(original);
  });

  it("handles empty array", () => {
    const skills: { name: string; level: number; years: string; description: string }[] = [];
    const sorted = sortSkillsByLevelAndExperience(skills);
    expect(sorted).toEqual([]);
  });

  it("handles single skill", () => {
    const skills = [
      { name: "Skill A", level: 5, years: "3+ years", description: "Description A" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skills);
    expect(sorted).toEqual(skills);
  });

  it("extracts years from various format strings", () => {
    const skills = [
      { name: "Skill A", level: 5, years: "6+ years", description: "Description A" },
      { name: "Skill B", level: 5, years: "10+ years", description: "Description B" },
      { name: "Skill C", level: 5, years: "1+ year", description: "Description C" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skills);

    expect(sorted[0].name).toBe("Skill B");
    expect(sorted[1].name).toBe("Skill A");
    expect(sorted[2].name).toBe("Skill C");
  });

  it("handles missing year numbers gracefully", () => {
    const skills = [
      { name: "Skill A", level: 5, years: "some years", description: "Description A" },
      { name: "Skill B", level: 5, years: "3+ years", description: "Description B" },
    ];

    const sorted = sortSkillsByLevelAndExperience(skills);

    expect(sorted[0].name).toBe("Skill B");
    expect(sorted[1].name).toBe("Skill A");
  });
});
