import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
