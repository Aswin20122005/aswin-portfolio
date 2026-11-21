import { render, screen, act } from "@testing-library/react";
import { Typewriter } from "./Typewriter";

describe("Typewriter", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const visibleText = (container) =>
    container.querySelector('[aria-hidden="true"]').textContent.replace("|", "");

  it("exposes all words to screen readers at once", () => {
    render(<Typewriter words={["Alpha", "Beta"]} />);
    expect(screen.getByText("Alpha, Beta")).toHaveClass("sr-only");
  });

  it("types a word one character at a time", () => {
    const { container } = render(<Typewriter words={["Hi"]} speed={100} />);
    act(() => jest.advanceTimersByTime(100));
    expect(visibleText(container)).toBe("H");
    act(() => jest.advanceTimersByTime(100));
    expect(visibleText(container)).toBe("Hi");
  });

  it("deletes the word after the pause and moves to the next", () => {
    const { container } = render(<Typewriter words={["Ab", "Cd"]} speed={100} pause={500} />);
    // each step schedules the next timer after React re-renders, so advance one step at a time
    const step = (ms) => act(() => jest.advanceTimersByTime(ms));
    step(100);
    step(100);
    expect(visibleText(container)).toBe("Ab");
    step(500); // pause, then start deleting
    step(50);
    expect(visibleText(container)).toBe("A");
    step(50);
    expect(visibleText(container)).toBe("");
    step(50); // switch to next word
    step(100);
    expect(visibleText(container)).toBe("C");
  });

  it("clears its timer on unmount", () => {
    const { unmount } = render(<Typewriter words={["Hi"]} />);
    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });
});
