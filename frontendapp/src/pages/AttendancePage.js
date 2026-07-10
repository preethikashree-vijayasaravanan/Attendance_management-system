import React, { useState, useEffect, useCallback } from "react";
import api from "../api"; // 1. Centralized production API wrapper
import Navbar from "../components/Navbar"; // 2. Navbar for layout consistency
import "./Auth.css"; 

const AttendancePage = () => {
  const [status, setStatus] = useState("Present");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [records, setRecords] = useState([]);

  // Get today's location coordinates
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Location fetch failed. Please allow location permissions.")
    );
  };

  // FIX 1: Move user ID extraction directly inside the fetch function to stop loop cycles completely
  const fetchAttendance = useCallback(async () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || !savedUser._id) return;

    try {
      const res = await api.get(`/attendance/${savedUser._id}`);
      setRecords(res.data);
    } catch (err) {
      console.error("Error loading attendance records:", err);
    }
  }, []); // Empty array because it loads safely inside from localStorage dynamically

  // Submit attendance records
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || !savedUser._id) {
      alert("User profile session data missing.");
      return;
    }

    try {
      const payload = {
        userId: savedUser._id,
        status,
        location,
      };

      await api.post("/attendance", payload);
      alert("Attendance marked successfully");
      fetchAttendance(); // Reload the history log list automatically
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to mark attendance";
      alert(msg);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffe6f0" }}>
      <Navbar />
      
      <div className="container" style={{ padding: "20px" }}>
        <h2>Attendance Entry</h2>
        <form onSubmit={handleSubmit}>
          <label>Select Status: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "8px", marginBottom: "10px" }}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Half Day">Half Day</option>
          </select>
          <br />

          <button type="button" onClick={getLocation} style={{ marginRight: "10px", padding: "8px 12px", marginTop: "10px" }}>
            Get Location
          </button>

          {location.lat && (
            <div style={{ margin: "10px 0", padding: "10px", backgroundColor: "#fff0f5", borderRadius: "5px", border: "1px solid #ffb3c6" }}>
              <p style={{ margin: 0 }}><strong>Latitude:</strong> {location.lat}</p>
              <p style={{ margin: 0 }}><strong>Longitude:</strong> {location.lng}</p>
            </div>
          )}

          <button type="submit" style={{ padding: "8px 15px", backgroundColor: "#800040", color: "#fff", border: "none", borderRadius: "4px", display: "block", marginTop: "15px" }}>
            Mark Attendance
          </button>
        </form>

        <hr style={{ margin: "30px 0", border: "0", borderTop: "1px solid #ffb3c6" }} />

        <h3>Your Attendance Records</h3>
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff0f5" }}>
          <thead>
            <tr style={{ backgroundColor: "#ffb3c6", color: "#800040" }}>
              <th>Date</th>
              <th>Status</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "10px", color: "#888" }}>
                  No attendance entries found.
                </td>
              </tr>
            ) : (
              records.map((r, idx) => (
                <tr key={idx} style={{ textAlign: "center" }}>
                  <td>{r.date}</td>
                  <td style={{ color: r.status === "Present" ? "green" : r.status === "Absent" ? "red" : "#8884d8", fontWeight: "bold" }}>
                    {r.status}
                  </td>
                  <td>{r.location?.lat ?? "–"}</td>
                  <td>{r.location?.lng ?? "–"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;