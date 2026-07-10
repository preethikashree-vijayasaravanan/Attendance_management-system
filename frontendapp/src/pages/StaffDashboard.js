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
import "./Auth.css";

const getTodayString = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const COLORS = ["#00C49F", "#FF8042", "#8884d8"]; // Present, Absent, Not enrolled

const StaffDashboard = () => {
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  
  // SAFE CHANGE: Parse with a safe fallback object to avoid runtime crashes
  const user = JSON.parse(localStorage.getItem("user")) || { name: "" };
  const today = getTodayString();

  useEffect(() => {
    // Only fire network requests if a user session exists
    if (!user.name) return;

    const fetchAttendance = async () => {
      try {
        const res = await api.get(
          `/attendance/by-supervisor/${user.name}/date/${today}`
        );
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching attendance", err);
      }
    };

    const fetchCount = async () => {
      try {
        const res = await api.get(
          `/attendance/assigned-count/${user.name}`
        );
        setCount(res.data.count); 
      } catch (err) {
        console.error("Error fetching count", err);
      }
    };

    fetchAttendance();
    fetchCount();
  }, [user.name, today]);

  // Pie chart data
  const pieData = [
    {
      name: "Present",
      value: students.filter((s) => s.status === "Present").length,
    },
    {
      name: "Absent",
      value: students.filter((s) => s.status === "Absent").length,
    },
    {
      name: "Half Day",
      value: students.filter((s) => s.status === "Half Day").length,
    },
  ];

  return (
    <div className="container">
      <h2>📋 Staff Dashboard</h2>
      <p><strong>👥 Number of assigned students:</strong> {count}</p>

      <h3 style={{ marginTop: "30px" }}>📊 Attendance Summary ({today})</h3>
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

      <h3>📋 Detailed Attendance Table</h3>
      {students.length === 0 ? (
        <p>No students assigned or data unavailable.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "15px", width: "100%", backgroundColor: "#fff0f5" }}>
          <thead style={{ backgroundColor: "#ffcce0" }}>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={index}>
                <td>{s.name}</td>
                <td style={{ color: s.status === "Present" ? "green" : s.status === "Absent" ? "red" : "gray" }}>
                  {s.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffDashboard;