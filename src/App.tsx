import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { PageSEO } from './components/seo/PageSEO';

// Helper: lazy-load a named export from a module
function lazyNamed<T extends object>(loader: () => Promise<T>, name: keyof T) {
  return lazy(() => loader().then((m) => ({ default: m[name] as React.ComponentType })));
}

const HomePage = lazyNamed(() => import('./pages/HomePage'), 'HomePage');
const StartHerePage = lazyNamed(() => import('./pages/StartHerePage'), 'StartHerePage');

const ResourcesPage = lazyNamed(() => import('./pages/ResourcesPage'), 'ResourcesPage');

const IntakePage = lazyNamed(() => import('./pages/IntakePage'), 'IntakePage');
const IntakeStartPage = lazyNamed(() => import('./pages/IntakeStartPage'), 'IntakeStartPage');
const IntakeResultsPage = lazyNamed(() => import('./pages/IntakeResultsPage'), 'IntakeResultsPage');

const ProfessionalsPage = lazyNamed(() => import('./pages/ProfessionalsPage'), 'ProfessionalsPage');
const DiagnosticResourcesPage = lazyNamed(() => import('./pages/DiagnosticResourcesPage'), 'DiagnosticResourcesPage');
const TestRecipesPage = lazyNamed(() => import('./pages/TestRecipesPage'), 'TestRecipesPage');
const ReferralPathwaysPage = lazyNamed(() => import('./pages/ProfessionalSubPages'), 'ReferralPathwaysPage');
const FunctionalOutcomesPage = lazyNamed(() => import('./pages/ProfessionalSubPages'), 'FunctionalOutcomesPage');
const FollowUpProtocolsPage = lazyNamed(() => import('./pages/ProfessionalSubPages'), 'FollowUpProtocolsPage');
const TemplatesPage = lazyNamed(() => import('./pages/ProfessionalSubPages'), 'TemplatesPage');
const CodingCoverageGuidePage = lazyNamed(() => import('./pages/ProfessionalSubPages'), 'CodingCoverageGuidePage');
const TrainingLibraryPage = lazyNamed(() => import('./pages/ProfessionalSubPages'), 'TrainingLibraryPage');
const ResearchEvidencePage = lazyNamed(() => import('./pages/ProfessionalSubPages'), 'ResearchEvidencePage');

const CoverageLandingPage = lazyNamed(() => import('./pages/CoveragePages'), 'CoverageLandingPage');
const MedicarePage = lazyNamed(() => import('./pages/CoveragePages'), 'MedicarePage');
const MedicaidPage = lazyNamed(() => import('./pages/CoveragePages'), 'MedicaidPage');
const VABenefitsPage = lazyNamed(() => import('./pages/CoveragePages'), 'VABenefitsPage');
const PrivateInsurancePage = lazyNamed(() => import('./pages/CoveragePages'), 'PrivateInsurancePage');
const AppealsPage = lazyNamed(() => import('./pages/CoveragePages'), 'AppealsPage');
const MedicaidBuyInPage = lazyNamed(() => import('./pages/CoveragePages'), 'MedicaidBuyInPage');
const MLTCPage = lazyNamed(() => import('./pages/CoveragePages'), 'MLTCPage');
const CanadaProvincialPlansPage = lazyNamed(() => import('./pages/CoveragePages'), 'CanadaProvincialPlansPage');

const FinancialSupportPage = lazyNamed(() => import('./pages/FinancialSupportPage'), 'FinancialSupportPage');
const SSDIPage = lazyNamed(() => import('./pages/FinancialSupportPage'), 'SSDIPage');
const SSIPage = lazyNamed(() => import('./pages/FinancialSupportPage'), 'SSIPage');
const TaxReliefPage = lazyNamed(() => import('./pages/FinancialSupportPage'), 'TaxReliefPage');
const TransportationPage = lazyNamed(() => import('./pages/FinancialSupportPage'), 'TransportationPage');
const BlindAgenciesPage = lazyNamed(() => import('./pages/FinancialSupportPage'), 'BlindAgenciesPage');
const EmergencyHelpPage = lazyNamed(() => import('./pages/FinancialSupportPage'), 'EmergencyHelpPage');

const RehabLandingPage = lazyNamed(() => import('./pages/RehabPages'), 'RehabLandingPage');
const FunctionalVisionAssessmentPage = lazyNamed(() => import('./pages/RehabPages'), 'FunctionalVisionAssessmentPage');
const ADLTrainingPage = lazyNamed(() => import('./pages/RehabPages'), 'ADLTrainingPage');
const OrientationMobilityPage = lazyNamed(() => import('./pages/RehabPages'), 'OrientationMobilityPage');
const VisualSkillsTrainingPage = lazyNamed(() => import('./pages/RehabPages'), 'VisualSkillsTrainingPage');
const AssistiveTechInstructionPage = lazyNamed(() => import('./pages/RehabPages'), 'AssistiveTechInstructionPage');
const HomeModificationsPage = lazyNamed(() => import('./pages/RehabPages'), 'HomeModificationsPage');
const TeleRehabPage = lazyNamed(() => import('./pages/RehabPages'), 'TeleRehabPage');

const DevicesLandingPage = lazyNamed(() => import('./pages/DevicePages'), 'DevicesLandingPage');
const OpticalDevicesPage = lazyNamed(() => import('./pages/DevicePages'), 'OpticalDevicesPage');
const ElectronicDigitalAidsPage = lazyNamed(() => import('./pages/DevicePages'), 'ElectronicDigitalAidsPage');
const SoftwareAppsPage = lazyNamed(() => import('./pages/DevicePages'), 'SoftwareAppsPage');
const DailyLivingAidsPage = lazyNamed(() => import('./pages/DevicePages'), 'DailyLivingAidsPage');
const GlareLightManagementPage = lazyNamed(() => import('./pages/DevicePages'), 'GlareLightManagementPage');
const BrailleLiteracyPage = lazyNamed(() => import('./pages/DevicePages'), 'BrailleLiteracyPage');

const CommunityLandingPage = lazyNamed(() => import('./pages/CommunityPages'), 'CommunityLandingPage');
const EmotionalSupportPage = lazyNamed(() => import('./pages/CommunityPages'), 'EmotionalSupportPage');
const EducationServicesPage = lazyNamed(() => import('./pages/CommunityPages'), 'EducationServicesPage');
const EmploymentVocationalPage = lazyNamed(() => import('./pages/CommunityPages'), 'EmploymentVocationalPage');
const CaregiverFamilyPage = lazyNamed(() => import('./pages/CommunityPages'), 'CaregiverFamilyPage');
const GuideDogServicesPage = lazyNamed(() => import('./pages/CommunityPages'), 'GuideDogServicesPage');
const YouthFamilyPage = lazyNamed(() => import('./pages/CommunityPages'), 'YouthFamilyPage');
const SeniorSupportPage = lazyNamed(() => import('./pages/CommunityPages'), 'SeniorSupportPage');

const MissionPage = lazyNamed(() => import('./pages/AboutPages'), 'MissionPage');
const AccessibilityPage = lazyNamed(() => import('./pages/AboutPages'), 'AccessibilityPage');
const PrivacyPage = lazyNamed(() => import('./pages/AboutPages'), 'PrivacyPage');
const ContactPage = lazyNamed(() => import('./pages/AboutPages'), 'ContactPage');
const ClinicalAdvisoryBoardPage = lazyNamed(() => import('./pages/AboutPages'), 'ClinicalAdvisoryBoardPage');
const PartnersPage = lazyNamed(() => import('./pages/AboutPages'), 'PartnersPage');
const HowWeReviewResourcesPage = lazyNamed(() => import('./pages/AboutPages'), 'HowWeReviewResourcesPage');
const FAQPage = lazyNamed(() => import('./pages/FAQPage'), 'FAQPage');
const SavedPlanPage = lazyNamed(() => import('./pages/SavedPlanPage'), 'SavedPlanPage');

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]" aria-label="Loading...">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}

const whatIsLowVisionSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  about: {
    '@type': 'MedicalCondition',
    name: 'Low Vision',
    alternateName: ['Visual Impairment', 'Partial Sight', 'Partial Vision Loss'],
    description: 'Low vision is a significant visual impairment that cannot be fully corrected with glasses, contact lenses, medication, or surgery but is not total blindness.',
  },
};

function StartHereWhatIsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <PageSEO
        title="What Is Low Vision?"
        description="Low vision is a significant visual impairment that cannot be fully corrected with glasses or surgery but is not total blindness. Learn about types, definitions, and next steps."
        breadcrumbs={[{ label: 'Start Here', href: '/start-here' }, { label: 'What Is Low Vision?' }]}
        schema={whatIsLowVisionSchema}
      />
      <nav className="text-xs text-gray-400 mb-6 flex gap-1.5">
        <a href="/" className="hover:text-blue-700">Home</a>
        <span>/</span>
        <a href="/start-here" className="hover:text-blue-700">Start Here</a>
        <span>/</span>
        <span className="text-gray-700">What Is Low Vision</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">What Is Low Vision?</h1>
      <div className="space-y-5 text-gray-700 leading-relaxed">
        <p className="text-lg"><strong>Low vision</strong> is a significant visual impairment that cannot be fully corrected with glasses, contact lenses, medication, or surgery—but is not total blindness.</p>
        <p>Most people with low vision have some usable sight. The clinical definition typically includes best-corrected visual acuity of 20/70 or worse in the better eye, or significant visual field loss (a reduced area of sight). But definitions matter less than function—<em>what you can and can't do in daily life</em>.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">What it is NOT</h2>
        <ul className="list-disc list-inside space-y-1.5 text-gray-600">
          <li>It is not blindness (though some people with "low vision" have very limited sight)</li>
          <li>It is not fixable with better glasses in most cases</li>
          <li>It is not a diagnosis—it describes functional impact across many conditions</li>
          <li>It is not a reason to stop doing the things that matter to you</li>
        </ul>
        <h2 className="text-xl font-bold text-gray-900 mt-6">Diagnosis does not equal prognosis</h2>
        <p>Having a condition like macular degeneration or glaucoma does not mean you will lose all functional vision. Many people live active, independent lives with low vision using the right tools, training, and supports. Early rehabilitation significantly improves outcomes.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">Legal blindness</h2>
        <p>Legal blindness is defined as best-corrected VA of 20/200 or worse in the better eye, or a visual field of 20 degrees or less. Legal blindness is an administrative and legal category—it does not mean total loss of sight and does not require total darkness to qualify for services.</p>
      </div>
    </div>
  );
}

const howToNextStepsSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Your First Next Steps After a Low Vision Diagnosis',
  description: 'A practical guide to the first actions after learning you have low vision — from finding a specialist to exploring rehabilitation, devices, and funding options.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Schedule a low vision examination',
      text: 'Look for a low vision optometrist, ophthalmologist, or clinic that specializes in low vision—not just general eye care. Bring a list of tasks that are difficult. Expect the appointment to take 1–2 hours.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Contact your state blind services agency',
      text: 'Most states offer free or low-cost O&M training, rehabilitation therapy, and assistive technology through their blind services agency. No referral needed in most states—you can apply directly.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Learn what rehabilitation looks like',
      text: 'Rehabilitation is not just for dramatic vision loss. If vision is affecting any daily task—reading, cooking, mobility, work—rehabilitation can help. Start with a functional vision assessment.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Explore assistive device options',
      text: "Don't buy devices online without trying them first. State AT programs offer free demonstrations and short-term loans. A low vision specialist can recommend the right magnification level for your specific tasks.",
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Map your coverage and funding options',
      text: 'Services and devices are often funded through state agencies, vocational rehabilitation, VA programs, or insurance. Use our Coverage & Funding section to find what applies to your situation.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Connect with community and peer support',
      text: 'Talking with others who have navigated vision loss can be one of the most practical resources. Peer support programs, vision loss organizations, and online communities can reduce isolation and provide real-world advice.',
    },
  ],
};

function StartHereNextStepsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <PageSEO
        title="Your First Next Steps After a Low Vision Diagnosis"
        description="A practical guide to the first actions after learning you have low vision — from finding a specialist to exploring rehabilitation, devices, and funding options."
        breadcrumbs={[{ label: 'Start Here', href: '/start-here' }, { label: 'Your First Next Steps' }]}
        schema={howToNextStepsSchema}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your First Next Steps</h1>
      <div className="space-y-5">
        {[
          { n: 1, title: 'Schedule a low vision examination', body: 'Look for a low vision optometrist, ophthalmologist, or clinic that specializes in low vision—not just general eye care. Bring a list of tasks that are difficult. Expect the appointment to take 1–2 hours.' },
          { n: 2, title: 'Contact your state blind services agency', body: 'Most states offer free or low-cost O&M training, rehabilitation therapy, and assistive technology through their blind services agency. No referral needed in most states—you can apply directly.' },
          { n: 3, title: 'Learn what rehabilitation looks like', body: 'Rehabilitation is not just for dramatic vision loss. If vision is affecting any daily task—reading, cooking, mobility, work—rehabilitation can help. Start with a functional vision assessment.' },
          { n: 4, title: 'Explore assistive device options', body: 'Don\'t buy devices online without trying them first. State AT programs offer free demonstrations and short-term loans. A low vision specialist can recommend the right magnification level for your specific tasks.' },
          { n: 5, title: 'Map your coverage and funding options', body: 'Services and devices are often funded through state agencies, vocational rehabilitation, VA programs, or insurance. Use our Coverage & Funding section to find what applies to your situation.' },
          { n: 6, title: 'Connect with community and peer support', body: 'Talking with others who have navigated vision loss can be one of the most practical resources. Peer support programs, vision loss organizations, and online communities can reduce isolation and provide real-world advice.' },
        ].map(({ n, title, body }) => (
          <div key={n} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-5">
            <span className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">{n}</span>
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
      <PageSEO
        title="Search"
        description="Search Low Vision Navigator for local resources, rehabilitation services, device guides, coverage information, and more."
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Search</h1>
      <input type="search" placeholder="Search resources, topics, services..." className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4" autoFocus />
      <p className="text-sm text-gray-500">Type to search for local resources, coverage information, device guides, and site content. Or <a href="/resources" className="text-blue-700 hover:underline">browse the full directory</a>.</p>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const html = document.documentElement;
    const size = localStorage.getItem('lv-text-size');
    if (size === 'lg') html.classList.add('text-size-lg');
    else if (size === 'xl') html.classList.add('text-size-xl');
    if (localStorage.getItem('lv-high-contrast') === '1') html.classList.add('high-contrast');
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/start-here" element={<StartHerePage />} />
            <Route path="/start-here/what-is-low-vision" element={<StartHereWhatIsPage />} />
            <Route path="/start-here/next-steps" element={<StartHereNextStepsPage />} />

            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/us" element={<ResourcesPage />} />
            <Route path="/resources/us/:state" element={<ResourcesPage />} />
            <Route path="/resources/service-types" element={<ResourcesPage />} />
            <Route path="/resources/canada" element={<ResourcesPage />} />

            <Route path="/intake" element={<IntakePage />} />
            <Route path="/intake/start" element={<IntakeStartPage />} />
            <Route path="/intake/results" element={<IntakeResultsPage />} />
            <Route path="/intake/results/printable-plan" element={<IntakeResultsPage />} />
            <Route path="/intake/follow-up" element={<IntakeResultsPage />} />

            <Route path="/professionals" element={<ProfessionalsPage />} />
            <Route path="/professionals/diagnostic-resources" element={<DiagnosticResourcesPage />} />
            <Route path="/professionals/diagnostic-resources/core-domains" element={<DiagnosticResourcesPage />} />
            <Route path="/professionals/test-selection-recipes" element={<TestRecipesPage />} />
            <Route path="/professionals/follow-up-modification-protocols" element={<FollowUpProtocolsPage />} />
            <Route path="/professionals/referral-pathways" element={<ReferralPathwaysPage />} />
            <Route path="/professionals/functional-outcomes-metrics" element={<FunctionalOutcomesPage />} />
            <Route path="/professionals/templates" element={<TemplatesPage />} />
            <Route path="/professionals/coding-coverage-guide" element={<CodingCoverageGuidePage />} />
            <Route path="/professionals/training-library" element={<TrainingLibraryPage />} />
            <Route path="/professionals/research-evidence" element={<ResearchEvidencePage />} />

            <Route path="/coverage-funding" element={<CoverageLandingPage />} />
            <Route path="/coverage-funding/medicare" element={<MedicarePage />} />
            <Route path="/coverage-funding/medicaid" element={<MedicaidPage />} />
            <Route path="/coverage-funding/medicaid-buy-in" element={<MedicaidBuyInPage />} />
            <Route path="/coverage-funding/mltc" element={<MLTCPage />} />
            <Route path="/coverage-funding/canada-provincial-plans" element={<CanadaProvincialPlansPage />} />
            <Route path="/coverage-funding/va-veterans" element={<VABenefitsPage />} />
            <Route path="/coverage-funding/private-insurance" element={<PrivateInsurancePage />} />
            <Route path="/coverage-funding/appeals-documentation" element={<AppealsPage />} />

            <Route path="/financial-support" element={<FinancialSupportPage />} />
            <Route path="/financial-support/ssdi" element={<SSDIPage />} />
            <Route path="/financial-support/ssi" element={<SSIPage />} />
            <Route path="/financial-support/tax-relief" element={<TaxReliefPage />} />
            <Route path="/financial-support/transportation" element={<TransportationPage />} />
            <Route path="/financial-support/blind-agencies-commissions" element={<BlindAgenciesPage />} />
            <Route path="/financial-support/emergency-help" element={<EmergencyHelpPage />} />

            <Route path="/rehab-training" element={<RehabLandingPage />} />
            <Route path="/rehab-training/functional-vision-assessment" element={<FunctionalVisionAssessmentPage />} />
            <Route path="/rehab-training/adl-training" element={<ADLTrainingPage />} />
            <Route path="/rehab-training/orientation-mobility" element={<OrientationMobilityPage />} />
            <Route path="/rehab-training/visual-skills-training" element={<VisualSkillsTrainingPage />} />
            <Route path="/rehab-training/assistive-tech-instruction" element={<AssistiveTechInstructionPage />} />
            <Route path="/rehab-training/home-modifications" element={<HomeModificationsPage />} />
            <Route path="/rehab-training/tele-rehab-options" element={<TeleRehabPage />} />

            <Route path="/devices-technology" element={<DevicesLandingPage />} />
            <Route path="/devices-technology/optical-devices" element={<OpticalDevicesPage />} />
            <Route path="/devices-technology/electronic-digital-aids" element={<ElectronicDigitalAidsPage />} />
            <Route path="/devices-technology/software-apps" element={<SoftwareAppsPage />} />
            <Route path="/devices-technology/daily-living-aids" element={<DailyLivingAidsPage />} />
            <Route path="/devices-technology/glare-light-management" element={<GlareLightManagementPage />} />
            <Route path="/devices-technology/braille-literacy-tools" element={<BrailleLiteracyPage />} />
            <Route path="/devices-technology/compare" element={<DevicesLandingPage />} />

            <Route path="/community-support" element={<CommunityLandingPage />} />
            <Route path="/community-support/emotional-support" element={<EmotionalSupportPage />} />
            <Route path="/community-support/education-services" element={<EducationServicesPage />} />
            <Route path="/community-support/employment-vocational" element={<EmploymentVocationalPage />} />
            <Route path="/community-support/caregiver-family" element={<CaregiverFamilyPage />} />
            <Route path="/community-support/guide-dog-services" element={<GuideDogServicesPage />} />
            <Route path="/community-support/youth-family-pathways" element={<YouthFamilyPage />} />
            <Route path="/community-support/senior-support" element={<SeniorSupportPage />} />

            <Route path="/about" element={<Navigate to="/about/mission" replace />} />
            <Route path="/about/mission" element={<MissionPage />} />
            <Route path="/about/clinical-advisory-board" element={<ClinicalAdvisoryBoardPage />} />
            <Route path="/about/partners" element={<PartnersPage />} />
            <Route path="/about/how-we-review-resources" element={<HowWeReviewResourcesPage />} />
            <Route path="/about/accessibility-statement" element={<AccessibilityPage />} />
            <Route path="/about/privacy" element={<PrivacyPage />} />
            <Route path="/about/contact" element={<ContactPage />} />

            <Route path="/faq" element={<FAQPage />} />
            <Route path="/saved-plan" element={<SavedPlanPage />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}
