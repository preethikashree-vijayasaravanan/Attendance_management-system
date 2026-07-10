import React, { useState, useEffect, useCallback } from "react";
import api from "../api"; // 1. Switched to centralized production API wrapper
import Navbar from "../components/Navbar"; // 2. Imported Navbar for layout consistency
import "./Auth.css"; // Optional: styling matching your theme

const AttendancePage = () => {
  // SAFE CHANGE: Handle empty or unauthenticated local storage sessions safely
  const user = JSON.parse(localStorage.getItem("user")) || { _id: "", name: "" };
  
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

  // 3. FIX COMPILER WARNING: Wrapped inside useCallback to fix the dependency array issues
  const fetchAttendance = useCallback(async () => {
    if (!user._id) return;
    try {
      const res = await api.get(`/attendance/${user._id}`);
      setRecords(res.data);
    } catch (err) {
      console.error("Error loading attendance records:", err);
    }
  }, [user._id]);

  // Submit attendance records
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user._id) {
      alert("User profile session data missing.");
      return;
    }

    try {
      const payload = {
        userId: user._id,
        status,
        location,
      };

      await api.post("/attendance", payload);
      alert("Attendance marked successfully");
      fetchAttendance();
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

          <button type="button" onClick={getLocation} style={{ marginRight: "10px", padding: "8px 12px" }}>
            Get Location
          </button>

          {location.lat && (
            <div style={{ margin: "10px 0", padding: "10px", backgroundColor: "#fff0f5", borderRadius: "5px", border: "1px solid #ffb3c6" }}>
              <p style={{ margin: 0 }}><strong>Latitude:</strong> {location.lat}</p>
              <p style={{ margin: 0 }}><strong>Longitude:</strong> {location.lng}</p>
            </div>
          )}

          <button type="submit" style={{ padding: "8px 15px", backgroundColor: "#800040", color: "#fff", border: "none", borderRadius: "4px" }}>
            Mark Attendance
          </button>
        </form>

        <hr style={{ margin: "30px 0", border: "0", borderTop: "1px solid #ffb3c6" }} />

        <h3>Your Attendance Records</h3>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff0f5" }}>
          <thead>
            <tr style={{ backgroundColor: "#ffb3c6", color: "#800040" }}>
              <th style={{ padding: "10px" }}>Date</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Latitude</th>
              <th style={{ padding: "10px" }}>Longitude</th>
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
                  <td style={{ padding: "10px" }}>{r.date}</td>
                  <td style={{ padding: "10px", color: r.status === "Present" ? "green" : "red", fontWeight: "bold" }}>
                    {r.status}
                  </td>
                  <td style={{ padding: "10px" }}>{r.location?.lat || "–"}</td>
                  <td style={{ padding: "10px" }}>{r.location?.lng || "–"}</td>
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