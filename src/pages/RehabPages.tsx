import { Link } from 'react-router-dom';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { CheckCircle, ArrowRight } from 'lucide-react';

function RehabPageTemplate({
  title,
  subtitle,
  breadcrumb,
  breadcrumbHref,
  whatItIs,
  whoItHelps,
  commonGoals,
  sessionInvolves,
  howToAccess,
  relatedLinks,
}: {
  title: string;
  subtitle: string;
  breadcrumb: string;
  breadcrumbHref?: string;
  whatItIs: string;
  whoItHelps: string[];
  commonGoals: string[];
  sessionInvolves: string[];
  howToAccess: string;
  relatedLinks: { label: string; href: string }[];
}) {
  return (
    <ContentPageLayout
      title={title}
      subtitle={subtitle}
      breadcrumbs={[{ label: 'Rehab & Training', href: '/rehab-training' }, { label: breadcrumb }]}
      headerBg="bg-teal-800"
    >
      <div className="space-y-8">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-2">What it is</h2>
          <p className="text-gray-600 leading-relaxed">{whatItIs}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Who it helps</h2>
            <ul className="space-y-2">
              {whoItHelps.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Common goals</h2>
            <ul className="space-y-2">
              {commonGoals.map((g) => (
                <li key={g} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-teal-500 shrink-0">→</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">What sessions may involve</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {sessionInvolves.map((s) => (
              <div key={s} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-700">
                <span className="text-gray-400 shrink-0">•</span>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How to access it</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{howToAccess}</p>
        </div>
        {relatedLinks.length > 0 && (
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700">Related services</h3>
            </div>
            {relatedLinks.map(({ label, href }) => (
              <Link key={href} to={href} className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-white hover:text-teal-700 transition-colors border-b border-gray-100 last:border-0">
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

export function RehabLandingPage() {
  const services = [
    { title: 'Functional Vision Assessment', href: '/rehab-training/functional-vision-assessment', desc: 'Real-world evaluation beyond the exam lane.' },
    { title: 'OT & ADL Training', href: '/rehab-training/adl-training', desc: 'Cooking, medications, home safety, and daily routines.' },
    { title: 'Orientation & Mobility (O&M)', href: '/rehab-training/orientation-mobility', desc: 'Cane skills, route planning, and community travel.' },
    { title: 'Visual Skills Training', href: '/rehab-training/visual-skills-training', desc: 'Eccentric viewing, scanning, tracking techniques.' },
    { title: 'Assistive Tech Instruction', href: '/rehab-training/assistive-tech-instruction', desc: 'Setup, practice, and habit-building with devices.' },
    { title: 'Home Modifications', href: '/rehab-training/home-modifications', desc: 'Lighting, contrast, organization, and safety.' },
    { title: 'Tele-Rehab Options', href: '/rehab-training/tele-rehab-options', desc: 'Remote coaching when in-person travel is difficult.' },
  ];
  return (
    <div>
      <div className="bg-teal-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Rehabilitation & Training</h1>
          <p className="text-teal-100 text-lg max-w-2xl">This is where "seeing" turns into "doing." Skills, safety, independence—in the real environments where life happens.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ title, href, desc }) => (
            <Link key={href} to={href} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
              <h2 className="text-base font-semibold text-gray-900 group-hover:text-teal-700 transition-colors mb-1.5">{title}</h2>
              <p className="text-sm text-gray-500">{desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal-600">Learn more <ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrientationMobilityPage() {
  return (
    <RehabPageTemplate
      title="Orientation & Mobility Training"
      subtitle="Teaching safe, independent travel for people with visual impairments—from home to community and beyond."
      breadcrumb="O&M Training"
      whatItIs="Orientation & Mobility (O&M) is a specialized rehabilitation discipline that teaches people with visual impairments to travel safely and independently. O&M specialists are certified professionals who work with clients in real environments—not just clinics—to develop practical travel skills using structured techniques and tools like the white cane or guide dog."
      whoItHelps={[
        'Adults and children with any level of vision loss affecting travel',
        'People with fear of falling or recent falls history',
        'Individuals who have stopped leaving home due to vision changes',
        'Students needing to navigate school and community environments',
        'Newly visually impaired adults adapting to significant vision changes',
      ]}
      commonGoals={[
        'Safe travel within the home',
        'Independent outdoor travel including curbs and intersections',
        'Using public transit independently',
        'Shopping, medical appointments, and community access',
        'Developing mental mapping skills for familiar routes',
        'Learning to use a white cane effectively',
      ]}
      sessionInvolves={[
        'Cane technique (straight-line, touch, and diagonal methods)',
        'Environmental orientation and spatial reasoning',
        'Intersection analysis and crossing strategies',
        'Bus, subway, and rideshare navigation',
        'Sighted guide techniques (taught to companions)',
        'Problem-solving in unfamiliar environments',
      ]}
      howToAccess="O&M specialists can be found through state blind services agencies, school districts (for students), VA low vision programs, and some low vision clinics and hospitals. Referrals from eye care providers, state agencies, or vocational rehabilitation programs are common pathways. Funding is often available through state blind agencies at no cost to the client."
      relatedLinks={[
        { label: 'Find O&M Services Near You', href: '/resources?type=O%26M+Training' },
        { label: 'Functional Vision Assessment', href: '/rehab-training/functional-vision-assessment' },
        { label: 'ADL & Home Safety Training', href: '/rehab-training/adl-training' },
        { label: 'State Blind Services Agencies', href: '/resources?type=State+Blind+Agency' },
      ]}
    />
  );
}

export function ADLTrainingPage() {
  return (
    <RehabPageTemplate
      title="ADL Training & Occupational Therapy"
      subtitle="Relearning daily tasks—cooking, medications, home safety—with adaptive techniques matched to your vision."
      breadcrumb="ADL Training"
      whatItIs="Activities of Daily Living (ADL) training helps people with vision loss safely and efficiently manage everyday tasks. Vision Rehabilitation Therapists (VRTs) and occupational therapists (OTs) specializing in vision teach adaptive strategies and use specialized tools to restore independence in cooking, personal care, home management, and medication management."
      whoItHelps={[
        'Adults who have experienced vision loss affecting daily tasks',
        'Seniors at risk for medication errors, kitchen accidents, or falls',
        'Individuals with severe or profound vision loss beginning rehabilitation',
        'People who have had vision loss for years but never received formal training',
        'Caregivers learning to support without creating dependency',
      ]}
      commonGoals={[
        'Safe, independent meal preparation and cooking',
        'Accurate medication identification and self-administration',
        'Personal care: grooming, hygiene, dressing organization',
        'Home organization and labeling systems',
        'Mail, financial tasks, and paperwork management',
        'Safe movement within the home',
      ]}
      sessionInvolves={[
        'Task analysis of current routines',
        'Adaptive cooking techniques and kitchen safety',
        'Talking tools and tactile labeling',
        'Clothing organization and identification strategies',
        'Bill paying and financial management adaptations',
        'Home environment assessment and modification recommendations',
      ]}
      howToAccess="VRTs work through state blind services agencies, hospital and clinic-based rehabilitation programs, and VA low vision programs. Occupational therapists with vision specialization can be found through rehabilitation hospitals and some home health agencies. State blind agencies often provide VRT services at no cost to qualifying clients."
      relatedLinks={[
        { label: 'Home Modifications', href: '/rehab-training/home-modifications' },
        { label: 'Functional Vision Assessment', href: '/rehab-training/functional-vision-assessment' },
        { label: 'Find Rehab Services', href: '/resources?type=Vision+Rehabilitation+Therapy' },
      ]}
    />
  );
}

export function FunctionalVisionAssessmentPage() {
  return (
    <RehabPageTemplate
      title="Functional Vision Assessment"
      subtitle="A real-world evaluation that goes beyond the exam lane to understand how vision affects daily life."
      breadcrumb="Functional Vision Assessment"
      whatItIs="A Functional Vision Assessment (FVA) evaluates how a person uses their vision in real-world conditions—not just under standardized clinical testing. It examines how vision performs in variable lighting, at task-relevant distances, and for specific daily activities like reading, cooking, or navigating outdoors. FVAs are used by low vision specialists, TVIs, VRTs, and O&M specialists to guide rehabilitation planning."
      whoItHelps={[
        'Anyone preparing for a rehabilitation plan',
        'Students where a Learning Media Assessment is needed',
        'Adults with complex or variable vision loss',
        'Individuals whose clinical acuity doesn\'t match their reported functional difficulty',
        'People with CVI (Cortical Visual Impairment) where standard testing may be unreliable',
      ]}
      commonGoals={[
        'Identify most limiting functional challenges',
        'Determine best corrected vision for near, intermediate, and distance tasks',
        'Assess how lighting and contrast affect performance',
        'Identify preferred retinal locus (PRL) for reading',
        'Guide device selection and trial priorities',
      ]}
      sessionInvolves={[
        'Task performance observation in natural conditions',
        'Lighting variation assessment',
        'Near, intermediate, and distance task simulation',
        'Reading performance testing',
        'Glare tolerance assessment',
        'Technology and device handling observation',
      ]}
      howToAccess="Functional vision assessments are performed by low vision optometrists, ophthalmologists, TVIs (for students), and VRTs. Referrals often come from primary eye care providers or state blind agencies. For school-age children, an FVA is often part of the educational evaluation process under IDEA."
      relatedLinks={[
        { label: 'ADL Training', href: '/rehab-training/adl-training' },
        { label: 'Orientation & Mobility', href: '/rehab-training/orientation-mobility' },
        { label: 'Test Selection Recipes (For Professionals)', href: '/professionals/test-selection-recipes' },
      ]}
    />
  );
}

export function VisualSkillsTrainingPage() {
  return (
    <RehabPageTemplate
      title="Visual Skills Training"
      subtitle="Training techniques that improve how you use your remaining vision—not the vision itself."
      breadcrumb="Visual Skills Training"
      whatItIs="Visual skills training teaches people with low vision to use their remaining sight more effectively. Key techniques include eccentric viewing (using peripheral retina for central tasks in macular conditions), scanning training (systematic visual search strategies), and tracking (following moving targets). This training is distinct from vision therapy—it works with what remains, not to restore what is lost."
      whoItHelps={[
        'People with macular degeneration or other central field loss',
        'Individuals who have struggled with magnification devices despite adequate power',
        'People who read slowly even with appropriate magnification',
        'Anyone with nystagmus or fixation instability',
        'Individuals with visual processing changes (CVI, TBI)',
      ]}
      commonGoals={[
        'Develop a reliable Preferred Retinal Locus (PRL) for reading',
        'Improve reading speed and endurance with eccentric viewing',
        'Develop efficient scanning strategies for visual search',
        'Improve ability to track moving objects',
        'Integrate visual skills with device use',
      ]}
      sessionInvolves={[
        'PRL identification and stability training',
        'Eccentric viewing direction training',
        'Reading drills with progressive print sizes',
        'Scanning pattern development',
        'Real-world task practice integrating trained skills',
        'Computer-based training programs (where available)',
      ]}
      howToAccess="Visual skills training is provided by low vision optometrists, vision rehabilitation therapists, and some occupational therapists with vision specialization. It is often integrated into a broader low vision rehabilitation program. Referrals through state blind agencies or low vision clinics."
      relatedLinks={[
        { label: 'Functional Vision Assessment', href: '/rehab-training/functional-vision-assessment' },
        { label: 'Optical Devices', href: '/devices-technology/optical-devices' },
        { label: 'Electronic Aids', href: '/devices-technology/electronic-digital-aids' },
      ]}
    />
  );
}

export function AssistiveTechInstructionPage() {
  return (
    <RehabPageTemplate
      title="Assistive Technology Instruction"
      subtitle="Device success depends on training—not just the device. Structured instruction makes the difference."
      breadcrumb="Assistive Tech Instruction"
      whatItIs="Assistive technology instruction teaches people with visual impairments to use adaptive devices and software effectively. Getting the right device is only part of the solution—most people need structured training to build the skills, confidence, and habits that lead to real-world use. AT instruction is provided by certified assistive technology professionals (ATPs), TVIs, VRTs, and rehabilitation technology specialists."
      whoItHelps={[
        'Anyone who has received a device but struggles to use it consistently',
        'People new to screen readers, magnification software, or OCR apps',
        'Individuals transitioning to new technology platforms',
        'Students and working adults needing efficient tech workflows',
        'Seniors learning to use smartphones or tablets for accessibility',
      ]}
      commonGoals={[
        'Efficient use of screen magnification or screen reader software',
        'Smartphone and tablet accessibility feature mastery',
        'OCR and scanning app proficiency for mail and documents',
        'Video magnifier operation for reading and tasks',
        'Integration of multiple tools into daily workflows',
      ]}
      sessionInvolves={[
        'Device setup and configuration for visual needs',
        'Systematic feature introduction and practice',
        'Workflow development for common tasks (email, reading, navigation)',
        'Keyboard shortcut training (for screen reader users)',
        'Problem-solving and troubleshooting strategies',
        'Follow-up check-ins to reinforce skill retention',
      ]}
      howToAccess="AT instruction is available through state blind agencies (often free), assistive technology programs (check the AT3 Center directory), VA VIST programs, and some low vision clinics. The AER directory lists providers by specialization."
      relatedLinks={[
        { label: 'Software & Apps', href: '/devices-technology/software-apps' },
        { label: 'Electronic Digital Aids', href: '/devices-technology/electronic-digital-aids' },
        { label: 'Find AT Programs', href: '/resources?type=Assistive+Technology' },
      ]}
    />
  );
}

export function HomeModificationsPage() {
  return (
    <RehabPageTemplate
      title="Home Modifications & Lighting"
      subtitle="Simple changes with outsized impact on safety, independence, and daily ease."
      breadcrumb="Home Modifications"
      whatItIs="Home modifications for vision loss focus on maximizing the use of remaining vision and reducing hazards. Unlike physical accessibility modifications, most vision-related home changes involve lighting optimization, contrast enhancement, organization, and labeling—many of which can be done at low or no cost. A vision rehabilitation therapist or OT can conduct a home visit assessment."
      whoItHelps={[
        'Anyone with vision loss who spends significant time at home',
        'Seniors at elevated risk for falls or medication errors',
        'People with glare sensitivity or light adaptation difficulties',
        'Caregivers wanting to create a safer, more independent home environment',
        'Individuals transitioning from the hospital or a care facility to home',
      ]}
      commonGoals={[
        'Reduce fall risk through contrast marking and clutter reduction',
        'Optimize task lighting for reading, cooking, and self-care',
        'Establish organized systems for medications and daily items',
        'Mark hazards (stairs, stove dials, appliance controls)',
        'Create a home environment that supports maximum independence',
      ]}
      sessionInvolves={[
        'Room-by-room lighting assessment and recommendations',
        'Contrast tape application on stairs and step edges',
        'Medication organization and labeling systems',
        'Kitchen safety modifications and tool organization',
        'Appliance marking with tactile or hi-contrast labels',
        'Clutter reduction and consistent placement strategies',
      ]}
      howToAccess="Home assessments are conducted by VRTs, OTs with vision specialization, and O&M specialists. State blind agencies often provide this service at no cost. Some community programs and Area Agencies on Aging also offer home modification services."
      relatedLinks={[
        { label: 'ADL Training', href: '/rehab-training/adl-training' },
        { label: 'Glare & Light Management Devices', href: '/devices-technology/glare-light-management' },
        { label: 'Orientation & Mobility', href: '/rehab-training/orientation-mobility' },
      ]}
    />
  );
}

export function TeleRehabPage() {
  return (
    <RehabPageTemplate
      title="Tele-Rehab Options"
      subtitle="Remote vision rehabilitation services for when travel is difficult or specialty care isn't local."
      breadcrumb="Tele-Rehab"
      whatItIs="Tele-rehabilitation (tele-rehab) delivers vision rehabilitation services via video call, phone, or remote monitoring technology. While not all services can be delivered remotely, many VRT, AT instruction, and follow-up sessions are highly effective in a virtual format. Tele-rehab has expanded access significantly, particularly for people in rural areas or those with mobility limitations."
      whoItHelps={[
        'People in rural or underserved areas with limited local specialists',
        'Individuals with mobility limitations or transportation barriers',
        'Follow-up sessions after initial in-person evaluation',
        'Family and caregiver training',
        'AT instruction that can be done via screen sharing',
      ]}
      commonGoals={[
        'Receive rehabilitation guidance without long-distance travel',
        'Continue services between in-person appointments',
        'Access specialty providers not available locally',
        'Receive AT instruction via screen sharing',
        'Caregiver training and family education',
      ]}
      sessionInvolves={[
        'Video-based skills instruction and coaching',
        'Screen sharing for AT instruction (ZoomText, JAWS, etc.)',
        'Environmental assessment via video walk-through',
        'Goal review and progress monitoring',
        'Family and caregiver education',
        'Resource and referral guidance',
      ]}
      howToAccess="Ask your state blind agency, local low vision clinic, or VRT provider if they offer virtual services. Many expanded tele-services during COVID-19 and have maintained them. Some national organizations (CNIB, Lighthouse Guild) offer virtual programs. The VIST program at VA also provides tele-health services."
      relatedLinks={[
        { label: 'Find Virtual Services', href: '/resources?virtual=true' },
        { label: 'ADL Training', href: '/rehab-training/adl-training' },
        { label: 'Assistive Tech Instruction', href: '/rehab-training/assistive-tech-instruction' },
      ]}
    />
  );
}
