import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
<<<<<<< HEAD
 
function Dashboard({ open, setOpen }) {
 
=======

function Dashboard() {

>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
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
          Dashboard
        </h1>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 
          <div className="bg-white p-6 rounded-xl shadow">
 
            <h2 className="text-xl font-semibold">
              Total Vehicles
            </h2>
 
            <p className="text-3xl mt-4">
              12
            </p>
 
          </div>
 
          <div className="bg-white p-6 rounded-xl shadow">
 
            <h2 className="text-xl font-semibold">
              Active Bookings
            </h2>
 
            <p className="text-3xl mt-4">
              8
            </p>
 
          </div>
 
          <div className="bg-white p-6 rounded-xl shadow">
 
            <h2 className="text-xl font-semibold">
              Pending Requests
            </h2>
 
            <p className="text-3xl mt-4">
              4
            </p>
 
          </div>
 
        </div>
 
      </div>
<<<<<<< HEAD
 
    </div>
 
  );
=======
</div>
  

  )
>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
}
 
export default Dashboard;