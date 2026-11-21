import { render, screen } from "@testing-library/react";
import { Skills } from "./Skills";
import { SKILL_CATEGORIES } from "../data/skills";

describe("Skills section", () => {
  it("renders every category and skill with its level", () => {
    render(<Skills />);
    SKILL_CATEGORIES.forEach((cat) => {
      expect(screen.getByText(cat.name)).toBeInTheDocument();
      cat.skills.forEach((s) => expect(screen.getByText(s.n)).toBeInTheDocument());
    });
  });
});
