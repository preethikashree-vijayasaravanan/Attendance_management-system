/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/attendance/${user._id}`)
      .then(res => setRecords(res.data))
      .catch(err => console.log(err));
  }, [user._id]);

  const total = records.length;
  const present = records.filter(r => r.status === "Present" || r.status === "Full Day").length;
  const percent = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

  return (
    <div>
      <h2>{user.name} - Student Dashboard</h2>
      <p>Welcome, {user.name}</p>
      <button onClick={() => navigate("/attendance")}>Attendance</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <button onClick={() => {
        localStorage.removeItem("user");
        navigate("/");
      }}>Logout</button>

      <h3>Your Attendance Records</h3>
      <p>Total Days: {total}</p>
      <p>Days Present: {present}</p>
      <p>Attendance Percentage: {percent}%</p>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <tr key={i}>
              <td>{rec.date}</td>
              <td>{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
*/
// src/pages/StudentDashboard.js
/*
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/attendance/${user._id}`)
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err));
  }, [user._id]);

  const total = records.length;
  const present = records.filter((r) => r.status === "Present" || r.status === "Full Day").length;
  const percent = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

  return (
    <div className="container">
      <h2>{user.name} - Student Dashboard</h2>
      

      <h3>Your Attendance Records</h3>
      <p>Total Days: {total}</p>
      <p>Days Present: {present}</p>
      <p>Attendance Percentage: {percent}%</p>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <tr key={i}>
              <td>{rec.date}</td>
              <td>{rec.status}</td>
              <td>{rec.location?.lat || "–"}</td>
              <td>{rec.location?.lng || "–"}</td>
        
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
*/
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042",]; // Present, Absent

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // 2. CHANGED: Switched to api.get and trimmed down the localhost string
    api
      .get(`/attendance/${user._id}`)
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err));
  }, [user._id]);

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
      <h2>{user.name} - Student Dashboard</h2>

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
      <table border="1" style={{ width: "100%", marginTop: "15px" }}>
        <thead style={{ backgroundColor: "#ffe0f0" }}>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <tr key={i}>
              <td>{rec.date}</td>
              <td style={{ color: rec.status === "Present" ? "green" : "red" }}>
                {rec.status}
              </td>
              <td>{rec.location?.lat || "–"}</td>
              <td>{rec.location?.lng || "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
