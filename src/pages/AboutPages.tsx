import { useState } from 'react';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { CheckCircle, ArrowRight, Type, Eye, Monitor } from 'lucide-react';

function aboutPageSchema(name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    datePublished: '2026-01-15',
    dateModified: '2026-02-27',
    author: { '@id': 'https://lowvisionnavigator.org/#organization' },
    publisher: { '@id': 'https://lowvisionnavigator.org/#organization' },
  };
}

export function MissionPage() {
  return (
    <ContentPageLayout
      title="Our Mission"
      subtitle="Building trust, clarity, and practical tools for people navigating vision loss."
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Mission' }]}
      schema={aboutPageSchema('Our Mission')}
    >
      <div className="space-y-8">
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            Low Vision Navigator exists because navigating low vision care is genuinely difficult. The path from a diagnosis to the right specialist, the right device, and the right funding is fragmented, inconsistent, and often invisible to the people who need it most.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            We built Low Vision Navigator to change that. Our goal is a platform that gives patients a clear next step, gives clinicians a practical workflow, and gives caregivers the confidence to support—not just manage.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Task-First', desc: 'We start with what you\'re trying to do, not what your diagnosis is. Real tasks guide everything.' },
            { title: 'Clinically Grounded', desc: 'Our content is reviewed by rehabilitation professionals with real-world low vision practice.' },
            { title: 'Constantly Updated', desc: 'Resource listings, coverage information, and content are reviewed and refreshed on a regular cadence.' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-blue-50 rounded-xl border border-blue-100 p-5">
              <h3 className="text-base font-semibold text-blue-900 mb-2">{title}</h3>
              <p className="text-sm text-blue-700">{desc}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What we don't do</h2>
          <ul className="space-y-2">
            {[
              'We do not provide medical diagnosis or clinical recommendations.',
              'We do not receive referral fees or payments from listed organizations.',
              'We do not sell or share user data from the intake questionnaire.',
              'We do not guarantee that listed resources are currently accepting new clients.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-gray-400 shrink-0 mt-0.5">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContentPageLayout>
  );
}

export function AccessibilityPage() {
  const html = document.documentElement;

  const [textSize, setTextSize] = useState<'normal' | 'lg' | 'xl'>(() => {
    if (html.classList.contains('text-size-xl')) return 'xl';
    if (html.classList.contains('text-size-lg')) return 'lg';
    return 'normal';
  });
  const [highContrast, setHighContrast] = useState(() =>
    html.classList.contains('high-contrast')
  );

  function applyTextSize(size: 'normal' | 'lg' | 'xl') {
    setTextSize(size);
    html.classList.remove('text-size-lg', 'text-size-xl');
    if (size === 'lg') html.classList.add('text-size-lg');
    if (size === 'xl') html.classList.add('text-size-xl');
    localStorage.setItem('lv-text-size', size);
  }

  function toggleHighContrast() {
    const next = !highContrast;
    setHighContrast(next);
    html.classList.toggle('high-contrast', next);
    localStorage.setItem('lv-high-contrast', next ? '1' : '0');
  }

  return (
    <ContentPageLayout
      title="Accessibility Statement"
      subtitle="Our commitments, accessibility controls, and how to report issues."
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Accessibility' }]}
      schema={aboutPageSchema('Accessibility Statement')}
    >
      <div className="space-y-10">
        <section aria-labelledby="controls-heading">
          <h2 id="controls-heading" className="text-xl font-bold text-gray-900 mb-4">Accessibility Controls</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Type className="h-5 w-5 text-blue-700" aria-hidden="true" />
                <h3 className="text-base font-semibold text-blue-900">Text Size</h3>
              </div>
              <p className="text-sm text-blue-700 mb-4">Adjust the base text size for easier reading.</p>
              <div className="flex gap-2" role="group" aria-label="Text size controls">
                {([['normal', 'A', 'Normal'], ['lg', 'A+', 'Large'], ['xl', 'A++', 'X-Large']] as const).map(([size, label, ariaLabel]) => (
                  <button
                    key={size}
                    onClick={() => applyTextSize(size)}
                    aria-pressed={textSize === size}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      textSize === size ? 'bg-blue-700 border-blue-700 text-white' : 'border-blue-300 text-blue-700 hover:bg-blue-100'
                    }`}
                    aria-label={`Set text size to ${ariaLabel}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="h-5 w-5 text-gray-700" aria-hidden="true" />
                <h3 className="text-base font-semibold text-gray-900">High Contrast</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Increase contrast for easier viewing.</p>
              <button
                onClick={toggleHighContrast}
                aria-pressed={highContrast}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 ${
                  highContrast ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {highContrast ? 'High Contrast: ON' : 'High Contrast: OFF'}
              </button>
            </div>
          </div>
        </section>

        <section aria-labelledby="commitment-heading">
          <h2 id="commitment-heading" className="text-xl font-bold text-gray-900 mb-4">Our Commitment</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Low Vision Navigator is designed to meet WCAG 2.1 Level AA accessibility guidelines. We are committed to ensuring that people with visual impairments—and all disabilities—can access and use this platform fully.
          </p>
          <ul className="space-y-2">
            {[
              'Semantic HTML and proper heading structure throughout',
              'ARIA labels and roles for interactive elements',
              'Keyboard navigation for all menus, forms, and cards',
              'Visible focus indicators on all interactive elements',
              'Sufficient color contrast (minimum 4.5:1 for text)',
              'Forms include visible labels and inline error messages',
              'Reduced motion support for users who prefer it',
              'Skip to main content link at top of every page',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="keyboard-heading">
          <h2 id="keyboard-heading" className="text-xl font-bold text-gray-900 mb-4">Keyboard Navigation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { key: 'Tab', action: 'Move focus to next interactive element' },
              { key: 'Shift + Tab', action: 'Move focus to previous element' },
              { key: 'Enter / Space', action: 'Activate button or link' },
              { key: 'Escape', action: 'Close menus and modals' },
              { key: 'Arrow Keys', action: 'Navigate within grouped controls' },
              { key: 'Home / End', action: 'Jump to first/last item in a list' },
            ].map(({ key, action }) => (
              <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono text-gray-700 shadow-sm shrink-0">{key}</kbd>
                <span className="text-sm text-gray-600">{action}</span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="screenreader-heading">
          <h2 id="screenreader-heading" className="text-xl font-bold text-gray-900 mb-4">Screen Reader Tips</h2>
          <ul className="space-y-2">
            {[
              'Use the "Skip to main content" link (first element, visible on focus) to bypass navigation.',
              'Headings are structured H1 > H2 > H3 for logical document outline navigation.',
              'All images have descriptive alt text; decorative images are marked presentation role.',
              'Form inputs have visible labels and are linked via aria-labelledby.',
              'Error messages are announced via aria-live regions.',
              'Mega menus respond to keyboard navigation and Escape to close.',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Eye className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="report-heading">
          <h2 id="report-heading" className="text-xl font-bold text-gray-900 mb-3">Report an Accessibility Barrier</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            If you encounter an accessibility barrier, we want to know immediately. Please contact us with a description of the issue, the page URL, and the assistive technology you're using.
          </p>
          <a
            href="/about/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Contact accessibility support <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </section>
      </div>
    </ContentPageLayout>
  );
}

export function PrivacyPage() {
  return (
    <ContentPageLayout
      title="Privacy & Data"
      subtitle="What we collect, what we don't, and why."
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Privacy' }]}
      schema={aboutPageSchema('Privacy & Data')}
    >
      <div className="space-y-8 prose prose-gray prose-sm max-w-none">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Intake questionnaire data</h2>
          <p className="text-gray-600 leading-relaxed">
            Your intake questionnaire answers are stored only on your device using your browser's localStorage. They are never transmitted to our servers, never shared with third parties, and never used for advertising. You can delete this data at any time by clicking "Start Over" on the results page or clearing your browser's local storage.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Analytics</h2>
          <p className="text-gray-600 leading-relaxed">
            We collect anonymized, aggregated analytics to understand how the platform is used—which pages are most visited, how people navigate the intake flow, and where users encounter friction. This data does not include personally identifiable information.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What we don't do</h2>
          <ul className="space-y-2">
            {['We do not sell user data.', 'We do not use tracking pixels or advertising networks.', 'We do not require account creation or email submission to use the platform.', 'We do not share data with listed organizations or partners.'].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-red-400 shrink-0">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
          <p className="text-gray-600">
            Questions about privacy? <a href="/about/contact" className="text-blue-700 hover:underline">Contact us</a>.
          </p>
        </section>
      </div>
    </ContentPageLayout>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'A valid email is required.';
    if (!form.type) errs.type = 'Please select a message type.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  if (submitted) {
    return (
      <ContentPageLayout title="Contact" breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Contact' }]}>
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-7 w-7 text-teal-600" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Message received</h2>
          <p className="text-gray-600 text-sm">Thank you for reaching out. We aim to respond within 2 business days.</p>
        </div>
      </ContentPageLayout>
    );
  }

  return (
    <ContentPageLayout
      title="Contact & Support"
      subtitle="Report an incorrect listing, suggest a resource, or ask for help finding services."
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Contact' }]}
      schema={aboutPageSchema('Contact & Support')}
    >
      <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-5">
        <div>
          <label htmlFor="c-name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input id="c-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-describedby={errors.name ? 'c-name-err' : undefined} />
          {errors.name && <p id="c-name-err" role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-describedby={errors.email ? 'c-email-err' : undefined} />
          {errors.email && <p id="c-email-err" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="c-type" className="block text-sm font-medium text-gray-700 mb-1.5">Message type</label>
          <select id="c-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-describedby={errors.type ? 'c-type-err' : undefined}>
            <option value="">Select...</option>
            <option value="incorrect-listing">Incorrect resource listing</option>
            <option value="suggest">Suggest a new resource</option>
            <option value="help">Help finding services</option>
            <option value="accessibility">Accessibility issue</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p id="c-type-err" role="alert" className="mt-1 text-xs text-red-600">{errors.type}</p>}
        </div>
        <div>
          <label htmlFor="c-message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
          <textarea id="c-message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            aria-describedby={errors.message ? 'c-message-err' : undefined} />
          {errors.message && <p id="c-message-err" role="alert" className="mt-1 text-xs text-red-600">{errors.message}</p>}
        </div>
        <button type="submit" className="px-6 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl hover:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">
          Send Message
        </button>
      </form>
    </ContentPageLayout>
  );
}

export function HowWeReviewResourcesPage() {
  const steps = [
    {
      n: 1,
      title: 'Initial vetting',
      body: 'Every organization submitted or identified for inclusion is checked against three criteria: (1) it provides a service directly relevant to people with low vision or blindness; (2) it has verifiable contact information and a functioning website or phone number; and (3) it is an established organization—not a commercial listing, SEO page, or affiliate referral.',
    },
    {
      n: 2,
      title: 'Accreditation and credential check',
      body: 'For clinical providers, we check for relevant licensure (optometry, ophthalmology, OT, COMS) at the state level and note whether the organization holds accreditation from bodies such as CARF International or the Commission on Accreditation of Rehabilitation Facilities. For blind services agencies, we verify enrollment in the state VR system and federal funding status.',
    },
    {
      n: 3,
      title: 'Coverage and service scope review',
      body: 'We document what the organization actually offers—clinical, rehabilitation, financial assistance, peer support, technology lending, etc.—and cross-reference against published service descriptions, program guides, or direct outreach. We note virtual availability, referral requirements, cost structure, and whether services are open to self-referrals.',
    },
    {
      n: 4,
      title: 'Clinical advisory review',
      body: 'Listings in specialized categories (low vision clinics, rehabilitation programs, assistive technology providers) are reviewed by a member of our clinical advisory board before publication. The advisory board is composed of practicing low vision optometrists, vision rehabilitation therapists, orientation & mobility specialists, and assistive technology instructors.',
    },
    {
      n: 5,
      title: 'Ongoing monitoring',
      body: 'We re-verify active listings at least annually, and more frequently for organizations with high traffic. We also accept flagged corrections from users—any listing can be reported via our contact page. Flagged listings are reviewed and updated or removed within 5 business days.',
    },
  ];

  return (
    <ContentPageLayout
      title="How We Review Resources"
      subtitle="Our editorial process for vetting, publishing, and maintaining listings on Low Vision Navigator."
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'How We Review Resources' }]}
      description="Learn how Low Vision Navigator vets, reviews, and maintains its directory of rehabilitation services, clinics, and support organizations to ensure accuracy and clinical relevance."
      schema={aboutPageSchema('How We Review Resources')}
    >
      <div className="space-y-10">
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            Low Vision Navigator is a health information resource. The accuracy and clinical relevance of our listings directly affect people making real decisions about their care. This page describes our review process in full.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            We do not accept payment for placement. Organizations cannot buy their way into our directory. Listings are included because they meet our editorial criteria—not because they have a marketing relationship with us.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Our five-step review process</h2>
          <ol className="space-y-5">
            {steps.map(({ n, title, body }) => (
              <li key={n} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-5">
                <span className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">{n}</span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-amber-900 mb-2">Coverage and funding information</h2>
          <p className="text-sm text-amber-800 leading-relaxed">
            Our coverage, billing, and policy content (Medicare, Medicaid, VA benefits, state programs) is reviewed separately from directory listings. Policy content is reviewed against official CMS, SSA, and VA documentation, and is updated when regulations or coverage determinations change. Our clinical advisory board reviews the clinical framing of policy guidance before publication.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What we don't include</h2>
          <ul className="space-y-2">
            {[
              'Commercial retailers without a clinical or rehabilitation component',
              'Affiliate links or paid promotional listings',
              'Organizations with unresolved complaints or active regulatory actions',
              'Listings with unverifiable contact information',
              'Programs that have closed, paused enrollment, or are no longer accepting referrals (when known)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Report an issue</h2>
          <p className="text-sm text-gray-600">
            If you find an inaccurate listing, a closed organization, or missing information,{' '}
            <a href="/about/contact" className="text-blue-700 hover:underline">contact us</a>. Flagged listings are prioritized for re-verification.
          </p>
        </div>
      </div>
    </ContentPageLayout>
  );
}

export function ClinicalAdvisoryBoardPage() {
  const disciplines = [
    { role: 'Low Vision Optometry', desc: 'Specialists in low vision examination, optical prescribing, and device fitting.' },
    { role: 'Vision Rehabilitation Therapy', desc: 'Certified vision rehabilitation therapists (CVRT) who train daily living and adaptive skills.' },
    { role: 'Orientation & Mobility', desc: 'Certified orientation and mobility specialists (COMS) focused on safe, independent travel.' },
    { role: 'Assistive Technology', desc: 'Assistive technology instructors (CATIS/ACVREP-certified) specializing in low vision and blindness.' },
    { role: 'Occupational Therapy', desc: 'OTs with specialized low vision training who bridge clinical and functional rehabilitation.' },
    { role: 'Ophthalmology', desc: 'Ophthalmologists with specialization in retinal disease and low vision co-management.' },
  ];

  return (
    <ContentPageLayout
      title="Clinical Advisory Board"
      subtitle="Low Vision Navigator's content is developed and reviewed with input from practicing low vision clinicians."
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Clinical Advisory Board' }]}
      description="Low Vision Navigator's clinical advisory board includes practicing low vision optometrists, vision rehabilitation therapists, orientation and mobility specialists, and assistive technology instructors who review our content for clinical accuracy."
      schema={aboutPageSchema('Clinical Advisory Board')}
    >
      <div className="space-y-10">
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            Our advisory board is composed of practicing clinicians from across the low vision rehabilitation spectrum. Their role is to review content for clinical accuracy, flag outdated guidance, and ensure that the practical realities of low vision care are accurately represented.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            Advisory board members are not paid for listings or referrals. They participate to improve the quality of information available to people navigating vision loss—a population that is consistently underserved by general health information resources.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Disciplines represented</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {disciplines.map(({ role, desc }) => (
              <div key={role} className="bg-blue-50 rounded-xl border border-blue-100 p-5">
                <h3 className="text-sm font-semibold text-blue-900 mb-1.5">{role}</h3>
                <p className="text-sm text-blue-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What advisory board members review</h2>
          <ul className="space-y-2.5">
            {[
              'Clinical accuracy of rehabilitation, device, and care content',
              'Appropriateness of clinical terminology and patient-facing framing',
              'Accuracy of coverage and funding guidance as it relates to clinical practice',
              'New content sections before publication',
              'Annual re-review of evergreen clinical content',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-teal-500 font-bold shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Join the advisory board</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            We are actively expanding our advisory board. If you are a practicing clinician in low vision, vision rehabilitation, orientation & mobility, or a related specialty and are interested in contributing to this resource, we'd like to hear from you.
          </p>
          <a href="/about/contact" className="inline-block px-5 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl hover:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">
            Contact us
          </a>
        </div>
      </div>
    </ContentPageLayout>
  );
}

export function PartnersPage() {
  const partnerTypes = [
    {
      type: 'Professional Organizations',
      desc: 'National and regional associations representing low vision clinicians, rehabilitation specialists, and blindness professionals. Partner organizations help us stay current on clinical standards, workforce issues, and service gaps.',
    },
    {
      type: 'Consumer Advocacy Organizations',
      desc: 'Groups that represent the interests of people with vision loss. These partnerships help ensure that Low Vision Navigator reflects the real-world priorities and experiences of the people it serves.',
    },
    {
      type: 'Research and Academic Institutions',
      desc: 'University programs and research centers working on low vision rehabilitation, assistive technology, and visual impairment policy. Academic partnerships inform our evidence base and help us identify emerging practices.',
    },
    {
      type: 'State Blind Services Agencies',
      desc: 'State agencies that administer federally funded vocational rehabilitation and independent living programs for people with visual impairments. These partnerships improve the accuracy of our state-specific resource listings.',
    },
  ];

  return (
    <ContentPageLayout
      title="Partners & Collaborators"
      subtitle="Organizations we work with to improve the accuracy, reach, and relevance of Low Vision Navigator."
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Partners' }]}
      description="Low Vision Navigator partners with professional organizations, consumer advocacy groups, and state blind services agencies to improve the accuracy and reach of low vision resources."
      schema={aboutPageSchema('Partners & Collaborators')}
    >
      <div className="space-y-10">
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            Improving access to low vision care requires more than a website. We work with a range of organizations to verify listings, stay current on clinical and policy changes, and understand the needs of people navigating vision loss across different regions and circumstances.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Partnership categories</h2>
          <div className="space-y-4">
            {partnerTypes.map(({ type, desc }) => (
              <div key={type} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">{type}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our partnership principles</h2>
          <ul className="space-y-2.5">
            {[
              'We do not accept payment from partners in exchange for editorial content or preferred placement',
              'Partner relationships do not influence our resource ratings, vetting criteria, or coverage decisions',
              'We disclose organizational relationships that are relevant to specific content areas',
              'Partner organizations can flag inaccuracies and suggest additions — all suggestions go through our standard editorial review',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="text-teal-500 font-bold shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Become a partner</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            If your organization works in low vision care, blindness services, or vision loss advocacy and is interested in collaborating, we welcome the conversation.
          </p>
          <a href="/about/contact" className="inline-block px-5 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl hover:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">
            Get in touch
          </a>
        </div>
      </div>
    </ContentPageLayout>
  );
}
