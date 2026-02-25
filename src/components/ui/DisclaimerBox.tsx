import { AlertCircle } from 'lucide-react';

interface DisclaimerBoxProps {
  text?: string;
  variant?: 'default' | 'compact';
}

const DEFAULT_TEXT =
  'This site helps organize next steps and local resources. It does not replace medical diagnosis, emergency care, or professional legal or insurance advice.';

export function DisclaimerBox({ text = DEFAULT_TEXT, variant = 'default' }: DisclaimerBoxProps) {
  if (variant === 'compact') {
    return (
      <p className="text-xs text-gray-500 flex items-start gap-1.5">
        <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
        {text}
      </p>
    );
  }

  return (
    <div
      role="note"
      className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}
