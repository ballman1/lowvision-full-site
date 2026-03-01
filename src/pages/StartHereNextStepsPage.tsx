import { PageSEO } from '../components/seo/PageSEO';

const howToNextStepsSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Your First Next Steps After a Low Vision Diagnosis',
  description: 'A practical guide to the first actions after learning you have low vision — from finding a specialist to exploring rehabilitation, devices, and funding options.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Schedule a low vision examination',
      text: 'Look for a low vision optometrist, ophthalmologist, or clinic that specializes in low vision—not just general eye care. Bring a list of tasks that are difficult. Expect the appointment to take 1–2 hours.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Contact your state blind services agency',
      text: 'Most states offer free or low-cost O&M training, rehabilitation therapy, and assistive technology through their blind services agency. No referral needed in most states—you can apply directly.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Learn what rehabilitation looks like',
      text: 'Rehabilitation is not just for dramatic vision loss. If vision is affecting any daily task—reading, cooking, mobility, work—rehabilitation can help. Start with a functional vision assessment.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Explore assistive device options',
      text: "Don't buy devices online without trying them first. State AT programs offer free demonstrations and short-term loans. A low vision specialist can recommend the right magnification level for your specific tasks.",
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Map your coverage and funding options',
      text: 'Services and devices are often funded through state agencies, vocational rehabilitation, VA programs, or insurance. Use our Coverage & Funding section to find what applies to your situation.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Connect with community and peer support',
      text: 'Talking with others who have navigated vision loss can be one of the most practical resources. Peer support programs, vision loss organizations, and online communities can reduce isolation and provide real-world advice.',
    },
  ],
};

export function StartHereNextStepsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <PageSEO
        title="Your First Next Steps After a Low Vision Diagnosis"
        description="A practical guide to the first actions after learning you have low vision — from finding a specialist to exploring rehabilitation, devices, and funding options."
        breadcrumbs={[{ label: 'Start Here', href: '/start-here' }, { label: 'Your First Next Steps' }]}
        schema={howToNextStepsSchema}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your First Next Steps</h1>
      <div className="space-y-5">
        {[
          { n: 1, title: 'Schedule a low vision examination', body: 'Look for a low vision optometrist, ophthalmologist, or clinic that specializes in low vision—not just general eye care. Bring a list of tasks that are difficult. Expect the appointment to take 1–2 hours.' },
          { n: 2, title: 'Contact your state blind services agency', body: 'Most states offer free or low-cost O&M training, rehabilitation therapy, and assistive technology through their blind services agency. No referral needed in most states—you can apply directly.' },
          { n: 3, title: 'Learn what rehabilitation looks like', body: 'Rehabilitation is not just for dramatic vision loss. If vision is affecting any daily task—reading, cooking, mobility, work—rehabilitation can help. Start with a functional vision assessment.' },
          { n: 4, title: 'Explore assistive device options', body: 'Don\'t buy devices online without trying them first. State AT programs offer free demonstrations and short-term loans. A low vision specialist can recommend the right magnification level for your specific tasks.' },
          { n: 5, title: 'Map your coverage and funding options', body: 'Services and devices are often funded through state agencies, vocational rehabilitation, VA programs, or insurance. Use our Coverage & Funding section to find what applies to your situation.' },
          { n: 6, title: 'Connect with community and peer support', body: 'Talking with others who have navigated vision loss can be one of the most practical resources. Peer support programs, vision loss organizations, and online communities can reduce isolation and provide real-world advice.' },
        ].map(({ n, title, body }) => (
          <div key={n} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-5">
            <span className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">{n}</span>
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
