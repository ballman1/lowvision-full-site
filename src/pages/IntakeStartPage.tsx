import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IntakeStepper } from '../components/intake/IntakeStepper';
import { useIntake } from '../hooks/useIntake';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';

export function IntakeStartPage() {
  const [searchParams] = useSearchParams();
  const { updateAnswers, goToStep } = useIntake();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'patient' || mode === 'caregiver') {
      updateAnswers({ mode });
    }
    const resume = searchParams.get('resume');
    if (resume === 'true') {
      // Keep existing step from localStorage (already loaded in hook)
    } else if (!resume) {
      // Fresh start — reset to step 0
      goToStep(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-lg font-bold">Patient Intake Questionnaire</h1>
          <p className="text-blue-200 text-sm mt-1">Your answers are stored only on your device. Answer at your own pace.</p>
        </div>
      </div>

      <IntakeStepper />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-10">
        <DisclaimerBox variant="compact" />
      </div>
    </div>
  );
}
