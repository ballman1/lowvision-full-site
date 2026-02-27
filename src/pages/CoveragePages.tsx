import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';
import { PageSEO } from '../components/seo/PageSEO';

function InfoSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
            <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuestionBox({ questions }: { questions: string[] }) {
  return (
    <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
      <h2 className="text-sm font-semibold text-blue-900 mb-3">What to ask when you call</h2>
      <ul className="space-y-2">
        {questions.map((q) => (
          <li key={q} className="text-sm text-blue-800 flex gap-2">
            <span className="text-blue-400 shrink-0">→</span>
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoveragePageTemplate({
  title,
  subtitle,
  breadcrumb,
  helpsWith,
  whoItApplies,
  questions,
  docsNeeded,
  relatedLinks,
  disclaimer,
}: {
  title: string;
  subtitle: string;
  breadcrumb: string;
  helpsWith: string[];
  whoItApplies: string[];
  questions: string[];
  docsNeeded: string[];
  relatedLinks: { label: string; href: string }[];
  disclaimer?: string;
}) {
  return (
    <ContentPageLayout
      title={title}
      subtitle={subtitle}
      breadcrumbs={[{ label: 'Coverage & Funding', href: '/coverage-funding' }, { label: breadcrumb }]}
      showDisclaimer
      headerBg="bg-blue-800"
    >
      {disclaimer && (
        <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
          <p>{disclaimer}</p>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <InfoSection title="What this usually helps with" items={helpsWith} />
        <InfoSection title="Who it may apply to" items={whoItApplies} />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <QuestionBox questions={questions} />
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Common documentation needed</h2>
          <ul className="space-y-2">
            {docsNeeded.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-gray-400 shrink-0 mt-0.5">→</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {relatedLinks.length > 0 && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">Related pages</h3>
          </div>
          {relatedLinks.map(({ label, href }) => (
            <Link key={href} to={href} className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-white hover:text-blue-700 transition-colors border-b border-gray-100 last:border-0">
              {label}
              <ChevronRight className="h-4 w-4 text-gray-300" aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
    </ContentPageLayout>
  );
}

export function CoverageLandingPage() {
  const programs = [
    { title: 'Medicare', href: '/coverage-funding/medicare', desc: 'Exams and some rehab services for Americans 65+.' },
    { title: 'Medicaid', href: '/coverage-funding/medicaid', desc: 'State-based coverage; varies significantly by state.' },
    { title: 'VA Benefits', href: '/coverage-funding/va-veterans', desc: 'Comprehensive blind/low vision rehab for eligible Veterans.' },
    { title: 'Private Insurance', href: '/coverage-funding/private-insurance', desc: 'Prior auth, LMNs, and how to improve approval odds.' },
    { title: 'Medicaid Buy-In', href: '/coverage-funding/medicaid-buy-in', desc: 'Coverage for working adults with disabilities.' },
    { title: 'SSDI & SSI', href: '/financial-support/ssdi', desc: 'Federal disability benefit programs.' },
    { title: 'Tax Relief', href: '/financial-support/tax-relief', desc: 'ABLE accounts, IRS deductions, and RDSP (Canada).' },
    { title: 'Canada Provincial Plans', href: '/coverage-funding/canada-provincial-plans', desc: 'Provincial assistive device programs and rehab coverage.' },
  ];
  return (
    <div>
      <PageSEO
        title="Low Vision Coverage & Funding Guide"
        description="Understand Medicare, Medicaid, VA benefits, and private insurance coverage for low vision exams, rehabilitation, and devices. Plus financial assistance programs."
        breadcrumbs={[{ label: 'Coverage & Funding' }]}
      />
      <div className="bg-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Coverage & Funding</h1>
          <p className="text-blue-100 text-lg max-w-2xl">Coverage is confusing by design. We make it navigable and actionable.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DisclaimerBox text="This information is educational and does not constitute insurance advice or a guarantee of coverage. Coverage terms change frequently—always verify with your insurer." />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map(({ title, href, desc }) => (
            <Link key={href} to={href} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
              <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">{title}</h2>
              <p className="text-sm text-gray-500">{desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">Learn more <ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MedicarePage() {
  return (
    <CoveragePageTemplate
      title="Medicare Coverage for Low Vision"
      subtitle="Understanding what Medicare typically covers—and critically, what it doesn't."
      breadcrumb="Medicare"
      helpsWith={[
        'Low vision exams billed by ophthalmologists (Medicare Part B covers medically necessary eye exams)',
        'Occupational therapy for vision-related ADL training (Part B)',
        'Outpatient rehabilitation services (Part B)',
        'Some VIST/blind rehabilitation through VA if dual-enrolled Veteran',
        'Diabetic eye exams (Part B, annual)',
        'Glaucoma exams for high-risk patients',
      ]}
      whoItApplies={[
        'Adults 65 and older enrolled in Medicare Part B',
        'Adults under 65 with qualifying disabilities on SSDI for 24 months',
        'Individuals with End-Stage Renal Disease (ESRD)',
        'Some low vision exam coverage under Medicare Advantage (varies by plan)',
      ]}
      questions={[
        'Is this provider a Medicare-participating optometrist or ophthalmologist?',
        'Does Medicare cover occupational therapy for vision loss at this facility?',
        'What diagnosis codes will be submitted for this visit?',
        'What is my Part B deductible and coinsurance for this service?',
        'Are optical devices or magnifiers covered under any supplemental plan?',
      ]}
      docsNeeded={[
        'Medicare card and secondary insurance if applicable',
        'Referral or order from primary care (if plan requires)',
        'Previous eye exam records and current glasses prescription',
        'Medical records documenting the qualifying diagnosis',
      ]}
      relatedLinks={[
        { label: 'Medicaid (State-Based)', href: '/coverage-funding/medicaid' },
        { label: 'Medicare Advantage Plans', href: '/coverage-funding/private-insurance' },
        { label: 'VA Benefits (for Veterans)', href: '/coverage-funding/va-veterans' },
        { label: 'Appeals & Documentation', href: '/coverage-funding/appeals-documentation' },
      ]}
      disclaimer="Medicare does not typically cover optical low vision devices (magnifiers, telescopes, bioptics) or most electronic aids. Rehabilitation occupational therapy is covered for qualifying conditions under Part B but requires medical necessity documentation."
    />
  );
}

export function MedicaidPage() {
  return (
    <CoveragePageTemplate
      title="Medicaid Coverage for Low Vision"
      subtitle="State-by-state coverage varies widely—here's how to navigate it."
      breadcrumb="Medicaid"
      helpsWith={[
        'Low vision exams and follow-up care (varies by state)',
        'Optical devices and electronic aids in some states',
        'Occupational therapy and vision rehabilitation therapy',
        'Home and community-based services through HCBS waivers',
        'Transportation to medical appointments',
        'Durable medical equipment (DME) with qualifying documentation',
      ]}
      whoItApplies={[
        'Low-income adults and families who meet income eligibility',
        'Individuals receiving SSI (automatically eligible in most states)',
        'People with disabilities qualifying under the working disabled pathway (MBI-WPD)',
        'Children under 21 (EPSDT provides broader benefits)',
        'Pregnant women, elderly, and individuals in nursing facilities',
      ]}
      questions={[
        'Does my state Medicaid plan cover low vision devices?',
        'What is the prior authorization process for low vision services?',
        'Are there HCBS waiver options that cover vision-related services?',
        'Do you have a Medicaid-contracted low vision provider in my area?',
        'What documentation does the plan require for device coverage?',
      ]}
      docsNeeded={[
        'Medicaid ID card and plan details',
        'Prior authorization request form (if required)',
        'Letter of Medical Necessity from prescribing provider',
        'Functional assessment documentation showing device need',
        'Income and disability verification for enrollment applications',
      ]}
      relatedLinks={[
        { label: 'Medicaid Buy-In (Working Disabled)', href: '/coverage-funding/medicaid-buy-in' },
        { label: 'HCBS Waivers', href: '/coverage-funding/mltc' },
        { label: 'State Blind Agencies', href: '/resources?type=State+Blind+Agency' },
        { label: 'Financial Support (SSDI/SSI)', href: '/financial-support' },
      ]}
    />
  );
}

export function VABenefitsPage() {
  return (
    <CoveragePageTemplate
      title="VA Benefits for Veterans with Vision Loss"
      subtitle="Eligible Veterans may access some of the most comprehensive blind rehabilitation services available."
      breadcrumb="VA Benefits"
      helpsWith={[
        'Blind Rehabilitation Centers (BRC) — residential comprehensive training',
        'Visual Impairment Services Team (VIST) — local VA case coordination',
        'Low vision clinical exams and device fitting',
        'Orientation & Mobility instruction',
        'Assistive technology provision and training',
        'Visual Skills Rehabilitation Therapy',
        'Adjustment to vision loss counseling',
      ]}
      whoItApplies={[
        'Veterans enrolled in VA healthcare with vision impairment',
        'Veterans with service-connected visual disability (any rating)',
        'Veterans with non-service-connected vision loss who are enrolled in VA care',
        'Veteran may need to be enrolled in VA healthcare first',
      ]}
      questions={[
        'Am I enrolled in VA healthcare? (Required for most services)',
        'Is my vision loss service-connected?',
        'Is there a Visual Impairment Services Team (VIST) Coordinator at my VA?',
        'Am I eligible for a Blind Rehabilitation Center program?',
        'What assistive devices can be provided through my local VA?',
      ]}
      docsNeeded={[
        'DD-214 (discharge papers) for VA healthcare enrollment',
        'Current VA enrollment card or healthcare ID',
        'Vision exam records and recent VA medical records',
        'VIST referral (usually initiated by VA eye care provider)',
      ]}
      relatedLinks={[
        { label: 'Find VA Low Vision Resources', href: '/resources?type=Low+Vision+Clinic' },
        { label: 'Medicare Coverage (for dual-enrolled)', href: '/coverage-funding/medicare' },
        { label: 'SSDI & VA Disability (can overlap)', href: '/financial-support/ssdi' },
      ]}
    />
  );
}

export function PrivateInsurancePage() {
  return (
    <CoveragePageTemplate
      title="Private & Employer Health Insurance"
      subtitle="Getting approvals requires the right documentation and framing. Here's what typically works."
      breadcrumb="Private Insurance"
      helpsWith={[
        'Low vision exams and follow-up care (varies by plan)',
        'Occupational therapy for ADL and work-related vision goals',
        'Some durable medical equipment with prior authorization',
        'Rehabilitation services under medical/hospital benefits',
        'Low vision devices with strong Letter of Medical Necessity',
      ]}
      whoItApplies={[
        'Employer-sponsored health plan members',
        'ACA marketplace plan holders',
        'Self-funded ERISA plans (rules vary)',
        'Medicare Advantage plan members (check plan specifics)',
      ]}
      questions={[
        'Does my plan cover low vision exams by an optometrist?',
        'What CPT codes are covered for vision rehabilitation therapy?',
        'What does my plan require for prior authorization for DME?',
        'Is occupational therapy covered for a diagnosis of low vision?',
        'What is the appeals process if a claim is denied?',
      ]}
      docsNeeded={[
        'Insurance card and member ID',
        'Letter of Medical Necessity (LMN) — functional impact focus',
        'Clinical documentation with ICD-10 codes',
        'Prior authorization request form',
        'Provider credentials and NPI number (for claim submission)',
      ]}
      relatedLinks={[
        { label: 'Appeals & Documentation Guide', href: '/coverage-funding/appeals-documentation' },
        { label: 'Medicare (for 65+ or disabled)', href: '/coverage-funding/medicare' },
        { label: 'State Vocational Rehabilitation', href: '/resources?type=Vocational+Rehabilitation' },
      ]}
    />
  );
}

export function AppealsPage() {
  return (
    <ContentPageLayout
      title="Appeals & Documentation"
      subtitle="Most denials can be appealed. Good documentation dramatically improves approval odds."
      breadcrumbs={[{ label: 'Coverage & Funding', href: '/coverage-funding' }, { label: 'Appeals' }]}
      showDisclaimer
    >
      <div className="space-y-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="text-base font-semibold text-amber-900 mb-2">Before you appeal</h2>
          <p className="text-sm text-amber-800">Request an Explanation of Benefits (EOB) and the specific denial reason in writing. Most denials state the payer's criteria—your appeal should address each criterion directly.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What to include in a Letter of Medical Necessity</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Functional impact statement', desc: 'Describe specific tasks the patient cannot do without the requested device or service. Quantify where possible (e.g., "reading speed reduced to 20 WPM without magnification").' },
              { title: 'Diagnosis and severity', desc: 'Include ICD-10 codes, best-corrected VA, and relevant functional test results. Contrast sensitivity and visual field data are often more compelling than acuity alone.' },
              { title: 'Alternatives tried and failed', desc: 'Document what was tried and why it was insufficient. This directly addresses "medical necessity" criteria.' },
              { title: 'Expected functional outcome', desc: 'State what function will be restored or preserved with the requested item. Tie it to goals—work, school, safety, or ADL independence.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">The appeals process (Medicare and most private plans)</h2>
          <ol className="space-y-3">
            {[
              'Request reconsideration within 60 days of the denial notice.',
              'Submit updated documentation—add functional testing results and a revised LMN.',
              'If denied again, request a Qualified Independent Contractor (QIC) review.',
              'Request an ALJ (Administrative Law Judge) hearing if still denied.',
              'Consider engaging a patient advocate, social worker, or disability attorney for complex cases.',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ContentPageLayout>
  );
}
