export interface MarqueeSlider {
  label: string;
  direction: "left" | "right";
  words: string[];
}

export const PROFILE_MARQUEES: MarqueeSlider[] = [
  {
    label: "Design",
    direction: "left",
    words: [
      "UI/UX",
      "Figma",
      "Prototyping",
      "Design Systems",
      "Responsive",
      "Wireframing",
    ],
  },
  {
    label: "Dev",
    direction: "right",
    words: [
      "React",
      "Vue",
      "TypeScript",
      "Next.js",
      "Astro",
      "Python",
      "Go",
      "REST APIs",
      "GraphQL",
      "SSR",
    ],
  },
  {
    label: "DevOps",
    direction: "left",
    words: ["Docker", "AWS", "CI/CD", "Linux", "Nginx", "GitHub Actions"],
  },
];
