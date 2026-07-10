import React, { useEffect, useState } from "react";
import api from "../api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042"]; // Present, Absent

const StudentDashboard = () => {
  const [records, setRecords] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // FIX 1: Read safely inside the useEffect hook to prevent endless rendering loops
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || !savedUser._id) return;

    setUserName(savedUser.name || "");

    api
      .get(`/attendance/${savedUser._id}`)
      .then((res) => setRecords(res.data))
      .catch((err) => console.error("Error fetching student records:", err));
  }, []); // Empty dependency array means this runs exactly ONCE when the page mounts

  const total = records.length;
  const present = records.filter(
    (r) => r.status === "Present" || r.status === "Full Day"
  ).length;
  const absent = total - present;
  const percent = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

  const pieData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  return (
    <div className="container">
      <h2>{userName ? `${userName} - Student Dashboard` : "Student Dashboard"}</h2>

      <h3>📊 Attendance Summary</h3>
      <p>Total Days: {total}</p>
      <p>Days Present: {present}</p>
      <p>Attendance Percentage: {percent}%</p>

      {total > 0 && (
        <div style={{ width: "100%", maxWidth: "500px", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <h3>📅 Attendance Records</h3>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "15px", backgroundColor: "#fff" }}>
        <thead style={{ backgroundColor: "#ffe0f0" }}>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                No attendance records found.
              </td>
            </tr>
          ) : (
            records.map((rec, i) => (
              <tr key={i}>
                <td>{rec.date}</td>
                <td style={{ color: rec.status === "Present" || rec.status === "Full Day" ? "green" : "red", fontWeight: "bold" }}>
                  {rec.status}
                </td>
                {/* FIX 2: Added optional chaining fallback protections for location coordinates */}
                <td>{rec.location?.lat ?? "–"}</td>
                <td>{rec.location?.lng ?? "–"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;