import { useNavigate, Link, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userName = user?.name;

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/icon.png" alt="TaskMaster Logo" width="32" height="32" />
        TaskMaster
      </Link>
      <div className="nav-actions">
        {user ? (
          <>
            <span style={{ fontWeight: 600, color: '#000' }}>
              Hi, {userName}
            </span>
            {location.pathname !== "/dashboard" && (
              <button
                onClick={() => navigate("/dashboard")}
                className="btn-retro-sm"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={logoutHandler}
              className="btn-retro-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="btn-retro-white"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn-retro-sm"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;