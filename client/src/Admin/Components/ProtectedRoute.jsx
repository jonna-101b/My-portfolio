import { Navigate, useLocation } from 'react-router-dom';
import useAdminAuth from '../../Hooks/useAdminAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isReady } = useAdminAuth();
  const location = useLocation();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}