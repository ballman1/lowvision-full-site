import { Link } from 'react-router-dom';
import { User, Users, Stethoscope, BookOpen, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';

const audiencePaths = [
  { Icon: User, label: "I'm a Patient", desc: "Get a clear plan for care, devices, and training.", href: '/intake/start?mode=patient', color: 'text-blue-600' },
  { Icon: Users, label: "I'm a Caregiver / Family Member", desc: "Support, safety, and what to do next—without guesswork.", href: '/intake/start?mode=caregiver', color: 'text-teal-600' },
  { Icon: Stethoscope, label: "I'm a Clinician", desc: "Problem-oriented workflow, tests, referrals, and tools.", href: '/professionals', color: 'text-blue-700' },
  { Icon: BookOpen, label: "I'm a Teacher / School Team", desc: "IEP/504 supports, accessible materials, classroom strategies.", href: '/community-support/education-services', color: 'text-green-700' },
  { Icon: Briefcase, label: "I'm an Employer / Vocational Counselor", desc: "Workplace accommodations and vocational resources.", href: '/community-support/employment-vocational', color: 'text-orange-700' },
];

const conditions = [
  { name: 'Age-Related Macular Degeneration (AMD)', desc: 'Central vision loss affecting reading, faces, and fine detail. Most common cause of low vision in adults over 60.' },
  { name: 'Glaucoma', desc: 'Progressive peripheral field loss that can narrow to tunnel vision over time. Often silent in early stages.' },
  { name: 'Diabetic Retinopathy', desc: 'Vision loss from damaged retinal blood vessels. Can cause fluctuating, scattered, or severe vision loss.' },
  { name: 'Retinitis Pigmentosa (RP)', desc: 'Progressive peripheral and night vision loss. Often begins in childhood or young adulthood.' },
  { name: 'Cortical Visual Impairment (CVI)', desc: 'Vision difficulty caused by brain processing differences rather than eye structure. Common in children with neurological conditions.' },
];

const nextSteps = [
  { n: '1', text: 'Schedule a comprehensive low vision examination with a low vision specialist or optometrist.' },
  { n: '2', text: 'Contact your state\'s blind services or vision rehabilitation agency to learn what\'s available for free.' },
  { n: '3', text: 'Explore assistive devices, rehabilitation options, and coverage paths using this site.' },
];

export function StartHerePage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-blue-300 text-sm font-semibold mb-2">Start Here</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Not sure where to begin?</h1>
          <p className="text-blue-100 text-lg max-w-xl">We'll point you to the right path in under 2 minutes. Choose what describes you best.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section aria-labelledby="audience-heading">
          <h2 id="audience-heading" className="text-2xl font-bold text-gray-900 mb-6">Choose your path</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audiencePaths.map(({ Icon, label, desc, href, color }) => (
              <Link
                key={href}
                to={href}
                className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${color}`} aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="lowvision-heading" className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 id="lowvision-heading" className="text-2xl font-bold text-gray-900 mb-3">What is low vision?</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Low vision is a significant visual impairment that cannot be fully corrected with glasses, contact lenses, medication, or surgery. It's not blindness—most people with low vision have some usable sight.</p>
            <p className="text-gray-600 leading-relaxed mb-4">Low vision is defined as best-corrected visual acuity of 20/70 or worse in the better eye, OR significant visual field loss. But definitions matter less than function—what you can and can't do in daily life.</p>
            <Link to="/start-here/what-is-low-vision" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800">
              Learn more about low vision <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
            <h3 className="text-base font-semibold text-blue-900 mb-4">How care usually works</h3>
            <ol className="space-y-3">
              {['Comprehensive eye exam identifies the condition', 'Low vision exam assesses functional vision', 'Rehabilitation evaluation sets goals', 'Training begins (O&M, VRT, AT)', 'Ongoing support and follow-up'].map((step, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-blue-800">
                  <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="conditions-heading">
          <h2 id="conditions-heading" className="text-2xl font-bold text-gray-900 mb-6">Common conditions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conditions.map(({ name, desc }) => (
              <div key={name} className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="nextsteps-heading">
          <h2 id="nextsteps-heading" className="text-2xl font-bold text-gray-900 mb-6">Your first 3 next steps</h2>
          <div className="space-y-4">
            {nextSteps.map(({ n, text }) => (
              <div key={n} className="flex items-start gap-4 bg-white rounded-xl border border-gray-200 p-5">
                <span className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center shrink-0">{n}</span>
                <p className="text-sm text-gray-700 leading-relaxed pt-1">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/intake/start" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl hover:bg-blue-800 transition-colors">
              Start Intake Questionnaire <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/start-here/next-steps" className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors">
              View detailed next steps
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
