import { useState } from 'react';
import { ContentPageLayout } from '../components/ui/ContentPageLayout';
import { CheckCircle, ArrowRight, Type, Eye, Monitor } from 'lucide-react';

export function MissionPage() {
  return (
    <ContentPageLayout
      title="Our Mission"
      subtitle="Building trust, clarity, and practical tools for people navigating vision loss."
      breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Mission' }]}
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
