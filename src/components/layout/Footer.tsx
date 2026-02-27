import { Link } from 'react-router-dom';

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
      { label: 'Coding & Coverage Guide', href: '/professionals/coding-coverage-guide' },
      { label: 'Training Library', href: '/professionals/training-library' },
      { label: 'Research & Evidence', href: '/professionals/research-evidence' },
      { label: 'Templates & Handouts', href: '/professionals/templates' },
    ],
  },
  {
    heading: 'Coverage & Funding',
    links: [
      { label: 'Medicare', href: '/coverage-funding/medicare' },
      { label: 'Medicaid', href: '/coverage-funding/medicaid' },
      { label: 'Medicaid Buy-In', href: '/coverage-funding/medicaid-buy-in' },
      { label: 'VA Benefits', href: '/coverage-funding/va-veterans' },
      { label: 'SSDI', href: '/financial-support/ssdi' },
      { label: 'SSI', href: '/financial-support/ssi' },
      { label: 'Transportation Assistance', href: '/financial-support/transportation' },
      { label: 'State Blind Agencies', href: '/financial-support/blind-agencies-commissions' },
      { label: 'Emergency Help', href: '/financial-support/emergency-help' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Mission', href: '/about/mission' },
      { label: 'Advisory Board', href: '/about/clinical-advisory-board' },
      { label: 'Partners', href: '/about/partners' },
      { label: 'How We Review Resources', href: '/about/how-we-review-resources' },
      { label: 'Accessibility', href: '/about/accessibility-statement' },
      { label: 'Privacy', href: '/about/privacy' },
      { label: 'Contact', href: '/about/contact' },
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
          <div className="flex items-center">
            <img src="/logo.png" alt="Low Vision Navigator" className="h-7 w-auto brightness-0 invert" />
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
