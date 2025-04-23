import { useAuth } from '../Auth/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedAdmin = ({ children }) => {
  const { authenticated, user } = useAuth();

  if (authenticated === undefined) return null;

  const allowedRoles = ['Moderator', 'Admin', 'Super Admin'];
  const isAllowed = allowedRoles.includes(user?.role);

  return isAllowed ? children : <Navigate to="/" replace />;
};

export default ProtectedAdmin;
