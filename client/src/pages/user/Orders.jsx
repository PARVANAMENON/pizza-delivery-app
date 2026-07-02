import { useEffect, useState } from "react";
import { getOrders, cancelOrder } from "../../services/orderService";
import "../../styles/user/orders.css";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);
const handleCancel = async (id) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmCancel) return;

  try {
    await cancelOrder(id);

    
toast.success("Order cancelled successfully");
    fetchOrders();
  } catch (err) {
    console.log(err);
    toast.error("Unable to cancel order");
  }
};
  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="orders-page">

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Yet</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>

            <h2>Order #{order._id.slice(-6)}</h2>

            <p>
              <strong>Customer:</strong> {order.customerName}
            </p>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Address:</strong> {order.address}, {order.city} - {order.pincode}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>

            <p>
  <strong>Status:</strong>{" "}
  <span
    className={`status-badge ${
      order.orderStatus === "Order Received"
        ? "received"
        : order.orderStatus === "In Kitchen"
        ? "kitchen"
        : order.orderStatus === "Sent To Delivery"
        ? "delivery"
        : order.orderStatus === "Delivered"
        ? "delivered"
        : "cancelled"
    }`}
  >
    {order.orderStatus}
  </span>
</p>

{order.orderStatus !== "Delivered" &&
 order.orderStatus !== "Cancelled" && (
  <button
    onClick={() => handleCancel(order._id)}
    className="cancel-btn"
  >
    Cancel Order
  </button>
)}

            <hr />

            <h3>Pizzas</h3>

            {order.cartItems.map((item) => (
              <div key={item._id}>

                <p><b>Size:</b> {item.size}</p>

                <p><b>Base:</b> {item.base?.name}</p>

                <p><b>Sauce:</b> {item.sauce?.name}</p>

                <p><b>Cheese:</b> {item.cheese?.name}</p>

                <p>
                  <b>Vegetables:</b>{" "}
                  {item.veggies.length > 0
                    ? item.veggies.map(v => v.name).join(", ")
                    : "None"}
                </p>

                <p><b>Price:</b> ₹{item.totalPrice}</p>

                <hr />

              </div>
            ))}

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;