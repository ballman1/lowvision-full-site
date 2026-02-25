import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';

const recipes = [
  {
    id: 'reading',
    title: 'Reading-Focused Patient',
    triggers: ['Primary complaint: reading small print, books, mail, medication labels', 'Goal: return to reading independently'],
    tier1: ['Distance VA (ETDRS)', 'Near acuity (MN Read card)', 'Contrast sensitivity (Pelli-Robson)', 'Preferred retinal locus check'],
    tier2: ['Reading speed / endurance test', 'Magnification calculation', 'Filter trial for contrast', 'Near visual field assessment'],
    tier3: ['Fixation stability (nystagmography or functional observation)', 'Binocular vs monocular function', 'OCR app trial'],
    referrals: ['VRT for eccentric viewing and device training', 'AT program for CCTV/video magnifier trial', 'NLS for talking books if reading remains limited'],
    devices: ['Optical hand magnifier → stand magnifier → desktop video magnifier', 'E-reader with adjustable font/contrast', 'OCR scanning app'],
    outcomes: ['Reading speed (words/min at threshold print size)', 'Patient-reported reading confidence (VFQ-25)', 'Goal attainment at 6 weeks'],
  },
  {
    id: 'mobility',
    title: 'Mobility & Safety Focused',
    triggers: ['Falls history', 'Fear of going outside alone', 'Difficulty with stairs, curbs, intersections'],
    tier1: ['Distance VA (ETDRS)', 'Confrontation visual fields', 'Contrast sensitivity at distance', 'Mesopic/scotopic acuity if relevant'],
    tier2: ['Humphrey visual field (or equivalent)', 'Low-contrast acuity (letter chart)', 'Glare testing (BAT)', 'Mobility observation'],
    tier3: ['Fixation pattern analysis', 'Color vision if traffic lights are concern', 'Driving evaluation if relevant'],
    referrals: ['O&M specialist (priority referral)', 'Home safety OT assessment', 'Falls prevention program', 'Social work if isolation is a concern'],
    devices: ['White cane (through O&M program)', 'Tinted outdoor filters', 'High-contrast clothing and markers'],
    outcomes: ['Mobility confidence scale', 'Falls frequency', 'Community independence rating', 'O&M skill progression'],
  },
  {
    id: 'glare',
    title: 'Glare & Photophobia Focused',
    triggers: ['Glare as primary complaint', 'Avoids bright environments', 'Ocular albinism, cone dystrophy, or achromatopsia'],
    tier1: ['Distance VA indoor vs outdoor conditions', 'Glare testing (BAT or similar)', 'Photophobia history and severity rating'],
    tier2: ['Color vision testing', 'Contrast under glare conditions', 'Filter trial (multiple transmission levels)', 'Indoor lighting assessment'],
    tier3: ['Full field ERG consult if photoreceptor etiology suspected', 'Bioptic evaluation if driving is goal'],
    referrals: ['AT specialist for filter selection and environmental lighting', 'OT for workplace/school lighting modifications'],
    devices: ['Absorptive lenses (NoIR, Corning CPF series, plano tints)', 'Wraparound frames', 'Dark visor or hat', 'Adjustable desk lighting'],
    outcomes: ['Photophobia severity scale', 'Glare acuity improvement with filter', 'Patient satisfaction with filter selection'],
  },
  {
    id: 'school-age',
    title: 'School-Age Patient',
    triggers: ['Child or teen with vision impairment affecting school performance', 'IEP/504 evaluation request'],
    tier1: ['Distance and near VA with and without correction', 'Contrast sensitivity', 'Color vision', 'Visual field confrontation'],
    tier2: ['Reading speed and endurance with current correction', 'Preferred print size determination', 'Device trial (magnifier, CCTV)', 'Electronic access trial'],
    tier3: ['Functional vision assessment in school environment', 'Learning media assessment (LMA)', 'Assistive technology evaluation'],
    referrals: ['TVI referral to school district (critical)', 'O&M evaluation if travel is affected', 'AT specialist for school technology'],
    devices: ['Optical magnifier for spot checking', 'iPad/tablet with accessibility features', 'CCTV for sustained reading', 'Audio materials through NLS'],
    outcomes: ['Reading fluency (words/min)', 'Classroom access rating', 'IEP goal attainment', 'Student and family satisfaction'],
  },
  {
    id: 'working-adult',
    title: 'Working Adult',
    triggers: ['Employed or seeking employment', 'Computer use essential', 'Workplace accommodation needs'],
    tier1: ['Distance and near VA', 'Contrast sensitivity', 'Glare disability testing', 'Near visual endurance'],
    tier2: ['Computer task simulation', 'Monitor viewing distance assessment', 'Glare sources at workstation', 'Speed and accuracy testing'],
    tier3: ['Ergonomic workstation evaluation', 'Reading speed under work conditions', 'Lighting assessment'],
    referrals: ['AT specialist for workplace technology', 'Vocational rehabilitation (state VR agency)', 'ADA accommodation documentation support'],
    devices: ['Screen magnification software (ZoomText, Windows Magnifier)', 'Screen reader if acuity is severe', 'Adjustable monitor arm and lighting', 'Portable magnifier for away-from-desk tasks'],
    outcomes: ['Work productivity rating', 'Device adoption at 30/60 days', 'VR plan goal attainment', 'Job retention'],
  },
  {
    id: 'older-adult-cognitive',
    title: 'Older Adult with Cognitive Concerns',
    triggers: ['Age 70+', 'Memory or learning concerns noted on intake', 'Caregiver involvement in care'],
    tier1: ['VA (simplified if needed)', 'Contrast sensitivity', 'MoCA or MMSE screen', 'Current medication review'],
    tier2: ['Functional near task assessment', 'Device handling evaluation', 'Caregiver capacity interview', 'Environmental lighting check'],
    tier3: ['Occupational therapy ADL assessment', 'Home safety evaluation', 'Fall risk assessment'],
    referrals: ['OT for home safety and ADL support (priority)', 'Social work for caregiver support', 'Simple device instruction with caregiver training'],
    devices: ['Large-button telephone', 'Talking clock and talking glucose meter if diabetic', 'Simple LED magnifier (single switch or fixed mag)', 'Bright task lighting'],
    outcomes: ['ADL independence scale', 'Caregiver confidence rating', 'Device adoption and use at 30 days', 'Falls in 90-day period'],
  },
  {
    id: 'complex',
    title: 'Complex Multifactorial Case',
    triggers: ['Multiple diagnoses', 'Combined field and acuity loss', 'Comorbid neurological or physical conditions', 'Previous device failures'],
    tier1: ['Full VA battery (distance, near, contrast, glare)', 'Comprehensive visual field assessment', 'Functional status interview', 'Device history review'],
    tier2: ['Oculomotor function assessment', 'Reading performance testing', 'Environmental and occupational assessment', 'Mobility observation'],
    tier3: ['Neuro-visual assessment if CVI suspected', 'Neuropsychological consult if cognition affects training', 'Full AT evaluation'],
    referrals: ['Multidisciplinary team: OT + O&M + VRT + social work', 'Neuro-ophthalmology if etiology unclear', 'Formal AT evaluation through state program'],
    devices: ['Step-wise device trials based on task priority', 'Wearable low vision devices (eSight, OrCam) for complex needs', 'Smart home integration'],
    outcomes: ['Goal Attainment Scaling across priority domains', 'Quality of life measure (NEI-VFQ)', 'Device adoption at 90 days', 'Follow-up schedule adherence'],
  },
];

export function TestRecipesPage() {
  return (
    <ContentPageLayout
      title="Test Selection Recipes"
      subtitle="Tiered testing guides organized by patient presentation and primary concern."
      breadcrumbs={[{ label: 'For Professionals', href: '/professionals' }, { label: 'Test Recipes' }]}
    >
      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-800">
          These recipes provide a starting framework. Clinical judgment should always adapt the approach based on patient presentation, setting, and available resources.
        </p>
      </div>
      <div className="space-y-5">
        {recipes.map((r) => (
          <details key={r.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
              <h2 className="text-base font-bold text-gray-900">{r.title}</h2>
              <span className="text-xs text-blue-700 font-medium group-open:hidden">Expand</span>
              <span className="text-xs text-gray-500 font-medium hidden group-open:block">Collapse</span>
            </summary>
            <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Intake Triggers</h3>
                <ul className="space-y-1">{r.triggers.map((t) => <li key={t} className="text-sm text-gray-700 flex gap-2"><span className="text-blue-400">•</span>{t}</li>)}</ul>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Tier 1 (Core)</h3>
                  <ul className="space-y-1">{r.tier1.map((t) => <li key={t} className="text-xs text-gray-600">• {t}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2">Tier 2 (Add based on findings)</h3>
                  <ul className="space-y-1">{r.tier2.map((t) => <li key={t} className="text-xs text-gray-600">• {t}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tier 3 (Complex / Specialty)</h3>
                  <ul className="space-y-1">{r.tier3.map((t) => <li key={t} className="text-xs text-gray-600">• {t}</li>)}</ul>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Referral Recommendations</h3>
                  <ul className="space-y-1">{r.referrals.map((ref) => <li key={ref} className="text-xs text-gray-600">• {ref}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Device Trial Order</h3>
                  <ul className="space-y-1">{r.devices.map((d) => <li key={d} className="text-xs text-gray-600">• {d}</li>)}</ul>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Outcome Metrics</h3>
                <div className="flex flex-wrap gap-2">{r.outcomes.map((o) => <span key={o} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{o}</span>)}</div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </ContentPageLayout>
  );
}
