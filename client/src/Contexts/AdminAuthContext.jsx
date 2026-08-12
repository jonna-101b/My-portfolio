import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/AdminAuthApi';

const ADMIN_AUTH_STORAGE_KEY = 'admin-auth-session';
const ADMIN_AUTH_SESSION_KEY = 'admin-auth-session-memory';

export const AdminAuthContext = createContext(null);

function readStoredSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) || window.sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY);
    if (!rawSession) {
      return null;
    }

    const parsedSession = JSON.parse(rawSession);
    if (!parsedSession?.token || !parsedSession?.email) {
      return null;
    }

    const tokenPayload = parsedSession.token.split('.')[1];
    if (tokenPayload) {
      const payload = JSON.parse(window.atob(tokenPayload.replace(/-/g, '+').replace(/_/g, '/')));
      if (payload?.exp && payload.exp * 1000 <= Date.now()) {
        window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
        window.sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
        return null;
      }
    }

    return parsedSession;
  } catch {
    return null;
  }
}

export function AdminAuthContextProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    try {
      if (session) {
        const serializedSession = JSON.stringify(session);
        window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
        window.sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);

        if (session.rememberMe) {
          window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, serializedSession);
        } else {
          window.sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, serializedSession);
        }
      } else {
        window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
        window.sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
      }
    } catch {
      // Ignore storage failures and keep the in-memory session active.
    }
  }, [isReady, session]);

  const login = async (credentials) => {
    const authData = await loginAdmin(credentials);
    const nextSession = {
      token: authData.token,
      email: authData.email,
      role: authData.role,
      rememberMe: Boolean(credentials.rememberMe),
    };

    setSession(nextSession);
    return nextSession;
  };

  const logout = () => {
    setSession(null);
    navigate('/admin/login', { replace: true });
  };

  const value = useMemo(() => ({
    session,
    isAuthenticated: Boolean(session?.token),
    isReady,
    login,
    logout,
  }), [isReady, session]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}