/*
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const StaffDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Welcome Staff</h2>
        <button onClick={() => navigate("/verify-attendance")}>View Student Attendance</button>
      </div>
    </div>
  );
};

export default StaffDashboard;
*/
/*import React, { useEffect, useState } from "react";
import axios from "axios";

const StaffDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const fetchAttendance = (date) => {
    axios
      .get(`http://localhost:5000/api/attendance/by-supervisor/${user.name}/date/${date}`)
      .then((res) => setAttendance(res.data))
      .catch((err) => alert("Error loading attendance"));
  };

  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [selectedDate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h2>Welcome, {user.name} (Staff)</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Student Attendance View</h3>

      <label>
        Select Date:{" "}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDashboard;
*/
/*
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container">
      <nav >
        <button onClick={() => navigate("/staff-dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/view-attendance")}>View Attendance</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </nav>

      <h2>Welcome, {user.name}</h2>
      <p>You are assigned to monitor student attendance.</p>
    </div>
  );
};

export default StaffDashboard;
*/
/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Auth.css";

const StaffDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchAssignedStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/staff/students/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStudentCount(res.data.length);
      } catch (err) {
        console.error("Failed to load students", err);
      }
    };

    fetchAssignedStudents();
  }, [user._id]);

  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>
      <p><strong>You are assigned to monitor student attendance.</strong></p>
      <p><strong>Number of assigned students:</strong> {studentCount}</p>
    </div>
  );
};

export default StaffDashboard;
*/
/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Auth.css";
const getTodayString = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const StaffDashboard = () => {
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const today = getTodayString();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/attendance/by-supervisor/${user.name}/date/${today}`
        );
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching attendance", err);
      }
    };

    const fetchCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/attendance/assigned-count/${user.name}`
        );
        setCount(res.data.count);
      } catch (err) {
        console.error("Error fetching count", err);
      }
    };

    fetchAttendance();
    fetchCount();
  }, [user.name, today]);

  return (
    <div className="container" >
      <h2>Staff Dashboard</h2>
      <p>Number of assigned students: {count}</p>
    
    </div>
  );
};

export default StaffDashboard;
*/

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
  const user = JSON.parse(localStorage.getItem("user"));
  const today = getTodayString();

 useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // 2. CHANGED: Switched to api.get and trimmed the localhost address string
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
        // 3. CHANGED: Switched to api.get and trimmed the localhost address string
        const res = await api.get(
          `/attendance/assigned-count/${user.name}`
        );
        countSet(res.data.count);
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
