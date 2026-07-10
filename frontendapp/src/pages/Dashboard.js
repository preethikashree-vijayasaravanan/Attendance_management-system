import StaffDashboard from "./StaffDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1>Dashboard</h1>
      {user.role === "staff" ? <StaffDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;