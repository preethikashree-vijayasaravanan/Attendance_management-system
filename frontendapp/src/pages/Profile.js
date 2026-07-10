/*
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    department: user.department
  });

  const updateProfile = async () => {
    try {
      const res = await axios.put(`/api/auth/profile/${user._id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated.");
    } catch (err) {
      alert("Failed to update profile.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <Navbar/>
      <h2>Edit Profile</h2>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" /><br/>
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" /><br/>
      <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Department" /><br/>
      
      <button onClick={updateProfile}>Save</button>
    </div>
  );
};

export default Profile;
*/
// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../pages/Auth.css"; // for pink theme

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      department: user?.department || "",
    });
  }, [user]);

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
    <div className="container">
      
      <div className="box">
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
  );
};

export default Profile;

