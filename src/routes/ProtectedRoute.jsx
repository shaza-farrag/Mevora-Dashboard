
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const DEV_MODE = true;

function ProtectedRoute() {
  const { user, loading, isAdmin } = useAuth();

  if (DEV_MODE) {
    return <Outlet />;
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
