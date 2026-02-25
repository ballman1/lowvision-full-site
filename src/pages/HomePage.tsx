import { Hero } from '../components/home/Hero';
import { TrustStrip } from '../components/home/TrustStrip';
import { PathwayCards } from '../components/home/PathwayCards';
import { HowItWorks } from '../components/home/HowItWorks';
import { CoreSiteCards } from '../components/home/CoreSiteCards';
import { PatientPaths } from '../components/home/PatientPaths';
import { ProfessionalsHighlight } from '../components/home/ProfessionalsHighlight';
import { CoverageHighlight } from '../components/home/CoverageHighlight';
import { DirectorySearchPanel } from '../components/home/DirectorySearchPanel';
import { FAQPreview } from '../components/home/FAQPreview';
import { CTABand } from '../components/home/CTABand';

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <PathwayCards />
      <HowItWorks />
      <CoreSiteCards />
      <PatientPaths />
      <ProfessionalsHighlight />
      <CoverageHighlight />
      <DirectorySearchPanel />
      <FAQPreview />
      <CTABand />
    </>
  );
}
