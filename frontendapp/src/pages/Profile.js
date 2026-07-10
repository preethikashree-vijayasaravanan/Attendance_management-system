import React, { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../pages/Auth.css"; // for pink theme

const Profile = () => {
  // Safe parsing with a fallback object to prevent application crashes
  const user = JSON.parse(localStorage.getItem("user")) || { name: "", email: "", department: "", role: "student" };
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        department: user?.department || "",
      });
    }
  }, []); // Empty dependency array to mount user data strictly once on page load

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/auth/profile/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Profile updated successfully");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("❌ Profile update error:", err.message);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <>
      {/* 1. Added Navbar component here so Vercel compiles successfully without warnings */}
      <Navbar /> 
      
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="box">
          {/* 2. Safe check on user role string */}
          <h2>{user.role === "staff" ? "Staff" : "Student"} Profile</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Department:</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} required /><br/>

            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;