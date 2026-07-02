import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  removeCartItem,
  clearCart,
} from "../../services/cartService";

import "../../styles/user/cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data.cart);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeCartItem(id);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = async () => {
    try {
      await clearCart();
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <div className="cart-page">

      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              className="cart-card"
              key={item._id}
            >

              <h2>{item.size} Pizza</h2>

              <p>
                <strong>Base :</strong>{" "}
                {item.base?.name}
              </p>

              <p>
                <strong>Sauce :</strong>{" "}
                {item.sauce?.name}
              </p>

              <p>
                <strong>Cheese :</strong>{" "}
                {item.cheese?.name}
              </p>

              <p>
                <strong>Vegetables :</strong>{" "}
                {item.veggies.length > 0
                  ? item.veggies
                      .map((v) => v.name)
                      .join(", ")
                  : "None"}
              </p>

              <p>
                <strong>Quantity :</strong>{" "}
                {item.quantity}
              </p>

              <h3>₹ {item.totalPrice}</h3>

              <div className="cart-actions">

  <button
    onClick={() => handleDelete(item._id)}
  >
    Remove
  </button>
<button
  className="buy-btn"
  onClick={() => {
    console.log("Item:", item);
    console.log("Item ID:", item._id);

    const url = `/checkout?id=${item._id}`;
    console.log("URL:", url);

    navigate(url);
  }}
>
  Buy Now
</button>
  

</div>

            </div>
          ))}

          

          
        </>
      )}
    </div>
  );
}

export default Cart;