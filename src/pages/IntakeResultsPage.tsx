import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, Square, ArrowRight, Printer, RefreshCw, AlertTriangle } from 'lucide-react';
import { useIntake } from '../hooks/useIntake';
import { generateIntakeResults } from '../lib/intake/rules';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';
import type { IntakeResult, FollowUpItem } from '../lib/intake/types';

const PRIORITY_STYLES: Record<string, string> = {
  high: 'border-red-400 bg-red-50',
  medium: 'border-amber-400 bg-amber-50',
  low: 'border-gray-300 bg-gray-50',
};

const PRIORITY_BADGE: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-gray-100 text-gray-600',
};

const TIMEFRAME_LABELS: Record<string, string> = {
  '2wk': 'Within 2 Weeks',
  '30day': '30 Days',
  '60day': '60 Days',
  '90day': '90 Days',
};

function groupFollowUp(items: FollowUpItem[]) {
  const groups: Record<string, FollowUpItem[]> = {};
  items.forEach((item) => {
    if (!groups[item.timeframe]) groups[item.timeframe] = [];
    groups[item.timeframe].push(item);
  });
  return groups;
}

export function IntakeResultsPage() {
  const navigate = useNavigate();
  const { answers, isComplete, clearIntake } = useIntake();
  const [result, setResult] = useState<IntakeResult | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const hasData = localStorage.getItem('clearpath_intake_v1');
    if (!hasData && !isComplete) {
      navigate('/intake');
      return;
    }
    const res = generateIntakeResults(answers);
    setResult(res);
  }, [answers, isComplete, navigate]);

  function toggleCheck(task: string) {
    setChecked((prev) => ({ ...prev, [task]: !prev[task] }));
  }

  if (!result) return null;

  const grouped = groupFollowUp(result.followUpChecklist);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-blue-300 text-sm font-medium mb-1">Your Personalized Plan</p>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {answers.patientName ? `${answers.patientName}'s Low Vision Care Plan` : 'Your Low Vision Care Plan'}
          </h1>
          <p className="text-blue-200 text-sm mt-2">Based on your intake answers. Print this or save it for your next appointment.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 border border-white/30 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print Plan
            </button>
            <button
              onClick={() => { clearIntake(); navigate('/intake'); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 border border-white/30 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Start Over
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <DisclaimerBox />

        <section aria-labelledby="next-steps-heading">
          <h2 id="next-steps-heading" className="text-xl font-bold text-gray-900 mb-4">Priority Next Steps</h2>
          <div className="space-y-3">
            {result.rankedNextSteps.map((step) => (
              <div
                key={step.title}
                className={`rounded-xl border-l-4 p-5 ${PRIORITY_STYLES[step.priority]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${PRIORITY_BADGE[step.priority]}`}>
                        {step.priority}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {step.href && (
                  <Link
                    to={step.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {step.actionLabel ?? 'Learn more'}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-xl font-bold text-gray-900 mb-4">Services to Explore</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {result.serviceCategories.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
              >
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{s.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="devices-heading">
          <h2 id="devices-heading" className="text-xl font-bold text-gray-900 mb-4">Devices to Try</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {result.deviceCategories.map((d) => (
              <Link
                key={d.href + d.title}
                to={d.href}
                className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-teal-300 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{d.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{d.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="coverage-heading">
          <h2 id="coverage-heading" className="text-xl font-bold text-gray-900 mb-4">Coverage & Funding to Review</h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {result.coverageLinks.map((c) => (
              <Link
                key={c.href + c.title}
                to={c.href}
                className="flex items-center justify-between px-5 py-3.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:bg-blue-50"
              >
                {c.title}
                <ArrowRight className="h-4 w-4 text-gray-300" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="questions-heading">
          <h2 id="questions-heading" className="text-xl font-bold text-gray-900 mb-4">Questions for Your Doctor</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-400 mb-4">Print this list and bring it to your next eye appointment.</p>
            <ol className="space-y-3">
              {result.doctorQuestions.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="followup-heading">
          <h2 id="followup-heading" className="text-xl font-bold text-gray-900 mb-4">Your 90-Day Follow-Up Checklist</h2>
          <div className="space-y-5">
            {Object.entries(grouped).map(([tf, items]) => (
              <div key={tf}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {TIMEFRAME_LABELS[tf] ?? tf}
                </h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <button
                      key={item.task}
                      type="button"
                      onClick={() => toggleCheck(item.task)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                        checked[item.task]
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      aria-pressed={checked[item.task] ?? false}
                    >
                      {checked[item.task] ? (
                        <CheckSquare className="h-4 w-4 text-green-600 shrink-0" aria-hidden="true" />
                      ) : (
                        <Square className="h-4 w-4 text-gray-300 shrink-0" aria-hidden="true" />
                      )}
                      <span className={`text-sm ${checked[item.task] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.task}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-amber-800">
            This plan is a starting point, not a prescription. Your care team may recommend a different sequence based on your clinical picture.
          </p>
        </div>
      </div>
    </div>
  );
}
