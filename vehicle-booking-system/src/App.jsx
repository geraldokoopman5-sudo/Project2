import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
 
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import Details from './pages/Details'; 

function App() {
  const [open, setOpen] = useState(false);
 
  return (
    <BrowserRouter>
      <Navbar open={open} setOpen={setOpen} />
  {open && <Sidebar />}

      <Routes>
        <Route path="/" element={<Dashboard open={open} setOpen={setOpen} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vehicles" element={<Vehicles open={open} setOpen={setOpen} />} />
        <Route path="/bookings" element={<Bookings open={open} setOpen={setOpen} />} />
        <Route path="/Details" element={<Details open={open} setOpen={setOpen} />}/>
         <Route path="/" element={<Vehicles />} />
    <Route path="/details/:id" element={<Details />} />
        <Route path="/admin" element={<Admin open={open} setOpen={setOpen} />} />
      </Routes>
 
    </BrowserRouter>
  );
}
 
export default App;