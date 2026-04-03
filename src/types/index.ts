export interface Resource {
  id: string;
  jurisdiction: string;
  country: string;
  organizationName: string;
  serviceTypes: string[];
  audienceTypes: string[];
  phone?: string;
  website?: string;
  address?: string;
  virtualAvailable: boolean;
  insuranceNotes?: string;
  costNotes?: string;
  referralRequired: boolean;
  availabilityNotes?: string;
  tags: string[];
  sourceType: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface IntakeAnswers {
  mode: 'patient' | 'caregiver';
  ageGroup?: 'child' | 'teen' | 'adult' | 'senior';
  patientName?: string;
  diagnoses?: string[];
  diagnosisOther?: string;
  yearsWithLoss?: string;
  currentProviders?: string[];
  vaLevel?: 'mild' | 'moderate' | 'severe' | 'profound' | 'unknown';
  binocularVision?: boolean;
  fieldLoss?: 'central' | 'peripheral' | 'scattered' | 'hemianopia' | 'none' | 'unknown';
  contrastIssues?: boolean;
  glareIssues?: boolean;
  lightSensitivity?: boolean;
  challenges?: string[];
  priorityGoals?: string[];
  primaryEnvironment?: string[];
  workStatus?: string;
  drivingImportant?: boolean;
  fallsHistory?: boolean;
  liveAlone?: boolean;
  mobilityAids?: string[];
  currentDevices?: string[];
  currentServices?: string[];
  deviceSatisfaction?: string;
  insuranceType?: string[];
  state?: string;
  hasCareSupport?: boolean;
  willingToTravel?: boolean;
  preferVirtual?: boolean;
  travelDistance?: string;
}

export interface ResultStep {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
}

export interface ServiceRec {
  title: string;
  description: string;
  href: string;
}

export interface DeviceRec {
  title: string;
  description: string;
  href: string;
}

export interface CoverageLink {
  title: string;
  href: string;
}

export interface FollowUpItem {
  timeframe: '2wk' | '30day' | '60day' | '90day';
  task: string;
}

export interface IntakeResult {
  rankedNextSteps: ResultStep[];
  serviceCategories: ServiceRec[];
  deviceCategories: DeviceRec[];
  coverageLinks: CoverageLink[];
  localResourceCategories: string[];
  doctorQuestions: string[];
  followUpChecklist: FollowUpItem[];
}
