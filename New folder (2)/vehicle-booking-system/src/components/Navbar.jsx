import { Link, useNavigate } from "react-router-dom";

function Navbar({ open, setOpen }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <nav className="topbar">
      <div className="nav-left">
        <button className="icon-button" onClick={() => setOpen(!open)}>
          <div className="hamburger">
            <span></span><span></span><span></span>
          </div>
        </button>
        <Link to="/" className="brand-link">Vehicle Booking</Link>
      </div>
      <div className="nav-actions">
        <button onClick={handleLogout} className="btn btn-danger" style={{ fontSize: 13 }}>Logout</button>
      </div>
    </nav>
  );
}
export default Navbar;
