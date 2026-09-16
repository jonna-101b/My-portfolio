import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAdminAuth from '../../../Hooks/useAdminAuth';
import { sendForgotPasswordNotification } from '../../../api/NotificationsApi';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error: authError, handleLogin, clearError } = useAdminAuth();
  const [formValues, setFormValues] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [forgotStatus, setForgotStatus] = useState({ loading: false, message: '', isError: false });

  const redirectTo = location.state?.from?.pathname || '/admin/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const nextErrors = {};
    const email = formValues.email.trim();

    if (!email) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!formValues.password) {
      nextErrors.password = 'Password is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setServerError('');
    if (clearError) {
      clearError();
    }
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    if (forgotStatus.loading) return;

    setServerError('');
    setForgotStatus({ loading: true, message: '', isError: false });

    try {
      const res = await sendForgotPasswordNotification(formValues.email.trim());
      setForgotStatus({
        loading: false,
        message: res?.message || 'Security key sent! Please check your registered email inbox.',
        isError: false,
      });
    } catch (err) {
      const errMsg = err?.data?.error || err?.data?.message || err?.message || 'Failed to send recovery key. Please check your network or try again.';
      setForgotStatus({
        loading: false,
        message: errMsg,
        isError: true,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!validate()) {
      return;
    }

    setServerError('');
    if (clearError) {
      clearError();
    }

    try {
      await handleLogin({
        email: formValues.email.trim().toLowerCase(),
        password: formValues.password,
        rememberMe: formValues.rememberMe,
      });

      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message = error?.data?.error || error?.data?.message || error?.message;
      if (error?.statusCode === 401 || error?.response?.status === 401) {
        setServerError(message || 'Invalid email or password.');
      } else if (error?.statusCode === 403 || error?.response?.status === 403) {
        setServerError(message || 'This account does not have admin access.');
      } else {
        setServerError(message || 'Unable to sign in right now. Please try again.');
      }
    }
  };

  const displayError = serverError || (authError && typeof authError === 'string' ? authError : authError?.message);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="admin-login">
      <div className="login-shell">
        <div className="login-copy">
          <p className="eyebrow">Admin Workspace</p>
          <h1>Manage and update your portfolio</h1>
        </div>

        <form className="login-card" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="label">Email</span>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <span className="error">{errors.email}</span> : null}
          </label>

          <label className="field">
            <span className="label-row">
              <span className="label">Security Key</span>
              <button
                type="button"
                className="forgot-link"
                onClick={handleForgotPassword}
                disabled={forgotStatus.loading}
                title="Send security key to admin email"
              >
                {forgotStatus.loading ? 'Sending key...' : 'Forgot?'}
              </button>
            </span>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? <span className="error">{errors.password}</span> : null}
          </label>

          {forgotStatus.message && (
            <div className={`login-feedback-toast ${forgotStatus.isError ? 'error' : 'success'}`} role="status">
              {forgotStatus.isError ? (
                <ErrorOutlineRoundedIcon fontSize="small" className="feedback-icon" />
              ) : (
                <CheckCircleOutlineRoundedIcon fontSize="small" className="feedback-icon" />
              )}
              <span>{forgotStatus.message}</span>
            </div>
          )}

          <label className="remember-row">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formValues.rememberMe}
              onChange={handleChange}
            />
            <span>Maintain persistent session</span>
          </label>

          {displayError ? <p className="server-error" role="alert">{displayError}</p> : null}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;