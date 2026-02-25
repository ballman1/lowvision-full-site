import { Link } from 'react-router-dom';
import { User, Users, Stethoscope, BookOpen, ArrowRight } from 'lucide-react';

const pathways = [
  {
    Icon: User,
    title: 'For Patients',
    body: 'Get a personalized plan based on what\'s hardest right now—reading, glare, mobility, daily tasks, or technology.',
    cta: 'Start My Plan',
    href: '/intake/start',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    Icon: Users,
    title: 'For Caregivers & Families',
    body: 'Learn what services to ask for, how to improve safety at home, and how to support independence without overwhelm.',
    cta: 'Support a Loved One',
    href: '/intake/start?mode=caregiver',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  {
    Icon: Stethoscope,
    title: 'For Professionals',
    body: 'Use diagnostic resources, test-prioritization guides, referral pathways, and practical templates for care teams.',
    cta: 'Open Professional Tools',
    href: '/professionals',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    Icon: BookOpen,
    title: 'For Schools & Educators',
    body: 'Find guidance for TVI services, IEP/504 planning, classroom access, and student support pathways.',
    cta: 'Explore School Support',
    href: '/community-support/education-services',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
];

export function PathwayCards() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Choose the path that fits you</h2>
          <p className="mt-3 text-base text-gray-500 max-w-xl mx-auto">
            Different people need different starting points. Pick the path that matches your role and we'll guide the next steps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pathways.map(({ Icon, title, body, cta, href, color, bg, border }) => (
            <div
              key={title}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} ${border} border flex items-center justify-center mb-4`}>
                <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{body}</p>
              <Link
                to={href}
                className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${color} hover:gap-2.5 transition-all group-hover:gap-2.5 focus-visible:outline-none focus-visible:underline`}
              >
                {cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
