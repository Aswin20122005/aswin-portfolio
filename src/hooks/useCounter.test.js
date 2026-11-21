import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  let now = 0;
  let callbacks = [];
  beforeEach(() => {
    now = 0;
    callbacks = [];
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      callbacks.push(cb);
      return callbacks.length;
    });
  });
  afterEach(() => jest.restoreAllMocks());

  const advance = (ms) =>
    act(() => {
      now += ms;
      const pending = callbacks;
      callbacks = [];
      pending.forEach((cb) => cb(now));
    });

  it("stays at 0 until started", () => {
    const { result } = renderHook(() => useCounter(10, 1000, false));
    advance(500);
    expect(result.current).toBe(0);
  });

  it("counts up to the end value once started", () => {
    const { result } = renderHook(() => useCounter(10, 1000, true));
    advance(0);
    advance(500);
    expect(result.current).toBeGreaterThan(0);
    expect(result.current).toBeLessThan(10);
    advance(600);
    expect(result.current).toBe(10);
  });

  it("supports one-decimal values", () => {
    const { result } = renderHook(() => useCounter(8.72, 1000, true, true));
    advance(0);
    advance(1100);
    expect(result.current).toBe(8.7);
  });
});
