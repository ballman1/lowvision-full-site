import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Supabase automatically exchanges the code for a session when detectSessionInUrl is true.
    // We just wait for it to settle, then redirect.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const next = searchParams.get('next') ?? '/saved-plan';
        navigate(next, { replace: true });
      } else {
        // Exchange code manually (PKCE flow)
        supabase.auth.exchangeCodeForSession(window.location.href).then(() => {
          const next = searchParams.get('next') ?? '/saved-plan';
          navigate(next, { replace: true });
        }).catch(() => {
          navigate('/login?error=oauth', { replace: true });
        });
      }
    });
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" aria-hidden="true" />
      <p className="text-sm text-gray-500">Completing sign-in…</p>
    </div>
  );
}
