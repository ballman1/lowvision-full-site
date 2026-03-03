import { Suspense } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Direct imports — no lazy() for SSR compatibility
import { HomePage } from './pages/HomePage';
import { StartHerePage } from './pages/StartHerePage';
import { StartHereWhatIsPage } from './pages/StartHereWhatIsPage';
import { StartHereNextStepsPage } from './pages/StartHereNextStepsPage';
import { SearchPage } from './pages/SearchPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { IntakePage } from './pages/IntakePage';
import { IntakeStartPage } from './pages/IntakeStartPage';
import { IntakeResultsPage } from './pages/IntakeResultsPage';
import { ProfessionalsPage } from './pages/ProfessionalsPage';
import { DiagnosticResourcesPage } from './pages/DiagnosticResourcesPage';
import { TestRecipesPage } from './pages/TestRecipesPage';
import {
  ReferralPathwaysPage, FunctionalOutcomesPage, FollowUpProtocolsPage,
  TemplatesPage, CodingCoverageGuidePage, TrainingLibraryPage, ResearchEvidencePage,
} from './pages/ProfessionalSubPages';
import {
  CoverageLandingPage, MedicarePage, MedicaidPage, VABenefitsPage,
  PrivateInsurancePage, AppealsPage, MedicaidBuyInPage, MLTCPage, CanadaProvincialPlansPage,
} from './pages/CoveragePages';
import {
  FinancialSupportPage, SSDIPage, SSIPage, TaxReliefPage,
  TransportationPage, BlindAgenciesPage, EmergencyHelpPage,
} from './pages/FinancialSupportPage';
import {
  RehabLandingPage, FunctionalVisionAssessmentPage, ADLTrainingPage,
  OrientationMobilityPage, VisualSkillsTrainingPage, AssistiveTechInstructionPage,
  HomeModificationsPage, TeleRehabPage,
} from './pages/RehabPages';
import {
  DevicesLandingPage, OpticalDevicesPage, ElectronicDigitalAidsPage,
  SoftwareAppsPage, DailyLivingAidsPage, GlareLightManagementPage, BrailleLiteracyPage,
} from './pages/DevicePages';
import {
  CommunityLandingPage, EmotionalSupportPage, EducationServicesPage,
  EmploymentVocationalPage, CaregiverFamilyPage, GuideDogServicesPage,
  YouthFamilyPage, SeniorSupportPage,
} from './pages/CommunityPages';
import {
  MissionPage, AccessibilityPage, PrivacyPage, ContactPage,
  ClinicalAdvisoryBoardPage, PartnersPage, HowWeReviewResourcesPage,
} from './pages/AboutPages';
import { FAQPage } from './pages/FAQPage';
import { SavedPlanPage } from './pages/SavedPlanPage';

export function render(url: string) {
  const helmetContext: Record<string, unknown> = {};

  const appHtml = renderToStaticMarkup(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Suspense fallback="">
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
      </StaticRouter>
    </HelmetProvider>
  );

  return { appHtml, helmetContext };
}
