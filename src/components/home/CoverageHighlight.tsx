import { Link } from 'react-router-dom';
import { Shield, ChevronRight, ArrowRight } from 'lucide-react';

const programs = [
  { label: 'Medicare (US)', href: '/coverage-funding/medicare' },
  { label: 'Medicaid (US)', href: '/coverage-funding/medicaid' },
  { label: 'VA Benefits for Veterans', href: '/coverage-funding/va-veterans' },
  { label: 'SSDI & SSI', href: '/financial-support/ssdi' },
  { label: 'Provincial Plans (Canada)', href: '/coverage-funding/canada-provincial-plans' },
];

export function CoverageHighlight() {
  return (
    <section className="py-16 sm:py-20 bg-amber-50 border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-5">
              <Shield className="h-6 w-6 text-amber-700" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Coverage is often the{' '}
              <span className="text-amber-700">hardest part.</span>{' '}
              We help you map it.
            </h2>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              Insurance coverage for low vision care is fragmented, inconsistent, and varies by state, plan, and provider. We break it down so you know what to ask—and where to look for alternatives when traditional coverage falls short.
            </p>
            <Link
              to="/coverage-funding"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-700 text-white font-semibold rounded-xl hover:bg-amber-800 transition-colors shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
            >
              Find My Funding Path
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Coverage programs we cover</p>
            </div>
            <ul>
              {programs.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="flex items-center justify-between px-5 py-3.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors border-b border-gray-50 last:border-0 focus-visible:outline-none focus-visible:bg-amber-50"
                  >
                    {label}
                    <ChevronRight className="h-4 w-4 text-gray-300" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
