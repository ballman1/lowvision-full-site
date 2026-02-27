import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { PageSEO } from '../components/seo/PageSEO';

function CommunityPageTemplate({
  title,
  subtitle,
  breadcrumb,
  whatSupportLooksLike,
  whoItIsFor,
  whereToStart,
  keyQuestions,
  relatedLinks,
}: {
  title: string;
  subtitle: string;
  breadcrumb: string;
  whatSupportLooksLike: string;
  whoItIsFor: string[];
  whereToStart: string[];
  keyQuestions: string[];
  relatedLinks: { label: string; href: string }[];
}) {
  return (
    <ContentPageLayout
      title={title}
      subtitle={subtitle}
      breadcrumbs={[{ label: 'Community & Support', href: '/community-support' }, { label: breadcrumb }]}
      headerBg="bg-green-800"
    >
      <div className="space-y-8">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-2">What support looks like</h2>
          <p className="text-gray-600 leading-relaxed">{whatSupportLooksLike}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Who it's for</h2>
            <ul className="space-y-2">
              {whoItIsFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Where to start</h2>
            <ul className="space-y-2">
              {whereToStart.map((step) => (
                <li key={step} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 shrink-0">→</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Key questions to ask</h2>
          <div className="bg-green-50 rounded-xl border border-green-100 p-5 space-y-2">
            {keyQuestions.map((q) => (
              <p key={q} className="text-sm text-green-800 flex gap-2">
                <span className="shrink-0">→</span>
                {q}
              </p>
            ))}
          </div>
        </div>
        {relatedLinks.length > 0 && (
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200"><h3 className="text-sm font-semibold text-gray-700">Related resources</h3></div>
            {relatedLinks.map(({ label, href }) => (
              <Link key={href} to={href} className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-white hover:text-green-700 transition-colors border-b border-gray-100 last:border-0">
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

export function CommunityLandingPage() {
  const pages = [
    { title: 'Emotional Support', href: '/community-support/emotional-support', desc: 'Counseling, peer groups, and adjustment to vision loss.' },
    { title: 'Education Services', href: '/community-support/education-services', desc: 'TVI, IEP/504, accessible materials, and classroom supports.' },
    { title: 'Employment & Vocational', href: '/community-support/employment-vocational', desc: 'Job training, workplace accessibility, and accommodations.' },
    { title: 'Caregiver & Family', href: '/community-support/caregiver-family', desc: 'Respite, education, and structured support for caregivers.' },
    { title: 'Guide Dog Services', href: '/community-support/guide-dog-services', desc: 'Eligibility, referrals, matching, and what to expect.' },
    { title: 'Youth & Family Pathways', href: '/community-support/youth-family-pathways', desc: 'College readiness, transition, and independent living.' },
    { title: 'Senior Support', href: '/community-support/senior-support', desc: 'Programs for older adults adapting to vision changes.' },
  ];
const communityItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Community & Support Resources for People with Low Vision',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Emotional Support & Counseling', url: 'https://lowvisionnavigator.org/community-support/emotional-support' },
    { '@type': 'ListItem', position: 2, name: 'Education Services', url: 'https://lowvisionnavigator.org/community-support/education-services' },
    { '@type': 'ListItem', position: 3, name: 'Employment & Vocational Rehabilitation', url: 'https://lowvisionnavigator.org/community-support/employment-vocational' },
    { '@type': 'ListItem', position: 4, name: 'Caregiver & Family Support', url: 'https://lowvisionnavigator.org/community-support/caregiver-family' },
    { '@type': 'ListItem', position: 5, name: 'Guide Dog Services', url: 'https://lowvisionnavigator.org/community-support/guide-dog-services' },
    { '@type': 'ListItem', position: 6, name: 'Youth & Family Pathways', url: 'https://lowvisionnavigator.org/community-support/youth-family-pathways' },
    { '@type': 'ListItem', position: 7, name: 'Senior Support', url: 'https://lowvisionnavigator.org/community-support/senior-support' },
  ],
};

  return (
    <div>
      <PageSEO
        title="Low Vision Community & Support Resources"
        description="Explore emotional support, education services, employment help, caregiver resources, guide dog programs, and youth and senior support for people with low vision."
        breadcrumbs={[{ label: 'Community & Support' }]}
        schema={communityItemListSchema}
      />
      <div className="bg-green-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Community & Support</h1>
          <p className="text-green-100 text-lg max-w-2xl">Low vision is medical, practical, and emotional. Support has to be all three.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map(({ title, href, desc }) => (
            <Link key={href} to={href} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-green-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600">
              <h2 className="text-base font-semibold text-gray-900 group-hover:text-green-700 transition-colors mb-1.5">{title}</h2>
              <p className="text-sm text-gray-500">{desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-700">Learn more <ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EmotionalSupportPage() {
  return (
    <CommunityPageTemplate
      title="Emotional Support & Adjustment to Vision Loss"
      subtitle="Vision loss is a grief process. Counseling, peer support, and connection matter as much as clinical care."
      breadcrumb="Emotional Support"
      whatSupportLooksLike="Emotional support for vision loss includes individual counseling, peer support groups (in-person and virtual), phone-based support lines, and structured adjustment programs. Many people describe the period after a significant diagnosis as involving stages of grief. Support helps people move toward acceptance and active adaptation—not by denying loss, but by building a new sense of possibility."
      whoItIsFor={[
        'Anyone newly diagnosed with a progressive or significant vision condition',
        'People experiencing depression, anxiety, or social isolation related to vision loss',
        'Caregivers and family members of someone with vision impairment',
        'Individuals who have lived with vision loss but never addressed the emotional impact',
        'People experiencing sudden vision loss (trauma, stroke, infection)',
      ]}
      whereToStart={[
        'Ask your eye care provider for a referral to a social worker or counselor with vision loss experience',
        'Contact your state blind services agency—many have emotional support or peer programs',
        'Search the Association of Blindness Professionals (ABP) for peer specialists',
        'Contact VisionAware.org for self-directed resources and peer support directory',
        'Ask about tele-counseling if local services are limited',
      ]}
      keyQuestions={[
        'Do you have counselors who specialize in adjustment to vision loss?',
        'Are peer support groups available (in person or virtual)?',
        'Is there a crisis or support line I can call when things are hard?',
        'Can I bring a family member or caregiver to sessions?',
      ]}
      relatedLinks={[
        { label: 'Caregiver & Family Support', href: '/community-support/caregiver-family' },
        { label: 'Find Local Support Services', href: '/resources' },
        { label: 'State Blind Services Agencies', href: '/resources?type=State+Blind+Agency' },
      ]}
    />
  );
}

export function EducationServicesPage() {
  return (
    <CommunityPageTemplate
      title="Education Services for Students with Visual Impairment"
      subtitle="From early intervention through high school—every student has a right to accessible education."
      breadcrumb="Education Services"
      whatSupportLooksLike="Educational support for students with visual impairments is provided through specialized professionals embedded in or consulting to the public school system. Under IDEA (Individuals with Disabilities Education Act), eligible students are entitled to a Free Appropriate Public Education (FAPE) with supports including Teacher of the Visually Impaired (TVI) services, O&M instruction, accessible materials, and assistive technology. Services are documented in an Individualized Education Program (IEP) or Section 504 plan."
      whoItIsFor={[
        'Students from birth through 21 with visual impairment or blindness',
        'Children with CVI, albinism, retinal disorders, or other vision conditions affecting learning',
        'Students with combined vision and other disabilities',
        'Families unsure whether their child qualifies for vision services',
        'Students transitioning to college or employment',
      ]}
      whereToStart={[
        'Contact your school district\'s special education coordinator and request a vision evaluation',
        'Ask for a Functional Vision Assessment (FVA) and Learning Media Assessment (LMA)',
        'Request an IEP team meeting if your child already has an IEP',
        'Contact your state\'s school for the blind or vision services department for consultation',
        'Connect with the American Foundation for the Blind (AFB) FamilyConnect resource',
      ]}
      keyQuestions={[
        'Does my child qualify for TVI and O&M services under IDEA?',
        'What is included in my child\'s IEP related to vision?',
        'What accessible materials (Braille, large print, audio) are provided?',
        'Is assistive technology evaluated and provided as part of the IEP?',
        'How often does the TVI see my child, and what does instruction involve?',
      ]}
      relatedLinks={[
        { label: 'Youth & Family Pathways', href: '/community-support/youth-family-pathways' },
        { label: 'Find School Services Near You', href: '/resources?type=School%2FTVI+Services' },
        { label: 'Talking Book Libraries', href: '/resources?type=Talking+Book+Library' },
      ]}
    />
  );
}

export function EmploymentVocationalPage() {
  return (
    <CommunityPageTemplate
      title="Employment & Vocational Services"
      subtitle="Vision impairment doesn't define what you can contribute at work—with the right supports."
      breadcrumb="Employment & Vocational"
      whatSupportLooksLike="Vocational rehabilitation (VR) services help people with visual impairments find, keep, or advance in employment. State VR agencies provide individualized plans for employment, assistive technology funding, job coaching, workplace accommodation assessments, and postsecondary training support. Business Enterprise Programs support individuals who want to run independent businesses."
      whoItIsFor={[
        'Working adults whose vision loss is affecting job performance',
        'People seeking employment with a visual impairment',
        'Students transitioning from school to work',
        'Individuals considering a career change due to vision changes',
        'Business owners or self-employed individuals needing AT support',
      ]}
      whereToStart={[
        'Apply directly to your state VR agency — no referral needed',
        'Request an Individualized Plan for Employment (IPE)',
        'Ask about AT evaluation and workplace accommodation assessment',
        'Contact your state Commission for the Blind or vocational blindness services',
        'Explore the Job Accommodation Network (JAN) for employer consultation',
      ]}
      keyQuestions={[
        'What services does the VR agency cover for visual impairment?',
        'Can VR fund assistive technology for my current job?',
        'What workplace accommodations should I be requesting from my employer?',
        'Is there a Business Enterprise Program if I want to own a business?',
        'Can I receive VR services while still employed?',
      ]}
      relatedLinks={[
        { label: 'Find VR Services', href: '/resources?type=Vocational+Rehabilitation' },
        { label: 'Coverage for Work-Related AT', href: '/coverage-funding/medicaid-buy-in' },
        { label: 'Software & Apps for Work', href: '/devices-technology/software-apps' },
      ]}
    />
  );
}

export function CaregiverFamilyPage() {
  return (
    <CommunityPageTemplate
      title="Caregiver & Family Support"
      subtitle="Supporting someone with vision loss is rewarding—and demanding. You need support too."
      breadcrumb="Caregiver & Family"
      whatSupportLooksLike="Caregiver support for vision loss includes respite services, education about vision conditions and rehabilitation, family counseling, and practical training in sighted guide techniques and home safety. Caring for someone with vision impairment can become all-consuming without structured boundaries and support. Many organizations offer caregiver-specific programs, peer groups, and phone-based counseling."
      whoItIsFor={[
        'Spouses, adult children, and partners of someone with vision loss',
        'Parents of children with visual impairments',
        'Caregivers experiencing stress, burnout, or overwhelm',
        'Family members who want to help but don\'t know how',
        'People navigating care responsibilities alongside work and family',
      ]}
      whereToStart={[
        'Ask the person\'s eye care provider to include caregiver education at appointments',
        'Contact your state blind agency — many have caregiver programs',
        'Search for respite care through Area Agency on Aging (AAA) programs',
        'Learn sighted guide technique — a short training that immediately helps',
        'Connect with a peer caregiver support group through CNIB or AFB',
      ]}
      keyQuestions={[
        'Is sighted guide training available for family members?',
        'What resources exist for caregivers experiencing burnout?',
        'How can I help without creating dependency?',
        'What should I know about my family member\'s specific diagnosis?',
        'Is respite care available through any state or community program?',
      ]}
      relatedLinks={[
        { label: 'Emotional Support', href: '/community-support/emotional-support' },
        { label: 'Home Modifications', href: '/rehab-training/home-modifications' },
        { label: 'Senior Support', href: '/community-support/senior-support' },
      ]}
    />
  );
}

export function GuideDogServicesPage() {
  return (
    <CommunityPageTemplate
      title="Guide Dog Services"
      subtitle="Guide dogs offer mobility, confidence, and companionship—but the right match takes careful selection."
      breadcrumb="Guide Dog Services"
      whatSupportLooksLike="Guide dog programs provide trained dogs, matched to individuals through a careful selection process, along with residential training (usually 2–4 weeks) at the school. Most programs are entirely free to qualified applicants and include follow-up support. A guide dog is a serious commitment—the handler provides daily care, exercise, and maintains training. O&M training with a white cane is strongly recommended before or alongside guide dog use."
      whoItIsFor={[
        'Adults with significant visual impairment who travel independently',
        'People who have completed O&M training and want an alternative to cane travel',
        'Active individuals whose lifestyle suits a working dog',
        'Those who can commit to the care, exercise, and maintenance of a working animal',
        'Applicants who can attend a residential training program (usually 2–4 weeks)',
      ]}
      whereToStart={[
        'Contact Guide Dogs for the Blind, The Seeing Eye, or another IGDF-accredited school',
        'Complete O&M training first if not already done — most schools require it',
        'Discuss with your O&M specialist whether a guide dog is the right fit',
        'Apply to 2–3 schools and discuss timelines (wait lists vary)',
        'Arrange for aftercare and veterinary support',
      ]}
      keyQuestions={[
        'What is the application process and typical wait time?',
        'Is O&M cane training required before applying?',
        'What costs are involved? (Most programs are free)',
        'What does the residential training involve?',
        'What ongoing support is provided after graduation?',
      ]}
      relatedLinks={[
        { label: 'Find Guide Dog Services', href: '/resources?type=Guide+Dog+Services' },
        { label: 'Orientation & Mobility Training', href: '/rehab-training/orientation-mobility' },
        { label: 'Emotional & Peer Support', href: '/community-support/emotional-support' },
      ]}
    />
  );
}

export function YouthFamilyPage() {
  return (
    <CommunityPageTemplate
      title="Youth & Family Pathways"
      subtitle="Supporting young people with visual impairment through education, transition, and toward independence."
      breadcrumb="Youth & Family Pathways"
      whatSupportLooksLike="Youth pathways for visual impairment span from early intervention through postsecondary transition. Key milestones include early TVI support, IEP development, Braille or print literacy instruction, O&M training, college readiness (including accessible campus life), and vocational planning. Family engagement is critical at every stage."
      whoItIsFor={[
        'Infants and toddlers with vision conditions (Part C early intervention)',
        'School-age children receiving TVI and O&M services',
        'Teenagers preparing for college or vocational training',
        'Young adults transitioning to independent living',
        'Families navigating school systems and service eligibility',
      ]}
      whereToStart={[
        'Contact your state Part C early intervention program if child is under 3',
        'Request school district special education evaluation for children 3 and older',
        'Begin transition planning by age 16 at the latest (IEP requirement)',
        'Contact state blind agency for transition services and vocational planning',
        'Connect with the Helen Keller National Center or AFB for youth resources',
      ]}
      keyQuestions={[
        'Is my child eligible for early intervention services?',
        'What transition planning should start at age 14-16?',
        'What college accessibility offices and disability services should I connect with?',
        'Is there a summer transition or college readiness program for blind/VI students?',
        'Can VR services begin before high school graduation?',
      ]}
      relatedLinks={[
        { label: 'Education Services', href: '/community-support/education-services' },
        { label: 'Employment & Vocational', href: '/community-support/employment-vocational' },
        { label: 'Braille & Literacy Tools', href: '/devices-technology/braille-literacy-tools' },
      ]}
    />
  );
}

export function SeniorSupportPage() {
  return (
    <CommunityPageTemplate
      title="Senior Support for Vision Loss"
      subtitle="Age-related vision loss is common—but loss of independence is not inevitable."
      breadcrumb="Senior Support"
      whatSupportLooksLike="Support for older adults with vision loss addresses multiple intersecting needs: clinical care, rehabilitation, home safety, caregiver support, and social connection. Many seniors with AMD, glaucoma, or diabetic retinopathy have lived well with vision loss for years using appropriate services. Area Agencies on Aging, state blind agencies, and programs like VIST (for Veterans) provide structured support."
      whoItIsFor={[
        'Adults 65+ experiencing age-related macular degeneration, glaucoma, or diabetic retinopathy',
        'Seniors who have stopped activities (reading, driving) due to vision changes',
        'Older adults at elevated fall risk due to vision',
        'Seniors living alone with significant vision impairment',
        'Families concerned about an aging parent\'s safety and independence',
      ]}
      whereToStart={[
        'Contact your state blind services agency — services are available regardless of age or work status',
        'Ask your eye doctor for a referral to a low vision specialist',
        'Contact your local Area Agency on Aging for community support programs',
        'Ask about home safety assessment from a VRT or OT',
        'Connect with the Braille Institute, Lighthouse for the Blind, or CNIB for local programs',
      ]}
      keyQuestions={[
        'Does my state blind agency provide services for seniors (not just working age)?',
        'What home safety modifications can help prevent falls related to vision loss?',
        'Are there senior-specific low vision or technology training groups in my area?',
        'What simple devices can help with medication management?',
        'Is home care or personal assistance available through Medicaid or Area Agency on Aging?',
      ]}
      relatedLinks={[
        { label: 'Home Modifications', href: '/rehab-training/home-modifications' },
        { label: 'Daily Living Aids', href: '/devices-technology/daily-living-aids' },
        { label: 'Emotional Support', href: '/community-support/emotional-support' },
        { label: 'Medicare Coverage', href: '/coverage-funding/medicare' },
      ]}
    />
  );
}
