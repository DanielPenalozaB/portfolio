import { fetchProjectsSitemapData } from '@/api/sitemap-projects';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://danielpenalozab.com';

  try {
    const now = new Date();
    const lastModified = now;

    const { data: projects } = await fetchProjectsSitemapData();

    const projectPages = projects.flatMap((project) => {
      if (!project?.slug) return [];

      const lastModified = project.updatedAt
        ? new Date(project.updatedAt)
        : now;

      return [
        {
          url: `${baseUrl}/projects/${project.slug}`,
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
          alternates: {
            languages: {
              es: `${baseUrl}/es/projects/${project.slug}`
            }
          }
        },
        {
          url: `${baseUrl}/es/projects/${project.slug}`,
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
          alternates: {
            languages: {
              en: `${baseUrl}/projects/${project.slug}`
            }
          }
        }
      ];
    });

    return [
      {
        url: baseUrl,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 1,
        alternates: {
          languages: {
            es: `${baseUrl}/es`
          }
        }
      },
      {
        url: `${baseUrl}/es`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 1,
        alternates: {
          languages: {
            en: baseUrl
          }
        }
      },
      {
        url: `${baseUrl}/projects`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        alternates: {
          languages: {
            es: `${baseUrl}/es/projects`
          }
        }
      },
      {
        url: `${baseUrl}/es/projects`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}/projects`
          }
        }
      },
      ...projectPages
    ];
  } catch (error) {
    console.error('Failed to generate sitemap:', error);

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
        alternates: {
          languages: {
            es: `${baseUrl}/es`
          }
        }
      },
      {
        url: `${baseUrl}/es`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1
      }
    ];
  }
}