import type { Metadata } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';
import { fetchGlobalData } from '@/api/global';
import LanguageHandler from '@/i18n/language-handler';
import { defaultLocale } from '@/i18n/locales';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';

const syne = Syne({
  subsets: [ 'latin' ],
  variable: '--font-syne',
  weight: [ '400', '500', '600', '700', '800' ],
  display: 'swap'
});

const inter = Inter({
  subsets: [ 'latin' ],
  variable: '--font-inter',
  weight: [ '400', '500', '600', '700', '800' ],
  display: 'swap'
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await fetchGlobalData(defaultLocale);
    const { defaultSeo } = data;

    return {
      title: defaultSeo.metaTitle,
      description: defaultSeo.metaDescription,
      keywords: defaultSeo.keywords,
      robots: defaultSeo.metaRobots,
      alternates: {
        canonical: defaultSeo.canonicalURL,
        languages: {
          'en-US': defaultSeo.canonicalURL,
          'es': `${defaultSeo.canonicalURL  }/es`
        }
      },
      icons: {
        icon: API_URL + defaultSeo.metaImage?.formats.thumbnail.url,
        apple: API_URL + defaultSeo.metaImage?.formats.thumbnail.url
      },
      openGraph: {
        type: 'website',
        url: defaultSeo.structuredData.url,
        title: defaultSeo?.metaSocial?.[0].title,
        description: defaultSeo?.metaSocial?.[0].description,
        siteName: defaultSeo.structuredData.name,
        locale: data.locale,
        images: [
          {
            url: API_URL + defaultSeo.metaImage?.formats.medium.url,
            width: 750,
            height: 750,
            alt: defaultSeo.structuredData.name
          }
        ],
        alternateLocale: data.localizations.map((localization) => localization.locale)
      },
      authors: {
        name: defaultSeo.structuredData.name,
        url: defaultSeo.structuredData.url
      },
      creator: defaultSeo.structuredData.name,
      twitter: {
        card: 'summary_large_image',
        site: defaultSeo.structuredData.url,
        creator: defaultSeo.structuredData.name,
        title: defaultSeo?.metaSocial?.[0].title,
        description: defaultSeo?.metaSocial?.[0].description,
        images: [ API_URL + defaultSeo.metaImage?.formats.thumbnail.url ]
      }
    };
  } catch (error) {
    console.error('Failed to fetch SEO data:', error);

    return {
      title: 'Daniel Peñaloza | Full Stack & UX/UI Developer',
      description: 'Full Stack Developer & UX/UI Designer'
    };
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale} className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-neutral-800 font-sans antialiased">
        <LanguageHandler>
          {children}
        </LanguageHandler>
      </body>
    </html>
  );
}
