import type { ImageMetadata } from "astro";
import efset from "../assets/images/certificates/efset.png";
import mongodb from "../assets/images/certificates/mongodb.png";

export interface Certificate {
  name: string;
  issuer: string;
  image: ImageMetadata;
  url?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    name: "English C1",
    issuer: "EF SET",
    image: efset,
    url: "https://cert.efset.org/gjyrKd",
  },
  {
    name: "SI Associate",
    issuer: "MongoDB",
    image: mongodb,
    url: "https://learn.mongodb.com/c/1bre7nQIQQet6ifi6AFilw",
  },
];
