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
import { PageSEO } from '../components/seo/PageSEO';

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Low Vision Navigator',
    url: 'https://lowvisionnavigator.org/',
    logo: 'https://lowvisionnavigator.org/logo.png',
    description: 'Low Vision Navigator helps people with low vision find rehabilitation services, devices, funding, and practical guidance for everyday life.',
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', url: 'https://lowvisionnavigator.org/about/contact' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Low Vision Navigator',
    url: 'https://lowvisionnavigator.org/',
  },
];

export function HomePage() {
  return (
    <>
      <PageSEO
        title="Low Vision Navigator"
        description="Find vision rehabilitation services, low vision devices, funding options, and practical guidance for living with low vision."
        canonical="https://lowvisionnavigator.org/"
        schema={homeSchema}
      />
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
