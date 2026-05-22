<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";

function Navbar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1"
        >
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
        </button>
        
        <Link to="/" className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          Vehicle Booking
        </Link>
        
        <button 
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg hover:bg-black-700"
        >
          Logout
        </button>
      </div>
    </nav>
=======
function Navbar({ open, setOpen }) {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">

      {/* Sidebar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl mr-4"
      >
        ☰
      </button>

      <h1 className="text-xl font-bold">
        Vehicle Booking System
      </h1>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>

    </div>
>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
  );
}

export default Navbar;