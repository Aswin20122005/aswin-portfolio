import { PROJECTS } from "./projects";

const CATEGORIES = ["ml", "iot", "web", "app", "security", "data"];

describe("PROJECTS data", () => {
  it("has unique ids", () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses only categories that have a filter button", () => {
    PROJECTS.forEach((p) => expect(CATEGORIES).toContain(p.cat));
  });

  it("gives every project a title, description and at least one tag", () => {
    PROJECTS.forEach((p) => {
      expect(p.title).toBeTruthy();
      expect(p.desc.length).toBeGreaterThan(20);
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });

  it("links repos to GitHub over https", () => {
    PROJECTS.filter((p) => p.repo).forEach((p) => {
      expect(p.repo).toMatch(/^https:\/\/github\.com\/Aswin20122005\//);
    });
  });
});
