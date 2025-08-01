/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [records, setRecords] = useState([]);

  const loadAttendance = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/${user._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to load attendance records:", err);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Welcome, {user.name}</h2>
        <h3>Your Attendance Records</h3>

        <table border="1" cellPadding="5" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec._id}>
                <td>{new Date(rec.date).toLocaleDateString()}</td>
                <td>{rec.status}</td>
                <td>{rec.latitude || "N/A"}</td>
                <td>{rec.longitude || "N/A"}</td>
                <td>{rec.verified ? "✔️" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && <p>No attendance records found.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
*/

import StaffDashboard from "./StaffDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1>Dashboard</h1>
      {user.role === "staff" ? <StaffDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;