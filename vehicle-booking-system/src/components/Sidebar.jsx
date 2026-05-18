import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-200 p-4">
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