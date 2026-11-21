import { render, screen } from "@testing-library/react";
import { SocialLinks } from "./SocialLinks";
import { SOCIAL_LINKS } from "../data/contact";

describe("SocialLinks", () => {
  it("renders one labelled link per social profile", () => {
    render(<SocialLinks />);
    SOCIAL_LINKS.forEach(({ label, href }) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
    });
  });

  it("opens external profiles in a new tab safely", () => {
    render(<SocialLinks />);
    const github = screen.getByRole("link", { name: "GitHub profile" });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps the email link in the same tab", () => {
    render(<SocialLinks />);
    expect(screen.getByRole("link", { name: "Send an email" })).not.toHaveAttribute("target");
  });
});
