import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import VehicleOwner from "./pages/VehicleOwner";

function ProtectedRoute({ children }) {
  return localStorage.getItem("userId") ? children : <Navigate to="/login" replace />;
}
function AuthRoute({ children }) {
  return localStorage.getItem("userId") ? <Navigate to="/" replace /> : children;
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard open={open} setOpen={setOpen} /></ProtectedRoute>} />
        <Route path="/vehicles" element={<ProtectedRoute><Vehicles open={open} setOpen={setOpen} /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings open={open} setOpen={setOpen} /></ProtectedRoute>} />
        <Route path="/my-vehicles" element={<ProtectedRoute><VehicleOwner open={open} setOpen={setOpen} /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin open={open} setOpen={setOpen} /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
