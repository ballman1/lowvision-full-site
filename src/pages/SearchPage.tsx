import { PageSEO } from '../components/seo/PageSEO';

export function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <PageSEO
        title="Search"
        description="Search Low Vision Navigator for local resources, rehabilitation services, device guides, coverage information, and more."
        noIndex
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Search</h1>
      <input type="search" placeholder="Search resources, topics, services..." className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4" autoFocus />
      <p className="text-sm text-gray-500">Type to search for local resources, coverage information, device guides, and site content. Or <a href="/resources" className="text-blue-700 hover:underline">browse the full directory</a>.</p>
    </div>
  );
}
