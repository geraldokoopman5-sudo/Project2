import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getAllBookings, approveBooking, rejectBooking, deleteBooking, getAllUsers, deleteUser, getAllVehicles, updateVehicle, deleteVehicle, BookingStatusLabel } from "../api/axios";
import { matchesSearch } from "../utils/search";

const statusClass = { 0: "status-neutral", 1: "status-pending", 2: "status-good", 3: "status-bad", 4: "status-neutral" };
const ROLE_LABEL = { 0: "Company", 1: "Vehicle Owner", 2: "Admin" };

function Admin({ open, setOpen }) {
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadBookings = () => { setLoading(true); setSearch(""); getAllBookings().then(r => setBookings(r.data)).catch(() => setError("Failed.")).finally(() => setLoading(false)); };
  const loadUsers = () => { setLoading(true); setSearch(""); getAllUsers().then(r => setUsers(r.data)).catch(() => setError("Failed.")).finally(() => setLoading(false)); };
  const loadVehicles = () => { setLoading(true); setSearch(""); getAllVehicles().then(r => setVehicles(r.data)).catch(() => setError("Failed.")).finally(() => setLoading(false)); };

  useEffect(() => {
    if (tab === "bookings") loadBookings();
    else if (tab === "users") loadUsers();
    else if (tab === "vehicles") loadVehicles();
  }, [tab]);

  const act = async (fn, id) => {
    try { await fn(id); loadBookings(); }
    catch (e) { alert(e.response?.data?.message || "Action failed."); }
  };

  const removeUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try { await deleteUser(id); loadUsers(); }
    catch { alert("Failed to delete user."); }
  };

  const removeVehicle = async (id) => {
    if (!confirm("Delete this vehicle?")) return;
    try { await deleteVehicle(id); loadVehicles(); }
    catch (e) { alert(e.response?.data?.message || "Failed to delete vehicle."); }
  };

  const toggleAvail = async (v) => {
    try {
      await updateVehicle(v.vehicleId, { make: v.make, model: v.model, year: v.year, category: v.category, dailyRate: v.dailyRate, isAvailable: !v.isAvailable, ownerId: v.ownerId, imageData: v.imageData });
      loadVehicles();
    } catch { alert("Failed to update availability."); }
  };

  const filteredBookings = bookings.filter(b => matchesSearch(b, search, ["companyName", "vehicleMakeModel", x => BookingStatusLabel[x.status]]));
  const filteredUsers = users.filter(u => matchesSearch(u, search, ["name", "email", "phoneNumber", x => ROLE_LABEL[x.role]]));
  const filteredVehicles = vehicles.filter(v => matchesSearch(v, search, ["make", "model", "category", "ownerName"]));

  const placeholders = { bookings: "Search by company, vehicle or status...", users: "Search by name, email, phone or role...", vehicles: "Search by make, model, category or owner..." };

  return (
    <div className="app-shell">
      <Navbar open={open} setOpen={setOpen} />
      <div style={{ display: "flex" }}>
        {open && <Sidebar />}
        <div className={`page ${open ? "with-sidebar" : ""}`} style={{ flex: 1 }}>
          <div className="eyebrow">Administrator</div>
          <h1 className="page-title" style={{ marginBottom: 16 }}>Admin Panel</h1>
          <div className="tabs" style={{ marginBottom: 16 }}>
            {["bookings", "vehicles", "users"].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`btn ${tab === t ? "btn-primary" : "btn-ghost"}`} style={{ textTransform: "capitalize" }}>{t}</button>
            ))}
          </div>
          <input className="input" style={{ marginBottom: 20, maxWidth: 400 }} placeholder={placeholders[tab]} value={search} onChange={e => setSearch(e.target.value)} />
          {loading && <p className="loading-text">Loading...</p>}
          {error && <div className="alert alert-error">{error}</div>}

          {tab === "bookings" && !loading && (
            filteredBookings.length === 0 ? <p className="empty-state">No bookings found.</p> : (
              <div className="table-card">
                <table className="data-table">
                  <thead><tr><th>Company</th><th>Vehicle</th><th>Start</th><th>End</th><th>Days</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredBookings.map(b => (
                      <tr key={b.bookingId}>
                        <td>{b.companyName}</td>
                        <td>{b.vehicleMakeModel}</td>
                        <td>{new Date(b.startDate).toLocaleDateString()}</td>
                        <td>{new Date(b.endDate).toLocaleDateString()}</td>
                        <td>{b.numberOfDays}</td>
                        <td>R{b.totalCost.toFixed(2)}</td>
                        <td><span className={`status-pill ${statusClass[b.status]}`}>{BookingStatusLabel[b.status]}</span></td>
                        <td>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {b.status === 1 && (
                              <>
                                <button onClick={() => act(approveBooking, b.bookingId)} className="btn btn-success" style={{ fontSize: 12 }}>Approve</button>
                                <button onClick={() => act(rejectBooking, b.bookingId)} className="btn btn-danger" style={{ fontSize: 12 }}>Reject</button>
                              </>
                            )}
                            <button onClick={() => act(deleteBooking, b.bookingId)} className="btn btn-ghost" style={{ fontSize: 12 }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {tab === "vehicles" && !loading && (
            filteredVehicles.length === 0 ? <p className="empty-state">No vehicles found.</p> : (
              <div className="table-card">
                <table className="data-table">
                  <thead><tr><th>Photo</th><th>Vehicle</th><th>Category</th><th>Owner</th><th>Rate/Day</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredVehicles.map(v => (
                      <tr key={v.vehicleId}>
                        <td>
                          {v.imageData
                            ? <img src={v.imageData} alt="" style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }} />
                            : <div style={{ width: 60, height: 40, background: "var(--panel-soft)", borderRadius: 4 }} />
                          }
                        </td>
                        <td>{v.make} {v.model} ({v.year})</td>
                        <td>{v.category}</td>
                        <td>{v.ownerName}</td>
                        <td>R{Number(v.dailyRate).toFixed(2)}</td>
                        <td><span className={`status-pill ${v.isAvailable ? "status-good" : "status-bad"}`}>{v.isAvailable ? "Available" : "Unavailable"}</span></td>
                        <td>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            <button onClick={() => toggleAvail(v)} className={`btn ${v.isAvailable ? "btn-warning" : "btn-success"}`} style={{ fontSize: 12 }}>
                              Mark {v.isAvailable ? "Unavailable" : "Available"}
                            </button>
                            <button onClick={() => removeVehicle(v.vehicleId)} className="btn btn-danger" style={{ fontSize: 12 }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {tab === "users" && !loading && (
            filteredUsers.length === 0 ? <p className="empty-state">No users found.</p> : (
              <div className="table-card">
                <table className="data-table">
                  <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th></th></tr></thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phoneNumber}</td>
                        <td>{ROLE_LABEL[u.role] ?? u.role}</td>
                        <td><button onClick={() => removeUser(u.id)} className="btn btn-danger" style={{ fontSize: 12 }}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
export default Admin;
