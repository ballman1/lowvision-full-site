import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { CheckCircle, FileText, Download, ArrowRight } from 'lucide-react';

export function ReferralPathwaysPage() {
  const pathways = [
    { title: 'Orientation & Mobility Specialist', when: ['Falls history or fear of falling', 'Difficulty with street crossings, stairs, or transit', 'Visual field loss ≥30° or VA ≤20/200', 'Patient lives alone', 'Wants to use public transportation independently'], notes: 'Priority referral. Do not wait until device training is complete.' },
    { title: 'Vision Rehabilitation Therapist (VRT)', when: ['Difficulty with reading, cooking, medication management', 'Home safety concerns', 'ADL independence goals', 'New to significant vision loss'], notes: 'Can often provide home visits. State blind agencies frequently employ or fund VRTs.' },
    { title: 'Occupational Therapist (OT) — Vision Specialty', when: ['Work-related goals', 'Complex ADL needs', 'Cognitive overlay', 'Post-acute rehabilitation context'], notes: 'Ensure OT has vision specialization; general OTs may lack low vision training.' },
    { title: 'Teacher of the Visually Impaired (TVI)', when: ['School-age patient', 'IEP or 504 plan needed', 'Braille literacy or accessible materials assessment', 'Learning media assessment (LMA) needed'], notes: 'Refer to school district special education coordinator. TVI can evaluate and serve on IEP team.' },
    { title: 'Assistive Technology Specialist', when: ['Computer or workplace AT needs', 'Screen reader or magnification software instruction needed', 'Complex device needs beyond optical devices'], notes: 'State AT programs offer free evaluations and device trials. AER and ATIA certify AT specialists.' },
    { title: 'Social Work / Care Coordination', when: ['Financial barriers to care', 'Social isolation or depression', 'Housing instability', 'Caregiver burden concerns', 'Benefits navigation needed'], notes: 'Often the most underused referral. Significant unmet need in most low vision practices.' },
    { title: 'Neuro-Ophthalmology', when: ['Suspected CVI (cortical visual impairment)', 'Optic neuropathy of unclear etiology', 'Visual field defect with possible neurological origin', 'Incongruent acuity and visual field findings'], notes: 'Required for complete workup when clinical picture doesn\'t fit. Affects both prognosis and rehab planning.' },
  ];

  return (
    <ContentPageLayout
      title="Referral Pathways"
      subtitle="When to refer, who to refer to, and what to include in your referral."
      breadcrumbs={[{ label: 'For Professionals', href: '/professionals' }, { label: 'Referral Pathways' }]}
    >
      <div className="space-y-5">
        {pathways.map((p) => (
          <div key={p.title} className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-base font-bold text-gray-900 mb-3">{p.title}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Refer when:</p>
                <ul className="space-y-1.5">
                  {p.when.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-3.5 w-3.5 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Clinical note</p>
                <p className="text-sm text-blue-800">{p.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ContentPageLayout>
  );
}

export function FunctionalOutcomesPage() {
  const domains = [
    { title: 'Reading Speed & Endurance', metrics: ['Words per minute at threshold print size', 'Maximum reading time before fatigue', 'Print size achievable at preferred reading speed', 'Changes at 2 wk / 6 wk / 3 mo follow-up'] },
    { title: 'ADL Independence', metrics: ['Independence scale for cooking, medications, home management', 'Safety incident frequency (burns, falls, medication errors)', 'Caregiver assistance hours per week', 'Self-report: Manchester LV Questionnaire'] },
    { title: 'Mobility Confidence', metrics: ['Modified Falls Efficacy Scale', 'Community Participation Measures', 'Number of destinations accessed independently', 'White cane use frequency and consistency'] },
    { title: 'Device Adoption', metrics: ['Device use frequency (daily / weekly / occasional)', 'Satisfaction with device at 30 and 90 days', 'Tasks accomplished with device vs without', 'Secondary device abandonment (red flag)'] },
    { title: 'Patient-Reported Outcomes', metrics: ['NEI-VFQ-25 (vision-specific QoL)', 'VA LV VFQ-48 (low vision specific)', 'IVI questionnaire (participation)', 'Goal Attainment Scaling (individualized)'] },
    { title: 'Follow-Up Timing', metrics: ['2 weeks: initial device comfort and orientation check', '6 weeks: skill development and integration assessment', '3 months: long-term adoption and goal attainment', 'Annual: reassessment if condition is progressive'] },
  ];

  return (
    <ContentPageLayout
      title="Functional Outcomes & Metrics"
      subtitle="Measuring what matters: function, participation, and quality of life—not just acuity."
      breadcrumbs={[{ label: 'For Professionals', href: '/professionals' }, { label: 'Outcomes & Metrics' }]}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {domains.map((d) => (
          <div key={d.title} className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">{d.title}</h2>
            <ul className="space-y-1.5">
              {d.metrics.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ContentPageLayout>
  );
}

export function FollowUpProtocolsPage() {
  const protocols = [
    { trigger: 'Magnifier not working as expected', steps: ['Verify magnification calculation is correct for task demands', 'Check working distance adherence', 'Assess eccentric viewing skill — consider VRT referral', 'Trial higher magnification or different device type', 'Rule out physical fatigue or discomfort factors'] },
    { trigger: 'Glare remains severe despite filters', steps: ['Re-evaluate filter transmission — may need darker or different wavelength', 'Assess indoor vs outdoor specificity', 'Check for photoreceptor-level etiology (ERG consult)', 'Consider transition lenses or layered filter approach', 'Evaluate lighting environment modifications'] },
    { trigger: 'Fatigue remains high after training', steps: ['Reassess working distance and posture', 'Check illumination at task distance', 'Evaluate reading speed expectations vs realistic targets', 'Screen for visual processing or cognitive overlay', 'Consider shorter, more frequent task intervals'] },
    { trigger: 'Device rejection after trial', steps: ['Explore reason: physical discomfort, cosmetics, complexity?', 'Revisit patient goals — does device match stated priority?', 'Simplify device selection — start with simpler option', 'Ensure adequate instruction time (often underestimated)', 'Consider peer mentorship with experienced device user'] },
    { trigger: 'Good acuity but poor real-world function', steps: ['Prioritize contrast sensitivity and visual fields testing', 'Assess mesopic function if not done', 'Evaluate fixation stability and PRL status', 'Consider CVI or neurological factors', 'Increase functional task assessment vs clinical testing'] },
  ];

  return (
    <ContentPageLayout
      title="Follow-Up & Modification Protocols"
      subtitle="When the initial plan doesn't work—systematic approaches to finding what will."
      breadcrumbs={[{ label: 'For Professionals', href: '/professionals' }, { label: 'Follow-Up Protocols' }]}
    >
      <div className="space-y-5">
        {protocols.map((p) => (
          <details key={p.trigger} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group">
            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-gray-50">
              <h2 className="text-base font-bold text-gray-900">Trigger: {p.trigger}</h2>
              <span className="text-xs text-blue-700 group-open:hidden">View steps</span>
              <span className="text-xs text-gray-400 hidden group-open:block">Collapse</span>
            </summary>
            <div className="px-6 pb-5 border-t border-gray-100 pt-4">
              <ol className="space-y-2">
                {p.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </details>
        ))}
      </div>
    </ContentPageLayout>
  );
}

export function TemplatesPage() {
  const templates = [
    { title: 'Referral Checklist', desc: 'Key information to include when referring to O&M, VRT, OT, TVI, or AT specialists.', type: 'Checklist' },
    { title: 'Low Vision Visit Note Template', desc: 'Structured template covering chief complaint, functional goals, assessment domains, plan, and referrals.', type: 'Clinical Template' },
    { title: 'Patient Intake Handout', desc: 'Plain-language handout explaining what to expect at a low vision appointment.', type: 'Patient Handout' },
    { title: 'Home Safety Assessment Checklist', desc: 'Room-by-room assessment for lighting, fall hazards, contrast, and labeling.', type: 'Assessment Form' },
    { title: 'Letter of Medical Necessity Template', desc: 'Framework letter for device or rehabilitation service prior authorization.', type: 'Insurance Document' },
    { title: 'Follow-Up Script (2-Week Check)', desc: 'Guided phone or telehealth follow-up questions for initial device comfort check.', type: 'Clinical Script' },
  ];

  return (
    <ContentPageLayout
      title="Templates & Handouts"
      subtitle="Ready-to-use clinical templates, patient handouts, and documentation frameworks."
      breadcrumbs={[{ label: 'For Professionals', href: '/professionals' }, { label: 'Templates' }]}
    >
      <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-800">Templates are provided as starting frameworks. Adapt to your clinical context, institutional requirements, and patient-specific needs.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {templates.map((t) => (
          <div key={t.title} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{t.type}</span>
                <h3 className="text-sm font-bold text-gray-900 mt-2">{t.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t.desc}</p>
              </div>
              <FileText className="h-5 w-5 text-gray-300 shrink-0" aria-hidden="true" />
            </div>
            <button className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors focus-visible:outline-none focus-visible:underline">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download template
            </button>
          </div>
        ))}
      </div>
    </ContentPageLayout>
  );
}
