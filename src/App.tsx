import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { StartHereWhatIsPage } from './pages/StartHereWhatIsPage';
import { StartHereNextStepsPage } from './pages/StartHereNextStepsPage';
import { SearchPage } from './pages/SearchPage';

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
const LoginPage = lazyNamed(() => import('./pages/LoginPage'), 'LoginPage');
const AuthCallbackPage = lazyNamed(() => import('./pages/AuthCallbackPage'), 'AuthCallbackPage');

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]" aria-label="Loading...">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}
