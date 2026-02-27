import type { ReactNode } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { DisclaimerBox } from './DisclaimerBox';
import { PageSEO } from '../seo/PageSEO';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ContentPageLayoutProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  showDisclaimer?: boolean;
  headerBg?: string;
  schema?: object | object[];
  children: ReactNode;
}

export function ContentPageLayout({
  title,
  subtitle,
  description,
  breadcrumbs,
  showDisclaimer = false,
  headerBg = 'bg-blue-800',
  schema,
  children,
}: ContentPageLayoutProps) {
  const metaDescription = description ?? subtitle ?? `Learn about ${title} — guidance, resources, and support on Low Vision Navigator.`;
  return (
    <div>
      <PageSEO title={title} description={metaDescription} breadcrumbs={breadcrumbs} schema={schema} />
      <div className={`${headerBg} text-white`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {breadcrumbs && (
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-blue-200 mb-4">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              {breadcrumbs.map((item, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="text-blue-300">/</span>
                  <span className={i === breadcrumbs.length - 1 ? 'text-white font-medium' : 'text-blue-200'}>
                    {item.label}
                  </span>
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h1>
          {subtitle && <p className="mt-3 text-lg text-blue-100 max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {showDisclaimer && (
          <div className="mb-8">
            <DisclaimerBox />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
