import type { TranslationKey } from "./i18n";

export const SITE_TITLE = "Daniel Peñaloza";
export const SITE_DESCRIPTION =
  "SSR Web Developer, DevOps Enthusiast & Design Engineer";

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
