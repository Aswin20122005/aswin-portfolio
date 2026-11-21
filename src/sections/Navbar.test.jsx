import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";
import { NAV_SECTIONS } from "../data/navigation";

function Harness({ scrollTo = () => {}, activeNav = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Navbar
      scrolled={false}
      activeNav={activeNav}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      scrollTo={scrollTo}
    />
  );
}

describe("Navbar", () => {
  it("renders a button for every section", () => {
    render(<Harness />);
    NAV_SECTIONS.forEach((s) => expect(screen.getAllByRole("button", { name: s }).length).toBeGreaterThan(0));
  });

  it("highlights the active section", () => {
    render(<Harness activeNav="skills" />);
    expect(screen.getByRole("button", { name: "skills" })).toHaveClass("active");
  });

  it("scrolls to a section when its button is clicked", async () => {
    const scrollTo = jest.fn();
    render(<Harness scrollTo={scrollTo} />);
    await userEvent.click(screen.getByRole("button", { name: "projects" }));
    expect(scrollTo).toHaveBeenCalledWith("projects");
  });

  it("opens the mobile menu, locks scrolling and closes on Escape", async () => {
    render(<Harness />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");

    await userEvent.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });
});
