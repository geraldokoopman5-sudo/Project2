function Navbar() {
    return (
      <div className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">
            Vehicle Booking System
        </h1>
        <button
            onClick={() => {
            localStorage.removeItem('token')
            window.location.href = '/login'
            }}
            >
          Logout
        </button>
      </div>
    )
  }
export default Navbar