import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
<<<<<<< HEAD
 
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
 
=======

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
 
function App() {
  const [open, setOpen] = useState(false);
<<<<<<< HEAD
 
  return (
    <BrowserRouter>
 
 
=======

  return (
    <BrowserRouter>


>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
      <Routes>
        <Route path="/" element={<Dashboard open={open} setOpen={setOpen} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vehicles" element={<Vehicles open={open} setOpen={setOpen} />} />
        <Route path="/bookings" element={<Bookings open={open} setOpen={setOpen} />} />
        <Route path="/admin" element={<Admin open={open} setOpen={setOpen} />} />
      </Routes>
<<<<<<< HEAD
 
=======

>>>>>>> 13c9a91e99ba49c59c07d33b2350b65d6ef8d4f8
    </BrowserRouter>
  );
}
 
export default App;