import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/user/checkout.css";
import { createSingleOrder } from "../../services/orderService";
import { getCartItem } from "../../services/cartService";
import {
  createPayment,
  verifyPayment,
} from "../../services/paymentService";
function Checkout() {

  const navigate = useNavigate();
  
const [searchParams] = useSearchParams();

const cartId = searchParams.get("id");
console.log("Cart ID:", cartId);
const [cartItem, setCartItem] = useState(null);
console.log("Received in Checkout:", cartItem);
  const [payment, setPayment] = useState("Cash On Delivery");
useEffect(() => {

 const fetchItem = async () => {
  try {
    console.log("Cart ID:", cartId);

    const res = await getCartItem(cartId);

    console.log("Full Response:", res);
    console.log("Response Data:", res.data);

    setCartItem(res.data.cart);
  } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  alert(err.response?.data?.message || "Failed to place order.");
}
};
  if (cartId) {
    fetchItem();
  }

}, [cartId]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};
const placeOrder = async () => {

  if (
    !form.name ||
    !form.phone ||
    !form.address ||
    !form.city ||
    !form.pincode
  ) {
    alert("Please fill all details.");
    return;
  }

  try {

    // Create order in DB
    const orderRes = await createSingleOrder({
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      pincode: form.pincode,
      paymentMethod: payment,
      cartItemId: cartItem._id
    });

    const order = orderRes.data.order;

    // Cash on Delivery
    if (payment === "Cash On Delivery") {

      alert("Order placed successfully");

      navigate("/orders");

      return;
    }

    // Razorpay
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Failed to load Razorpay.");
      return;
    }

    const paymentRes = await createPayment({
      orderId: order._id
    });

    const { razorpayOrder, key } = paymentRes.data;

    const options = {

      key,

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency,

      name: "LaCrosta",

      description: "Pizza Order",

      order_id: razorpayOrder.id,

      handler: async function (response) {

        try {

          await verifyPayment({

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature,

            orderId: order._id

          });

          alert("Payment Successful!");

          navigate("/orders");

        } catch (err) {

          console.log(err);

          alert("Payment Verification Failed");

        }

      },

      prefill: {

        name: form.name,

        contact: form.phone

      },

      theme: {

        color: "#6B8E62"

      }

    };

    const razor = new window.Razorpay(options);

    razor.open();

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Failed to place order."
    );

  }

};
const itemPrice = cartItem?.totalPrice || 0;

const deliveryCharge = 40;

const gst = Math.round(itemPrice * 0.05);

const grandTotal =
  itemPrice +
  deliveryCharge +
  gst;
  return (
    <div className="checkout-page">

      <div className="checkout-left">

        <h1>Checkout</h1>

        <div className="checkout-card">

          <h2>Customer Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            placeholder="Delivery Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
          />

        </div>

      </div>

      <div className="checkout-right">

        <div className="checkout-card">

          <h2>Payment Method</h2>

          <label>
  <input
    type="radio"
    value="Cash On Delivery"
    checked={payment === "Cash On Delivery"}
    onChange={(e) => setPayment(e.target.value)}
  />
  Cash On Delivery
</label>

<label>
  <input
    type="radio"
    value="Razorpay"
    checked={payment === "Razorpay"}
    onChange={(e) => setPayment(e.target.value)}
  />
  Razorpay
</label>

        </div>
<div className="checkout-card">

  <h2>Pizza Details</h2>

  <p><strong>Size:</strong> {cartItem?.size}</p>

  <p><strong>Base:</strong> {cartItem?.base?.name}</p>

  <p><strong>Sauce:</strong> {cartItem?.sauce?.name}</p>

  <p><strong>Cheese:</strong> {cartItem?.cheese?.name}</p>

  <p>
    <strong>Vegetables:</strong>{" "}
    {cartItem?.veggies?.length
      ? cartItem.veggies.map(v => v.name).join(", ")
      : "None"}
  </p>

</div>
        <div className="checkout-card">

          <h2>Order Summary</h2>

          <div className="summary-row">
    <span>Pizza Price</span>
<span>₹{itemPrice}</span>
</div>

<div className="summary-row">
    <span>Delivery Charge</span>
    <span>₹{deliveryCharge}</span>
</div>

<div className="summary-row">
    <span>GST (5%)</span>
    <span>₹{gst}</span>
</div>

<div className="summary-row total">
    <span>Total Payable</span>
    <span>₹{grandTotal}</span>
</div>

          <button
            className="place-order-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;