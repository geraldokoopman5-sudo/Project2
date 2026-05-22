import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
 
function Bookings({ open, setOpen }) {
  return (
    <div>
<<<<<<< HEAD
     
      <Navbar open={open} setOpen={setOpen} />
 
      {open && <Sidebar />}
 
      <div className={`p-8 transition-all ${open ? 'ml-64' : 'ml-0'}`}>
=======
      
      <Navbar open={open} setOpen={setOpen} />

      {open && <Sidebar />}

      <div className="p-8">
>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
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