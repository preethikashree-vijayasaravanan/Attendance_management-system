/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AttendancePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadRecords = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/${user._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to load records:", err);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const hasMarkedToday = () => {
    const today = new Date().toDateString();
    return records.some((rec) => new Date(rec.date).toDateString() === today);
  };

  const markAttendance = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (hasMarkedToday()) {
      setErrorMessage("🛑 Attendance already marked for today.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          setLoading(true);
          await axios.post(
            `http://localhost:5000/api/attendance/${user._id}`,
            {
              status,
              latitude,
              longitude,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          setSuccessMessage("✅ Today's attendance marked successfully!");
          loadRecords();
        } catch (err) {
          alert("Failed to mark attendance");
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        alert("Location permission denied or unavailable");
        console.error(error);
      }
    );
  };

  const calculatePercentage = () => {
    if (records.length === 0) return 0;
    const presentCount = records.filter((r) => r.status === "Present").length;
    return ((presentCount / records.length) * 100).toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Attendance</h2>

        <label>Select Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Full Day</option>
          <option value="Half Day">Half Day</option>
          <option value="Absent">Absent</option>
        </select>
        <button
          onClick={markAttendance}
          disabled={loading}
          style={{ marginLeft: "10px" }}
        >
          {loading ? "Marking..." : "Mark Attendance"}
        </button>

        {successMessage && (
          <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}

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

        <p>
          <strong>Attendance %:</strong> {calculatePercentage()}%
        </p>
      </div>
    </div>
  );
};

export default AttendancePage;
*/

import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendancePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [status, setStatus] = useState("Present");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [records, setRecords] = useState([]);

  // Get today's location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Location fetch failed")
    );
  };

  // Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userId: user._id,
        status,
        location,
      };

      await axios.post("http://localhost:5000/api/attendance", payload);
      alert("Attendance marked successfully");
      fetchAttendance();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to mark attendance";
      alert(msg);
    }
  };

  // Load attendance records
  const fetchAttendance = () => {
    axios
      .get(`http://localhost:5000/api/attendance/${user._id}`)
      .then((res) => setRecords(res.data))
      .catch(() => alert("Error loading attendance records"));
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Half Day">Half Day</option>
        </select>

        <button type="button" onClick={getLocation}>Get Location</button>

        {location.lat && (
          <div>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
          </div>
        )}

        <button type="submit">Mark Attendance</button>
      </form>

      <hr />

      <h3>Your Attendance Records</h3>
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
          {records.map((r, idx) => (
            <tr key={idx}>
              <td>{r.date}</td>
              <td>{r.status}</td>
              <td>{r.location?.lat || "–"}</td>
              <td>{r.location?.lng || "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;

