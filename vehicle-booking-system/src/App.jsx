import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

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
      <Routes>

        <Route path="/" element={<Dashboard open={open} setOpen={setOpen} />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/vehicles" element={<Vehicles open={open} setOpen={setOpen} />} />

        <Route path="/bookings" element={<Bookings open={open} setOpen={setOpen} />} />

        <Route path="/details/:id" element={<Details open={open} setOpen={setOpen} />} />

        <Route path="/admin" element={<Admin open={open} setOpen={setOpen} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;