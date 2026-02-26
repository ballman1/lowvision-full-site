import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const features = [
  'Problem-oriented diagnostic workflow',
  'Test selection recipes by patient type',
  'Referral pathways and when to escalate',
  'Functional outcomes tracking metrics',
  'Templates, handouts, and checklists',
  'Coding and coverage documentation guide',
];

export function ProfessionalsHighlight() {
  return (
    <section className="py-16 sm:py-20 bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">For Professionals</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Built for clinicians, rehab teams, and educators too
            </h2>
            <p className="mt-4 text-blue-100 text-base leading-relaxed">
              Low Vision Navigator gives rehabilitation professionals a structured, problem-oriented workflow—from intake to referral. Built around real clinical constraints, not theoretical ideals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/professionals"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-800 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800"
              >
                Open Professional Hub
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/professionals/diagnostic-resources"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-blue-400 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View Diagnostic Resources
              </Link>
            </div>
          </div>

          <div className="bg-blue-700/50 rounded-2xl p-6 border border-blue-600">
            <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">What's included</h3>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-blue-50">
                  <CheckCircle className="h-4 w-4 text-teal-400 shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
