import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Courier_Prime, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
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
        className={`${inter.variable} ${courierPrime.variable} font-sans antialiased bg-light dark:bg-dark`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{props.children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}