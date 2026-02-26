import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { CheckCircle, FileText, Copy, Check, ChevronDown } from 'lucide-react';

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

const TEMPLATES = [
  {
    title: 'Referral Checklist',
    type: 'Checklist',
    desc: 'Key information to include when referring to O&M, VRT, OT, TVI, or AT specialists.',
    content: `REFERRAL CHECKLIST — LOW VISION
Adapt to your letterhead or EHR referral form.

PATIENT INFORMATION
  Name: ___________________________  DOB: ____________
  Referring provider: ______________  NPI: ____________
  Date of low vision evaluation: ____________
  Diagnosis / ICD-10: ____________________________________________

VISUAL STATUS
  Best-corrected VA (distance):  OD ______  OS ______  OU ______
  Best-corrected VA (near):      OD ______  OS ______  OU ______
  Visual field status: ___________________________________________
  Contrast sensitivity: __________________________________________
  Preferred retinal locus (PRL): [ ] Central  [ ] PRL — location: ________
  Condition stability: [ ] Stable  [ ] Progressive  [ ] Acute/Recent change

FUNCTIONAL GOALS (from patient interview)
  [ ] Reading — newsprint / books / medication labels / screen
  [ ] Mobility and outdoor navigation
  [ ] ADL independence (cooking, medications, personal care, home management)
  [ ] Work / vocational goals
  [ ] Leisure / social participation / hobbies
  Other: _______________________________________________________

CURRENT DEVICES / INTERVENTIONS
  Optical aids prescribed or trialed: ________________________________
  Electronic aids trialed: ________________________________________
  Current lighting modifications: __________________________________

REFERRAL REQUESTED
  [ ] Orientation & Mobility (O&M) Specialist
  [ ] Vision Rehabilitation Therapist (VRT)
  [ ] Occupational Therapist — Vision Specialty
  [ ] Teacher of the Visually Impaired (TVI)
  [ ] Assistive Technology Specialist
  [ ] Social Work / Care Coordination / Benefits Navigation
  [ ] Neuro-Ophthalmology
  [ ] Other: ___________________________________________________

SPECIAL CONSIDERATIONS
  Transportation / access barriers: _________________________________
  Language / interpreter needed: __________________________________
  Cognitive or communication considerations: ________________________
  Caregiver involvement: _________________________________________
  Urgency: [ ] Routine  [ ] Expedited — reason: ____________________`,
  },
  {
    title: 'Low Vision Visit Note Template',
    type: 'Clinical Template',
    desc: 'Structured template covering chief complaint, functional goals, assessment domains, plan, and referrals.',
    content: `LOW VISION VISIT NOTE
Date: ____________  Provider: ________________________________
Patient: _____________________________  DOB: ________________
Visit type: [ ] Initial evaluation  [ ] Follow-up  [ ] Device fitting

CHIEF COMPLAINT
Primary concern: _______________________________________________
Goals stated by patient: _________________________________________

HISTORY
  Ocular diagnosis: _____________________________________________
  Duration / onset of vision loss: __________________________________
  Condition course: [ ] Stable  [ ] Progressive  [ ] Recent change
  Prior low vision care: [ ] None  [ ] Previous evaluation: ____________
  Current optical correction: ______________________________________
  Current aids / devices: _________________________________________
  Employment / education / living situation: _________________________

FUNCTIONAL HISTORY
  Reading (near tasks): __________________________________________
  Mobility / navigation: __________________________________________
  ADLs (cooking, medications, home): _______________________________
  Work / school / leisure: _________________________________________
  Patient-reported priority task: ___________________________________

CLINICAL FINDINGS
  VA distance (cc):    OD ______  OS ______  OU ______
  VA near (cc at __ cm): OD ______  OS ______  OU ______
  Threshold print size: ________ M  /  ________ pt
  Contrast sensitivity: ___________________________________________
  Visual fields (confrontation / formal): _____________________________
  PRL status: [ ] Central fixation  [ ] PRL — location: _______________
  Fixation stability: [ ] Steady  [ ] Unsteady  [ ] Unmaintainable
  Oculomotor function: ___________________________________________
  Additional findings: ____________________________________________

DEVICES TRIALED
  Optical (type / power / working distance): _________________________
  Electronic aids: _______________________________________________
  Filters / tints: _________________________________________________
  Lighting modifications: __________________________________________
  Patient response to trials: ______________________________________

ASSESSMENT
  Primary diagnosis: ____________________________________________
  Functional prognosis: __________________________________________
  Barriers identified: ____________________________________________

PLAN
  Devices prescribed: ____________________________________________
  Referrals placed: ______________________________________________
  Patient education provided: _____________________________________
  Home program / practice tasks: __________________________________
  Follow-up: ______ weeks

PATIENT GOALS ESTABLISHED
  1. ___________________________________________________________
  2. ___________________________________________________________
  3. ___________________________________________________________`,
  },
  {
    title: 'Patient Intake Handout',
    type: 'Patient Handout',
    desc: 'Plain-language handout explaining what to expect at a low vision appointment.',
    content: `WELCOME TO YOUR LOW VISION APPOINTMENT
[Practice name / logo here]

WHAT IS A LOW VISION APPOINTMENT?
A low vision evaluation is different from a routine eye exam. The focus is on
how your vision affects your daily life — and what tools, training, and
strategies can help you do more of what matters to you.

WHAT TO BRING
  • Your current glasses or contact lenses
  • Any magnifiers, handheld devices, or other aids you already use
  • A list of 2–3 activities that have become difficult (examples: reading
    mail, reading medication labels, cooking, watching TV, using a phone)
  • A list of your current medications
  • Contact information for your other eye doctors
  • A family member or caregiver is welcome to join you

WHAT WILL HAPPEN AT YOUR APPOINTMENT
  1. We will ask you what activities are hardest. Your goals guide everything.
  2. We will measure your vision — near, distance, contrast, and how you
     respond to different lighting.
  3. We will try different magnifying tools, lighting, and other devices to
     find what helps you most with your specific tasks.
  4. We will talk about training and services that may be available to you —
     many at low or no cost through state programs.

WHAT THIS APPOINTMENT IS NOT
  • It is not a cure or a way to restore vision
  • It is not a replacement for your regular eye doctor
  • It is not only for people with severe vision loss — even mild vision
    changes can affect daily life, and help is available

IMPORTANT
You do not have to have severe vision loss to benefit from low vision care.
If vision is affecting any daily activity, an evaluation can help.

AFTER YOUR APPOINTMENT
You may receive a prescription for magnifying devices, referrals to
rehabilitation specialists, or information about programs funded through
your state or insurance. We will explain every recommendation.

QUESTIONS?
  Phone: ________________________
  Email: ________________________
  Office hours: __________________`,
  },
  {
    title: 'Home Safety Assessment Checklist',
    type: 'Assessment Form',
    desc: 'Room-by-room assessment for lighting, fall hazards, contrast, and labeling.',
    content: `HOME SAFETY ASSESSMENT — LOW VISION
Patient: _____________________________  Date: ________________
Clinician: ___________________________
Environment: [ ] Private home  [ ] Apartment  [ ] Assisted living  [ ] Other

LIGHTING
  [ ] Primary living areas have adequate illumination (≥50 fc for task areas)
  [ ] Nightlights present in hallways, bathroom, and bedroom
  [ ] Task lighting available at reading chair, kitchen counter, bathroom mirror
  [ ] Light switches accessible at room entries (glow-in-dark covers recommended)
  [ ] No strong glare sources in line of sight from primary seating positions
  [ ] Transitions between light and dark areas are gradual where possible
  Notes: _______________________________________________________

FALL HAZARDS
  [ ] Area rugs secured with non-slip backing or removed
  [ ] Electrical cords tucked away from walkways
  [ ] Clutter cleared from main walking paths (≥36" clearance recommended)
  [ ] Furniture arrangement allows clear navigation paths
  [ ] Door thresholds are flush or color-contrasted with floor
  [ ] Step edges / stair nosings clearly marked or lit
  [ ] Handrails present and secure on all stairs (both sides if possible)
  [ ] Pets or obstacles in primary pathways addressed
  Notes: _______________________________________________________

CONTRAST AND LABELING
  [ ] Light switch plates contrast with surrounding wall
  [ ] Stair nosings marked with contrasting tape or paint
  [ ] Appliance controls labeled with high-contrast tape or tactile markers
  [ ] Medications identified with large-print labels or tactile markers
  [ ] Important phone numbers available in accessible format
  [ ] Toilet seat contrasts with floor and surrounding surfaces
  [ ] Countertops provide contrast with dishes and food items
  Notes: _______________________________________________________

KITCHEN
  [ ] Cutting boards contrast with food being prepared
  [ ] Stove controls positioned accessibly and labeled tactilely
  [ ] Oven/microwave controls readable or marked at key settings
  [ ] Smoke and CO detectors functional
  [ ] Items stored at accessible height and in consistent locations
  [ ] Adequate lighting over all primary work surfaces
  Notes: _______________________________________________________

BATHROOM
  [ ] Grab bars present at toilet and in shower / tub
  [ ] Non-slip mat in shower and outside tub
  [ ] Hot / cold clearly marked on faucet handles
  [ ] Medications stored in organized, accessible manner
  [ ] Adequate lighting at sink and in shower
  Notes: _______________________________________________________

EMERGENCY PREPAREDNESS
  [ ] Emergency contact list in accessible format (large print / audio)
  [ ] Patient can reach phone in an emergency without glasses or lighting
  [ ] Exit routes from bedroom are clear and practiced
  Notes: _______________________________________________________

SUMMARY
Priority action items:
  1. ___________________________________________________________
  2. ___________________________________________________________
  3. ___________________________________________________________
Referral recommended: [ ] O&M  [ ] VRT  [ ] OT  [ ] Home modification
Follow-up: ___________________________________________________`,
  },
  {
    title: 'Letter of Medical Necessity',
    type: 'Insurance Document',
    desc: 'Framework letter for device or rehabilitation service prior authorization.',
    content: `[Provider Name / Practice Name]
[Address]
[Phone / Fax]
[Date]

[Insurance Company Name]
Attn: Medical Review / Prior Authorization
[Address or fax number]

Re: Prior Authorization Request — Low Vision Rehabilitation / Assistive Device
Patient name: ____________________  DOB: ____________
Member ID: ______________________  Group: ____________
Requesting provider NPI: __________

Dear Medical Review Department,

I am writing to request prior authorization for [describe service or device,
e.g., "low vision rehabilitation services" or "electronic video magnifier,
HCPCS V2610"] for the above-referenced patient currently under my care.

CLINICAL SUMMARY
[Patient name] is a [age]-year-old [male/female/patient] with a primary
diagnosis of [diagnosis, ICD-10: ____], resulting in significantly reduced
visual function. Best-corrected visual acuity measures [OD: ___, OS: ___,
OU: ___] at distance and [___] at near. [Add relevant findings: visual field
loss, contrast sensitivity loss, PRL status, condition stability, etc.]

FUNCTIONAL IMPACT
The patient's vision loss substantially impairs his/her/their ability to
perform the following activities of daily living:
  • [Activity 1, e.g., "reading printed medication labels independently"]
  • [Activity 2, e.g., "preparing meals safely without assistance"]
  • [Activity 3, e.g., "navigating the home and community environment"]

This functional impairment has been documented through [list evaluations
used: e.g., functional vision assessment, NEI-VFQ-25, clinical observation].

MEDICAL NECESSITY
The requested [service/device] is medically necessary to:
  • [Reason 1, e.g., "enable safe self-administration of medications"]
  • [Reason 2, e.g., "reduce fall risk and support independent living"]
  • [Reason 3, e.g., "maintain vocational function and employment"]

[If a device:] Device requested: [Name], [Manufacturer], HCPCS: [code].
This device was trialed clinically on [date]. Patient demonstrated [describe
task performance and response, e.g., "ability to read 1M print at 5 cm
working distance with 8× stand magnifier, compared to inability to read
standard print without the device"].

Less restrictive alternatives have been considered and are insufficient to
meet the patient's functional needs because: [explain briefly].

SUPPORTING GUIDELINES
This request is consistent with:
  • AAO Preferred Practice Pattern: Vision Rehabilitation (2023)
  • AOTA Occupational Therapy Practice Framework, 4th Edition
  • [CMS LCD number if applicable, e.g., L33634]

I am available to provide additional clinical documentation upon request.
Please contact our office at [phone/fax].

Sincerely,

[Provider signature]
[Provider name, credentials]
[NPI: ________]
[Practice name, address, phone, fax]`,
  },
  {
    title: 'Follow-Up Script (2-Week Check)',
    type: 'Clinical Script',
    desc: 'Guided phone or telehealth follow-up questions for initial device comfort and orientation check.',
    content: `2-WEEK DEVICE FOLLOW-UP SCRIPT
Purpose: Assess initial adaptation, identify barriers, confirm next steps.
Format: Phone call or telehealth  |  Estimated time: 10–15 minutes

─────────────────────────────────────────────
OPENING
─────────────────────────────────────────────
"Hi [patient name], this is [your name] calling from [practice name].
I'm following up on your appointment two weeks ago. Is this a good time
to talk for about 10 minutes?"

─────────────────────────────────────────────
DEVICE USE CHECK
─────────────────────────────────────────────
1. "Have you had a chance to use the [device name] we talked about?"
   → If NO: "What's been getting in the way?"
     Document barrier. Offer to troubleshoot or escalate if needed.
   → If YES: Continue below.

2. "How often have you been using it — daily, a few times a week, or less?"

3. "Tell me about a specific time you used it. What were you trying to do,
   and how did it go?"

4. "Is there anything about using it that's been difficult or uncomfortable?"
   Common barriers to probe:
     [ ] Working distance feels awkward or too close
     [ ] Too heavy or tiring to hold
     [ ] Lighting conditions make it hard to use
     [ ] Difficult to find focus or set magnification
     [ ] Self-conscious using it in front of others

─────────────────────────────────────────────
GOAL REVIEW
─────────────────────────────────────────────
5. "When we met, you mentioned [primary goal, e.g., 'reading your mail'].
   Have you been able to do that with the device?"

6. "Has anything gotten easier in the last two weeks — even small things?"

─────────────────────────────────────────────
SAFETY CHECK
─────────────────────────────────────────────
7. "Have you had any falls, near-falls, or safety incidents at home
   since your appointment?"
   → If YES: Document. Assess circumstances. Consider O&M referral.

─────────────────────────────────────────────
NEXT STEPS
─────────────────────────────────────────────
8. "I'd like to schedule your next follow-up. Does [date range] work?"

9. "Before we wrap up — is there anything else I can help with, or
   anything you're still unsure about?"

─────────────────────────────────────────────
DOCUMENTATION
─────────────────────────────────────────────
Device use frequency:  [ ] Daily  [ ] Weekly  [ ] Rarely  [ ] Not using
Primary barrier:  _________________________________________________
Goal progress:  [ ] On track  [ ] Barrier present  [ ] Exceeded expectations
Safety incident:  [ ] None  [ ] Documented — details: ________________
Action taken:  ___________________________________________________
Follow-up scheduled:  ____________________________________________`,
  },
];

function TemplateCard({ template }: { template: typeof TEMPLATES[number] }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(template.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{template.type}</span>
            <h3 className="text-sm font-bold text-gray-900 mt-2">{template.title}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{template.desc}</p>
          </div>
          <FileText className="h-5 w-5 text-gray-300 shrink-0 mt-1" aria-hidden="true" />
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors focus-visible:outline-none focus-visible:underline"
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          {open ? 'Collapse' : 'View template'}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100">
          <div className="flex justify-end px-5 pt-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors focus-visible:outline-none focus-visible:underline"
              aria-label="Copy template to clipboard"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-teal-500" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </button>
          </div>
          <pre className="px-5 pb-6 pt-2 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
            {template.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export function TemplatesPage() {
  return (
    <ContentPageLayout
      title="Templates & Handouts"
      subtitle="Ready-to-use clinical templates, patient handouts, and documentation frameworks."
      breadcrumbs={[{ label: 'For Professionals', href: '/professionals' }, { label: 'Templates' }]}
    >
      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-800">These are starting frameworks — adapt them to your clinical context, institutional requirements, and patient-specific needs. Use "Copy to clipboard" to paste into your EHR, word processor, or documentation system.</p>
      </div>
      <div className="space-y-4">
        {TEMPLATES.map((t) => (
          <TemplateCard key={t.title} template={t} />
        ))}
      </div>
    </ContentPageLayout>
  );
}
