import { useState, useEffect } from 'react';

// Valid access tokens (hashed with SHA-256)
// To generate a new token:
// 1. Generate random token: openssl rand -hex 32
// 2. Hash it: echo -n "your-token" | openssl dgst -sha256
// 3. Add hash to VALID_TOKENS array below
// 4. Share URL: https://yoursite.com/?access=your-token

const VALID_TOKENS = [
  // Token generated: 2026-03-24
  'f8ffb002860ac2463207f17682d52ce634c979a1367f6e63837d2b66db6c982c',
  // Add more token hashes here as needed
];

const SESSION_KEY = 'access_session';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

async function hashToken(token) {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getTokenFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('access') || params.get('key') || params.get('token');
}

function isSessionValid() {
  const session = sessionStorage.getItem(SESSION_KEY);
  if (!session) return false;

  try {
    const { timestamp, tokenHash } = JSON.parse(session);
    const age = Date.now() - timestamp;

    // Check if session is expired
    if (age >= SESSION_DURATION) {
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }

    // Verify token is still valid
    return VALID_TOKENS.includes(tokenHash);
  } catch {
    return false;
  }
}

function setSession(tokenHash, token) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({
    timestamp: Date.now(),
    tokenHash,
    token // Store original token for shareable URLs
  }));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export default function AuthGuard({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [manualKey, setManualKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function authenticate() {
      // Skip authentication in development mode
      if (import.meta.env.DEV) {
        setAuthenticated(true);
        setLoading(false);
        return;
      }

      // Check if there's a valid session first
      if (isSessionValid()) {
        setAuthenticated(true);
        setLoading(false);
        return;
      }

      // Check for token in URL
      const token = getTokenFromURL();

      if (token) {
        try {
          const tokenHash = await hashToken(token);

          if (VALID_TOKENS.includes(tokenHash)) {
            setSession(tokenHash, token);
            setAuthenticated(true);

            // Clean URL (remove token from address bar for security)
            const url = new URL(window.location);
            url.searchParams.delete('access');
            url.searchParams.delete('key');
            url.searchParams.delete('token');
            window.history.replaceState({}, '', url);
          } else {
            setAuthenticated(false);
          }
        } catch (err) {
          console.error('Authentication error:', err);
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }

      setLoading(false);
    }

    authenticate();
  }, []);

  const handleManualKeySubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tokenHash = await hashToken(manualKey);

      if (VALID_TOKENS.includes(tokenHash)) {
        setSession(tokenHash, manualKey);
        setAuthenticated(true);
      } else {
        setError('Invalid access key. Please check and try again.');
        setManualKey('');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Access Required
              </h1>
              <p className="text-gray-600 mb-4">
                Enter your access key to continue
              </p>
            </div>

            <form onSubmit={handleManualKeySubmit} className="mb-6">
              <label htmlFor="accessKey" className="block text-sm font-medium text-gray-700 mb-2">
                Access Key
              </label>
              <input
                type="text"
                id="accessKey"
                value={manualKey}
                onChange={(e) => setManualKey(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter 64-character access key"
                autoFocus
                required
                disabled={loading}
              />
              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !manualKey}
                className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Continue'}
              </button>
            </form>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                If you have a secure link with an access key, you can use that instead. Contact the administrator if you need access.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      <button
        onClick={() => {
          if (window.confirm('Are you sure you want to sign out?')) {
            clearSession();
            window.location.reload();
          }
        }}
        className="fixed bottom-4 left-4 px-3 py-1 text-xs text-gray-500 hover:text-gray-700 bg-white border border-gray-300 rounded shadow-sm z-50"
        title="Sign out"
      >
        Sign Out
      </button>
    </>
  );
}
