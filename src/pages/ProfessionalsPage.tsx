import { Link } from 'react-router-dom';
import { ArrowRight, Activity, BookOpen, FileText, Users, BarChart2, RefreshCw } from 'lucide-react';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';
import { PageSEO } from '../components/seo/PageSEO';

const sections = [
  {
    Icon: Activity,
    title: 'Diagnostic Resources Hub',
    desc: 'Core domain library covering visual acuity, fields, contrast, glare, oculomotor function, cognition, and functional goals.',
    href: '/professionals/diagnostic-resources',
    links: [
      { label: 'Core Domains Library', href: '/professionals/diagnostic-resources/core-domains' },
      { label: 'Full Diagnostic Overview', href: '/professionals/diagnostic-resources' },
    ],
  },
  {
    Icon: BookOpen,
    title: 'Test Selection Recipes',
    desc: 'Tiered testing guides for reading-focused patients, mobility concerns, school-age patients, working adults, older adults with cognitive concerns, and complex cases.',
    href: '/professionals/test-selection-recipes',
    links: [
      { label: 'All Test Recipes', href: '/professionals/test-selection-recipes' },
    ],
  },
  {
    Icon: RefreshCw,
    title: 'Follow-Up & Modification Protocols',
    desc: 'Decision-tree guidance for when the first plan misses—magnifier not working, glare still severe, fatigue high, device rejection.',
    href: '/professionals/follow-up-modification-protocols',
    links: [
      { label: 'View Protocols', href: '/professionals/follow-up-modification-protocols' },
    ],
  },
  {
    Icon: Users,
    title: 'Referral Pathways',
    desc: 'When to send to OT/VRT, O&M, TVI, neuro, social work, and other specialists—with practical criteria and documentation tips.',
    href: '/professionals/referral-pathways',
    links: [
      { label: 'Referral Guide', href: '/professionals/referral-pathways' },
    ],
  },
  {
    Icon: BarChart2,
    title: 'Functional Outcomes & Metrics',
    desc: 'Reading speed/endurance, ADL independence, mobility confidence, device adoption, and patient-reported outcomes with follow-up timing.',
    href: '/professionals/functional-outcomes-metrics',
    links: [
      { label: 'Outcomes Framework', href: '/professionals/functional-outcomes-metrics' },
    ],
  },
  {
    Icon: FileText,
    title: 'Templates & Handouts',
    desc: 'Referral letters, visit note templates, patient handouts, home safety checklists, and follow-up scripts.',
    href: '/professionals/templates',
    links: [
      { label: 'Browse Templates', href: '/professionals/templates' },
      { label: 'Coding & Coverage Guide', href: '/professionals/coding-coverage-guide' },
    ],
  },
];

export function ProfessionalsPage() {
  return (
    <div>
      <PageSEO
        title="Clinical Workflow Hub — Low Vision Professionals"
        description="Diagnostic resources, test selection guides, referral pathways, outcome metrics, billing templates, and training tools for low vision clinicians and rehabilitation specialists."
        breadcrumbs={[{ label: 'For Professionals' }]}
      />
      <div className="bg-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-blue-300 text-sm font-semibold mb-2">For Professionals</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Clinical Workflow Hub</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Diagnostic prioritization, referral logic, and practical tools—built for real-world low vision and rehabilitation practice.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <DisclaimerBox text="These resources are designed to support—not replace—clinical judgment. Always apply professional expertise to individual patient situations." />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {sections.map(({ Icon, title, desc, href, links }) => (
            <div key={href} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
              <div className="space-y-1.5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
