import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/adminOrderService";
import "../../styles/admin/orders.css";
import AdminSidebar from "../../components/AdminSidebar";
function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      toast.success("Order status updated");

      fetchOrders();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update order");
    }
  };

  return (
  <>
    <AdminSidebar />

    <div
      className="admin-orders"
      style={{ marginLeft: "260px" }}
    >
      <h1>Admin Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="admin-order-card"
        >
          <h3>Order #{order._id.slice(-6)}</h3>

          <p><b>Customer:</b> {order.customerName}</p>

          <p><b>Phone:</b> {order.phone}</p>

          <p><b>Total:</b> ₹{order.totalAmount}</p>

          <p><b>Payment:</b> {order.paymentMethod}</p>

          <select
            className="status-select"
            value={order.orderStatus}
            onChange={(e) =>
              handleStatusChange(order._id, e.target.value)
            }
          >
            <option>Order Received</option>
            <option>In Kitchen</option>
            <option>Sent To Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  </>
);
}

export default Orders;