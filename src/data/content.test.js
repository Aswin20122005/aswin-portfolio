import { CERTS } from "./certifications";
import { PUBLICATIONS } from "./publications";
import { TIMELINE } from "./timeline";
import { SKILL_CATEGORIES } from "./skills";
import { NAV_SECTIONS } from "./navigation";

describe("portfolio content", () => {
  it("has unique certification titles (used as React keys)", () => {
    const titles = CERTS.map((c) => c.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("has unique publication titles", () => {
    const titles = PUBLICATIONS.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("uses known timeline types", () => {
    TIMELINE.forEach((t) => expect(["work", "pub", "edu"]).toContain(t.type));
  });

  it("keeps skill levels between 0 and 100", () => {
    SKILL_CATEGORIES.flatMap((c) => c.skills).forEach((s) => {
      expect(s.l).toBeGreaterThan(0);
      expect(s.l).toBeLessThanOrEqual(100);
    });
  });

  it("starts navigation at home and ends at contact", () => {
    expect(NAV_SECTIONS[0]).toBe("home");
    expect(NAV_SECTIONS[NAV_SECTIONS.length - 1]).toBe("contact");
  });
});
