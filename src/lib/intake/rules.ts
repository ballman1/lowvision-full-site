import type {
  IntakeAnswers,
  IntakeResult,
  ResultStep,
  ServiceRec,
  DeviceRec,
  CoverageLink,
  FollowUpItem,
} from './types';

export function generateIntakeResults(answers: IntakeAnswers): IntakeResult {
  const steps: ResultStep[] = [];
  const services: ServiceRec[] = [];
  const devices: DeviceRec[] = [];
  const coverage: CoverageLink[] = [];
  const localCategories: string[] = [];
  const questions: string[] = [];
  const followUp: FollowUpItem[] = [];

  const challenges = answers.challenges ?? [];
  const goals = answers.priorityGoals ?? [];
  const isChild = answers.ageGroup === 'child' || answers.ageGroup === 'teen';
  const isSevere = answers.vaLevel === 'severe' || answers.vaLevel === 'profound';
  const currentServices = answers.currentServices ?? [];
  const insuranceType = answers.insuranceType ?? [];

  if (challenges.includes('reading') || goals.includes('reading')) {
    steps.push({
      priority: 'high',
      title: 'Schedule a Low Vision Examination',
      description: 'A low vision exam goes beyond measuring acuity—it evaluates how your vision functions for real tasks and identifies the best magnification, lighting, and device options for reading and near work.',
      href: '/resources?type=Low+Vision+Clinic',
      actionLabel: 'Find a Low Vision Clinic',
    });
  }

  if (challenges.includes('mobility') || answers.fallsHistory) {
    steps.push({
      priority: 'high',
      title: 'Orientation & Mobility (O&M) Evaluation',
      description: 'An O&M specialist can assess your safe travel skills, teach cane techniques, and help you build confidence navigating your home, neighborhood, and community.',
      href: '/rehab-training/orientation-mobility',
      actionLabel: 'Learn About O&M Training',
    });
  }

  if (answers.glareIssues || answers.lightSensitivity) {
    steps.push({
      priority: 'high',
      title: 'Glare & Light Sensitivity Assessment',
      description: 'Glare and photophobia can significantly limit function. A low vision specialist can evaluate filter options, tinted lenses, and lighting strategies that dramatically improve comfort.',
      href: '/devices-technology/glare-light-management',
      actionLabel: 'Explore Glare Management',
    });
  }

  if (isChild && !currentServices.includes('TVI / School Services')) {
    steps.push({
      priority: 'high',
      title: 'Request TVI Services at School',
      description: 'Children with visual impairments are entitled to a Teacher of the Visually Impaired (TVI) under IDEA. Contact your school district to request an educational vision evaluation and IEP team meeting.',
      href: '/community-support/education-services',
      actionLabel: 'Learn About School Services',
    });
  }

  if (isSevere) {
    steps.push({
      priority: 'high',
      title: 'Vision Rehabilitation Therapy Referral',
      description: 'With significant vision loss, a Vision Rehabilitation Therapist (VRT) can help you relearn daily tasks—cooking, medications, home safety—using adaptive techniques matched to your vision level.',
      href: '/rehab-training/functional-vision-assessment',
      actionLabel: 'Learn About Rehab Therapy',
    });
  }

  if (!currentServices.includes('State Blind / Vision Services')) {
    steps.push({
      priority: 'medium',
      title: 'Contact Your State Blind Services Agency',
      description: 'State blind agencies provide free or low-cost services including O&M training, assistive technology, vocational support, and independent living skills—often regardless of insurance.',
      href: '/resources?type=State+Blind+Agency',
      actionLabel: 'Find Your State Agency',
    });
  }

  if (insuranceType.includes('Medicare')) {
    steps.push({
      priority: 'medium',
      title: 'Review Medicare Coverage Options',
      description: 'Medicare Part B covers low vision exams under certain conditions but typically does not cover optical devices. Understanding what\'s covered—and what isn\'t—helps you plan costs and find alternatives.',
      href: '/coverage-funding/medicare',
      actionLabel: 'Review Medicare Coverage',
    });
  }

  if (answers.workStatus === 'employed' || answers.workStatus === 'seeking') {
    steps.push({
      priority: 'medium',
      title: 'Apply for Vocational Rehabilitation',
      description: 'State VR agencies provide training, assistive technology, workplace accommodations, and job placement support for people with vision impairment who are working or seeking work.',
      href: '/resources?type=Vocational+Rehabilitation',
      actionLabel: 'Find VR Services',
    });
  }

  if (!answers.currentDevices?.length || answers.deviceSatisfaction === 'poor') {
    steps.push({
      priority: 'medium',
      title: 'Assistive Technology Device Trial',
      description: 'Many state AT programs offer free device demonstrations and short-term loans so you can try magnifiers, video magnifiers, and apps before purchasing. No prescription required.',
      href: '/devices-technology',
      actionLabel: 'Explore Device Options',
    });
  }

  steps.push({
    priority: 'low',
    title: 'Connect With a Peer Support Network',
    description: 'Connecting with others who have been through similar experiences can reduce isolation and provide practical advice. Many organizations offer free phone-based and online peer support.',
    href: '/community-support/emotional-support',
    actionLabel: 'Find Support Groups',
  });

  services.push(
    { title: 'Low Vision Clinics', description: 'Specialized exams, magnification trials, and device fitting.', href: '/resources?type=Low+Vision+Clinic' },
    { title: 'Talking Book Library (NLS)', description: 'Free audiobooks and braille materials for qualifying individuals.', href: '/resources?type=Talking+Book+Library' },
    { title: 'Assistive Technology Programs', description: 'Device demos, short-term loans, and funding navigation.', href: '/resources?type=Assistive+Technology' },
  );

  if (challenges.includes('mobility') || answers.fallsHistory) {
    services.push({ title: 'O&M Training Programs', description: 'Cane skills, route planning, and community mobility.', href: '/rehab-training/orientation-mobility' });
  }
  if (isChild) {
    services.push({ title: 'School Services / TVI', description: 'IEP/504 services, accessible materials, and classroom accommodations.', href: '/community-support/education-services' });
  }
  if (answers.workStatus === 'employed' || answers.workStatus === 'seeking') {
    services.push({ title: 'Vocational Rehabilitation', description: 'Employment training, AT for work, and job placement services.', href: '/resources?type=Vocational+Rehabilitation' });
  }

  if (challenges.includes('reading')) {
    devices.push(
      { title: 'Optical Magnifiers', description: 'Handheld, stand, and illuminated magnifiers for near tasks.', href: '/devices-technology/optical-devices' },
      { title: 'Electronic Video Magnifiers', description: 'Desktop and portable CCTVs for extended reading.', href: '/devices-technology/electronic-digital-aids' },
    );
  }
  if (challenges.includes('computer') || answers.workStatus === 'employed') {
    devices.push({ title: 'Screen Magnification & Reader Software', description: 'ZoomText, JAWS, NVDA, and built-in OS accessibility features.', href: '/devices-technology/software-apps' });
  }
  if (answers.glareIssues || answers.lightSensitivity) {
    devices.push({ title: 'Glare Filters & Tinted Lenses', description: 'Absorptive lenses, wraparounds, and indoor filter options.', href: '/devices-technology/glare-light-management' });
  }
  if (challenges.includes('daily tasks')) {
    devices.push({ title: 'Daily Living Aids', description: 'Talking clocks, large-print labels, tactile markers, and kitchen tools.', href: '/devices-technology/daily-living-aids' });
  }
  devices.push({ title: 'Smartphone Accessibility Apps', description: 'Be My Eyes, Seeing AI, and built-in VoiceOver/TalkBack.', href: '/devices-technology/software-apps' });

  const covMap: Record<string, CoverageLink> = {
    Medicare: { title: 'Medicare Coverage', href: '/coverage-funding/medicare' },
    Medicaid: { title: 'Medicaid Benefits', href: '/coverage-funding/medicaid' },
    'Private Insurance': { title: 'Private Insurance Guide', href: '/coverage-funding/private-insurance' },
    'VA / Veterans': { title: 'VA Benefits for Veterans', href: '/coverage-funding/va-veterans' },
  };
  insuranceType.forEach((type) => { if (covMap[type]) coverage.push(covMap[type]); });
  coverage.push({ title: 'State VR & Blind Agency Funding', href: '/resources?type=State+Blind+Agency' });
  coverage.push({ title: 'SSDI & SSI Benefits', href: '/financial-support/ssdi' });

  localCategories.push('Low Vision Clinics', 'State Blind Services Agency');
  if (challenges.includes('mobility')) localCategories.push('O&M Training Programs');
  if (isChild) localCategories.push('School Services / TVI');
  localCategories.push('Assistive Technology Programs', 'Talking Book Library');

  questions.push('What is my best-corrected visual acuity in each eye, and what does that mean for daily tasks?');
  questions.push('Am I a candidate for low vision rehabilitation services?');
  if (answers.fieldLoss && answers.fieldLoss !== 'none' && answers.fieldLoss !== 'unknown') {
    questions.push('How does my visual field loss affect my reading and mobility?');
  }
  if (answers.glareIssues) {
    questions.push('What options are available to manage my glare and light sensitivity?');
  }
  if (isChild) {
    questions.push('What educational services is my child entitled to under IDEA and Section 504?');
  }
  questions.push('Can you refer me to a vision rehabilitation therapist or O&M specialist?');
  questions.push('What assistive devices should I be trialing at my level of vision?');
  questions.push('Are there any treatments that might help stabilize or improve my vision?');

  followUp.push(
    { timeframe: '2wk', task: 'Schedule a low vision exam if not already booked' },
    { timeframe: '2wk', task: 'Contact your state blind services agency to request an intake assessment' },
    { timeframe: '30day', task: 'Trial 2–3 assistive devices matched to your top challenge (check your state AT program)' },
    { timeframe: '30day', task: 'Research coverage and funding options applicable to your situation' },
    { timeframe: '60day', task: 'Begin rehabilitation training (O&M or Vision Rehab Therapy as appropriate)' },
    { timeframe: '60day', task: 'Implement home environment modifications (lighting, contrast, organization)' },
    { timeframe: '90day', task: 'Reassess device satisfaction and skill development with your care team' },
    { timeframe: '90day', task: 'Connect with a peer support group or community program' },
  );

  return {
    rankedNextSteps: steps,
    serviceCategories: services,
    deviceCategories: devices,
    coverageLinks: coverage,
    localResourceCategories: localCategories,
    doctorQuestions: questions,
    followUpChecklist: followUp,
  };
}
