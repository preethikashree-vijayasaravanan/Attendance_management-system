import React from "react";
import { Link } from "react-router-dom";

const NoticeBoard = () => (
  <div className="notice-board">
    <img
          src="https://velammalmedicalcollege.edu.in/college/wp-content/uploads/2021/08/5.png"
          alt="Velammal College Logo"
          style={{ height: "40px" }}
        />
    <h1>VELAMMAL COLLEGE OF ENGINEERING AND TECHNOLOGY , MADURAI</h1>
    <h2>Welcome to Our College Portal</h2><br/>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2l-stFU87vb0d9N8A_31BE9v8XQOQWQ9lAA&s" alt="Velammal College" style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }} />

    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
      <h3>Notice Board - Today</h3>
      <ul>
        <li>10 AM - AI Seminar at Auditorium</li>
        <li>1 PM - Project Submission Deadline</li>
        <li>4 PM - Staff Meeting in Conference Room</li>
      </ul>
    </div>
    <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
  </div>
);

export default NoticeBoard;
