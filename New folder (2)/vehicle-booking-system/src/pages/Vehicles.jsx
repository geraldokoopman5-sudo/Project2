import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getVehicles, createBooking } from "../api/axios";
import { matchesSearch } from "../utils/search";

function Vehicles({ open, setOpen }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookError, setBookError] = useState("");
  const [bookSuccess, setBookSuccess] = useState("");
  const [bookLoading, setBookLoading] = useState(false);
  const [search, setSearch] = useState("");
  const userId = localStorage.getItem("userId");
  const role = Number(localStorage.getItem("role"));

  useEffect(() => {
    getVehicles().then(res => setVehicles(res.data)).catch(() => setError("Failed to load vehicles.")).finally(() => setLoading(false));
  }, []);

  const calcDays = () => startDate && endDate ? Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000) + 1 : 0;

  const submitBooking = async (e) => {
    e.preventDefault(); setBookError(""); setBookSuccess("");
    if (new Date(endDate) < new Date(startDate)) { setBookError("End date cannot be before start date."); return; }
    setBookLoading(true);
    try {
      await createBooking({ companyId: userId, vehicleId: booking.vehicleId, startDate: new Date(startDate).toISOString(), endDate: new Date(endDate).toISOString() });
      setBookSuccess("Booking submitted! Awaiting admin approval.");
      setBooking(null);
    } catch (err) { setBookError(err.response?.data?.message || "Booking failed."); }
    finally { setBookLoading(false); }
  };

  const filtered = vehicles.filter(v => matchesSearch(v, search, ["make", "model", "category", "ownerName"]));

  return (
    <div className="app-shell">
      <Navbar open={open} setOpen={setOpen} />
      <div style={{ display: "flex" }}>
        {open && <Sidebar />}
        <div className={`page ${open ? "with-sidebar" : ""}`} style={{ flex: 1 }}>
          <div className="eyebrow">Browse Fleet</div>
          <h1 className="page-title" style={{ marginBottom: 16 }}>Available Vehicles</h1>
          <input className="input" style={{ marginBottom: 20, maxWidth: 400 }} placeholder="Search by make, model, category or owner..." value={search} onChange={e => setSearch(e.target.value)} />
          {bookSuccess && <div className="alert alert-success">{bookSuccess}</div>}
          {loading && <p className="loading-text">Loading vehicles...</p>}
          {error && <div className="alert alert-error">{error}</div>}
          {!loading && filtered.length === 0 && <p className="empty-state">No vehicles found.</p>}
          <div className="card-grid">
            {filtered.map(v => (
              <div key={v.vehicleId} className="vehicle-card">
                {v.imageData ? <img src={v.imageData} alt={v.make} style={{ width: "100%", height: 160, objectFit: "cover" }} /> : <div className="vehicle-art"></div>}
                <div className="vehicle-body">
                  <h2 className="vehicle-title">{v.make} {v.model} ({v.year})</h2>
                  <div className="meta-list">
                    <span>Category: {v.category}</span>
                    <span>Owner: {v.ownerName}</span>
                    <span className="price">R{Number(v.dailyRate).toFixed(2)} / day</span>
                  </div>
                  {role === 0 && (
                    <button onClick={() => { setBooking(v); setStartDate(""); setEndDate(""); setBookError(""); }} className="btn btn-primary">Book Now</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {booking && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modal-title">Book {booking.year} {booking.make} {booking.model}</h2>
            <p style={{ color: "var(--cyan)", fontWeight: 900, margin: "4px 0 14px" }}>R{Number(booking.dailyRate).toFixed(2)} / day</p>
            {bookError && <div className="alert alert-error">{bookError}</div>}
            <form onSubmit={submitBooking} className="form-stack">
              <label><span className="field-label">Start Date</span><input type="date" className="input" value={startDate} onChange={e => setStartDate(e.target.value)} required /></label>
              <label><span className="field-label">End Date</span><input type="date" className="input" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} required /></label>
              {calcDays() > 0 && (
                <div className="alert" style={{ background: "rgba(37,214,238,0.08)", borderColor: "rgba(37,214,238,0.3)", color: "var(--cyan)" }}>
                  {calcDays()} day(s) — Total: R{(calcDays() * Number(booking.dailyRate)).toFixed(2)}
                </div>
              )}
              <div className="modal-actions">
                <button type="button" onClick={() => setBooking(null)} className="btn btn-ghost">Cancel</button>
                <button type="submit" disabled={bookLoading} className="btn btn-primary">{bookLoading ? "Submitting..." : "Confirm Booking"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Vehicles;
