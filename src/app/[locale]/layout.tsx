import type { Metadata } from "next";
import { Courier_Prime, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier-prime',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Daniel Peñaloza | Full Stack Developer Portfolio",
  description:
    "Experienced Full Stack Developer specializing in web development, mobile apps, and digital solutions. Creating innovative and scalable applications with modern technologies.",
  keywords: "full stack developer, web developer, software engineer, React developer, Node.js developer, portfolio",
  openGraph: {
    title: "Daniel Peñaloza - Full Stack Developer",
    description: "Building modern web and mobile applications with cutting-edge technologies",
    siteName: "Daniel Peñaloza Portfolio",
    type: "website"
  },
  icons: {
    icon: "/icon.svg",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout(props: Readonly<Props>) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${courierPrime.variable} antialiased bg-light dark:bg-dark`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{props.children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}