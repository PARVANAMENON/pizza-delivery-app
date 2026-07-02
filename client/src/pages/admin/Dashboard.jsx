import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { getDashboard } from "../../services/dashboardService";
import "../../styles/admin/dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data.dashboard);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <>
        <AdminSidebar />
        <div className="dashboard-content">
          <h2>Loading Dashboard...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminSidebar />

      <div className="dashboard-content">
        <h1>📊 Admin Dashboard</h1>

        <div className="stats-grid">

          <div className="stat-card">
            <h2>{data.totalOrders}</h2>
            <p>Total Orders</p>
          </div>

          <div className="stat-card">
            <h2>₹{data.totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>

          <div className="stat-card">
            <h2>{data.totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="stat-card">
            <h2>{data.pendingOrders}</h2>
            <p>Pending Orders</p>
          </div>

          <div className="stat-card">
            <h2>{data.deliveredOrders}</h2>
            <p>Delivered Orders</p>
          </div>

          <div className="stat-card">
            <h2>{data.cancelledOrders}</h2>
            <p>Cancelled Orders</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;