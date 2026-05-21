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
  );
}

export default Navbar;