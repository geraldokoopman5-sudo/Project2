import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Details({ open, setOpen }) {
  const { id } = useParams();

  return (
    <div>
         <Navbar open={open} setOpen={setOpen} />
           {open && <Sidebar />}

      <div className="p-8">
        <h1 className="text-3xl font-bold">Vehicle Details</h1>
        <p>Vehicle ID: {id}</p>
      </div>
    </div>
  );
}

export default Details;