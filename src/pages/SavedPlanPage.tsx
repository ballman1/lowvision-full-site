import { Link } from 'react-router-dom';
import { useIntake } from '../hooks/useIntake';
import { generateIntakeResults } from '../lib/intake/rules';
import { Bookmark, ArrowRight, RefreshCw, ClipboardList } from 'lucide-react';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';

export function SavedPlanPage() {
  const { answers, isComplete, clearIntake, getSavedAt } = useIntake();
  const savedAt = getSavedAt();
  const hasData = !!localStorage.getItem('clearpath_intake_v1');

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="h-7 w-7 text-gray-400" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">No saved plan yet</h1>
          <p className="text-sm text-gray-500 mb-6">Complete the intake questionnaire to generate and save a personalized care plan.</p>
          <Link
            to="/intake/start"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl hover:bg-blue-800 transition-colors"
          >
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            Start Intake
          </Link>
        </div>
      </div>
    );
  }

  const result = generateIntakeResults(answers);
  const formattedDate = savedAt
    ? new Date(savedAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <Bookmark className="h-5 w-5 text-blue-300" aria-hidden="true" />
            <span className="text-blue-300 text-sm">Saved Plan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {answers.patientName ? `${answers.patientName}'s Care Plan` : 'Your Saved Care Plan'}
          </h1>
          {formattedDate && <p className="text-blue-200 text-sm mt-1">Last updated: {formattedDate}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/intake/start?resume=true"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 border border-white/30 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              Update Answers
            </Link>
            <button
              onClick={clearIntake}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 border border-white/30 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Clear Plan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <DisclaimerBox />

        <section aria-labelledby="sp-steps">
          <h2 id="sp-steps" className="text-xl font-bold text-gray-900 mb-4">Priority Next Steps</h2>
          <div className="space-y-3">
            {result.rankedNextSteps.map((step) => (
              <div key={step.title} className={`rounded-xl border-l-4 p-4 ${step.priority === 'high' ? 'border-red-400 bg-red-50' : step.priority === 'medium' ? 'border-amber-400 bg-amber-50' : 'border-gray-300 bg-gray-50'}`}>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${step.priority === 'high' ? 'bg-red-100 text-red-700' : step.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>{step.priority}</span>
                <h3 className="text-sm font-semibold text-gray-900 mt-1.5">{step.title}</h3>
                <p className="text-xs text-gray-600 mt-0.5">{step.description}</p>
                {step.href && (
                  <Link to={step.href} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                    {step.actionLabel ?? 'Learn more'} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="flex gap-3 flex-wrap">
          <Link to="/intake/results" className="px-5 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl hover:bg-blue-800 transition-colors">View Full Plan</Link>
          <Link to="/resources" className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors">Find Local Services</Link>
        </div>
      </div>
    </div>
  );
}
