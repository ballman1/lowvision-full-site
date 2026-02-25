import type { FAQItem } from '../types';

export const faqs: FAQItem[] = [
  {
    question: 'What is the difference between a low vision exam and a regular eye exam?',
    answer: 'A regular eye exam focuses on diagnosing conditions and prescribing glasses or contacts. A low vision exam goes further—it evaluates how your remaining vision functions in real tasks like reading, cooking, or navigating outdoors. A low vision specialist tests contrast sensitivity, visual fields, glare tolerance, and reading speed, then recommends devices, lighting strategies, and rehabilitation services tailored to your goals.',
    category: 'care',
  },
  {
    question: 'Does insurance cover low vision devices?',
    answer: 'Coverage varies significantly. Medicare typically covers the low vision exam under certain provider types but does not cover optical magnifiers or most electronic aids. Some Medicaid programs and state vocational rehabilitation agencies do cover devices. Veterans may qualify for devices through VA low vision programs. Private insurance is inconsistent—prior authorization and documentation of medical necessity are often required. Our Coverage & Funding section walks through options step by step.',
    category: 'coverage',
  },
  {
    question: 'Do I need a referral to see a low vision specialist?',
    answer: 'It depends on your insurance and state. Many Medicare patients can self-refer to optometrists or ophthalmologists who specialize in low vision. Some insurance plans require a referral from a primary care provider or general eye doctor. Vocational rehabilitation and blind services agencies typically accept direct applications. When in doubt, call your insurer or the specialist\'s office directly—they can tell you exactly what documentation you need.',
    category: 'care',
  },
  {
    question: 'How can children and students get low vision support at school?',
    answer: 'Students with visual impairments are entitled to a free, appropriate public education under IDEA and Section 504 of the Rehabilitation Act. A Teacher of the Visually Impaired (TVI) provides specialized instruction, and an Orientation & Mobility (O&M) specialist helps with safe navigation. Start by requesting an educational evaluation from your school district. Our School & Learning section has a checklist of what to ask for and how to advocate for the right services.',
    category: 'education',
  },
  {
    question: 'What is orientation and mobility training?',
    answer: 'Orientation & Mobility (O&M) training teaches people with visual impairments to travel safely and independently. An O&M specialist works with you on techniques like using a white cane, navigating intersections, using public transit, and building mental maps of familiar routes. Sessions typically happen in real environments—your home, neighborhood, and workplace—so skills transfer immediately to daily life.',
    category: 'rehab',
  },
  {
    question: 'What assistive technology helps most with reading?',
    answer: 'The best reading tool depends on your vision level, task, and preferences. Optical magnifiers (handheld or stand) work well for quick tasks like price tags or labels. Desktop video magnifiers (CCTVs) are excellent for extended reading like books or mail. Screen readers and OCR apps can read text aloud from printed documents or screens. A vision rehabilitation therapist or assistive technology specialist can help you trial options before purchasing.',
    category: 'technology',
  },
  {
    question: 'What is a vision rehabilitation therapist (VRT)?',
    answer: 'A Vision Rehabilitation Therapist (VRT) is a specialist trained to help people with vision loss learn or relearn daily living skills—cooking, medication management, labeling, financial tasks, and more. They also teach adaptive techniques for home safety and personal care. VRTs often work alongside low vision optometrists, O&M specialists, and occupational therapists. Referrals can come from eye care providers, state blind agencies, or hospital rehab programs.',
    category: 'rehab',
  },
  {
    question: 'What is SSDI and can I qualify if I have low vision?',
    answer: 'Social Security Disability Insurance (SSDI) provides monthly benefits to people who have worked and paid into Social Security but can no longer perform substantial gainful activity due to a disability—including vision impairment. The SSA uses a "grid" of age, education, and work history to evaluate eligibility alongside medical evidence. Legal blindness (best-corrected VA of 20/200 or worse, or visual field of 20 degrees or less) has a specific listing. A benefits counselor or disability attorney can help you understand your options.',
    category: 'coverage',
  },
];

export const homepageFaqs = faqs.slice(0, 4);
