import { render, screen, act } from "@testing-library/react";
import { LoadingScreen } from "./LoadingScreen";

describe("LoadingScreen", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const run = (ms, step = 60) => {
    for (let t = 0; t < ms; t += step) act(() => jest.advanceTimersByTime(step));
  };

  it("shows the loading label", () => {
    render(<LoadingScreen onDone={() => {}} />);
    expect(screen.getByText("LOADING...")).toBeInTheDocument();
  });

  it("calls onDone exactly once after progress completes", () => {
    const onDone = jest.fn();
    render(<LoadingScreen onDone={onDone} />);
    run(5000);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("does not call onDone after it unmounts", () => {
    const onDone = jest.fn();
    const { unmount } = render(<LoadingScreen onDone={onDone} />);
    run(120);
    unmount();
    run(5000);
    expect(onDone).not.toHaveBeenCalled();
  });
});
