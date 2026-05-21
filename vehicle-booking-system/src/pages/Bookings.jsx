import Navbar from '../components/Navbar';

function Bookings() {
  return (
    <div>
      
      <Navbar open={open} setOpen={setOpen} />

      {open && <Sidebar />}

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Bookings
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left font-semibold pb-2">Vehicle</th>
                <th className="text-left font-semibold pb-2">Company</th>
                <th className="text-left font-semibold pb-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="py-2">Toyota Corolla</td>
                <td className="py-2">ABC Ltd</td>
                <td className="py-2">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Bookings;