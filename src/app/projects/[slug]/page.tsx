import { fetchGlobalData } from '@/api/global';
import { fetchProjectsData } from '@/api/projects';
import { fetchProjectsDetailsData } from '@/api/projects-details';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { defaultLocale } from '@/i18n/locales';
import { Metadata } from 'next';

const homeId = process.env.NEXT_PUBLIC_STRAPI_PROJECTS_PAGE_ID || '';
const API_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await fetchProjectsData(homeId, defaultLocale);
    const { seo } = data;

    return {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: seo.keywords,
      robots: seo.metaRobots,
      alternates: {
        canonical: seo.canonicalURL,
        languages: {
          'en': `/${seo.canonicalURL}`,
          'es': `/es/${seo.canonicalURL}`
        }
      },
      icons: {
        icon: API_URL + seo?.metaImage?.url,
        apple: API_URL + seo?.metaImage?.url
      },
      openGraph: {
        type: 'website',
        url: seo.structuredData.url,
        title: seo?.metaSocial?.[0].title,
        description: seo?.metaSocial?.[0].description,
        siteName: seo.structuredData.name,
        locale: data.locale,
        images: [
          {
            url: API_URL + seo?.metaImage?.url,
            width: 750,
            height: 750,
            alt: seo.structuredData.name
          }
        ],
        alternateLocale: data.localizations.map((localization) => localization.locale)
      },
      authors: {
        name: seo.structuredData.name,
        url: seo.structuredData.url
      },
      creator: seo.structuredData.name,
      twitter: {
        card: 'summary_large_image',
        site: seo.structuredData.url,
        creator: seo.structuredData.name,
        title: seo?.metaSocial?.[0].title,
        description: seo?.metaSocial?.[0].description,
        images: [ API_URL + seo.metaImage?.url ]
      }
    };
  } catch (error) {
    console.error('Failed to fetch SEO data:', error);

    return {
      title: 'My projects | Daniel Peñaloza',
      description: 'My projects'
    };
  }
}

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug ?? '';

  const { data } = await fetchGlobalData(defaultLocale);
  const { navbar, footer } = data;

  const { data: projectData } = await fetchProjectsDetailsData(slug, defaultLocale);
  const details = projectData[0];

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const formatter = new Intl.DateTimeFormat(details.locale, options);

  return (
    <>
      <Navbar data={navbar} />
      <main className="bg-white pb-16 pt-8 antialiased lg:pb-24 lg:pt-16">
        <div className="mx-auto flex max-w-screen-xl justify-between px-4">
          <article className="mx-auto flex w-full max-w-2xl flex-col gap-4">
            <header className="mb-4 lg:mb-6">
              <address className="mb-6 flex items-center not-italic">
                <div className="mr-3 inline-flex items-center text-sm text-gray-900">
                  <div>
                    <a href="#" rel="author" className="text-xl font-bold text-gray-900">Daniel Peñaloza</a>
                    <p className="text-base text-gray-500">Fullstack Developer</p>
                    <p className="text-base text-gray-500">
                      <time dateTime="2022-02-08" title="February 8th, 2022">
                        {formatter.format(new Date(details.publishedAt))}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl">
                {details.title}
              </h1>
              {details.tags && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {details.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="rounded-full bg-violet-100 px-2 py-1 text-xs font-light text-violet-400"
                    >
                      {tag.label}
                    </div>
                  ))}
                </div>
              )}
            </header>
            {details.images && (
              <>
                <img src={API_URL + details.images[0].url} alt={details.images[0].alternativeText} className='rounded-xl border border-neutral-200' />
                <div className='hidden w-full gap-4 overflow-hidden md:grid' style={{ gridTemplateColumns: `repeat(${details.images.length - 1}, minmax(0, 1fr))` }}>
                  {details.images.slice(1).map((image) => (
                    <img
                      key={image.id}
                      src={API_URL + image.url}
                      alt={image.alternativeText}
                      className='w-full rounded-xl border border-neutral-200'
                    />
                  ))}
                </div>
              </>
            )}
            <p className="lead">
              {details.description}
            </p>
          </article>
        </div>
      </main>
      <Footer data={footer} locale={defaultLocale} />
    </>
  );
}
