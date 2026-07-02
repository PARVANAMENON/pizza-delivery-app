import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const isAdmin = false;
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}

export default AdminRoute;
