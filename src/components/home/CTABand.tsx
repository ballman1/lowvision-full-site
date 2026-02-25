import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

export function CTABand() {
  return (
    <section className="py-16 sm:py-20 bg-blue-900 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
          Ready to take the next step?
        </h2>
        <p className="mt-4 text-blue-200 text-lg">
          Your personalized care roadmap is a few questions away. No account required.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/intake/start"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-900 font-bold text-base rounded-xl hover:bg-blue-50 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
          >
            Start Intake
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-blue-400 text-white font-semibold text-base rounded-xl hover:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Find Local Services
          </Link>
        </div>

        <p className="mt-6 text-sm text-blue-300">
          For professionals:{' '}
          <Link
            to="/professionals/diagnostic-resources"
            className="underline hover:text-white transition-colors focus-visible:outline-none focus-visible:text-white"
          >
            Open diagnostic resources →
          </Link>
        </p>
      </div>
    </section>
  );
}
