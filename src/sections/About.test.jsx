import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { STATS } from "../data/stats";
import { TIMELINE } from "../data/timeline";

describe("About section", () => {
  it("shows a box for every stat", () => {
    render(<About />);
    STATS.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
  });

  it("shows every timeline entry", () => {
    render(<About />);
    TIMELINE.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
  });
});
