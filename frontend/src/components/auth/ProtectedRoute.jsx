import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/common/Loading';

// Updated to render child layout/component when authentication/authorization passes
// ProtectedRoute that checks auth and optionally restricts to admin or non‑admin users
// - requireAdmin: only allow admin users
// - requireNonAdmin: only allow authenticated non‑admin users
const ProtectedRoute = ({ requireAdmin = false, requireNonAdmin = false, children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin()) {
    // Admin required but user is not admin
    return <Navigate to="/dashboard" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/forbidden" replace />;
  }

  if (requireNonAdmin && isAdmin()) {
    // Non‑admin required but user is admin
    return <Navigate to="/admin" replace />;
  }

  // Render the provided layout/component (e.g., AdminLayout or ClientLayout).
  // If no layout is provided, fall back to rendering nested routes via Outlet.
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
