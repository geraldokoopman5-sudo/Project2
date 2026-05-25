import { useParams } from "react-router-dom";


function Details({ open, setOpen }) {
  const { id } = useParams();



  return (
    
    
    <div className="p-8">
      <h1 className="text-3xl font-bold">Vehicle Details</h1>
      <p>Vehicle ID: {id}</p>
    </div>
  );
}


export default Details;