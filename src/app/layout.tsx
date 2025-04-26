import { Syne, Inter } from 'next/font/google';
import './globals.css';
import LanguageHandler from '@/i18n/language-handler';
import { defaultLocale } from '@/i18n/locales';

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
