import { Link } from 'react-router-dom';
import { ClipboardList, Map, Phone, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '1',
    Icon: ClipboardList,
    title: 'Tell us what\'s difficult',
    desc: 'Answer a few questions about your vision, daily challenges, and what matters most. It takes 2–6 minutes and you can save at any point.',
  },
  {
    number: '2',
    Icon: Map,
    title: 'Get a personalized roadmap',
    desc: 'Receive a ranked plan covering clinical care, rehabilitation, mobility support, assistive technology, and coverage options—tailored to your answers.',
  },
  {
    number: '3',
    Icon: Phone,
    title: 'Connect with real resources',
    desc: 'Your plan links directly to local clinics, state agencies, device trial programs, and funding pathways—plus questions to ask at your next appointment.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          <p className="mt-2 text-gray-500 text-base">A clear path from uncertainty to action—in minutes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative">
          <div className="hidden md:block absolute top-8 left-[calc(33.33%+1.5rem)] right-[calc(33.33%+1.5rem)] h-0.5 bg-gradient-to-r from-blue-200 to-teal-200" aria-hidden="true" />

          {steps.map(({ number, Icon, title, desc }) => (
            <div key={number} className="flex flex-col items-center text-center gap-4">
              <div className="relative z-10 w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center shadow-lg ring-4 ring-white">
                <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                  {number}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/intake/start"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            Start Now — It's Free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
