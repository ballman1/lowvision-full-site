import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';

const domains = [
  { id: 'visual-acuity', title: 'Visual Acuity', desc: 'The foundation of any low vision assessment. Measures best-corrected distance and near acuity using standardized charts.', tests: ['ETDRS chart', 'Snellen chart', 'Feinbloom chart', 'Near acuity card'] },
  { id: 'visual-fields', title: 'Visual Fields', desc: 'Peripheral and central field integrity affects mobility, driving, reading, and overall function.', tests: ['Confrontation testing', 'Amsler grid', 'Humphrey visual field', 'Goldmann perimetry'] },
  { id: 'contrast-sensitivity', title: 'Contrast Sensitivity', desc: 'Often more predictive of real-world function than acuity alone. Impacts reading, face recognition, and step detection.', tests: ['Pelli-Robson chart', 'Mars Letter CS test', 'CSV-1000', 'FACT chart'] },
  { id: 'glare-light-sensitivity', title: 'Glare & Light Sensitivity', desc: 'Significant functional impact for many conditions. Guides filter selection and environmental recommendations.', tests: ['BAT (Brightness Acuity Tester)', 'Glare disability testing', 'Photophobia history', 'Filter trial'] },
  { id: 'oculomotor-function', title: 'Oculomotor Function', desc: 'Fixation stability, eccentric viewing ability, and scanning patterns directly affect reading and device success.', tests: ['Fixation stability assessment', 'Preferred Retinal Locus (PRL)', 'Saccadic tracking', 'Reading performance testing'] },
  { id: 'cognitive-status', title: 'Cognitive Status', desc: 'Learning capacity, memory, and executive function affect training success and device adoption.', tests: ['MoCA screen', 'MMSE', 'Clinical observation', 'Goal-setting interview'] },
  { id: 'functional-goals', title: 'Functional Goals', desc: 'Patient-centered priorities drive test selection, device choice, and outcome measurement.', tests: ['VA LV VFQ-48', 'IVI questionnaire', 'Goal Attainment Scaling', 'Structured interview'] },
  { id: 'environment-task-demands', title: 'Environment & Task Demands', desc: 'Lighting, task distances, and environmental complexity inform practical recommendations.', tests: ['Task analysis', 'Environmental assessment', 'Occupational profile', 'Home visit'] },
  { id: 'manual-dexterity', title: 'Manual Dexterity & Handling', desc: 'Affects device selection and usability—particularly for optical devices and Braille tools.', tests: ['Fine motor observation', 'Grip strength screen', 'Device handling trial', 'OT consultation'] },
];

export function DiagnosticResourcesPage() {
  return (
    <ContentPageLayout
      title="Diagnostic Resources"
      subtitle="Core assessment domains for low vision rehabilitation—from acuity and fields to function and goals."
      breadcrumbs={[{ label: 'For Professionals', href: '/professionals' }, { label: 'Diagnostic Resources' }]}
    >
      <div className="mb-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
        <h2 className="text-base font-semibold text-blue-900 mb-2">Problem-oriented approach</h2>
        <p className="text-sm text-blue-800 leading-relaxed">
          Start with the patient's stated functional concerns. Use the core domains below to build a targeted assessment plan—not a full battery for every patient. Each domain links to test options, red flags, and how findings shape device and referral recommendations.
        </p>
        <Link to="/professionals/test-selection-recipes" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900">
          View test selection recipes by patient type <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {domains.map((d) => (
          <Link
            key={d.id}
            to={`/professionals/diagnostic-resources/core-domains#${d.id}`}
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1.5">{d.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">{d.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {d.tests.map((t) => (
                <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </ContentPageLayout>
  );
}
