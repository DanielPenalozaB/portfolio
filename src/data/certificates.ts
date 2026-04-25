export interface Certificate {
  name: string;
  issuer: string;
  image: string;
  url?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    name: "English C1",
    issuer: "EF SET",
    image: "/images/efset.png",
    url: "https://cert.efset.org/gjyrKd",
  },
  {
    name: "SI Associate",
    issuer: "MongoDB",
    image: "/images/mongodb.png",
    url: "https://learn.mongodb.com/c/1bre7nQIQQet6ifi6AFilw",
  },
];
