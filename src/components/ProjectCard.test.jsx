import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";

const base = {
  id: 1,
  title: "Demo Project",
  desc: "A demo project description.",
  tags: ["React", "CSS"],
  cat: "web",
  color: "#22d3ee",
  icon: "🧪",
};

describe("ProjectCard", () => {
  it("renders the title, description and tags", () => {
    render(<ProjectCard project={base} index={0} />);
    expect(screen.getByRole("heading", { name: "Demo Project" })).toBeInTheDocument();
    expect(screen.getByText("A demo project description.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
  });

  it("shows a View code link when the project has a repo", () => {
    render(<ProjectCard project={{ ...base, repo: "https://github.com/Aswin20122005/demo" }} index={0} />);
    const link = screen.getByRole("link", { name: /view demo project source code/i });
    expect(link).toHaveAttribute("href", "https://github.com/Aswin20122005/demo");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("has no link when there is no repo", () => {
    render(<ProjectCard project={base} index={0} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
