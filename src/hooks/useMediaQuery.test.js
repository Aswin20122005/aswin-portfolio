import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let listeners;
  let matches;
  const original = window.matchMedia;

  beforeEach(() => {
    listeners = [];
    matches = false;
    window.matchMedia = (query) => ({
      get matches() {
        return matches;
      },
      media: query,
      addEventListener: (_, cb) => listeners.push(cb),
      removeEventListener: (_, cb) => (listeners = listeners.filter((l) => l !== cb)),
    });
  });
  afterEach(() => {
    window.matchMedia = original;
  });

  it("returns the current match state", () => {
    matches = true;
    const { result } = renderHook(() => useMediaQuery("(prefers-reduced-motion: reduce)"));
    expect(result.current).toBe(true);
  });

  it("updates when the media query changes", () => {
    const { result } = renderHook(() => useMediaQuery("(pointer: fine)"));
    expect(result.current).toBe(false);
    act(() => {
      matches = true;
      listeners.forEach((l) => l());
    });
    expect(result.current).toBe(true);
  });

  it("removes its listener on unmount", () => {
    const { unmount } = renderHook(() => useMediaQuery("(pointer: fine)"));
    expect(listeners.length).toBe(1);
    unmount();
    expect(listeners.length).toBe(0);
  });
});
