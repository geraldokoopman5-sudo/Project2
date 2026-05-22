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
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;