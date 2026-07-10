import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar"; 

const ViewAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // FIX 1: Safely load user identity data inside the hook to isolate the component execution state
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || !savedUser.name) return;

    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/attendance/by-supervisor/${savedUser.name}/date/${selectedDate}`);
        setAttendance(res.data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setAttendance([]);
      }
      setLoading(false);
    };

    fetchAttendance();
  }, [selectedDate]); // Fires strictly when a staff member changes the calendar date dropdown input picker

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffe6f0" }}>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center", color: "#800040" }}>View Attendance of Students</h2>

        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <label>Select Date: </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              padding: "8px",
              border: "1px solid #ffb3c6",
              borderRadius: "5px",
              backgroundColor: "#fff0f5"
            }}
          />
        </div>

        {attendance.length > 0 && (
          <div style={{ marginBottom: "15px", textAlign: "center", fontWeight: "bold", color: "#800040" }}>
            Total Assigned Students: {attendance.length}
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading attendance...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff0f5" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Student Name</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length === 0 ? (
                <tr>
                  <td colSpan="2" style={{ textAlign: "center", padding: "10px", color: "#888" }}>
                    No students assigned or data unavailable.
                  </td>
                </tr>
              ) : (
                attendance.map((record, idx) => (
                  <tr key={idx}>
                    <td style={tableCellStyle}>{record.name}</td>
                    <td style={{ ...tableCellStyle, fontWeight: "bold" }}>
                      {record.status === "Not enrolled yet" ? (
                        <span style={{ color: "gray", fontStyle: "italic", fontWeight: "normal" }}>{record.status}</span>
                      ) : record.status === "Absent" ? (
                        <span style={{ color: "red" }}>{record.status}</span>
                      ) : (
                        <span style={{ color: "green" }}>{record.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: "#ffb3c6",
  color: "#800040",
  padding: "10px",
  borderBottom: "2px solid #ff99bb"
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  textAlign: "center"
};

export default ViewAttendance;