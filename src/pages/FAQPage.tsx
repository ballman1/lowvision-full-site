import { useState } from 'react';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { faqs } from '../data/faqs';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'care', label: 'Care' },
  { key: 'coverage', label: 'Coverage' },
  { key: 'rehab', label: 'Rehabilitation' },
  { key: 'technology', label: 'Technology' },
  { key: 'education', label: 'Education' },
];

export function FAQPage() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? faqs : faqs.filter((f) => f.category === active);

  return (
    <ContentPageLayout
      title="Frequently Asked Questions"
      subtitle="Answers to the questions people ask most about low vision care, coverage, rehabilitation, and technology."
      breadcrumbs={[{ label: 'FAQ' }]}
    >
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter FAQs by category">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            aria-pressed={active === key}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
              active === key
                ? 'bg-blue-700 border-blue-700 text-white'
                : 'border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6">
        {filtered.length > 0 ? (
          <FAQAccordion items={filtered} />
        ) : (
          <p className="py-10 text-center text-sm text-gray-400">No questions in this category yet.</p>
        )}
      </div>
    </ContentPageLayout>
  );
}
