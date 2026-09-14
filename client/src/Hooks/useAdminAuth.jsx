import { useContext, useCallback } from 'react';
import { AdminAuthContext } from '../Contexts/AdminAuthContext';
import {
  login as loginApi,
  logout as logoutApi,
  getUser as getUserApi,
  refreshToken as refreshTokenApi,
} from '../api/AdminAuthApi';
import { APIError } from '../api/APIError';

const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthContextProvider');
  }

  const { state, dispatch } = context;

  const handleLogin = useCallback(async (credentials) => {
    try {
      dispatch({ type: 'LOGIN' });
      const data = await loginApi(credentials);
      const user = data?.user || data;
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      return data;
    } catch (error) {
      const apiError = APIError.fromAxiosError(error, 'Login failed. Please check your credentials.');
      console.error('Login error:', apiError);
      dispatch({ type: 'AUTH_FAILURE', payload: apiError.message });
      throw apiError;
    }
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    try {
      dispatch({ type: 'LOGOUT' });
      await logoutApi();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT_SUCCESS' });
    }
  }, [dispatch]);

  const handleCheckSession = useCallback(async () => {
    try {
      dispatch({ type: 'CHECK_SESSION' });
      const data = await getUserApi();
      const user = data?.user || data;
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      return user;
    } catch (error) {
      try {
        const refreshData = await refreshTokenApi();
        const user = refreshData?.user || refreshData;
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
        return user;
      } catch {
        dispatch({ type: 'SESSION_CHECK_FAILED', payload: null });
        return null;
      }
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  return {
    state,
    dispatch,
    user: state.user,
    isSessionChecked: state.isSessionChecked,
    isReady: state.isSessionChecked,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    handleLogin,
    handleLogout,
    handleCheckSession,
    login: handleLogin,
    logout: handleLogout,
    checkSession: handleCheckSession,
    clearError,
  };
};

export default useAdminAuth;
export { useAdminAuth };