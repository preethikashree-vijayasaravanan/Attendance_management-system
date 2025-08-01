/*
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null; // Don't show navbar if user not logged in

  return (
    <div>
      <span><strong>Welcome, {user.name}</strong></span><br/>
      <button onClick={() => navigate("/attendance")}>View Attendance</button> 
      <button onClick={() => navigate("/profile")}>Edit Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
*/
/*
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return null;

  const navbarStyle = {
    backgroundColor: "#ffc1e3",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px #ff99bb",
    fontFamily: "Segoe UI, sans-serif",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#800040",
  };

  const buttonStyle = {
    marginLeft: "10px",
    padding: "8px 15px",
    backgroundColor: "#ff69b4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff3385",
  };

  return (
    <div style={navbarStyle}>
      <div style={titleStyle}>🎓 Attendance System</div>
      <div>
        {user.role === "student" && (
          <>
            <button
              style={buttonStyle}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              style={buttonStyle}
              onClick={() => navigate("/attendance")}
            >
              Attendance
            </button>
            <button
              style={buttonStyle}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </>
          
        )}
        {user.role === "staff" && (
          <>
            <button
              style={buttonStyle}
              onClick={() => navigate("/staff-dashboard")}
            >
              Dashboard
            </button>
            <button
              style={buttonStyle}
              onClick={() => navigate("/view-attendance")}
            >
              View Attendance
            </button>
            <button
              style={buttonStyle}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </>
        )}
        <button style={buttonStyle} onClick={handleLogout}>
  Logout
</button>

      </div>
    </div>
  );
};

export default Navbar;
*/

import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage", err);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); 
  };

  if (!user) return null;

  const navbarStyle = {
    backgroundColor: "#ffc1e3",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px #ff99bb",
    fontFamily: "Segoe UI, sans-serif",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#800040",
  };

  const buttonStyle = {
    marginLeft: "10px",
    padding: "8px 15px",
    backgroundColor: "#ff69b4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={navbarStyle}>
      <div style={titleStyle}>🎓 Attendance Management  System</div>
      <div>
        {user?.role === "student" && (
          <>
            <button style={buttonStyle} onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <button style={buttonStyle} onClick={() => navigate("/attendance")}>
              Attendance
            </button>
            <button style={buttonStyle} onClick={() => navigate("/profile")}>
              Profile
            </button>
          </>
        )}
        {user?.role === "staff" && (
          <>
            <button style={buttonStyle} onClick={() => navigate("/staff-dashboard")}>
              Dashboard
            </button>
            <button style={buttonStyle} onClick={() => navigate("/view-attendance")}>
              View Attendance
            </button>
            <button style={buttonStyle} onClick={() => navigate("/profile")}>
              Profile
            </button>
          </>
        )}
        <button style={buttonStyle} onClick={() => navigate("/")}>
  Logout
</button>

      </div>
    </div>
  );
};

export default Navbar;
