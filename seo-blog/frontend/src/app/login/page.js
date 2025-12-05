"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { login as apiLogin } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { token } = await apiLogin({ email, password });
      login(token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "28rem", marginTop: "2.5rem" }}
    >
      <div className="card">
        <div className="card-body">
          <h1 className="heading-2 text-center">Admin Login</h1>
          {error && <div className="text-red text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
