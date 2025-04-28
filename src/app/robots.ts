export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [ '/admin/', '/api/', '/_next/static/', '/_next/image/' ]
      }
    ],
    sitemap: [
      'https://danielpenalozab.com/sitemap.xml'
    ],
    host: 'https://danielpenalozab.com'
  };
}