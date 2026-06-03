import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getVehicles, getAllBookings, getAllUsers, getAllVehicles } from "../api/axios";

function StatCard({ label, value, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={accent ? { color: accent } : {}}>{value}</div>
      <div className="stat-line"></div>
    </div>
  );
}

function CompanyDashboard() {
  const [stats, setStats] = useState({ pending: 0, confirmed: 0, cancelled: 0, spent: 0 });
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getAllBookings().then(res => {
      const mine = res.data.filter(b => b.companyId === userId);
      setStats({
        pending: mine.filter(b => b.status === 1).length,
        confirmed: mine.filter(b => b.status === 2).length,
        cancelled: mine.filter(b => b.status === 4).length,
        spent: mine.filter(b => b.status === 2).reduce((s, b) => s + b.totalCost, 0),
      });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="eyebrow">Company Portal</div>
      <h1 className="page-title">My Bookings Overview</h1>
      <p className="auth-subtitle" style={{ marginBottom: 22 }}>Track and manage your vehicle bookings.</p>
      {loading ? <p className="loading-text">Loading...</p> : (
        <div className="stats-grid">
          <StatCard label="Pending Requests" value={stats.pending} accent="var(--amber)" />
          <StatCard label="Confirmed Bookings" value={stats.confirmed} accent="var(--green)" />
          <StatCard label="Cancelled" value={stats.cancelled} accent="var(--red)" />
          <StatCard label="Total Spent" value={`R${stats.spent.toFixed(2)}`} accent="var(--cyan)" />
        </div>
      )}
    </>
  );
}

function OwnerDashboard() {
  const [stats, setStats] = useState({ total: 0, available: 0, unavailable: 0, earnings: 0 });
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    Promise.all([getAllVehicles(), getAllBookings()]).then(([vRes, bRes]) => {
      const mine = vRes.data.filter(v => v.ownerId === userId);
      const myIds = mine.map(v => v.vehicleId);
      const earnings = bRes.data
        .filter(b => myIds.includes(b.vehicleId) && b.status === 2)
        .reduce((s, b) => s + b.totalCost, 0);
      setStats({
        total: mine.length,
        available: mine.filter(v => v.isAvailable).length,
        unavailable: mine.filter(v => !v.isAvailable).length,
        earnings,
      });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="eyebrow">Vehicle Owner Portal</div>
      <h1 className="page-title">My Fleet Overview</h1>
      <p className="auth-subtitle" style={{ marginBottom: 22 }}>Manage your vehicles and track earnings.</p>
      {loading ? <p className="loading-text">Loading...</p> : (
        <div className="stats-grid">
          <StatCard label="Total Vehicles" value={stats.total} />
          <StatCard label="Available" value={stats.available} accent="var(--green)" />
          <StatCard label="Unavailable" value={stats.unavailable} accent="var(--red)" />
          <StatCard label="Total Earnings" value={`R${stats.earnings.toFixed(2)}`} accent="var(--cyan)" />
        </div>
      )}
    </>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, vehicles: 0, bookings: 0, pending: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllUsers(), getAllVehicles(), getAllBookings()]).then(([uRes, vRes, bRes]) => {
      const bookings = bRes.data;
      setStats({
        users: uRes.data.length,
        vehicles: vRes.data.length,
        bookings: bookings.length,
        pending: bookings.filter(b => b.status === 1).length,
        revenue: bookings.filter(b => b.status === 2).reduce((s, b) => s + b.totalCost, 0),
      });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="eyebrow">Administrator Portal</div>
      <h1 className="page-title">System Overview</h1>
      <p className="auth-subtitle" style={{ marginBottom: 22 }}>Full visibility across the platform.</p>
      {loading ? <p className="loading-text">Loading...</p> : (
        <div className="stats-grid">
          <StatCard label="Total Users" value={stats.users} />
          <StatCard label="Total Vehicles" value={stats.vehicles} />
          <StatCard label="Total Bookings" value={stats.bookings} />
          <StatCard label="Pending Requests" value={stats.pending} accent="var(--amber)" />
          <StatCard label="Platform Revenue" value={`R${stats.revenue.toFixed(2)}`} accent="var(--cyan)" />
        </div>
      )}
    </>
  );
}

function Dashboard({ open, setOpen }) {
  const role = Number(localStorage.getItem("role"));
  return (
    <div className="app-shell">
      <Navbar open={open} setOpen={setOpen} />
      <div style={{ display: "flex" }}>
        {open && <Sidebar />}
        <div className={`page ${open ? "with-sidebar" : ""}`} style={{ flex: 1 }}>
          {role === 0 && <CompanyDashboard />}
          {role === 1 && <OwnerDashboard />}
          {role === 2 && <AdminDashboard />}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
