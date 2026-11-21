import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { CONTACT_INFO, EMAIL } from "../data/contact";

describe("Contact section", () => {
  it("lists every contact detail", () => {
    render(<Contact />);
    CONTACT_INFO.forEach(({ label }) => expect(screen.getAllByText(label).length).toBeGreaterThan(0));
  });

  it("makes the email address a mailto link", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: EMAIL })).toHaveAttribute("href", `mailto:${EMAIL}`);
  });
});
