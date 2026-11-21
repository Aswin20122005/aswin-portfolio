import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export const EMAIL = "ashwin.20.achu@gmail.com";

export const SOCIAL_LINKS = [
  { label: "GitHub profile", href: "https://github.com/Aswin20122005", icon: Github, external: true },
  { label: "LinkedIn profile", href: "https://www.linkedin.com/in/aswin-s-53abbb2a8", icon: Linkedin, external: true },
  { label: "Send an email", href: `mailto:${EMAIL}`, icon: Mail },
  { label: "Instagram profile", href: "https://www.instagram.com/__ashw1n.20_?igsh=MWs0b25hZm5sNjZuaA%3D%3D&utm_source=qr", icon: Instagram, external: true },
];

export const CONTACT_INFO = [
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Phone, label: "+91 8667803689" },
  { icon: MapPin, label: "Chennai, India" },
];
