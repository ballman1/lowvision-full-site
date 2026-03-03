import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AccessibilityBar } from './AccessibilityBar';

interface LayoutProps {
  children: ReactNode;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {/* Skip link must be the very first focusable element */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* Accessibility controls visible on every page — no need to find a settings page */}
      <AccessibilityBar />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
