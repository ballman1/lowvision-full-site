import { PageSEO } from '../components/seo/PageSEO';

const whatIsLowVisionSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  about: {
    '@type': 'MedicalCondition',
    name: 'Low Vision',
    alternateName: ['Visual Impairment', 'Partial Sight', 'Partial Vision Loss'],
    description: 'Low vision is a significant visual impairment that cannot be fully corrected with glasses, contact lenses, medication, or surgery but is not total blindness.',
  },
};

export function StartHereWhatIsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <PageSEO
        title="What Is Low Vision?"
        description="Low vision is a significant visual impairment that cannot be fully corrected with glasses or surgery but is not total blindness. Learn about types, definitions, and next steps."
        breadcrumbs={[{ label: 'Start Here', href: '/start-here' }, { label: 'What Is Low Vision?' }]}
        schema={whatIsLowVisionSchema}
      />
      <nav className="text-xs text-gray-400 mb-6 flex gap-1.5">
        <a href="/" className="hover:text-blue-700">Home</a>
        <span>/</span>
        <a href="/start-here" className="hover:text-blue-700">Start Here</a>
        <span>/</span>
        <span className="text-gray-700">What Is Low Vision</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">What Is Low Vision?</h1>
      <div className="space-y-5 text-gray-700 leading-relaxed">
        <p className="text-lg"><strong>Low vision</strong> is a significant visual impairment that cannot be fully corrected with glasses, contact lenses, medication, or surgery—but is not total blindness.</p>
        <p>Most people with low vision have some usable sight. The clinical definition typically includes best-corrected visual acuity of 20/70 or worse in the better eye, or significant visual field loss (a reduced area of sight). But definitions matter less than function—<em>what you can and can't do in daily life</em>.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">What it is NOT</h2>
        <ul className="list-disc list-inside space-y-1.5 text-gray-600">
          <li>It is not blindness (though some people with "low vision" have very limited sight)</li>
          <li>It is not fixable with better glasses in most cases</li>
          <li>It is not a diagnosis—it describes functional impact across many conditions</li>
          <li>It is not a reason to stop doing the things that matter to you</li>
        </ul>
        <h2 className="text-xl font-bold text-gray-900 mt-6">Diagnosis does not equal prognosis</h2>
        <p>Having a condition like macular degeneration or glaucoma does not mean you will lose all functional vision. Many people live active, independent lives with low vision using the right tools, training, and supports. Early rehabilitation significantly improves outcomes.</p>
        <h2 className="text-xl font-bold text-gray-900 mt-6">Legal blindness</h2>
        <p>Legal blindness is defined as best-corrected VA of 20/200 or worse in the better eye, or a visual field of 20 degrees or less. Legal blindness is an administrative and legal category—it does not mean total loss of sight and does not require total darkness to qualify for services.</p>
      </div>
    </div>
  );
}
