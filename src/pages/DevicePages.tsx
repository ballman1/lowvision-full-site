import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { PageSEO } from '../components/seo/PageSEO';
import { CheckCircle, XCircle, ArrowRight, AlertCircle } from 'lucide-react';

function medicalPageSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name,
    description,
    about: { '@type': 'MedicalCondition', name: 'Low Vision' },
    audience: { '@type': 'Patient' },
    reviewedBy: { '@type': 'Organization', name: 'Low Vision Navigator Clinical Advisory Board' },
  };
}

const TRAINING_NOTE = 'Device success often depends on training and setup—not just the device itself. Ask your provider about instruction options before purchasing.';

function DevicePageTemplate({
  title,
  subtitle,
  breadcrumb,
  helpsWith,
  pros,
  cons,
  portability,
  trainingNeeded,
  costRange,
  whoCanHelp,
  relatedLinks,
}: {
  title: string;
  subtitle: string;
  breadcrumb: string;
  helpsWith: string[];
  pros: string[];
  cons: string[];
  portability: string;
  trainingNeeded: string;
  costRange: string;
  whoCanHelp: string;
  relatedLinks: { label: string; href: string }[];
}) {
  return (
    <ContentPageLayout
      title={title}
      subtitle={subtitle}
      breadcrumbs={[{ label: 'Devices & Technology', href: '/devices-technology' }, { label: breadcrumb }]}
      headerBg="bg-gray-800"
      schema={medicalPageSchema(title, subtitle)}
    >
      <div className="space-y-8">
        <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
          <p>{TRAINING_NOTE}</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Portability', value: portability },
            { label: 'Training needed', value: trainingNeeded },
            { label: 'Cost range', value: costRange },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">What it helps with</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {helpsWith.map((h) => (
              <div key={h} className="flex items-start gap-2.5 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                {h}
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Advantages</h2>
            <ul className="space-y-2">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Limitations</h2>
            <ul className="space-y-2">
              {cons.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Who can help with setup & training</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{whoCanHelp}</p>
        </div>
        {relatedLinks.length > 0 && (
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200"><h3 className="text-sm font-semibold text-gray-700">Related</h3></div>
            {relatedLinks.map(({ label, href }) => (
              <Link key={href} to={href} className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-white hover:text-blue-700 transition-colors border-b border-gray-100 last:border-0">
                {label}
                <ArrowRight className="h-4 w-4 text-gray-300" aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </ContentPageLayout>
  );
}

const devicesItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Low Vision Devices & Assistive Technology by Category',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Optical Devices', url: 'https://lowvisionnavigator.org/devices-technology/optical-devices' },
    { '@type': 'ListItem', position: 2, name: 'Electronic & Digital Aids', url: 'https://lowvisionnavigator.org/devices-technology/electronic-digital-aids' },
    { '@type': 'ListItem', position: 3, name: 'Software & Apps', url: 'https://lowvisionnavigator.org/devices-technology/software-apps' },
    { '@type': 'ListItem', position: 4, name: 'Daily Living Aids', url: 'https://lowvisionnavigator.org/devices-technology/daily-living-aids' },
    { '@type': 'ListItem', position: 5, name: 'Glare & Light Management', url: 'https://lowvisionnavigator.org/devices-technology/glare-light-management' },
    { '@type': 'ListItem', position: 6, name: 'Braille & Literacy Tools', url: 'https://lowvisionnavigator.org/devices-technology/braille-literacy-tools' },
  ],
};

export function DevicesLandingPage() {
  const categories = [
    { title: 'Optical Devices', href: '/devices-technology/optical-devices', desc: 'Handheld/stand magnifiers, high-plus readers, loupes, bioptics.' },
    { title: 'Electronic & Digital Aids', href: '/devices-technology/electronic-digital-aids', desc: 'Desktop video magnifiers, portable CCTVs, wearable aids.' },
    { title: 'Software & Apps', href: '/devices-technology/software-apps', desc: 'Screen readers, magnifiers, OCR, AI assistance tools.' },
    { title: 'Daily Living Aids', href: '/devices-technology/daily-living-aids', desc: 'Talking tools, tactile markers, kitchen and phone supports.' },
    { title: 'Glare & Light Management', href: '/devices-technology/glare-light-management', desc: 'Absorptive lenses, filters, lighting strategies.' },
    { title: 'Braille & Literacy Tools', href: '/devices-technology/braille-literacy-tools', desc: 'Braille displays, embossers, audiobooks, large print.' },
  ];
  return (
    <div>
      <PageSEO
        title="Low Vision Devices & Assistive Technology"
        description="Explore low vision devices by category: optical magnifiers, electronic video magnifiers, screen readers, daily living aids, glare filters, and braille tools. Matched to tasks, not diagnoses."
        breadcrumbs={[{ label: 'Devices & Technology' }]}
        schema={[medicalPageSchema('Low Vision Devices & Assistive Technology', 'A guide to optical, electronic, and software assistive technology devices for people with low vision—matched to real tasks.'), devicesItemListSchema]}
      />
      <div className="bg-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Devices & Technology</h1>
          <p className="text-gray-300 text-lg max-w-2xl">Devices are tools, not miracles. We match tools to tasks—and explain tradeoffs.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
          <p>{TRAINING_NOTE}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ title, href, desc }) => (
            <Link key={href} to={href} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
              <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1.5">{title}</h2>
              <p className="text-sm text-gray-500">{desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">Learn more <ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OpticalDevicesPage() {
  return (
    <DevicePageTemplate
      title="Optical Devices"
      subtitle="Lenses and optical systems that use magnification to make detail visible—no batteries required."
      breadcrumb="Optical Devices"
      helpsWith={['Reading fine print (labels, menus, books)', 'Spot-checking prices and signage', 'Detailed handwork (needlework, repairs)', 'Prescription reading glasses for extended near tasks', 'Distance spotting (bioptic telescopes)']}
      pros={['Immediate use — no learning curve for basic handheld', 'Wide range of magnification levels', 'No charging or batteries', 'Widely available and relatively affordable', 'Can be used alongside electronic devices']}
      cons={['Small field of view at higher magnifications', 'Requires steady hands at close working distances', 'Not suitable for extended reading at very high powers', 'Lighting dependent — poor under dim conditions', 'Prescription changes require new lenses']}
      portability="High"
      trainingNeeded="Minimal to Moderate"
      costRange="$15–$800+ (bioptics)"
      whoCanHelp="Low vision optometrists fit and prescribe optical devices. State AT programs offer free device trials. VRTs can teach effective techniques for using prescribed devices in daily tasks."
      relatedLinks={[
        { label: 'Electronic Video Magnifiers', href: '/devices-technology/electronic-digital-aids' },
        { label: 'Visual Skills Training', href: '/rehab-training/visual-skills-training' },
        { label: 'Find Low Vision Clinics', href: '/resources?type=Low+Vision+Clinic' },
      ]}
    />
  );
}

export function ElectronicDigitalAidsPage() {
  return (
    <DevicePageTemplate
      title="Electronic & Digital Video Magnifiers"
      subtitle="Desktop and portable magnification systems with adjustable contrast, brightness, and color modes."
      breadcrumb="Electronic Digital Aids"
      helpsWith={['Extended reading (books, mail, documents)', 'Writing and signatures', 'Handwork under high magnification', 'Screen-based tasks at comfortable working distance', 'Portable use for shopping, appointments, menus']}
      pros={['Wide field of view compared to optical magnifiers', 'Adjustable contrast, color modes, and brightness', 'Some models connect to computers and TVs', 'High magnification without extreme proximity', 'Portable models available for use outside home']}
      cons={['Significant cost ($500–$3,500+ for desktop models)', 'Desktop models are not portable', 'Learning curve for features and controls', 'May not replace optical devices for all tasks', 'Battery life limits portable use duration']}
      portability="Low (desktop) to High (handheld)"
      trainingNeeded="Moderate"
      costRange="$150–$3,500+"
      whoCanHelp="Low vision specialists can demonstrate and recommend specific models. State AT programs loan devices for trial before purchase. VRT specialists provide training on efficient use. VR agencies may fund devices for work purposes."
      relatedLinks={[
        { label: 'Optical Devices', href: '/devices-technology/optical-devices' },
        { label: 'Assistive Tech Instruction', href: '/rehab-training/assistive-tech-instruction' },
        { label: 'Find AT Programs', href: '/resources?type=Assistive+Technology' },
      ]}
    />
  );
}

export function SoftwareAppsPage() {
  return (
    <DevicePageTemplate
      title="Software & Smartphone Apps"
      subtitle="Screen readers, magnifiers, OCR tools, and AI apps that make digital content accessible."
      breadcrumb="Software & Apps"
      helpsWith={['Computer and tablet use for work, school, and communication', 'Reading printed documents via OCR (phone camera)', 'Navigation and face/object recognition (AI apps)', 'Email, web browsing, and document creation', 'Text-to-speech for reading long documents']}
      pros={['Many options are free or low-cost (built-in OS features)', 'Always available on devices you already own', 'Continuously updated and improving (especially AI tools)', 'Screen sharing allows remote AT instruction', 'Works across all digital content when configured correctly']}
      cons={['Learning curve can be steep for screen readers', 'Requires consistent setup and practice to use efficiently', 'OCR accuracy varies with print quality and lighting', 'Some apps require good internet connectivity', 'Not a replacement for in-person or paper tasks']}
      portability="High"
      trainingNeeded="Moderate to Significant (screen readers)"
      costRange="Free–$1,500 (professional screen readers)"
      whoCanHelp="AT specialists certified in assistive technology (ATIA, RESNA) provide screen reader and software training. State AT programs offer free consultations. TVIs train students on educational technology. JAWS and ZoomText vendors offer training resources."
      relatedLinks={[
        { label: 'Electronic Video Magnifiers', href: '/devices-technology/electronic-digital-aids' },
        { label: 'Assistive Tech Instruction', href: '/rehab-training/assistive-tech-instruction' },
        { label: 'Employment Support', href: '/community-support/employment-vocational' },
      ]}
    />
  );
}

export function DailyLivingAidsPage() {
  return (
    <DevicePageTemplate
      title="Daily Living Aids"
      subtitle="Practical tools that make everyday tasks safer and more independent—without specialized training."
      breadcrumb="Daily Living Aids"
      helpsWith={['Telling time and setting alarms independently', 'Identifying medications accurately', 'Marking appliances, dials, and containers', 'Kitchen tasks safely', 'Managing money and identifying bills']}
      pros={['Low cost — most items under $50', 'Minimal learning curve', 'Immediate practical impact on daily independence', 'Wide availability (online and low vision suppliers)', 'Complement rather than replace other devices']}
      cons={['Don\'t address underlying visual challenges', 'Labeling and organization require initial setup time', 'Some items have limited functionality', 'Battery replacement required for talking devices', 'Organization systems need consistent maintenance']}
      portability="High"
      trainingNeeded="Minimal"
      costRange="$5–$200"
      whoCanHelp="VRTs introduce and teach daily living aids as part of ADL training. State blind agencies stock and provide many items at no cost. Amazon, RNIB, CNIB, and specialized suppliers like Independent Living Aids offer catalogs."
      relatedLinks={[
        { label: 'ADL Training', href: '/rehab-training/adl-training' },
        { label: 'Home Modifications', href: '/rehab-training/home-modifications' },
        { label: 'Optical Devices', href: '/devices-technology/optical-devices' },
      ]}
    />
  );
}

export function GlareLightManagementPage() {
  return (
    <DevicePageTemplate
      title="Glare & Light Management"
      subtitle="Filters, tinted lenses, and lighting strategies that dramatically improve comfort and function."
      breadcrumb="Glare & Light Management"
      helpsWith={['Reducing outdoor glare and UV sensitivity', 'Managing indoor fluorescent light sensitivity', 'Improving contrast under bright conditions', 'Photophobia management (light-induced pain or discomfort)', 'Night driving and low-light conditions (specific filters)']}
      pros={['Immediately noticeable comfort improvement for many people', 'Wide range of tint densities and colors for different needs', 'Can improve visual acuity under glare conditions', 'Wraparound styles block peripheral light', 'Can be worn over prescription glasses']}
      cons={['Trial and error required to find optimal tint', 'May reduce overall light and vision in dim environments', 'Style and appearance concerns for some users', 'Does not address underlying photosensitivity cause', 'Multiple pairs often needed for different environments']}
      portability="High"
      trainingNeeded="Minimal"
      costRange="$30–$500 (NoIR, Corning CPF, etc.)"
      whoCanHelp="Low vision optometrists prescribe and fit absorptive lenses. AT programs may have filter samples for trial. Manufacturers like NoIR and Corning offer sample kits. Lighting advice from VRTs and O&M specialists."
      relatedLinks={[
        { label: 'Optical Devices', href: '/devices-technology/optical-devices' },
        { label: 'Functional Vision Assessment', href: '/rehab-training/functional-vision-assessment' },
        { label: 'Test Recipe: Glare-Focused (Professionals)', href: '/professionals/test-selection-recipes' },
      ]}
    />
  );
}

export function BrailleLiteracyPage() {
  return (
    <DevicePageTemplate
      title="Braille & Literacy Tools"
      subtitle="Tactile reading, refreshable Braille displays, and accessible audiobook systems."
      breadcrumb="Braille & Literacy Tools"
      helpsWith={['Independent reading without reliance on vision', 'Learning and using Braille for tactile literacy', 'Note-taking and document access via Braille notetakers', 'Audiobook access through the NLS talking book system', 'STEM materials and music notation in Braille']}
      pros={['Complete independence from visual function', 'Refreshable Braille works with computers, phones, and tablets', 'Braille literacy correlated with higher employment rates', 'NLS talking book service is free for qualifying individuals', 'Braille music and STEM materials widely available']}
      cons={['Learning Braille takes significant time and practice', 'Refreshable Braille displays are expensive ($1,500–$7,000)', 'Printed Braille materials are bulky', 'Many Braille embossers are costly and require maintenance', 'Not suitable for severe peripheral neuropathy affecting finger sensitivity']}
      portability="Medium (display) to High (talking book players)"
      trainingNeeded="Significant (Braille literacy)"
      costRange="Free (NLS) to $7,000+ (Braille displays)"
      whoCanHelp="TVIs teach Braille literacy to students. O&M specialists integrate Braille into travel (tactile maps). State blind agencies provide NLS library access and may fund Braille devices. AT specialists train users on refreshable Braille with screen readers."
      relatedLinks={[
        { label: 'Talking Book Library (NLS)', href: '/resources?type=Talking+Book+Library' },
        { label: 'Software & Apps', href: '/devices-technology/software-apps' },
        { label: 'School Services / TVI', href: '/community-support/education-services' },
      ]}
    />
  );
}
