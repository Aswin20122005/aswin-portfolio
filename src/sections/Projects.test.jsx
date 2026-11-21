import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "./Projects";
import { PROJECTS } from "../data/projects";

const cardTitles = () => within(document.getElementById("projects")).getAllByRole("heading", { level: 3 });

describe("Projects section", () => {
  it("shows every project by default", () => {
    render(<Projects />);
    expect(cardTitles()).toHaveLength(PROJECTS.length);
  });

  it.each([
    ["IoT", "iot"],
    ["Web", "web"],
    ["ML & AI", "ml"],
  ])("filters to %s projects", async (label, cat) => {
    render(<Projects />);
    await userEvent.click(screen.getByRole("button", { name: label }));
    expect(cardTitles()).toHaveLength(PROJECTS.filter((p) => p.cat === cat).length);
    expect(screen.getByRole("button", { name: label })).toHaveClass("active");
  });

  it("returns to all projects when All is clicked", async () => {
    render(<Projects />);
    await userEvent.click(screen.getByRole("button", { name: "IoT" }));
    await userEvent.click(screen.getByRole("button", { name: "All" }));
    expect(cardTitles()).toHaveLength(PROJECTS.length);
  });
});
