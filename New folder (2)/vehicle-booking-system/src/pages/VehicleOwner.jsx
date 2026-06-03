import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getAllVehicles, addVehicle, updateVehicle, deleteVehicle } from "../api/axios";
import { matchesSearch } from "../utils/search";

const EMPTY_FORM = { make: "", model: "", year: "", category: "", dailyRate: "", isAvailable: true, imageData: "" };
const MIN_YEAR = 1990;
const MAX_YEAR = 2027;

function VehicleOwner({ open, setOpen }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [search, setSearch] = useState("");
  const userId = localStorage.getItem("userId");

  const load = () => {
    setLoading(true);
    getAllVehicles()
      .then(res => setVehicles(res.data.filter(v => v.ownerId === userId)))
      .catch(() => setError("Failed to load vehicles."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleChange = (e) => {
    const val = e.target.name === "isAvailable" ? e.target.value === "true" : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setFormError("Image must be under 2MB."); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      setForm(f => ({ ...f, imageData: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const openAdd = () => { setEditId(null); setForm(EMPTY_FORM); setFormError(""); setImagePreview(""); setShowForm(true); };
  const openEdit = (v) => {
    setEditId(v.vehicleId);
    setForm({ make: v.make, model: v.model, year: v.year, category: v.category, dailyRate: v.dailyRate, isAvailable: v.isAvailable, imageData: v.imageData || "" });
    setImagePreview(v.imageData || "");
    setFormError(""); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setFormError("");
    if (!form.make.trim() || !form.model.trim() || !form.category.trim()) { setFormError("Make, model and category are required."); return; }
    const year = Number(form.year);
    if (!year || year < MIN_YEAR || year > MAX_YEAR) { setFormError(`Year must be between ${MIN_YEAR} and ${MAX_YEAR}.`); return; }
    const rate = Number(form.dailyRate);
    if (!rate || rate <= 0 || rate > 100000) { setFormError("Daily rate must be between R1 and R100,000."); return; }
    setFormLoading(true);
    try {
      const dto = { make: form.make.trim(), model: form.model.trim(), year, category: form.category.trim(), dailyRate: rate, isAvailable: form.isAvailable, imageData: form.imageData || null, ownerId: userId };
      if (editId) { await updateVehicle(editId, dto); setSuccess("Vehicle updated."); }
      else { await addVehicle(dto); setSuccess("Vehicle added."); }
      setShowForm(false); load();
    } catch (err) { setFormError(err.response?.data?.message || "Failed to save vehicle."); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this vehicle?")) return;
    try { await deleteVehicle(id); load(); }
    catch (err) { alert(err.response?.data?.message || "Failed to delete vehicle."); }
  };

  const toggleAvailability = async (v) => {
    try { await updateVehicle(v.vehicleId, { make: v.make, model: v.model, year: v.year, category: v.category, dailyRate: v.dailyRate, isAvailable: !v.isAvailable, ownerId: v.ownerId, imageData: v.imageData }); load(); }
    catch { alert("Failed to update availability."); }
  };

  const filtered = vehicles.filter(v => matchesSearch(v, search, ["make", "model", "category"]));

  return (
    <div className="app-shell">
      <Navbar open={open} setOpen={setOpen} />
      <div style={{ display: "flex" }}>
        {open && <Sidebar />}
        <div className={`page ${open ? "with-sidebar" : ""}`} style={{ flex: 1 }}>
          <div className="page-header">
            <div>
              <div className="eyebrow">Vehicle Owner</div>
              <h1 className="page-title">My Vehicles</h1>
            </div>
            <button onClick={openAdd} className="btn btn-primary">+ Add Vehicle</button>
          </div>
          <input className="input" style={{ marginBottom: 20, maxWidth: 400 }} placeholder="Search by make, model or category..." value={search} onChange={e => setSearch(e.target.value)} />
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-error">{error}</div>}
          {loading && <p className="loading-text">Loading vehicles...</p>}
          {!loading && filtered.length === 0 && <p className="empty-state">{vehicles.length === 0 ? 'No vehicles yet. Click "+ Add Vehicle" to get started.' : "No vehicles match your search."}</p>}
          <div className="card-grid">
            {filtered.map(v => (
              <div key={v.vehicleId} className="vehicle-card">
                {v.imageData ? <img src={v.imageData} alt={v.make} style={{ width: "100%", height: 160, objectFit: "cover" }} /> : <div className="vehicle-art"></div>}
                <div className="vehicle-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 className="vehicle-title">{v.make} {v.model}</h2>
                    <span className={`status-pill ${v.isAvailable ? "status-good" : "status-bad"}`}>{v.isAvailable ? "Available" : "Unavailable"}</span>
                  </div>
                  <div className="meta-list">
                    <span>Category: {v.category}</span>
                    <span>Year: {v.year}</span>
                    <span className="price">R{Number(v.dailyRate).toFixed(2)} / day</span>
                  </div>
                  <div className="toolbar">
                    <button onClick={() => openEdit(v)} className="btn btn-blue" style={{ fontSize: 13 }}>Edit</button>
                    <button onClick={() => toggleAvailability(v)} className={`btn ${v.isAvailable ? "btn-warning" : "btn-success"}`} style={{ fontSize: 13 }}>Mark {v.isAvailable ? "Unavailable" : "Available"}</button>
                    <button onClick={() => handleDelete(v.vehicleId)} className="btn btn-danger" style={{ fontSize: 13 }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modal-title">{editId ? "Edit Vehicle" : "Add Vehicle"}</h2>
            {formError && <div className="alert alert-error">{formError}</div>}
            <form onSubmit={handleSubmit} className="form-stack">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <label><span className="field-label">Make</span><input name="make" placeholder="e.g. Toyota" className="input" value={form.make} onChange={handleChange} required /></label>
                <label><span className="field-label">Model</span><input name="model" placeholder="e.g. Corolla" className="input" value={form.model} onChange={handleChange} required /></label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <label>
                  <span className="field-label">Year</span>
                  <input name="year" type="number" placeholder="e.g. 2022" className="input" min={MIN_YEAR} max={MAX_YEAR} value={form.year} onChange={handleChange} required />
                  <p className="hint">{MIN_YEAR} – {MAX_YEAR}</p>
                </label>
                <label><span className="field-label">Category</span><input name="category" placeholder="e.g. Sedan" className="input" value={form.category} onChange={handleChange} required /></label>
              </div>
              <label>
                <span className="field-label">Daily Rate (R)</span>
                <input name="dailyRate" type="number" min="1" max="100000" placeholder="e.g. 850" className="input" value={form.dailyRate} onChange={handleChange} required />
                <p className="hint">R1 – R100,000 per day</p>
              </label>
              <label>
                <span className="field-label">Availability</span>
                <select name="isAvailable" className="select" value={form.isAvailable} onChange={handleChange}>
                  <option value={true}>Available</option>
                  <option value={false}>Unavailable</option>
                </select>
              </label>
              <label>
                <span className="field-label">Vehicle Photo</span>
                <input type="file" accept="image/*" onChange={handleImage} />
                <p className="hint">Max 2MB. JPG, PNG or WEBP.</p>
              </label>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6, marginTop: 4 }} />}
              <div className="modal-actions">
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
                <button type="submit" disabled={formLoading} className="btn btn-primary">{formLoading ? "Saving..." : editId ? "Update" : "Add Vehicle"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default VehicleOwner;
