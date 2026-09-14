import { createContext, useReducer, useEffect } from 'react';
import { getUser as getUserApi, refreshToken as refreshTokenApi } from '../api/AdminAuthApi';

export const AdminAuthContext = createContext(null);

export const initialAuthState = {
  user: null,
  isSessionChecked: false,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'login':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
    case 'authSuccess':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isSessionChecked: true,
        loading: false,
        error: null,
      };

    case 'AUTH_FAILURE':
    case 'authFailure':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isSessionChecked: true,
        loading: false,
        error: action.payload,
      };

    case 'CHECK_SESSION':
    case 'checkSession':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'SESSION_CHECK_FAILED':
    case 'sessionCheckFailed':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isSessionChecked: true,
        loading: false,
        error: action.payload || null,
      };

    case 'LOGOUT':
    case 'logout':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'LOGOUT_SUCCESS':
    case 'logoutSuccess':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isSessionChecked: true,
        loading: false,
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload ?? true,
        error: null,
      };

    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'CLEAR_ERROR':
    case 'clearError':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export function AdminAuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    let isMounted = true;

    const checkInitialSession = async () => {
      dispatch({ type: 'CHECK_SESSION' });
      try {
        const userData = await getUserApi();
        if (isMounted) {
          dispatch({ type: 'AUTH_SUCCESS', payload: userData?.user || userData });
        }
      } catch (error) {
        // Attempt token refresh on session failure
        try {
          const refreshData = await refreshTokenApi();
          if (isMounted) {
            dispatch({ type: 'AUTH_SUCCESS', payload: refreshData?.user || refreshData });
          }
        } catch {
          if (isMounted) {
            dispatch({ type: 'SESSION_CHECK_FAILED', payload: null });
          }
        }
      }
    };

    checkInitialSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdminAuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const AuthContext = AdminAuthContext;
export const AuthContextProvider = AdminAuthContextProvider;