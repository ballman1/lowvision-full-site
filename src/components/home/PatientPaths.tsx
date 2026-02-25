import { Link } from 'react-router-dom';
import { BookOpen, Sun, Navigation, Monitor, Home, Briefcase, ArrowRight } from 'lucide-react';

const paths = [
  { Icon: BookOpen, title: 'Reading & Small Print', desc: 'Mail, books, menus, labels, medications.', href: '/intake/start?goal=reading', accent: 'border-blue-500' },
  { Icon: Sun, title: 'Glare & Light Sensitivity', desc: 'Bright lights, screens, outdoor glare, photophobia.', href: '/intake/start?goal=glare', accent: 'border-amber-500' },
  { Icon: Navigation, title: 'Mobility & Safety', desc: 'Falls, stairs, curbs, intersections, transit.', href: '/intake/start?goal=mobility', accent: 'border-teal-500' },
  { Icon: Monitor, title: 'Computer, Phone & Schoolwork', desc: 'Screens, typing, remote work, digital access.', href: '/intake/start?goal=work', accent: 'border-blue-400' },
  { Icon: Home, title: 'Daily Tasks at Home', desc: 'Cooking, meds, cleaning, mail, personal care.', href: '/intake/start?goal=daily', accent: 'border-green-500' },
  { Icon: Briefcase, title: 'School or Work Support', desc: 'IEP, workplace accommodations, vocational services.', href: '/intake/start?goal=school', accent: 'border-orange-400' },
];

export function PatientPaths() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Common starting points</h2>
          <p className="mt-2 text-gray-500 text-base">Not sure which area to focus on first? Start with the task that's hardest right now.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paths.map(({ Icon, title, desc, href, accent }) => (
            <Link
              key={href}
              to={href}
              className="group flex items-start gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <div className={`w-1 self-stretch rounded-full ${accent} shrink-0`} aria-hidden="true" />
              <Icon className="h-5 w-5 text-gray-400 mt-0.5 shrink-0 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
