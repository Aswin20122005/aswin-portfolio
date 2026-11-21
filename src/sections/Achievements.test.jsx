import { render, screen } from "@testing-library/react";
import { Achievements } from "./Achievements";
import { CERTS } from "../data/certifications";
import { PUBLICATIONS } from "../data/publications";

describe("Achievements section", () => {
  it("shows every certification", () => {
    render(<Achievements />);
    CERTS.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
  });

  it("shows every publication", () => {
    render(<Achievements />);
    PUBLICATIONS.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
  });
});
