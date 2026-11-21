import { render, screen, act } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("shows the loading screen first, then the portfolio", () => {
    render(<App />);
    expect(screen.getByText("LOADING...")).toBeInTheDocument();

    for (let i = 0; i < 100; i++) act(() => jest.advanceTimersByTime(60));

    expect(screen.queryByText("LOADING...")).not.toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
  });
});
