import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getAllBookings, cancelBooking, BookingStatusLabel, CANCELLATION_FEE_RATE } from "../api/axios";
import { matchesSearch } from "../utils/search";

const statusClass = { 0: "status-neutral", 1: "status-pending", 2: "status-good", 3: "status-bad", 4: "status-neutral" };

function Bookings({ open, setOpen }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [search, setSearch] = useState("");
  const userId = localStorage.getItem("userId");
  const role = Number(localStorage.getItem("role"));

  const load = () => {
    setLoading(true);
    getAllBookings()
      .then(res => {
        const all = res.data;
        setBookings(role === 2 ? all : all.filter(b => b.companyId === userId));
      })
      .catch(() => setError("Failed to load bookings."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const fee = (b) => b.status === 2 ? b.totalCost * CANCELLATION_FEE_RATE : 0;

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await cancelBooking(cancelTarget.bookingId);
      setCancelTarget(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking.");
    } finally { setCancelling(false); }
  };

  const filtered = bookings.filter(b =>
    matchesSearch(b, search, ["vehicleMakeModel", "companyName", x => BookingStatusLabel[x.status]])
  );

  return (
    <div className="app-shell">
      <Navbar open={open} setOpen={setOpen} />
      <div style={{ display: "flex" }}>
        {open && <Sidebar />}
        <div className={`page ${open ? "with-sidebar" : ""}`} style={{ flex: 1 }}>
          <div className="eyebrow">{role === 2 ? "Admin" : "Company"}</div>
          <h1 className="page-title" style={{ marginBottom: 16 }}>{role === 2 ? "All Bookings" : "My Bookings"}</h1>
          <input className="input" style={{ marginBottom: 20, maxWidth: 400 }} placeholder="Search by vehicle, company or status..." value={search} onChange={e => setSearch(e.target.value)} />
          {loading && <p className="loading-text">Loading bookings...</p>}
          {error && <div className="alert alert-error">{error}</div>}
          {!loading && filtered.length === 0 && <p className="empty-state">No bookings found.</p>}
          {filtered.length > 0 && (
            <div className="table-card">
              <table className="data-table">
                <thead><tr><th>Vehicle</th><th>Company</th><th>Start</th><th>End</th><th>Days</th><th>Total</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  {filtered.map(b => (
                    <tr key={b.bookingId}>
                      <td>{b.vehicleMakeModel}</td>
                      <td>{b.companyName}</td>
                      <td>{new Date(b.startDate).toLocaleDateString()}</td>
                      <td>{new Date(b.endDate).toLocaleDateString()}</td>
                      <td>{b.numberOfDays}</td>
                      <td>R{b.totalCost.toFixed(2)}</td>
                      <td><span className={`status-pill ${statusClass[b.status]}`}>{BookingStatusLabel[b.status]}</span></td>
                      <td>
                        {(b.status === 1 || b.status === 2) && (
                          <button onClick={() => setCancelTarget(b)} className="btn btn-danger" style={{ fontSize: 12 }}>Cancel</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {cancelTarget && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modal-title">Cancel Booking</h2>
            <p style={{ color: "var(--muted)", margin: "8px 0 16px" }}>
              {cancelTarget.vehicleMakeModel} — {new Date(cancelTarget.startDate).toLocaleDateString()} to {new Date(cancelTarget.endDate).toLocaleDateString()}
            </p>
            {fee(cancelTarget) > 0 ? (
              <div className="alert alert-error">
                <strong>Cancellation Fee Applies</strong><br />
                This booking is confirmed. A <strong>10% cancellation fee of R{fee(cancelTarget).toFixed(2)}</strong> will apply.<br />
                You will forfeit this amount from your booking total of R{cancelTarget.totalCost.toFixed(2)}.
              </div>
            ) : (
              <div className="alert alert-success">No cancellation fee — this booking is still pending.</div>
            )}
            <div className="modal-actions">
              <button onClick={() => setCancelTarget(null)} className="btn btn-ghost">Go Back</button>
              <button onClick={handleCancel} disabled={cancelling} className="btn btn-danger">{cancelling ? "Cancelling..." : "Confirm Cancellation"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Bookings;
