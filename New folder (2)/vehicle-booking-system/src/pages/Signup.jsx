import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, UserRole } from "../api/axios";

const nameRegex = /^[A-Za-z\s\-\']{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};:\'",.<>?/\\|`~]).{8,}$/;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneNumber: "", password: "", confirmPassword: "", role: UserRole.Company,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChange = (e) => {
    let val = e.target.name === "role" ? Number(e.target.value) : e.target.value;
    if (e.target.name === "phoneNumber") val = val.replace(/\D/g, "").slice(0, 10);
    const updated = { ...formData, [e.target.name]: val };
    setFormData(updated);
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      const pw = e.target.name === "password" ? val : updated.password;
      const cpw = e.target.name === "confirmPassword" ? val : updated.confirmPassword;
      setPasswordMismatch(cpw.length > 0 && pw !== cpw);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();

    if (firstName.length < 2 || !nameRegex.test(firstName)) {
      setError("First name must be at least 2 letters and contain only letters."); return;
    }
    if (lastName.length < 2 || !nameRegex.test(lastName)) {
      setError("Last name must be at least 2 letters and contain only letters."); return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address."); return;
    }
    if (formData.phoneNumber.length < 10) {
      setError("Phone number must be exactly 10 digits."); return;
    }
    if (!formData.phoneNumber.startsWith("0")) {
      setError("Phone number must start with 0 (e.g. 0821234567)."); return;
    }
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters and include an uppercase letter, a number, and a special character."); return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match."); return;
    }

    setLoading(true);
    try {
      const res = await register({
        name: `${firstName} ${lastName}`,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role,
      });
      const msg = res.data?.message || "";
      if (msg.toLowerCase().includes("exists") || msg.toLowerCase().includes("fail")) { setError(msg); return; }
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (!err.response) { setError("Cannot connect to server. Make sure the API is running on port 5033."); return; }
      const data = err.response?.data;
      const status = err.response?.status;
      if (data?.errors) {
        const messages = Object.entries(data.errors).map(([f, m]) => `${f}: ${m.join(", ")}`).join(" | ");
        setError(`Validation error (${status}): ${messages}`);
      } else {
        setError(`Error (${status}): ${data?.message || data?.title || JSON.stringify(data)}`);
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="brand-mark">Vehicle Booking System</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Choose your role and join the fleet network.</p>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit} className="form-stack">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label>
              <span className="field-label">First Name</span>
              <input type="text" name="firstName" placeholder="First name" className="input"
                value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
              <span className="field-label">Last Name</span>
              <input type="text" name="lastName" placeholder="Last name" className="input"
                value={formData.lastName} onChange={handleChange} required />
            </label>
          </div>
          <label>
            <span className="field-label">Email Address</span>
            <input type="email" name="email" placeholder="name@company.com" className="input"
              value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            <span className="field-label">Phone Number</span>
            <input type="text" name="phoneNumber" placeholder="e.g. 0821234567" className="input"
              value={formData.phoneNumber} onChange={handleChange} required />
            <p className="hint">Must start with 0 — spaces and dashes removed automatically</p>
          </label>
          <label>
            <span className="field-label">Password</span>
            <input type="password" name="password" placeholder="Min 8 chars, uppercase, number, special char" className="input"
              value={formData.password} onChange={handleChange} required />
            <p className="hint">At least 8 characters with 1 uppercase, 1 number, and 1 special character</p>
          </label>
          <label>
            <span className="field-label">Confirm Password</span>
            <input type="password" name="confirmPassword" placeholder="Repeat your password"
              className={`input${passwordMismatch ? " input-error" : ""}`}
              value={formData.confirmPassword} onChange={handleChange} required />
            {passwordMismatch && <p className="hint" style={{ color: "var(--red)" }}>Passwords do not match</p>}
          </label>
          <label>
            <span className="field-label">Role</span>
            <select name="role" className="select" value={formData.role} onChange={handleChange}>
              <option value={UserRole.Company}>Company (book vehicles)</option>
              <option value={UserRole.Vehicle}>Vehicle Owner (list vehicles)</option>
            </select>
          </label>
          <button type="submit" disabled={loading || passwordMismatch} className="btn btn-primary">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login" className="text-link">Login</Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
