import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      <h2 className="logo">🍕 Pizza Admin</h2>

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        📊 Dashboard
      </NavLink>

      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        📦 Orders
      </NavLink>

      <NavLink
        to="/admin/inventory"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        🍕 Inventory
      </NavLink>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default AdminSidebar;