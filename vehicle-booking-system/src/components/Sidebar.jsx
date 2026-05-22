import { Link } from "react-router-dom";
 
function Sidebar() {
  return (
<<<<<<< HEAD
    <div className="fixed top-20 left-0 w-64 h-screen bg-gray-200 p-4 shadow-lg">
=======
    <div className="fixed top-16 left-0 w-64 h-screen bg-gray-200 p-4 shadow-lg">
>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
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