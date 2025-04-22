import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Fetches data from the Strapi API
 * @param endpoint - API endpoint to fetch from
 * @param queryParams - Optional query parameters (string or object)
 */
export async function fetchAPI<T>(
  endpoint: string,
  locale: string = 'en',
  queryParams?: Record<string, string | number | boolean | string[]> | string
): Promise<T> {
  let url: URL;

  if (typeof queryParams === 'string') {
    const cleanedQuery = queryParams.startsWith('?') ? queryParams.slice(1) : queryParams;
    url = new URL(`${API_URL}/${endpoint}?${cleanedQuery}`);
    url.searchParams.append('locale', locale);
  } else {
    url = new URL(`${API_URL}/${endpoint}`);
    url.searchParams.append('locale', locale);

    if (queryParams) {
      Object.entries(queryParams).forEach(([ key, value ]) => {
        if (Array.isArray(value)) {
          value.forEach((val, index) => {
            url.searchParams.append(`${key}[${index}]`, val.toString());
          });
        } else {
          url.searchParams.append(key, value.toString());
        }
      });
    }
  }

  const requestOptions: RequestInit = {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    next: { revalidate: 60 }
  };

  const response = await fetch(url.toString(), requestOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${await response.text()}`);
  }

  return response.json();
}
