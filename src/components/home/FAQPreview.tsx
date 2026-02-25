import { Link } from 'react-router-dom';
import { FAQAccordion } from '../ui/FAQAccordion';
import { homepageFaqs } from '../../data/faqs';
import { ArrowRight } from 'lucide-react';

export function FAQPreview() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Common questions</h2>
            <p className="mt-1 text-gray-500 text-base">Answers to what people ask most.</p>
          </div>
          <Link
            to="/faq"
            className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:underline whitespace-nowrap"
          >
            View all questions
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6">
          <FAQAccordion items={homepageFaqs} />
        </div>
      </div>
    </section>
  );
}
