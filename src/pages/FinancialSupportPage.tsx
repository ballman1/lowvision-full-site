import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PageSEO } from '../components/seo/PageSEO';

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

export function FinancialSupportPage() {
  return (
    <div>
      <PageSEO
        title="Financial Support Programs for Low Vision & Blindness"
        description="Explore SSDI, SSI, tax relief, transportation assistance, state blind agency programs, and emergency financial help available to people with low vision or legal blindness."
        breadcrumbs={[{ label: 'Financial Support' }]}
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

export function TaxReliefPage() {
  return (
    <ContentPageLayout
      title="Tax Relief for Visual Disabilities"
      subtitle="Federal and state tax benefits, ABLE accounts, and Canadian RDSP programs."
      breadcrumbs={[{ label: 'Financial Support', href: '/financial-support' }, { label: 'Tax Relief' }]}
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
