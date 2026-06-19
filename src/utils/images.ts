import type { ImageMetadata } from "astro";

const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/projects/**/*.{png,jpg,jpeg,webp}",
);

export async function getProjectImage(imagePath: string) {
  // Content uses "/images/projects/X/front.png", assets at "/src/assets/images/projects/X/front.png"
  const relativePath = imagePath.replace(/^\/images/, "");
  const assetPath = `/src/assets/images${relativePath}`;
  const loader = projectImages[assetPath];
  if (!loader) return null;
  const { default: img } = await loader();
  return img;
}

const profileImageImport = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/profile.png",
);

export async function getProfileImage() {
  const loader = profileImageImport["/src/assets/images/profile.png"];
  if (!loader) return null;
  const { default: img } = await loader();
  return img;
}
