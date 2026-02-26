import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const columns = [
  {
    heading: 'Patients & Families',
    links: [
      { label: 'Start Here', href: '/start-here' },
      { label: 'Patient Intake', href: '/intake' },
      { label: 'Find Local Resources', href: '/resources' },
      { label: 'Rehab & Training', href: '/rehab-training' },
      { label: 'Devices & Technology', href: '/devices-technology' },
      { label: 'Community Support', href: '/community-support' },
    ],
  },
  {
    heading: 'Professionals',
    links: [
      { label: 'Professional Hub', href: '/professionals' },
      { label: 'Diagnostic Resources', href: '/professionals/diagnostic-resources' },
      { label: 'Test Selection Recipes', href: '/professionals/test-selection-recipes' },
      { label: 'Referral Pathways', href: '/professionals/referral-pathways' },
      { label: 'Templates & Handouts', href: '/professionals/templates' },
    ],
  },
  {
    heading: 'Coverage & Funding',
    links: [
      { label: 'Medicare', href: '/coverage-funding/medicare' },
      { label: 'Medicaid', href: '/coverage-funding/medicaid' },
      { label: 'Canada Funding', href: '/coverage-funding/canada-provincial-plans' },
      { label: 'SSDI / SSI', href: '/financial-support/ssdi' },
      { label: 'Financial Support', href: '/financial-support' },
      { label: 'VA Benefits', href: '/coverage-funding/va-veterans' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Mission', href: '/about/mission' },
      { label: 'Advisory Board', href: '/about/clinical-advisory-board' },
      { label: 'Accessibility', href: '/about/accessibility-statement' },
      { label: 'Privacy', href: '/about/privacy' },
      { label: 'Contact', href: '/about/contact' },
      { label: 'Submit a Resource', href: '/about/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Eye className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-white">Low Vision Navigator</span>
            <span className="text-sm text-gray-500">Low Vision & Blindness Care</span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <Link to="/about/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/about/accessibility-statement" className="hover:text-white transition-colors">Accessibility</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link to="/about/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-600 max-w-2xl">
          Low Vision Navigator is an educational resource and planning tool. It does not provide medical diagnosis, treatment recommendations, legal advice, or insurance guarantees. Always consult qualified healthcare professionals for medical decisions.
        </p>
      </div>
    </footer>
  );
}
