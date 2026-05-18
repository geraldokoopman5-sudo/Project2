import Navbar from '../components/Navbar';

function Admin() {
  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Admin Review
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Pending Booking
          </h2>

          <p>Vehicle: Toyota Corolla</p>
          <p>Company: ABC Ltd</p>

          <div className="flex gap-4 mt-6">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Approve
            </button>

            <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;