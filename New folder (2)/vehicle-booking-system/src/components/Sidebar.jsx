import { NavLink } from "react-router-dom";

function Sidebar() {
  const role = Number(localStorage.getItem("role"));
  const cls = ({ isActive }) => `side-link${isActive ? " active" : ""}`;
  return (
    <aside className="sidebar">
      <ul className="side-list">
        <li><NavLink to="/" end className={cls}><span className="side-icon">◻</span>Dashboard</NavLink></li>
        {role === 0 && <>
          <li><NavLink to="/vehicles" className={cls}><span className="side-icon">◻</span>Vehicles</NavLink></li>
          <li><NavLink to="/bookings" className={cls}><span className="side-icon">◻</span>My Bookings</NavLink></li>
        </>}
        {role === 1 && <>
          <li><NavLink to="/my-vehicles" className={cls}><span className="side-icon">◻</span>My Vehicles</NavLink></li>
          <li><NavLink to="/bookings" className={cls}><span className="side-icon">◻</span>My Bookings</NavLink></li>
        </>}
        {role === 2 && <>
          <li><NavLink to="/vehicles" className={cls}><span className="side-icon">◻</span>Vehicles</NavLink></li>
          <li><NavLink to="/bookings" className={cls}><span className="side-icon">◻</span>Bookings</NavLink></li>
          <li><NavLink to="/admin" className={cls}><span className="side-icon">◻</span>Admin Panel</NavLink></li>
        </>}
      </ul>
    </aside>
  );
}
export default Sidebar;
