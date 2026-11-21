import { SOCIAL_LINKS } from "../data/contact";

export function SocialLinks({ className = "", gap = 12, style }) {
  return (
    <div className={className} style={{ display: "flex", gap, ...style }}>
      {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          className="social-link"
          aria-label={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
