import type { TranslationKey } from "./i18n";

interface NavLink {
  href: string;
  labelKey: TranslationKey;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", labelKey: "nav.projects" },
  { href: "#tnt", labelKey: "nav.tnt" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/blog", labelKey: "nav.thoughts" },
];
