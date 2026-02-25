import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, Check } from 'lucide-react';
import { useIntake } from '../../hooks/useIntake';
import { US_STATES, US_STATE_NAMES } from '../../data/directorySeed';

const TOTAL_STEPS = 10;

const DIAGNOSES = ['Age-related Macular Degeneration (AMD)', 'Glaucoma', 'Diabetic Retinopathy', 'Retinitis Pigmentosa (RP)', 'Cortical Visual Impairment (CVI)', 'Optic Neuropathy', 'Albinism', 'Nystagmus', 'Stargardt Disease', 'Other'];
const CHALLENGES = ['Reading small print', 'Computer or phone use', 'Mobility & navigation', 'Glare or bright lights', 'Cooking or home tasks', 'Medications or labels', 'Recognizing faces', 'Watching TV', 'Work tasks', 'School or learning', 'Daily living tasks', 'Social activities'];
const DEVICES = ['Handheld magnifier', 'Stand magnifier', 'Desktop video magnifier (CCTV)', 'Portable video magnifier', 'Screen reader software (JAWS, NVDA)', 'Screen magnification software (ZoomText, Magnifier)', 'Smartphone accessibility features', 'Braille display or notetaker', 'Tinted lenses or filters', 'Talking clock or watch', 'None currently'];
const SERVICES = ['Low vision clinic', 'Orientation & Mobility (O&M) specialist', 'Vision Rehabilitation Therapist (VRT)', 'Occupational therapist', 'State blind/vision services agency', 'Vocational rehabilitation', 'TVI / School services', 'Talking book library', 'None currently'];
const INSURANCE = ['Medicare', 'Medicaid', 'Private Insurance', 'VA / Veterans', 'No insurance / self-pay', 'State vocational rehabilitation (VR)', "Don't know"];

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  maxSelect?: number;
  label: string;
}

function MultiSelect({ options, selected, onChange, maxSelect, label }: MultiSelectProps) {
  function toggle(opt: string) {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else if (!maxSelect || selected.length < maxSelect) {
      onChange([...selected, opt]);
    }
  }
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const checked = selected.includes(opt);
          const disabled = !checked && !!maxSelect && selected.length >= maxSelect;
          return (
            <label
              key={opt}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                checked ? 'border-blue-500 bg-blue-50' : disabled ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(opt)}
                className="sr-only"
                aria-describedby={maxSelect ? `max-note-${label.replace(/\s/g, '')}` : undefined}
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                {checked && <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" />}
              </div>
              <span className="text-sm text-gray-700">{opt}</span>
            </label>
          );
        })}
      </div>
      {maxSelect && (
        <p id={`max-note-${label.replace(/\s/g, '')}`} className="text-xs text-gray-400 mt-2">
          Select up to {maxSelect}. {selected.length}/{maxSelect} chosen.
        </p>
      )}
    </fieldset>
  );
}

interface RadioGroupProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (val: string) => void;
  label: string;
}

function RadioGroup({ options, value, onChange, label }: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              value === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <input
              type="radio"
              name={label}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${value === opt.value ? 'border-blue-600' : 'border-gray-300'}`}>
              {value === opt.value && <div className="w-2 h-2 rounded-full bg-blue-600" />}
            </div>
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface YesNoProps {
  value?: boolean;
  onChange: (val: boolean) => void;
  label: string;
}

function YesNo({ value, onChange, label }: YesNoProps) {
  return (
    <div className="flex gap-3" role="group" aria-label={label}>
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
            value === v ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-300'
          }`}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  );
}

export function IntakeStepper() {
  const navigate = useNavigate();
  const { answers, currentStep, updateAnswers, nextStep, prevStep, markComplete, saveAndShowMessage, savedMessage } = useIntake();
  const [errors, setErrors] = useState<string[]>([]);

  function validate(): boolean {
    const errs: string[] = [];
    if (currentStep === 0 && !answers.mode) errs.push('Please select who is filling this out.');
    if (currentStep === 3 && (!answers.challenges || answers.challenges.length === 0)) errs.push('Please select at least one daily challenge.');
    if (currentStep === 4 && (!answers.priorityGoals || answers.priorityGoals.length === 0)) errs.push('Please select at least one priority goal.');
    setErrors(errs);
    return errs.length === 0;
  }

  function handleNext() {
    if (!validate()) return;
    if (currentStep === TOTAL_STEPS - 1) {
      markComplete();
      navigate('/intake/results');
    } else {
      nextStep(TOTAL_STEPS);
    }
  }

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const stepTitles = [
    'Who is filling this out?',
    'Clinical Background',
    'Vision Function',
    'Daily Challenges',
    'Priority Goals',
    'Environment & Work',
    'Safety & Risk',
    'Current Tools & Services',
    'Coverage & Funding',
    'Support & Access',
  ];

  const stepSubtitles = [
    'Tell us a bit about yourself so we can tailor the questions.',
    'Help us understand your diagnosis and care history.',
    'Describe how your vision currently affects daily function.',
    'Select everything that feels difficult right now.',
    'Choose your top 3 most important goals.',
    "Tell us about where you spend most of your time.",
    'Help us understand any safety concerns.',
    'Tell us what you\'re already using.',
    'Help us match you with the right funding options.',
    'Help us understand your access and support situation.',
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Step {currentStep + 1} of {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${i < currentStep ? 'bg-blue-600' : i === currentStep ? 'bg-blue-400 ring-2 ring-blue-200' : 'bg-gray-200'}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{stepTitles[currentStep]}</h2>
        <p className="text-sm text-gray-500 mb-6">{stepSubtitles[currentStep]}</p>

        {errors.length > 0 && (
          <div role="alert" className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            {errors.map((e) => <p key={e} className="text-sm text-red-700">{e}</p>)}
          </div>
        )}

        {currentStep === 0 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">I am filling this out as:</p>
              <RadioGroup
                label="Who is filling this out"
                value={answers.mode}
                onChange={(v) => updateAnswers({ mode: v as 'patient' | 'caregiver' })}
                options={[
                  { value: 'patient', label: 'The patient — I have low vision or a visual impairment' },
                  { value: 'caregiver', label: 'A caregiver or family member helping someone else' },
                ]}
              />
            </div>
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1.5">
                First name (optional)
              </label>
              <input
                id="patientName"
                type="text"
                value={answers.patientName ?? ''}
                onChange={(e) => updateAnswers({ patientName: e.target.value })}
                placeholder="Used to personalize your plan"
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Age group:</p>
              <RadioGroup
                label="Age group"
                value={answers.ageGroup}
                onChange={(v) => updateAnswers({ ageGroup: v as typeof answers.ageGroup })}
                options={[
                  { value: 'child', label: 'Child (under 12)' },
                  { value: 'teen', label: 'Teen (12–17)' },
                  { value: 'adult', label: 'Adult (18–64)' },
                  { value: 'senior', label: 'Senior (65+)' },
                ]}
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Primary diagnosis (select all that apply):</p>
              <MultiSelect label="Diagnoses" options={DIAGNOSES} selected={answers.diagnoses ?? []} onChange={(v) => updateAnswers({ diagnoses: v })} />
            </div>
            <div>
              <label htmlFor="yearsWithLoss" className="block text-sm font-medium text-gray-700 mb-1.5">
                How long have you had significant vision loss?
              </label>
              <select
                id="yearsWithLoss"
                value={answers.yearsWithLoss ?? ''}
                onChange={(e) => updateAnswers({ yearsWithLoss: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select...</option>
                <option value="new">Less than 1 year</option>
                <option value="1-3">1–3 years</option>
                <option value="3-10">3–10 years</option>
                <option value="10+">More than 10 years</option>
                <option value="lifelong">Lifelong / congenital</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Current eye care providers (select all that apply):</p>
              <MultiSelect
                label="Current providers"
                options={['Ophthalmologist', 'Optometrist', 'Low vision specialist', 'Neurologist', 'No current eye care provider']}
                selected={answers.currentProviders ?? []}
                onChange={(v) => updateAnswers({ currentProviders: v })}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Best-corrected vision level (approximate):</p>
              <RadioGroup
                label="Vision level"
                value={answers.vaLevel}
                onChange={(v) => updateAnswers({ vaLevel: v as typeof answers.vaLevel })}
                options={[
                  { value: 'mild', label: 'Mild — Some difficulty, glasses still help' },
                  { value: 'moderate', label: 'Moderate — 20/70–20/160, significant daily difficulty' },
                  { value: 'severe', label: 'Severe — 20/200–20/400, very limited usable vision' },
                  { value: 'profound', label: 'Profound — Less than 20/400 or light perception only' },
                  { value: 'unknown', label: "I don't know my vision level" },
                ]}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Visual field loss:</p>
              <RadioGroup
                label="Field loss type"
                value={answers.fieldLoss}
                onChange={(v) => updateAnswers({ fieldLoss: v as typeof answers.fieldLoss })}
                options={[
                  { value: 'central', label: 'Central — Blurry or missing center vision' },
                  { value: 'peripheral', label: 'Peripheral — Reduced side/tunnel vision' },
                  { value: 'scattered', label: 'Scattered — Missing patches throughout' },
                  { value: 'hemianopia', label: 'Hemianopia — Half of visual field missing' },
                  { value: 'none', label: 'No significant field loss' },
                  { value: 'unknown', label: "Don't know" },
                ]}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Contrast difficulties?</p>
                <YesNo value={answers.contrastIssues} onChange={(v) => updateAnswers({ contrastIssues: v })} label="Contrast issues" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Glare issues?</p>
                <YesNo value={answers.glareIssues} onChange={(v) => updateAnswers({ glareIssues: v })} label="Glare issues" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Light sensitivity?</p>
                <YesNo value={answers.lightSensitivity} onChange={(v) => updateAnswers({ lightSensitivity: v })} label="Light sensitivity" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Select all that feel difficult right now:</p>
            <MultiSelect label="Daily challenges" options={CHALLENGES} selected={answers.challenges ?? []} onChange={(v) => updateAnswers({ challenges: v })} />
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">What are your top priorities? Select up to 3:</p>
            <MultiSelect
              label="Priority goals"
              options={['Improve reading ability', 'Get around safely', 'Manage glare and light', 'Use a computer or phone', 'Perform daily tasks independently', 'Return to work or school', 'Get a device that helps', 'Understand my coverage and funding', 'Connect with peer support', 'Keep driving as long as possible']}
              selected={answers.priorityGoals ?? []}
              onChange={(v) => updateAnswers({ priorityGoals: v })}
              maxSelect={3}
            />
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Primary environments (select all that apply):</p>
              <MultiSelect
                label="Primary environments"
                options={['Home', 'Workplace / office', 'School', 'Community / outdoors', 'Healthcare settings']}
                selected={answers.primaryEnvironment ?? []}
                onChange={(v) => updateAnswers({ primaryEnvironment: v })}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Work or school status:</p>
              <RadioGroup
                label="Work status"
                value={answers.workStatus}
                onChange={(v) => updateAnswers({ workStatus: v })}
                options={[
                  { value: 'employed', label: 'Currently employed or self-employed' },
                  { value: 'seeking', label: 'Looking for work' },
                  { value: 'student', label: 'Student' },
                  { value: 'retired', label: 'Retired' },
                  { value: 'not-working', label: 'Not currently working or seeking work' },
                ]}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Is driving or returning to driving important to you?</p>
              <YesNo value={answers.drivingImportant} onChange={(v) => updateAnswers({ drivingImportant: v })} label="Driving importance" />
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Have you had any falls in the past year?</p>
              <YesNo value={answers.fallsHistory} onChange={(v) => updateAnswers({ fallsHistory: v })} label="Falls history" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Do you live alone?</p>
              <YesNo value={answers.liveAlone} onChange={(v) => updateAnswers({ liveAlone: v })} label="Live alone" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Current mobility aids (select all that apply):</p>
              <MultiSelect
                label="Mobility aids"
                options={['White cane', 'Rollator / walker', 'Guide dog', 'None']}
                selected={answers.mobilityAids ?? []}
                onChange={(v) => updateAnswers({ mobilityAids: v })}
              />
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Current assistive devices (select all that apply):</p>
              <MultiSelect label="Current devices" options={DEVICES} selected={answers.currentDevices ?? []} onChange={(v) => updateAnswers({ currentDevices: v })} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Current services (select all that apply):</p>
              <MultiSelect label="Current services" options={SERVICES} selected={answers.currentServices ?? []} onChange={(v) => updateAnswers({ currentServices: v })} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">How satisfied are you with your current devices/services?</p>
              <RadioGroup
                label="Device satisfaction"
                value={answers.deviceSatisfaction}
                onChange={(v) => updateAnswers({ deviceSatisfaction: v })}
                options={[
                  { value: 'satisfied', label: 'Satisfied — they meet most of my needs' },
                  { value: 'partial', label: 'Partially satisfied — some gaps remain' },
                  { value: 'poor', label: 'Not satisfied — significant needs unmet' },
                  { value: 'na', label: "Not applicable — I don't use any currently" },
                ]}
              />
            </div>
          </div>
        )}

        {currentStep === 8 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Insurance coverage (select all that apply):</p>
              <MultiSelect label="Insurance types" options={INSURANCE} selected={answers.insuranceType ?? []} onChange={(v) => updateAnswers({ insuranceType: v })} />
            </div>
            <div>
              <label htmlFor="intake-state" className="block text-sm font-medium text-gray-700 mb-1.5">
                State or Province:
              </label>
              <select
                id="intake-state"
                value={answers.state ?? ''}
                onChange={(e) => updateAnswers({ state: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select state...</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{US_STATE_NAMES[s] || s}</option>
                ))}
                <option value="Other">Other / Canada</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 9 && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Do you have family, friends, or a caregiver who can help with appointments and training?</p>
              <YesNo value={answers.hasCareSupport} onChange={(v) => updateAnswers({ hasCareSupport: v })} label="Care support" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Are you willing to travel for services?</p>
              <YesNo value={answers.willingToTravel} onChange={(v) => updateAnswers({ willingToTravel: v })} label="Willing to travel" />
            </div>
            {answers.willingToTravel && (
              <div>
                <label htmlFor="travelDistance" className="block text-sm font-medium text-gray-700 mb-1.5">
                  How far can you travel?
                </label>
                <select
                  id="travelDistance"
                  value={answers.travelDistance ?? ''}
                  onChange={(e) => updateAnswers({ travelDistance: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select...</option>
                  <option value="10mi">Within 10 miles</option>
                  <option value="25mi">Within 25 miles</option>
                  <option value="50mi">Within 50 miles</option>
                  <option value="100mi">Within 100 miles</option>
                  <option value="any">Any distance</option>
                </select>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Do you prefer virtual (tele-health) services when available?</p>
              <YesNo value={answers.preferVirtual} onChange={(v) => updateAnswers({ preferVirtual: v })} label="Prefer virtual" />
            </div>
          </div>
        )}
      </div>

      {savedMessage && (
        <div role="status" aria-live="polite" className="mt-4 text-center text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg py-2.5 px-4">
          {savedMessage}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={() => prevStep()}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </button>

        <button
          onClick={saveAndShowMessage}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Save & finish later
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
        >
          {currentStep === TOTAL_STEPS - 1 ? 'View My Plan' : 'Continue'}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
