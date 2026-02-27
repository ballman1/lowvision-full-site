import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const DOMAIN = 'https://lowvisionnavigator.org';
const SITE_NAME = 'Low Vision Navigator';
const OG_IMAGE = `${DOMAIN}/og-image.png`;

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  breadcrumbs?: BreadcrumbItem[];
  schema?: object | object[];
  noIndex?: boolean;
}

export function PageSEO({ title, description, canonical, breadcrumbs, schema, noIndex }: PageSEOProps) {
  const location = useLocation();
  const canonicalUrl = canonical ?? `${DOMAIN}${location.pathname}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const schemas: object[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    const items = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
      ...breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: b.label,
        item: b.href ? `${DOMAIN}${b.href}` : canonicalUrl,
      })),
    ];
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    });
  }

  if (schema) {
    const extra = Array.isArray(schema) ? schema : [schema];
    schemas.push(...extra);
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content={title} />
      {schemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)}
        </script>
      )}
    </Helmet>
  );
}
