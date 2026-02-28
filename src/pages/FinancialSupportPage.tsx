import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PageSEO } from '../components/seo/PageSEO';

function finPageSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name,
    description,
    about: { '@type': 'MedicalCondition', name: 'Low Vision' },
    audience: { '@type': 'Patient' },
    reviewedBy: { '@type': 'Organization', name: 'Low Vision Navigator Clinical Advisory Board' },
  };
}

function SupportCard({ title, href, desc, bullets }: { title: string; href: string; desc: string; bullets: string[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{desc}</p>
      <ul className="space-y-2 mb-5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
            <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
      <Link to={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors">
        Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

const financialItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Financial Support Programs for People with Low Vision',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Social Security Disability Insurance (SSDI)', url: 'https://lowvisionnavigator.org/financial-support/ssdi' },
    { '@type': 'ListItem', position: 2, name: 'Supplemental Security Income (SSI)', url: 'https://lowvisionnavigator.org/financial-support/ssi' },
    { '@type': 'ListItem', position: 3, name: 'Tax Relief for Vision Loss', url: 'https://lowvisionnavigator.org/financial-support/tax-relief' },
    { '@type': 'ListItem', position: 4, name: 'Transportation Assistance', url: 'https://lowvisionnavigator.org/financial-support/transportation' },
    { '@type': 'ListItem', position: 5, name: 'State Blind Agencies & Commissions', url: 'https://lowvisionnavigator.org/financial-support/blind-agencies-commissions' },
    { '@type': 'ListItem', position: 6, name: 'Emergency Financial Help', url: 'https://lowvisionnavigator.org/financial-support/emergency-help' },
  ],
};

export function FinancialSupportPage() {
  return (
    <div>
      <PageSEO
        title="Financial Support Programs for Low Vision & Blindness"
        description="Explore SSDI, SSI, tax relief, transportation assistance, state blind agency programs, and emergency financial help available to people with low vision or legal blindness."
        breadcrumbs={[{ label: 'Financial Support' }]}
        schema={financialItemListSchema}
      />
      <div className="bg-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Financial Support</h1>
          <p className="text-blue-100 text-lg max-w-2xl">Federal, state, and community financial programs for people with vision impairment.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DisclaimerBox text="Program rules change frequently. This information is for guidance only. Consult a benefits counselor or disability attorney for advice specific to your situation." />
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          <SupportCard
            title="SSDI — Social Security Disability Insurance"
            href="/financial-support/ssdi"
            desc="Monthly benefits for people who have worked and paid into Social Security but can no longer work due to a disability."
            bullets={[
              'Legal blindness has a specific SSA listing',
              'Based on work history and earned credits',
              'After 24 months, Medicare eligibility begins',
              'Allows some work under the SGA threshold',
            ]}
          />
          <SupportCard
            title="SSI — Supplemental Security Income"
            href="/financial-support/ssi"
            desc="Needs-based monthly payments for people with low income and resources who are blind, disabled, or age 65+."
            bullets={[
              'Does not require work history',
              'Income and asset limits apply',
              'Automatic Medicaid eligibility in most states',
              'Can be combined with SSDI if work history qualifies',
            ]}
          />
          <SupportCard
            title="State Blind & Vision Services Agencies"
            href="/resources?type=State+Blind+Agency"
            desc="State-funded agencies providing independent living training, technology, and vocational services at no or low cost."
            bullets={[
              'Free services for qualifying state residents',
              'O&M, VRT, and assistive technology',
              'Independent living skills training',
              'Vocational support and job placement',
            ]}
          />
          <SupportCard
            title="Tax Relief — ABLE Accounts & Deductions"
            href="/financial-support/tax-relief"
            desc="Federal and state tax benefits for people with visual disabilities."
            bullets={[
              'ABLE accounts: tax-advantaged savings for disability expenses',
              'Federal tax deduction for blindness (additional standard deduction)',
              'IRS Form 8826 for accessibility expenditures (businesses)',
              'RDSP (Registered Disability Savings Plan) for Canadians',
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function SSDIPage() {
  return (
    <ContentPageLayout
      title="Social Security Disability Insurance (SSDI)"
      subtitle="Monthly disability benefits for workers who can no longer perform substantial gainful activity."
      breadcrumbs={[{ label: 'Financial Support', href: '/financial-support' }, { label: 'SSDI' }]}
      showDisclaimer
      schema={finPageSchema('Social Security Disability Insurance (SSDI)', 'Monthly disability benefits for workers who can no longer perform substantial gainful activity.')}
    >
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">What SSDI covers</h2>
            <ul className="space-y-2">
              {['Monthly cash benefits based on work history', 'Medicare eligibility after 24 months of benefits', 'Dependent benefits for spouse and children in some cases', 'Back pay for eligible period before application was approved', 'Work incentives including Trial Work Period (TWP)'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Legal blindness criteria (SSA)</h2>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 space-y-2">
              <p className="text-sm text-blue-900 font-medium">You may qualify under the blindness listing if:</p>
              <ul className="space-y-1.5 text-sm text-blue-800">
                <li>• Best-corrected visual acuity of 20/200 or less in the better eye, OR</li>
                <li>• Visual field of 20 degrees or less in the better eye</li>
              </ul>
              <p className="text-xs text-blue-600 mt-2">If your vision doesn't meet the listing, you may still qualify through residual functional capacity analysis combined with age, education, and work history.</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">What to ask when you apply</h2>
          <ul className="space-y-2">
            {['Do I have enough work credits? (Usually 40 credits, 20 earned in last 10 years)', 'Has my ophthalmologist documented my VA and visual fields in my medical record?', 'Should I hire a disability attorney or advocate? (Often no upfront cost)', 'What is the current processing time and backlog at my local SSA office?', 'Am I eligible for SSI as well as SSDI (concurrent claims)?'].map((q) => (
              <li key={q} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-500 shrink-0">→</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContentPageLayout>
  );
}

export function SSIPage() {
  return (
    <ContentPageLayout
      title="Supplemental Security Income (SSI)"
      subtitle="Needs-based monthly payments for individuals who are blind, disabled, or elderly with limited income."
      breadcrumbs={[{ label: 'Financial Support', href: '/financial-support' }, { label: 'SSI' }]}
      showDisclaimer
      schema={finPageSchema('Supplemental Security Income (SSI)', 'Needs-based monthly payments for individuals who are blind, disabled, or elderly with limited income.')}
    >
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Key SSI features</h2>
            <ul className="space-y-2">
              {['Does not require prior work history', 'Income and asset limits apply (check current SSA thresholds)', 'Medicaid eligibility automatic in most states', 'Federal benefit rate plus optional state supplement', 'Special rules for students under 22 (income exclusions)'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Blindness definition for SSI</h2>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
              <p className="text-sm text-blue-800">Same visual criteria as SSDI: 20/200 or less in better eye, or visual field of 20 degrees or less. Children are evaluated using different age-appropriate criteria.</p>
            </div>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
}

export function TransportationPage() {
  return (
    <ContentPageLayout
      title="Transportation Assistance for Low Vision & Blindness"
      subtitle="Paratransit, Medicaid non-emergency medical transport, rideshare programs, and reduced-fare transit options."
      breadcrumbs={[{ label: 'Financial Support', href: '/financial-support' }, { label: 'Transportation' }]}
      schema={finPageSchema('Transportation Assistance for Low Vision & Blindness', 'Paratransit, Medicaid non-emergency medical transport, rideshare programs, and reduced-fare transit options.')}
      showDisclaimer
    >
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: 'ADA Paratransit',
              bullets: [
                'Required by the Americans with Disabilities Act for all fixed-route transit systems',
                'Provides origin-to-destination service for people who cannot use fixed routes',
                'Eligibility: apply through your local transit authority with documentation of disability',
                'Service area: within 3/4 mile of any fixed-route bus or rail line',
                'Fares cannot exceed twice the regular bus fare',
                'Advance reservation required — typically 1–3 days',
              ],
            },
            {
              title: 'Medicaid Non-Emergency Medical Transport (NEMT)',
              bullets: [
                'Free rides to and from Medicaid-covered medical appointments',
                'Covers low vision exams, rehabilitation visits, and specialist appointments',
                'Arranged through your state Medicaid agency or managed care plan',
                'May include taxi, rideshare, ambulance (non-emergency), or volunteer drivers',
                'Call your Medicaid plan at least 3 days ahead to schedule',
                'No cost to beneficiary if pre-authorized',
              ],
            },
            {
              title: 'Reduced-Fare Transit Programs',
              bullets: [
                'Most transit systems offer half-fare or free passes for people with disabilities',
                'Requires documentation (ophthalmologist letter or state ID card for blind individuals)',
                'Apply through your local transit authority — renewals typically annual',
                'Often covers bus, rail, subway, and ferry systems in the same metro area',
                'Some states extend reduced fares to Amtrak and intercity bus (Greyhound, FlixBus)',
              ],
            },
            {
              title: 'State & Nonprofit Programs',
              bullets: [
                'State blind services agencies may fund transportation for employment or rehabilitation',
                'Vocational rehabilitation can pay for transport to job training or work sites',
                'Many vision loss nonprofits offer volunteer driver programs (Lions Clubs, local societies)',
                'VA transportation benefit: free rides to VA facilities for eligible veterans',
                'Area Agency on Aging transportation programs for older adults with vision impairment',
              ],
            },
          ].map(({ title, bullets }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
              <ul className="space-y-1.5">
                {bullets.map((b) => (
                  <li key={b} className="text-sm text-gray-600 flex gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-bold text-gray-900 mb-2">What to ask your state blind services agency</h2>
          <ul className="space-y-1.5">
            {[
              'Do you fund transportation to rehabilitation appointments or orientation & mobility sessions?',
              'Can VR (vocational rehabilitation) pay for transport to job training?',
              'Is there a volunteer driver network through your agency or a partner organization?',
              'How do I apply for the local paratransit eligibility card?',
            ].map((q) => (
              <li key={q} className="text-sm text-gray-700 flex gap-2">
                <span className="text-blue-500 shrink-0">→</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/financial-support" className="text-sm text-blue-700 hover:underline">← All Financial Support</a>
          <a href="/coverage-funding/va-veterans" className="text-sm text-blue-700 hover:underline">VA Transportation Benefit</a>
          <a href="/financial-support/blind-agencies-commissions" className="text-sm text-blue-700 hover:underline">State Blind Agencies</a>
        </div>
      </div>
    </ContentPageLayout>
  );
}

export function BlindAgenciesPage() {
  return (
    <ContentPageLayout
      title="State Blind Agencies & Commissions"
      subtitle="Federally funded state programs that provide free or low-cost rehabilitation, training, technology, and financial support for people with visual impairments."
      breadcrumbs={[{ label: 'Financial Support', href: '/financial-support' }, { label: 'Blind Agencies & Commissions' }]}
      schema={finPageSchema('State Blind Agencies & Commissions', 'Federally funded state programs that provide free or low-cost rehabilitation, training, technology, and financial support for people with visual impairments.')}
    >
      <div className="space-y-8">
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            Every US state has a state agency for the blind or a division of vocational rehabilitation that serves people with visual impairments. These agencies are funded through a combination of state and federal money (Titles I and VII of the Rehabilitation Act) and provide services at no charge to eligible individuals.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What state blind agencies typically offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Vocational Rehabilitation (VR)', desc: 'Job training, workplace accommodations, assistive technology for employment, and job placement support. Often no cost to eligible individuals.' },
              { title: 'Independent Living Services', desc: 'Orientation & mobility training, ADL (daily living skills) training, and home modification assessments for non-vocational goals. Older individuals with vision loss are a priority population.' },
              { title: 'Assistive Technology', desc: 'Free short-term device loans, technology assessments, and purchasing assistance for computers, screen readers, magnification software, CCTVs, and other aids.' },
              { title: 'Low Vision Clinic Referrals', desc: 'Many state agencies maintain referral relationships with low vision clinics and can coordinate examinations for eligible individuals.' },
              { title: 'Transition Services', desc: 'Support for students with visual impairments transitioning to work, post-secondary education, or independent living.' },
              { title: 'Braille & Literacy', desc: 'Braille instruction, reading materials in accessible formats (braille, large print, audio), and talking book library access (NLS).' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-blue-50 rounded-xl border border-blue-100 p-5">
                <h3 className="text-sm font-semibold text-blue-900 mb-1.5">{title}</h3>
                <p className="text-sm text-blue-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to apply</h2>
          <ol className="space-y-3">
            {[
              'Search "[Your State] state agency for the blind" or "[Your State] division of vocational rehabilitation" to find the correct agency. Some states have separate agencies for blindness; others fold vision services into a general VR agency.',
              'Call or submit an online application. No referral is needed — you apply directly. Bring documentation of your vision diagnosis (ophthalmologist or optometrist records).',
              'An eligibility determination will be made, usually within 60 days. If eligible, a counselor will develop an Individualized Plan for Employment (IPE) or Independent Living Plan with you.',
              'Services begin based on your plan. Priority is given to people with the most significant disabilities when funding is limited — legal blindness typically qualifies as a significant disability.',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="text-base font-semibold text-amber-900 mb-2">Order of selection (when funding is limited)</h2>
          <p className="text-sm text-amber-800 leading-relaxed">
            When state VR agencies have more applicants than funding allows, they implement an "order of selection" that prioritizes individuals with the most significant disabilities. Legal blindness almost always qualifies for the highest priority category. If your state is in order of selection, ask to be placed on the waiting list and ask what interim services may still be available.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/financial-support" className="text-sm text-blue-700 hover:underline">← All Financial Support</a>
          <a href="/financial-support/transportation" className="text-sm text-blue-700 hover:underline">Transportation Programs</a>
          <a href="/rehab-training" className="text-sm text-blue-700 hover:underline">Rehabilitation & Training</a>
        </div>
      </div>
    </ContentPageLayout>
  );
}

export function EmergencyHelpPage() {
  return (
    <ContentPageLayout
      title="Emergency Financial Assistance for Vision Loss"
      subtitle="When you need help now — programs for people facing urgent financial hardship related to blindness or low vision."
      breadcrumbs={[{ label: 'Financial Support', href: '/financial-support' }, { label: 'Emergency Help' }]}
      schema={finPageSchema('Emergency Financial Assistance for Vision Loss', 'When you need help now — programs for people facing urgent financial hardship related to blindness or low vision.')}
      showDisclaimer
    >
      <div className="space-y-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h2 className="text-base font-semibold text-red-900 mb-2">If you are in crisis</h2>
          <p className="text-sm text-red-800 leading-relaxed">
            If you are facing an immediate threat to housing, utilities, or safety, contact your <strong>local 211 service</strong> (dial 2-1-1 or visit 211.org). This free, confidential service connects people to emergency food, shelter, utilities assistance, and social services in their area.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency programs by category</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Emergency device and technology assistance',
                items: [
                  'State blind agencies sometimes have emergency funds for essential assistive devices — contact your state agency directly and explain the urgency.',
                  'Lions Clubs International has a history of funding eyeglasses and low vision aids for individuals in financial need. Locate your local Lions Club at lionsclubs.org.',
                  'National Federation of the Blind (NFB) and American Foundation for the Blind (AFB) maintain information about emergency equipment funds and scholarships.',
                  'Some technology manufacturers (Apple, Microsoft, Freedom Scientific) offer accessibility grants or reduced-cost licensing for individuals in need.',
                ],
              },
              {
                title: 'Utility and housing assistance',
                items: [
                  'LIHEAP (Low Income Home Energy Assistance Program): federally funded heating/cooling assistance; income-based eligibility. Apply through your local Community Action Agency.',
                  'Section 8 / HUD housing vouchers: if you are on a waiting list, inform the housing authority of your disability status — you may qualify for preference or emergency placement.',
                  'Habitat for Humanity may fund home modifications (ramp, lighting) for qualifying individuals. Contact your local affiliate.',
                  'Many utilities have hardship funds or deferred payment plans specifically for customers with disabilities — call and ask directly.',
                ],
              },
              {
                title: 'Food and basic needs',
                items: [
                  'SNAP (Supplemental Nutrition Assistance Program): if you receive SSI, you may be categorically eligible for SNAP without a separate financial review.',
                  'Local food banks and pantries: many have accessible pickup options or home delivery for people who cannot travel.',
                  'Meals on Wheels programs often prioritize people with disabilities and seniors with low vision.',
                ],
              },
              {
                title: 'Legal and advocacy support',
                items: [
                  'Legal Aid offices can help with benefit denials, landlord disputes, and emergency advocacy — no-cost for qualifying individuals.',
                  'Protection and Advocacy (P&A) organizations in every state provide free legal services to people with disabilities on issues including housing, benefits, and discrimination.',
                  'Disability Rights Advocates and the American Council of the Blind Legal Center can assist with emergency civil rights issues.',
                ],
              },
            ].map(({ title, items }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex gap-2 items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/financial-support" className="text-sm text-blue-700 hover:underline">← All Financial Support</a>
          <a href="/financial-support/blind-agencies-commissions" className="text-sm text-blue-700 hover:underline">State Blind Agencies</a>
          <a href="/financial-support/ssdi" className="text-sm text-blue-700 hover:underline">SSDI Benefits</a>
        </div>
      </div>
    </ContentPageLayout>
  );
}

export function TaxReliefPage() {
  return (
    <ContentPageLayout
      title="Tax Relief for Visual Disabilities"
      subtitle="Federal and state tax benefits, ABLE accounts, and Canadian RDSP programs."
      breadcrumbs={[{ label: 'Financial Support', href: '/financial-support' }, { label: 'Tax Relief' }]}
      schema={finPageSchema('Tax Relief for Visual Disabilities', 'Federal and state tax benefits, ABLE accounts, and Canadian RDSP programs.')}
      showDisclaimer
    >
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: 'ABLE Accounts (US)', bullets: ['Tax-advantaged savings for disability-related expenses', 'Up to $18,000/year contribution (2024)', 'Does not affect SSI eligibility up to $100,000', 'Expenses: education, technology, health, housing', 'www.ablenrc.org for state plan options'] },
            { title: 'IRS Blindness Deduction', bullets: ['Additional standard deduction for legally blind individuals', '$1,950 additional for single filers (2024)', 'Does not require itemizing', 'Must meet legal blindness definition (20/200 or <20° field)', 'Also available for taxpayers with blind spouses'] },
            { title: 'Medical Expense Deductions', bullets: ['Low vision exam fees', 'Prescription low vision devices (sometimes)', 'Guide dog care expenses', 'Adaptive technology for work or school', 'Transportation to medical care'] },
            { title: 'RDSP — Canada', bullets: ['Registered Disability Savings Plan for eligible Canadians', 'Government bonds and grants up to $70,000 over lifetime', 'For individuals eligible for the Disability Tax Credit (DTC)', 'Contact Canada Revenue Agency (CRA) to start application', 'Long-term savings vehicle; withdrawal rules apply'] },
          ].map(({ title, bullets }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
              <ul className="space-y-1.5">{bullets.map((b) => <li key={b} className="text-sm text-gray-600 flex gap-2"><span className="text-teal-500 shrink-0">•</span>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </ContentPageLayout>
  );
}
