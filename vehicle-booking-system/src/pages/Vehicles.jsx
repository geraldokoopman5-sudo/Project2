import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Vehicles({ open, setOpen }) {
  const vehicles = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      category: 'Sedan',
      rate: 500,
    },
    {
      id: 2,
      make: 'Ford',
      model: 'Ranger',
      category: 'Truck',
      rate: 900,
    },
  ];

  return (
<<<<<<< HEAD
  <div>
     
      <Navbar open={open} setOpen={setOpen} />
 
      {open && <Sidebar />}
 
      <div className={`p-8 transition-all ${open ? 'ml-64' : 'ml-0'}`}>
=======
    <div>
      
      <Navbar open={open} setOpen={setOpen} />

      {open && <Sidebar />}

      <div className="p-8">
>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
        <h1 className="text-3xl font-bold mb-6">Vehicles</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-2xl font-bold">
                {vehicle.make} {vehicle.model}
              </h2>

              <p className="mt-2">
                Category: {vehicle.category}
              </p>

              <p className="mt-2">
                Daily Rate: R{vehicle.rate}
              </p>

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Book Vehicle
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vehicles;