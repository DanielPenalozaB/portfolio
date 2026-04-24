export interface Certificate {
  name: string;
  issuer: string;
  image?: string;
  url?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    name: "English C1",
    issuer: "EF SET",
    image: "/images/cert-efset.png",
    url: "#",
  },
];
