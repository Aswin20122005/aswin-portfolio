import { CERTS } from "./certifications";
import { PROJECTS } from "./projects";
import { PUBLICATIONS } from "./publications";

export const STATS = [
  { label: "Projects Built", value: PROJECTS.length, suffix: "+" },
  { label: "Publications", value: PUBLICATIONS.length, suffix: "" },
  { label: "Certifications", value: CERTS.length, suffix: "" },
  { label: "CGPA", value: 8.72, suffix: "", decimal: true },
];
