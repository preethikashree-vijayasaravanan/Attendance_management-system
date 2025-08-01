/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ViewAttendance = () => {
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  const loadUnverified = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/unverified", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Error loading unverified:", err);
    }
  };

  const verifyAttendance = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/attendance/verify/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("✔ Attendance verified");
      loadUnverified();
    } catch (err) {
      alert("Verification failed");
    }
  };

  useEffect(() => {
    loadUnverified();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Staff Attendance Verification</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}

        {records.length === 0 ? (
          <p>No unverified attendance records today.</p>
        ) : (
          <table border="1" cellPadding="6" style={{ width: "100%", marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Verify</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec._id}>
                  <td>{rec.studentName}</td>
                  <td>{rec.department || "N/A"}</td>
                  <td>{new Date(rec.date).toLocaleDateString()}</td>
                  <td>{rec.status}</td>
                  <td>{rec.latitude || "N/A"}</td>
                  <td>{rec.longitude || "N/A"}</td>
                  <td>
                    <button onClick={() => verifyAttendance(rec._id)}>Verify</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default ViewAttendance;
*/
/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Auth.css";

const ViewAttendance = () => {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/staff/assigned", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h2>Student Attendance for Today</h2>
      <table border="1" className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec._id}>
              <td>{rec.studentName}</td>
              <td>{rec.department}</td>
              <td>{rec.status}</td>
              <td>{new Date(rec.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendance;
*/
/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Auth.css";

const ViewAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const formattedDate = formatDate(selectedDate);
      const res = await axios.get(
        `http://localhost:5000/api/attendance/by-supervisor/${user.name}/date/${formattedDate}`
      );
      setAttendanceData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch attendance:", err);
      setAttendanceData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "staff") {
      fetchAttendance();
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <div className="container">
      <h2>Student Attendance - {user?.name}</h2>

      <label htmlFor="datePicker"><strong>Select Date:</strong></label><br />
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px" }}
      />

      {loading ? (
        <p>Loading attendance...</p>
      ) : attendanceData.length === 0 ? (
        <p style={{ color: "red" }}>No students assigned or data unavailable.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff0f5" }}>
            <thead>
              <tr style={{ backgroundColor: "#ffcce6" }}>
                <th style={{ padding: "10px", border: "1px solid pink" }}>Student Name</th>
                <th style={{ padding: "10px", border: "1px solid pink" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid pink" }}>{student.name}</td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid pink",
                      color:
                        student.status === "Absent"
                          ? "red"
                          : student.status === "Not enrolled yet"
                          ? "gray"
                          : "green",
                    }}
                  >
                    {student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ViewAttendance;
*/
/*
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const staffName = JSON.parse(localStorage.getItem("user"))?.name;

  const fetchAttendance = async (date) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/attendance/by-supervisor/${staffName}/date/${date}`
      );
      setRecords(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching attendance:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container">
      <h2>View Attendance</h2>
      <label>Select Date: </label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      <br /><br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="2">No students assigned or data unavailable.</td>
                </tr>
              ) : (
                records.map((rec, idx) => (
                  <tr key={idx}>
                    <td>{rec.name}</td>
                    <td>{rec.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ViewAttendance;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAttendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async (date) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/by-supervisor/${user.name}/date/${date}`);
      setAttendance(res.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setAttendance([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#ffe6f0", minHeight: "100vh" }}>
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

      {/* Show total assigned student count */}
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
                  <td style={tableCellStyle}>
                    {record.status === "Not enrolled yet" ? (
                      <span style={{ color: "gray", fontStyle: "italic" }}>{record.status}</span>
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
