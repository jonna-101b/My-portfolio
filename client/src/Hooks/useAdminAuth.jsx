import { useContext } from 'react';
import { AdminAuthContext } from '../Contexts/AdminAuthContext';

export default function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthContextProvider');
  }

  return context;
}