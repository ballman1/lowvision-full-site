import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FAQItem } from '../../types';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const headingId = `faq-heading-${i}`;
        const panelId = `faq-panel-${i}`;

        return (
          <div key={i}>
            <h3>
              <button
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-gray-900 hover:text-blue-700 focus-visible:outline-none focus-visible:text-blue-700 transition-colors"
              >
                <span>{item.question}</span>
                <span className="shrink-0 text-gray-400" aria-hidden="true">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
            >
              <p className="pb-4 text-sm leading-relaxed text-gray-600">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
