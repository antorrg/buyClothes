import { useAuth } from "../Auth/AuthContext";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles = [], redirectTo = "/" }) => {
  const { authenticated, user } = useAuth();

  // Mientras se verifica si está autenticado
  if (authenticated === undefined) return null;

  // Si no está logueado, redirigir
  if (!authenticated) return <Navigate to={redirectTo} replace />;

  // Si no se especifican roles, cualquier usuario autenticado puede acceder
  if (allowedRoles.length === 0) return children;

  // Si el usuario tiene un rol permitido, permitir acceso
  if (allowedRoles.includes(user?.role)) return children;

  // Si está autenticado pero no tiene permisos
  return <Navigate to={redirectTo} replace />;
};

export default RoleBasedRoute;