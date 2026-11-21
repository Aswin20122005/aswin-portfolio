import { SOCIAL_LINKS, CONTACT_INFO, EMAIL } from "./contact";

describe("contact data", () => {
  it("has a valid email address", () => {
    expect(EMAIL).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/i);
  });

  it("gives every social link an accessible label and icon", () => {
    SOCIAL_LINKS.forEach((link) => {
      expect(link.label).toBeTruthy();
      expect(link.icon).toBeTruthy();
    });
  });

  it("marks only http links as external", () => {
    SOCIAL_LINKS.forEach((link) => {
      expect(Boolean(link.external)).toBe(link.href.startsWith("https://"));
    });
  });

  it("uses mailto for the email contact row", () => {
    const row = CONTACT_INFO.find((c) => c.label === EMAIL);
    expect(row.href).toBe(`mailto:${EMAIL}`);
  });
});
