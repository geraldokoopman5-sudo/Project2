import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="fixed top-16 left-0 w-64 h-screen bg-gray-200 p-4 shadow-lg">
      <ul className="space-y-4">
        <li>
          <Link to="/vehicles">Vehicles</Link>
        </li>

        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;