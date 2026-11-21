import { STATS } from "./stats";
import { PROJECTS } from "./projects";
import { CERTS } from "./certifications";
import { PUBLICATIONS } from "./publications";

const byLabel = (label) => STATS.find((s) => s.label === label);

describe("STATS data", () => {
  it("counts projects, publications and certifications from the data", () => {
    expect(byLabel("Projects Built").value).toBe(PROJECTS.length);
    expect(byLabel("Publications").value).toBe(PUBLICATIONS.length);
    expect(byLabel("Certifications").value).toBe(CERTS.length);
  });

  it("keeps CGPA on a 10-point scale", () => {
    const cgpa = byLabel("CGPA");
    expect(cgpa.decimal).toBe(true);
    expect(cgpa.value).toBeGreaterThan(0);
    expect(cgpa.value).toBeLessThanOrEqual(10);
  });
});
