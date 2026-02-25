import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const chips = [
  { label: 'Reading', goal: 'reading' },
  { label: 'Mobility', goal: 'mobility' },
  { label: 'Glare', goal: 'glare' },
  { label: 'School', goal: 'school' },
  { label: 'Work', goal: 'work' },
  { label: 'Safety', goal: 'safety' },
];

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/20 rounded-full -translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Low vision help that turns{' '}
              <span className="text-blue-700">confusion</span> into a{' '}
              <span className="text-teal-600">clear plan</span>
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-lg">
              Find the right next steps for care, rehabilitation, devices, funding, and daily support—whether you're a patient, caregiver, or professional.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Start with a quick intake questionnaire or search local resources by ZIP/postal code.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/intake/start"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                Start Intake
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-teal-600 text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Find Local Services
              </Link>
            </div>

            <div className="mt-4">
              <Link
                to="/professionals"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                I'm a clinician — Explore professional tools →
              </Link>
            </div>

            <div className="mt-7">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2.5">Find help for:</p>
              <div className="flex flex-wrap gap-2">
                {chips.map(({ label, goal }) => (
                  <button
                    key={goal}
                    onClick={() => navigate(`/intake/start?goal=${goal}`)}
                    className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 text-gray-600 rounded-full hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center" aria-hidden="true">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full border-[32px] border-blue-100 opacity-60" />
              <div className="absolute inset-6 rounded-full border-[24px] border-teal-100 opacity-60" />
              <div className="absolute inset-12 rounded-full border-[16px] border-blue-200 opacity-50" />
              <div className="absolute inset-[72px] rounded-full bg-gradient-to-br from-blue-600 to-teal-500 opacity-90 shadow-2xl flex items-center justify-center">
                <svg viewBox="0 0 60 60" className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="30" cy="30" r="12" />
                  <circle cx="30" cy="30" r="4" fill="currentColor" stroke="none" />
                  <path d="M5 30 Q17 14 30 14 Q43 14 55 30 Q43 46 30 46 Q17 46 5 30Z" />
                </svg>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
              <p className="text-xs text-gray-400">Next step</p>
              <p className="text-sm font-semibold text-gray-800">Low Vision Exam</p>
            </div>
            <div className="absolute bottom-8 left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
              <p className="text-xs text-gray-400">Coverage available</p>
              <p className="text-sm font-semibold text-teal-700">Medicare + State VR</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
