import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500">
      <Link to="/" className="hover:text-blue-700 transition-colors">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          {item.href && i < items.length - 1 ? (
            <Link to={item.href} className="hover:text-blue-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-gray-800 font-medium">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
