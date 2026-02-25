import { Heart, Activity, CheckCircle, MapPin, Shield } from 'lucide-react';

const badges = [
  { Icon: Heart, label: 'Patient-first', desc: 'Built around what matters to you' },
  { Icon: Activity, label: 'Clinician-informed', desc: 'Reviewed by rehabilitation professionals' },
  { Icon: CheckCircle, label: 'Task-based guidance', desc: 'Focused on real goals, not just diagnosis' },
  { Icon: MapPin, label: 'Local resource directory', desc: 'Searchable by state, province, and service type' },
  { Icon: Shield, label: 'Coverage & funding help', desc: 'Navigate Medicare, Medicaid, VR, and more' },
];

export function TrustStrip() {
  return (
    <section className="bg-gray-50 border-y border-gray-100" aria-label="Why trust ClearPath">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {badges.map(({ Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1.5">
              <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-semibold text-gray-800">{label}</span>
              <span className="text-xs text-gray-500 leading-snug hidden sm:block">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
