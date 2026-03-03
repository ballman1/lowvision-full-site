import { useState } from 'react';

export type TextSize = 'normal' | 'lg' | 'xl';

function initTextSize(): TextSize {
  if (typeof document === 'undefined') return 'normal';
  const html = document.documentElement;
  if (html.classList.contains('text-size-xl')) return 'xl';
  if (html.classList.contains('text-size-lg')) return 'lg';
  return 'normal';
}

function initHighContrast(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('high-contrast');
}

export function useAccessibility() {
  const [textSize, setTextSizeState] = useState<TextSize>(initTextSize);
  const [highContrast, setHighContrastState] = useState<boolean>(initHighContrast);

  function setTextSize(size: TextSize) {
    setTextSizeState(size);
    const html = document.documentElement;
    html.classList.remove('text-size-lg', 'text-size-xl');
    if (size === 'lg') html.classList.add('text-size-lg');
    if (size === 'xl') html.classList.add('text-size-xl');
    localStorage.setItem('lv-text-size', size);
  }

  function toggleHighContrast() {
    const next = !highContrast;
    setHighContrastState(next);
    document.documentElement.classList.toggle('high-contrast', next);
    localStorage.setItem('lv-high-contrast', next ? '1' : '0');
  }

  return { textSize, setTextSize, highContrast, toggleHighContrast };
}
