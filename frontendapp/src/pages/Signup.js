import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "student", // Default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle function so a user can choose Staff or switch back to Student
  const toggleRole = () => {
    setFormData((prev) => ({
      ...prev,
      role: prev.role === "student" ? "staff" : "student",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: Changed from "/auth/signup" to "/auth/register" to match backend/routes/auth.js
      await api.post("/auth/register", formData);
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed. Please try again.");
      console.error(err);
    }
  };
  
  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>
        <div>
          <label>Department:</label><br />
          <input
            type="text"
            name="department"
            onChange={handleChange}
            value={formData.department}
            required
          />
        </div>

        {/* Role Selection */}
        <div style={{ marginTop: "15px", marginBottom: "10px" }}>
          <p style={{ marginBottom: "5px" }}>
            Role: <strong>{formData.role === "staff" ? "Staff" : "Student"}</strong>
          </p>
          <button
            type="button"
            onClick={toggleRole}
            style={{
              backgroundColor: formData.role === "staff" ? "#4caf50" : "#007bff",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            {formData.role === "staff" ? "Change to Student" : "I am Staff"}
          </button>
        </div>

        <button type="submit" style={{ padding: "10px 15px" }}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;