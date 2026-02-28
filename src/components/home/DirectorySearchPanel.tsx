import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { US_STATES, US_STATE_NAMES } from '../../data/directorySeed';

const SERVICE_CHIPS = [
  'Low Vision Clinic',
  'VA Blind Rehab Center',
  'O&M Training',
  'Assistive Technology',
  'Talking Book Library',
  'Vocational Rehab',
];

export function DirectorySearchPanel() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [state, setState] = useState('');
  const [activeChips, setActiveChips] = useState<string[]>([]);

  function toggleChip(chip: string) {
    setActiveChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (state) params.set('state', state);
    if (activeChips.length) params.set('type', activeChips.join(','));
    navigate(`/resources?${params.toString()}`);
  }

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-teal-600 text-sm font-semibold mb-3">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Local Resource Directory
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Find services near you</h2>
          <p className="mt-2 text-gray-500 text-base">
            Search by ZIP code, city, or state—or browse by service type.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-gray-50 rounded-2xl border border-gray-200 p-6 shadow-sm"
          aria-label="Search local services"
        >
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="dir-query" className="block text-sm font-medium text-gray-700 mb-1.5">
                ZIP code, city, or keyword
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden="true" />
                <input
                  id="dir-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Boston, 90210, magnifier..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dir-state" className="block text-sm font-medium text-gray-700 mb-1.5">
                State / Province
              </label>
              <select
                id="dir-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">All states & provinces</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{US_STATE_NAMES[s] || s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Filter by service type:</p>
            <div className="flex flex-wrap gap-2">
              {SERVICE_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  aria-pressed={activeChips.includes(chip)}
                  onClick={() => toggleChip(chip)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    activeChips.includes(chip)
                      ? 'bg-blue-700 border-blue-700 text-white'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-700'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-700 text-white font-semibold text-sm rounded-xl hover:bg-blue-800 transition-colors shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search Local Directory
            </button>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              Browse by State / Province
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
