import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Phone, Globe, X, Filter, ExternalLink } from 'lucide-react';
import { directorySeedData, US_STATES, US_STATE_NAMES, SERVICE_TYPES } from '../data/directorySeed';
import type { Resource } from '../types';
import { DisclaimerBox } from '../components/ui/DisclaimerBox';

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{resource.organizationName}</h3>
          {resource.city && (
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {resource.city}, {resource.state || resource.jurisdiction}
            </p>
          )}
        </div>
        {resource.virtualAvailable && (
          <span className="shrink-0 px-2 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-200">
            Virtual available
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {resource.serviceTypes.slice(0, 3).map((t) => (
          <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
            {t}
          </span>
        ))}
        {resource.serviceTypes.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
            +{resource.serviceTypes.length - 3} more
          </span>
        )}
      </div>

      <div className="space-y-1.5 text-xs text-gray-600">
        {resource.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="h-3 w-3 text-gray-400 shrink-0" aria-hidden="true" />
            <a href={`tel:${resource.phone}`} className="hover:text-blue-700 transition-colors">{resource.phone}</a>
          </div>
        )}
        {resource.website && (
          <div className="flex items-center gap-1.5">
            <Globe className="h-3 w-3 text-gray-400 shrink-0" aria-hidden="true" />
            <a href={resource.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors flex items-center gap-0.5 truncate">
              Visit website
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      {resource.costNotes && (
        <p className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
          {resource.costNotes}
        </p>
      )}

      {resource.referralRequired && (
        <p className="mt-2 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">
          Referral may be required
        </p>
      )}
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <MapPin className="h-6 w-6 text-gray-400" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">No exact matches yet</h3>
      <p className="text-sm text-gray-500 mb-5">
        Try a nearby city, a broader service type, or remove one filter.
      </p>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
      >
        Clear Filters
      </button>
    </div>
  );
}

export function ResourcesPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') ?? '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get('type') ? searchParams.get('type')!.split(',') : searchParams.get('type=') ? [] : []
  );
  const [virtualOnly, setVirtualOnly] = useState(searchParams.get('virtual') === 'true');
  const [referralFree, setReferralFree] = useState(false);

  function clearFilters() {
    setQuery('');
    setSelectedState('');
    setSelectedTypes([]);
    setVirtualOnly(false);
    setReferralFree(false);
  }

  function toggleType(t: string) {
    setSelectedTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  }

  const filtered = useMemo<Resource[]>(() => {
    return directorySeedData.filter((r) => {
      if (query) {
        const q = query.toLowerCase();
        const matches =
          r.organizationName.toLowerCase().includes(q) ||
          r.serviceTypes.some((t) => t.toLowerCase().includes(q)) ||
          r.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          (r.city ?? '').toLowerCase().includes(q) ||
          (r.state ?? '').toLowerCase().includes(q) ||
          r.jurisdiction.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedState && r.jurisdiction !== selectedState && r.state !== selectedState) return false;
      if (selectedTypes.length > 0 && !selectedTypes.some((t) => r.serviceTypes.includes(t))) return false;
      if (virtualOnly && !r.virtualAvailable) return false;
      if (referralFree && r.referralRequired) return false;
      return true;
    });
  }, [query, selectedState, selectedTypes, virtualOnly, referralFree]);

  const hasActiveFilters = !!(query || selectedState || selectedTypes.length || virtualOnly || referralFree);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold mb-1">Find Local Resources</h1>
          <p className="text-blue-200 text-base">Search clinics, state agencies, rehab programs, and support services.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <Filter className="h-4 w-4" aria-hidden="true" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-blue-700 hover:underline focus-visible:outline-none focus-visible:underline">
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="res-search" className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Keyword / ZIP / City
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" aria-hidden="true" />
                    <input
                      id="res-search"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {query && (
                      <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                        <X className="h-3.5 w-3.5 text-gray-400" aria-label="Clear search" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="res-state" className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    State / Province
                  </label>
                  <select
                    id="res-state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">All states</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{US_STATE_NAMES[s] || s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Service Type</p>
                  <div className="space-y-1.5">
                    {SERVICE_TYPES.map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(t)}
                          onChange={() => toggleType(t)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs text-gray-600 group-hover:text-gray-900">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={virtualOnly}
                      onChange={(e) => setVirtualOnly(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-600">Virtual services only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={referralFree}
                      onChange={(e) => setReferralFree(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-600">No referral required</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 rounded-xl border border-blue-100 p-4">
              <h3 className="text-xs font-semibold text-blue-800 mb-2">What to ask when you call</h3>
              <ul className="space-y-1.5 text-xs text-blue-700">
                <li>• Do you accept walk-ins or is a referral needed?</li>
                <li>• What insurance do you accept?</li>
                <li>• What is the typical wait time?</li>
                <li>• Do you offer virtual/tele services?</li>
                <li>• What should I bring to my first appointment?</li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filtered.length}</span> resource{filtered.length !== 1 ? 's' : ''} found
                {hasActiveFilters && ' with current filters'}
              </p>
            </div>

            <div className="mb-4">
              <DisclaimerBox variant="compact" />
            </div>

            {filtered.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            )}

            <div className="mt-8 p-5 bg-teal-50 rounded-xl border border-teal-100">
              <h3 className="text-sm font-semibold text-teal-900 mb-1">Don't see your area?</h3>
              <p className="text-sm text-teal-700 mb-3">
                The NLS Talking Book Library serves all 50 states, and most state blind services agencies accept applications statewide.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/resources?type=State+Blind+Agency"
                  className="px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Find State Agency
                </Link>
                <Link
                  to="/about/contact"
                  className="px-3 py-1.5 border border-teal-300 text-teal-700 text-xs font-medium rounded-lg hover:bg-teal-100 transition-colors"
                >
                  Submit a Resource
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
