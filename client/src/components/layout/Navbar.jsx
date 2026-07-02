import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      <div className="container navbar-content">

        <Link to="/" className="logo">
          LaCrosta
        </Link>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          {token ? (
            <>
              <li>
                <Link to="/pizza-builder">Craft Pizza</Link>
              </li>

              <li>
                <Link to="/cart">Cart</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="register-btn">
                  Register
                </Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;