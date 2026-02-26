import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bookmark, ChevronDown } from 'lucide-react';

interface NavLink { label: string; href: string; }
interface MenuColumn { heading?: string; links: NavLink[]; }
interface NavSection { key: string; label: string; columns: MenuColumn[]; }

const navSections: NavSection[] = [
  {
    key: 'start-here',
    label: 'Start Here',
    columns: [
      {
        heading: 'Quick Paths',
        links: [
          { label: "I'm a Patient", href: '/intake/start?mode=patient' },
          { label: "I'm a Caregiver / Family Member", href: '/intake/start?mode=caregiver' },
          { label: "I'm a Clinician", href: '/professionals' },
          { label: "I'm a Teacher / School Team", href: '/community-support/education-services' },
          { label: "I'm an Employer / Vocational Counselor", href: '/community-support/employment-vocational' },
        ],
      },
      {
        heading: 'What This Site Does',
        links: [
          { label: 'What "Low Vision" Means', href: '/start-here/what-is-low-vision' },
          { label: 'How Care Usually Works', href: '/start-here' },
          { label: 'Common Conditions & Patterns', href: '/start-here' },
          { label: 'Your First 3 Next Steps', href: '/start-here/next-steps' },
        ],
      },
      {
        heading: 'Get Started',
        links: [
          { label: 'Start Intake (2–6 min)', href: '/intake/start' },
          { label: 'Find Services Near Me', href: '/resources' },
        ],
      },
    ],
  },
  {
    key: 'resources',
    label: 'Find Local Resources',
    columns: [
      {
        heading: 'Search & Browse',
        links: [
          { label: 'Search by ZIP / Postal Code', href: '/resources' },
          { label: 'Browse by State / Province', href: '/resources' },
          { label: 'Browse by Service Type', href: '/resources/service-types' },
          { label: 'Virtual Services', href: '/resources?virtual=true' },
        ],
      },
      {
        heading: 'Essential Directories',
        links: [
          { label: 'State / Provincial Blind Services', href: '/resources?type=State+Blind+Agency' },
          { label: 'Vocational Rehabilitation (VR)', href: '/resources?type=Vocational+Rehabilitation' },
          { label: 'Talking Book Libraries', href: '/resources?type=Talking+Book+Library' },
          { label: 'Assistive Technology Programs', href: '/resources?type=Assistive+Technology' },
        ],
      },
      {
        heading: 'Compare & Decide',
        links: [
          { label: 'Compare Services', href: '/resources' },
          { label: 'What to Ask When You Call', href: '/resources' },
        ],
      },
    ],
  },
  {
    key: 'intake',
    label: 'Patient Intake',
    columns: [
      {
        heading: 'Start & Manage',
        links: [
          { label: 'Start Intake Questionnaire', href: '/intake/start' },
          { label: 'Save & Continue Later', href: '/intake/start' },
          { label: 'Update My Answers', href: '/intake/start' },
          { label: 'Printable Summary', href: '/intake/results' },
        ],
      },
      {
        heading: "What You'll Get",
        links: [
          { label: 'Ranked Next Steps', href: '/intake/results' },
          { label: 'Device Categories to Try', href: '/intake/results' },
          { label: 'Local Services to Contact', href: '/intake/results' },
          { label: 'Questions for Your Doctor', href: '/intake/results' },
        ],
      },
      {
        heading: 'Common Paths',
        links: [
          { label: 'Reading & Near Tasks', href: '/intake/start?goal=reading' },
          { label: 'Mobility & Safety', href: '/intake/start?goal=mobility' },
          { label: 'Glare & Light Sensitivity', href: '/intake/start?goal=glare' },
          { label: 'School & Learning', href: '/intake/start?goal=school' },
          { label: 'Work & Computer Use', href: '/intake/start?goal=work' },
        ],
      },
    ],
  },
  {
    key: 'professionals',
    label: 'For Professionals',
    columns: [
      {
        heading: 'Clinical Workflow',
        links: [
          { label: 'Diagnostic Resources Hub', href: '/professionals/diagnostic-resources' },
          { label: 'Core Domains Library', href: '/professionals/diagnostic-resources/core-domains' },
          { label: 'Test Selection Recipes', href: '/professionals/test-selection-recipes' },
          { label: 'Follow-Up Protocols', href: '/professionals/follow-up-modification-protocols' },
        ],
      },
      {
        heading: 'Referrals & Outcomes',
        links: [
          { label: 'Referral Pathways', href: '/professionals/referral-pathways' },
          { label: 'Functional Outcomes & Metrics', href: '/professionals/functional-outcomes-metrics' },
          { label: 'Coding & Coverage Guide', href: '/professionals/coding-coverage-guide' },
        ],
      },
      {
        heading: 'Tools & Templates',
        links: [
          { label: 'Templates & Handouts', href: '/professionals/templates' },
          { label: 'Training Library', href: '/professionals/training-library' },
          { label: 'Research & Evidence', href: '/professionals/research-evidence' },
        ],
      },
    ],
  },
  {
    key: 'coverage',
    label: 'Coverage & Funding',
    columns: [
      {
        heading: 'Healthcare Coverage',
        links: [
          { label: 'Medicare (US)', href: '/coverage-funding/medicare' },
          { label: 'Medicaid (US)', href: '/coverage-funding/medicaid' },
          { label: 'Provincial Plans (Canada)', href: '/coverage-funding/canada-provincial-plans' },
          { label: 'Private Insurance', href: '/coverage-funding/private-insurance' },
          { label: 'VA Benefits', href: '/coverage-funding/va-veterans' },
        ],
      },
      {
        heading: 'Financial Support',
        links: [
          { label: 'SSDI', href: '/financial-support/ssdi' },
          { label: 'SSI', href: '/financial-support/ssi' },
          { label: 'Medicaid Buy-In (MBI-WPD)', href: '/coverage-funding/medicaid-buy-in' },
          { label: 'Tax Relief (ABLE / RDSP)', href: '/financial-support/tax-relief' },
        ],
      },
      {
        heading: 'Appeals & Documentation',
        links: [
          { label: 'Appeals & Documentation', href: '/coverage-funding/appeals-documentation' },
          { label: 'Letters of Medical Necessity', href: '/coverage-funding/appeals-documentation' },
        ],
      },
    ],
  },
  {
    key: 'rehab',
    label: 'Rehab & Training',
    columns: [
      {
        heading: 'Core Rehab Services',
        links: [
          { label: 'Functional Vision Assessment', href: '/rehab-training/functional-vision-assessment' },
          { label: 'OT & ADL Training', href: '/rehab-training/adl-training' },
          { label: 'Orientation & Mobility (O&M)', href: '/rehab-training/orientation-mobility' },
          { label: 'Visual Skills Training', href: '/rehab-training/visual-skills-training' },
          { label: 'Assistive Tech Instruction', href: '/rehab-training/assistive-tech-instruction' },
          { label: 'Home Modifications', href: '/rehab-training/home-modifications' },
          { label: 'Tele-Rehab Options', href: '/rehab-training/tele-rehab-options' },
        ],
      },
      {
        heading: 'Where Rehab Happens',
        links: [
          { label: 'Clinic-Based Rehab', href: '/rehab-training' },
          { label: 'Home & Community Rehab', href: '/rehab-training' },
          { label: 'Tele-Rehab Options', href: '/rehab-training/tele-rehab-options' },
        ],
      },
      {
        heading: 'For Families',
        links: [
          { label: 'Home Setup & Lighting', href: '/rehab-training/home-modifications' },
          { label: 'Safety Checklists', href: '/rehab-training/home-modifications' },
        ],
      },
    ],
  },
  {
    key: 'devices',
    label: 'Devices & Technology',
    columns: [
      {
        heading: 'Device Types',
        links: [
          { label: 'Optical Devices', href: '/devices-technology/optical-devices' },
          { label: 'Electronic & Digital Aids', href: '/devices-technology/electronic-digital-aids' },
          { label: 'Software & Apps', href: '/devices-technology/software-apps' },
          { label: 'Daily Living Aids', href: '/devices-technology/daily-living-aids' },
          { label: 'Glare & Light Management', href: '/devices-technology/glare-light-management' },
          { label: 'Braille & Literacy Tools', href: '/devices-technology/braille-literacy-tools' },
        ],
      },
      {
        heading: 'By Task',
        links: [
          { label: 'Reading & Mail', href: '/intake/start?goal=reading' },
          { label: 'Computer & Schoolwork', href: '/intake/start?goal=work' },
          { label: 'Mobility & Outdoor Use', href: '/intake/start?goal=mobility' },
          { label: 'Glare / Light Sensitivity', href: '/intake/start?goal=glare' },
        ],
      },
      {
        heading: 'Compare & Learn',
        links: [
          { label: 'Compare Devices', href: '/devices-technology/compare' },
        ],
      },
    ],
  },
  {
    key: 'community',
    label: 'Community & Support',
    columns: [
      {
        heading: 'Emotional & Social',
        links: [
          { label: 'Adjustment to Vision Loss', href: '/community-support/emotional-support' },
          { label: 'Caregiver & Family Support', href: '/community-support/caregiver-family' },
        ],
      },
      {
        heading: 'Education & Youth',
        links: [
          { label: 'School Services (TVI / IEP / 504)', href: '/community-support/education-services' },
          { label: 'Transition to Adulthood', href: '/community-support/youth-family-pathways' },
          { label: 'Youth & Family Pathways', href: '/community-support/youth-family-pathways' },
        ],
      },
      {
        heading: 'Work & Independence',
        links: [
          { label: 'Employment & Vocational', href: '/community-support/employment-vocational' },
          { label: 'Guide Dog Services', href: '/community-support/guide-dog-services' },
          { label: 'Senior Support', href: '/community-support/senior-support' },
        ],
      },
    ],
  },
];

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenu(null);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" ref={menuRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-24 lg:h-32 xl:h-36">
            <Link to="/" className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded-md" aria-label="Low Vision Navigator Home">
              <img src="/logo.png" alt="Low Vision Navigator" className="h-12 sm:h-16 md:h-20 lg:h-28 xl:h-32 w-auto" />
            </Link>

            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
              {navSections.map((section) => (
                <div key={section.key} className="relative">
                  <button
                    aria-expanded={openMenu === section.key}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(openMenu === section.key ? null : section.key)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  >
                    {section.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === section.key ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/search"
                aria-label="Search"
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:text-blue-700 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <Search className="h-4.5 w-4.5" aria-hidden="true" />
              </Link>
              <Link
                to="/saved-plan"
                aria-label="Saved Plan"
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:text-blue-700 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <Bookmark className="h-4.5 w-4.5" aria-hidden="true" />
              </Link>
              <Link
                to="/intake/start"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                Start Intake
              </Link>
              <button
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden h-9 w-9 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {openMenu && (
          <div className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-gray-200 shadow-xl z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {navSections.filter((s) => s.key === openMenu).map((section) => (
                <div key={section.key} className="grid grid-cols-3 gap-8">
                  {section.columns.map((col, ci) => (
                    <div key={ci}>
                      {col.heading && (
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          {col.heading}
                        </h2>
                      )}
                      <ul className="space-y-1.5">
                        {col.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              to={link.href}
                              className="block text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto">
            <nav aria-label="Mobile navigation">
              {navSections.map((section) => (
                <details key={section.key} className="border-b border-gray-100">
                  <summary className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 cursor-pointer list-none hover:bg-gray-50">
                    {section.label}
                    <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </summary>
                  <div className="px-4 pb-3">
                    {section.columns.map((col, ci) => (
                      <div key={ci} className="mb-3">
                        {col.heading && (
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 mt-2">{col.heading}</p>
                        )}
                        <ul className="space-y-1">
                          {col.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                to={link.href}
                                className="block text-sm text-gray-600 hover:text-blue-700 py-1 transition-colors"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
              <div className="p-4 flex flex-col gap-2">
                <Link
                  to="/intake/start"
                  className="w-full text-center px-4 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Start Intake
                </Link>
                <Link
                  to="/resources"
                  className="w-full text-center px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Find Local Services
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
