import { Brain, Cloud, Code, Database, Globe, Terminal } from "lucide-react";

export const SKILL_CATEGORIES = [
  {
    name: "Languages",
    icon: Code,
    skills: [
      { n: "Python", l: 88 },
      { n: "C / C++", l: 82 },
      { n: "Java", l: 75 },
      { n: "JavaScript", l: 80 },
    ],
  },
  {
    name: "Frontend",
    icon: Globe,
    skills: [
      { n: "React.js", l: 78 },
      { n: "HTML5/CSS3", l: 85 },
      { n: "Node.js", l: 74 },
      { n: "Express.js", l: 70 },
    ],
  },
  {
    name: "Databases",
    icon: Database,
    skills: [
      { n: "MySQL", l: 80 },
      { n: "MongoDB", l: 72 },
      { n: "SQLite", l: 68 },
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: Cloud,
    skills: [
      { n: "Linux/RHCSA", l: 82 },
      { n: "Docker", l: 75 },
      { n: "Git", l: 85 },
      { n: "AWS", l: 65 },
    ],
  },
  {
    name: "AI & ML",
    icon: Brain,
    skills: [
      { n: "Scikit-learn", l: 80 },
      { n: "OpenCV", l: 72 },
      { n: "YOLO", l: 65 },
      { n: "Jupyter", l: 88 },
    ],
  },
  {
    name: "Tools",
    icon: Terminal,
    skills: [
      { n: "VS Code", l: 90 },
      { n: "Power BI", l: 72 },
      { n: "Postman", l: 70 },
      { n: "MS Office", l: 85 },
    ],
  },
];
