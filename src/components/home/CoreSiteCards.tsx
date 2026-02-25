import { Link } from 'react-router-dom';
import { ClipboardList, MapPin, Shield, Activity, Monitor, Heart, ArrowRight } from 'lucide-react';

const cards = [
  { Icon: ClipboardList, title: 'Patient Intake Questionnaire', desc: 'Build a personalized care roadmap in minutes.', href: '/intake' },
  { Icon: MapPin, title: 'Find Local Services', desc: 'Search clinics, agencies, and programs near you.', href: '/resources' },
  { Icon: Shield, title: 'Coverage & Funding', desc: 'Navigate Medicare, Medicaid, VA, and more.', href: '/coverage-funding' },
  { Icon: Activity, title: 'Rehabilitation & Training', desc: 'O&M, ADL, visual skills, and tele-rehab options.', href: '/rehab-training' },
  { Icon: Monitor, title: 'Devices & Technology', desc: 'Magnifiers, apps, software, and daily living aids.', href: '/devices-technology' },
  { Icon: Heart, title: 'Community & Support', desc: 'Peer support, employment, education, and caregivers.', href: '/community-support' },
];

export function CoreSiteCards() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Explore the full platform</h2>
          <p className="mt-2 text-gray-500 text-base">Every section is designed to help you take a specific, concrete action.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ Icon, title, desc, href }) => (
            <Link
              key={href}
              to={href}
              className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 mt-0.5 leading-snug">{desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 mt-0.5 shrink-0 transition-colors" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
