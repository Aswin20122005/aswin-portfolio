import "@testing-library/jest-dom";

// jsdom doesn't implement these browser APIs, so provide minimal stand-ins.

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(el) {
    // Report every element as visible immediately so reveal animations run.
    this.callback([{ isIntersecting: true, target: el }]);
  }
  disconnect() {}
  unobserve() {}
}
window.IntersectionObserver = MockIntersectionObserver;

window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));

HTMLCanvasElement.prototype.getContext = () => ({
  clearRect: () => {},
  beginPath: () => {},
  arc: () => {},
  fill: () => {},
  moveTo: () => {},
  lineTo: () => {},
  stroke: () => {},
  setTransform: () => {},
});

Element.prototype.scrollIntoView = () => {};
