import { render, screen } from "@testing-library/react";
import { useInView } from "./useInView";

function Probe() {
  const [ref, visible] = useInView(0.2);
  return <div ref={ref}>{visible ? "visible" : "hidden"}</div>;
}

describe("useInView", () => {
  it("reports visible once the observer fires", () => {
    render(<Probe />);
    expect(screen.getByText("visible")).toBeInTheDocument();
  });

  it("passes the threshold to IntersectionObserver", () => {
    const Original = window.IntersectionObserver;
    const seen = [];
    window.IntersectionObserver = class {
      constructor(cb, opts) {
        seen.push(opts.threshold);
      }
      observe() {}
      disconnect() {}
    };
    render(<Probe />);
    expect(seen).toContain(0.2);
    window.IntersectionObserver = Original;
  });
});
