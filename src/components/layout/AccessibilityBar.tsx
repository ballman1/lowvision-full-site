import { useAccessibility } from '../../hooks/useAccessibility';
import type { TextSize } from '../../hooks/useAccessibility';

const TEXT_SIZES: { value: TextSize; label: string; description: string }[] = [
  { value: 'normal', label: 'A', description: 'Normal text size' },
  { value: 'lg', label: 'A+', description: 'Large text size' },
  { value: 'xl', label: 'A++', description: 'Extra large text size' },
];

/**
 * Persistent accessibility toolbar shown at the top of every page.
 * Allows any visitor to immediately adjust text size and high contrast
 * without navigating to a separate settings page.
 * Settings are saved to localStorage and restored on next visit.
 */
export function AccessibilityBar() {
  const { textSize, setTextSize, highContrast, toggleHighContrast } = useAccessibility();

  return (
    <div
      className="bg-gray-950 border-b border-gray-700 text-white"
      role="region"
      aria-label="Accessibility controls"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-5 py-2 flex-wrap">

          <span className="text-xs font-medium text-gray-400 shrink-0" aria-hidden="true">
            Accessibility:
          </span>

          {/* Text size controls */}
          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Text size"
          >
            <span className="text-xs text-gray-400 shrink-0 hidden sm:block mr-0.5" aria-hidden="true">
              Text:
            </span>
            {TEXT_SIZES.map(({ value, label, description }) => (
              <button
                key={value}
                onClick={() => setTextSize(value)}
                aria-pressed={textSize === value}
                aria-label={description}
                className={`min-w-[40px] h-9 px-2 rounded text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-gray-950 ${
                  textSize === value
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 border border-gray-600 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-gray-600 hidden sm:block shrink-0" aria-hidden="true" />

          {/* High contrast toggle */}
          <button
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            className={`h-9 px-3 rounded text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-gray-950 ${
              highContrast
                ? 'bg-yellow-400 text-gray-900 border border-yellow-300'
                : 'text-gray-300 border border-gray-600 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {highContrast ? 'High Contrast: ON' : 'High Contrast: OFF'}
          </button>

        </div>
      </div>
    </div>
  );
}
