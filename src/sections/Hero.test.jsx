import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "./Hero";
import { RESUME_URL } from "../data/assets";

describe("Hero section", () => {
  it("introduces Aswin with a level-1 heading", () => {
    render(<Hero scrollTo={() => {}} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Aswin");
  });

  it("offers the resume as a PDF download", () => {
    render(<Hero scrollTo={() => {}} />);
    const resume = screen.getByRole("link", { name: /resume/i });
    expect(resume).toHaveAttribute("href", RESUME_URL);
    expect(resume).toHaveAttribute("download", "Aswin_Resume.pdf");
  });

  it("scrolls to projects and contact from the call-to-action buttons", async () => {
    const scrollTo = jest.fn();
    render(<Hero scrollTo={scrollTo} />);
    await userEvent.click(screen.getByRole("button", { name: /view projects/i }));
    await userEvent.click(screen.getByRole("button", { name: /contact me/i }));
    expect(scrollTo.mock.calls).toEqual([["projects"], ["contact"]]);
  });

  it("has a descriptive alt text on the profile photo", () => {
    render(<Hero scrollTo={() => {}} />);
    expect(screen.getByAltText("Portrait of Aswin")).toBeInTheDocument();
  });
});
