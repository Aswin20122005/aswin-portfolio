import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackToTop } from "./BackToTop";

describe("BackToTop", () => {
  it("renders nothing when not visible", () => {
    render(<BackToTop visible={false} onClick={() => {}} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onClick when pressed", async () => {
    const onClick = jest.fn();
    render(<BackToTop visible onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Back to top" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
