import type { TranslationKey } from "./i18n";

interface NavLink {
  href: string;
  labelKey: TranslationKey;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/#projects", labelKey: "nav.projects" },
  { href: "/#tnt", labelKey: "nav.tnt" },
  { href: "/#experience", labelKey: "nav.experience" },
  { href: "/#certificates", labelKey: "nav.certificates" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/#thoughts", labelKey: "nav.thoughts" },
];
