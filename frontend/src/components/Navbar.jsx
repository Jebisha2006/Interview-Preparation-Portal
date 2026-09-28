import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Interview Prep Portal</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/categories">Categories</Link>

        <Link to="/progress">Progress</Link>

        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;