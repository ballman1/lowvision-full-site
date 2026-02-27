import { Link } from 'react-router-dom';
import { ClipboardList, CheckCircle, Clock, Lock, ArrowRight } from 'lucide-react';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';
import { useIntake } from '../hooks/useIntake';
import { PageSEO } from '../components/seo/PageSEO';

export function IntakePage() {
  const { hasSavedData, getSavedAt, clearIntake } = useIntake();
  const savedAt = getSavedAt();
  const hasSaved = hasSavedData();

  const formattedDate = savedAt
    ? new Date(savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <PageSEO
        title="Low Vision Intake Questionnaire"
        description="Answer a few questions about your vision and daily challenges. Your answers stay on your device and help you find the right rehabilitation services and resources."
        breadcrumbs={[{ label: 'Intake Questionnaire' }]}
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            Patient Intake Questionnaire
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Tell us what's difficult.
            <br />
            We'll turn it into a plan.
          </h1>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            Answer a few questions about your vision challenges, goals, and current situation. You'll receive a personalized roadmap for care, devices, funding, and local services.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { Icon: Clock, label: '2–6 minutes' },
            { Icon: Lock, label: 'Private & local' },
            { Icon: CheckCircle, label: 'Save anytime' },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 bg-white rounded-xl border border-gray-200 p-4 text-center">
              <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
          ))}
        </div>

        {hasSaved && (
          <div className="mb-6 bg-teal-50 border border-teal-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-teal-800 mb-1">Resume where you left off</h2>
            {formattedDate && (
              <p className="text-xs text-teal-600 mb-3">Last saved: {formattedDate}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to="/intake/start?resume=true"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
              >
                Continue Intake
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <button
                onClick={clearIntake}
                className="inline-flex items-center justify-center px-4 py-2 border border-teal-300 text-teal-700 text-sm font-medium rounded-lg hover:bg-teal-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                Start Fresh
              </button>
            </div>
          </div>
        )}

        <Link
          to="/intake/start"
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-700 text-white font-bold text-base rounded-xl hover:bg-blue-800 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
        >
          Start Intake Questionnaire
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>

        <p className="text-center text-xs text-gray-400 mt-3">
          Your answers are stored only on your device and never shared.
        </p>

        <div className="mt-8">
          <DisclaimerBox />
        </div>
      </div>
    </div>
  );
}
