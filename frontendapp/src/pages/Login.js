import React, { useState } from "react";
import api from "../api"; // Imports your production Render base URL
import { useNavigate } from "react-router-dom";
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", department: "", role: "student" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pointing cleanly to production Render /api/auth/register
      await api.post("/auth/register", formData); 
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Department:</label><br />
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div>
          <label>Role:</label><br />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;