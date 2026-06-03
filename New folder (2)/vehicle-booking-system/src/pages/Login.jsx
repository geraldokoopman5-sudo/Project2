import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(email, password);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userName", res.data.name);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="brand-mark">RideShare Hub</div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Access your booking workspace.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="form-stack">
          <label>
            <span className="field-label">Email address</span>
            <input type="email" placeholder="name@company.com" className="input"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            <span className="field-label">Password</span>
            <input type="password" placeholder="Enter password" className="input"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="auth-footer">
          Need access? <Link to="/signup" className="text-link">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
