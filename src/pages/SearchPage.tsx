import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, MapPin, HelpCircle, ChevronRight } from 'lucide-react';
import { PageSEO } from '../components/seo/PageSEO';
import { siteSearchIndex, type SiteSearchEntry } from '../data/siteSearchIndex';
import { faqs } from '../data/faqs';
import { directorySeedData } from '../data/directorySeed';
import type { FAQItem } from '../types';

// ── Scoring ───────────────────────────────────────────────────────────────────

function scoreEntry(entry: SiteSearchEntry, terms: string[]): number {
  let score = 0;
  const title = entry.title.toLowerCase();
  const desc = entry.description.toLowerCase();
  const keys = entry.keywords.join(' ').toLowerCase();
  for (const t of terms) {
    if (title.includes(t)) score += 3;
    if (keys.includes(t)) score += 2;
    if (desc.includes(t)) score += 1;
  }
  return score;
}

function scoreFAQ(faq: FAQItem, terms: string[]): number {
  let score = 0;
  const q = faq.question.toLowerCase();
  const a = faq.answer.toLowerCase();
  for (const t of terms) {
    if (q.includes(t)) score += 3;
    if (a.includes(t)) score += 1;
  }
  return score;
}

function countDirectoryMatches(terms: string[]): number {
  return directorySeedData.filter((r) =>
    terms.some(
      (t) =>
        r.organizationName.toLowerCase().includes(t) ||
        r.serviceTypes.some((s) => s.toLowerCase().includes(t)) ||
        r.tags.some((tag) => tag.toLowerCase().includes(t)) ||
        (r.city ?? '').toLowerCase().includes(t) ||
        (r.state ?? '').toLowerCase().includes(t) ||
        r.jurisdiction.toLowerCase().includes(t),
    ),
  ).length;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
      <span className="text-blue-600">{icon}</span>
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</h2>
    </div>
  );
}

function PageResult({ entry }: { entry: SiteSearchEntry }) {
  return (
    <Link
      to={entry.href}
      className="group block px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            {entry.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{entry.description}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
      </div>
      <span className="inline-block mt-1 text-xs text-blue-600 font-medium">{entry.section}</span>
    </Link>
  );
}

function FAQResult({ faq }: { faq: FAQItem }) {
  const shortAnswer = faq.answer.length > 160 ? faq.answer.slice(0, 157) + '…' : faq.answer;
  return (
    <Link
      to="/faq"
      className="group block px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            {faq.question}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{shortAnswer}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
      </div>
    </Link>
  );
}

// ── Quick links shown before any query ───────────────────────────────────────

const QUICK_LINKS = [
  { label: 'Find local services', href: '/resources' },
  { label: 'Start intake questionnaire', href: '/intake/start' },
  { label: 'Medicare coverage', href: '/coverage-funding/medicare' },
  { label: 'What is low vision?', href: '/start-here/what-is-low-vision' },
  { label: 'Assistive technology', href: '/devices-technology' },
  { label: 'SSDI & SSI', href: '/financial-support/ssdi' },
  { label: 'O&M training', href: '/rehab-training/orientation-mobility' },
  { label: 'Frequently asked questions', href: '/faq' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export function SearchPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const terms = useMemo(
    () =>
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length > 1),
    [query],
  );

  const hasQuery = terms.length > 0;

  const pageResults = useMemo<SiteSearchEntry[]>(() => {
    if (!hasQuery) return [];
    return siteSearchIndex
      .map((e) => ({ entry: e, score: scoreEntry(e, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ entry }) => entry);
  }, [terms, hasQuery]);

  const faqResults = useMemo<FAQItem[]>(() => {
    if (!hasQuery) return [];
    return faqs
      .map((f) => ({ faq: f, score: scoreFAQ(f, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(({ faq }) => faq);
  }, [terms, hasQuery]);

  const directoryCount = useMemo<number>(() => {
    if (!hasQuery) return 0;
    return countDirectoryMatches(terms);
  }, [terms, hasQuery]);

  const totalResults = pageResults.length + faqResults.length + (directoryCount > 0 ? 1 : 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // If only directory results, go straight to the filtered directory
    if (query.trim() && directoryCount > 0 && pageResults.length === 0 && faqResults.length === 0) {
      navigate(`/resources?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageSEO
        title="Search"
        description="Search Low Vision Navigator for local resources, rehabilitation services, device guides, coverage information, and more."
        noIndex
      />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-5">Search</h1>
          <form onSubmit={handleSubmit} role="search">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources, topics, services…"
                className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                autoFocus
                aria-label="Search the site"
              />
            </div>
          </form>
          {hasQuery && (
            <p className="mt-2 text-xs text-gray-500" aria-live="polite">
              {totalResults === 0
                ? 'No results found'
                : `${totalResults} result${totalResults !== 1 ? 's' : ''} found`}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        {/* Empty state — no query yet */}
        {!hasQuery && (
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Popular topics
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {link.label}
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {hasQuery && totalResults === 0 && (
          <div className="text-center py-14">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <p className="text-base font-semibold text-gray-900 mb-1">No results for "{query}"</p>
            <p className="text-sm text-gray-500 mb-5">Try different keywords, or browse a section directly.</p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              Browse local directory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {/* Results */}
        {hasQuery && totalResults > 0 && (
          <div className="space-y-8">

            {pageResults.length > 0 && (
              <section aria-label="Site pages">
                <SectionHeading
                  icon={<BookOpen className="h-4 w-4" />}
                  label={`Site pages (${pageResults.length})`}
                />
                <div className="space-y-1">
                  {pageResults.map((entry) => (
                    <PageResult key={entry.href} entry={entry} />
                  ))}
                </div>
              </section>
            )}

            {faqResults.length > 0 && (
              <section aria-label="Frequently asked questions">
                <SectionHeading
                  icon={<HelpCircle className="h-4 w-4" />}
                  label={`Frequently asked questions (${faqResults.length})`}
                />
                <div className="space-y-1">
                  {faqResults.map((faq) => (
                    <FAQResult key={faq.question} faq={faq} />
                  ))}
                </div>
              </section>
            )}

            {directoryCount > 0 && (
              <section aria-label="Local directory">
                <SectionHeading
                  icon={<MapPin className="h-4 w-4" />}
                  label="Local directory"
                />
                <Link
                  to={`/resources?q=${encodeURIComponent(query.trim())}`}
                  className="group flex items-center justify-between px-3 py-3.5 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {directoryCount} matching organisation{directoryCount !== 1 ? 's' : ''} in the directory
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Clinics, state agencies, rehabilitation programs, and more
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 shrink-0 transition-colors" aria-hidden="true" />
                </Link>
              </section>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
