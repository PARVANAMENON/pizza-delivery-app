import { useEffect, useMemo, useState } from "react";
import "../../styles/user/pizzaBuilder.css";
import heroPizza from "../../assets/images/hero-pizza.png";
import { getBases } from "../../services/baseService";
import { getSauces } from "../../services/sauceService";
import { getCheeses } from "../../services/cheeseService";
import { getVeggies } from "../../services/veggieService";
import { addToCart } from "../../services/cartService";
import { useNavigate } from "react-router-dom";
function PizzaBuilder() {
const navigate = useNavigate();
  const sizePrices = {
    Small: 249,
    Medium: 399,
    Large: 549,
  };

  


const [sauces, setSauces] = useState([]);
const [sauce, setSauce] = useState(null);

const [cheeses, setCheeses] = useState([]);
const [cheese, setCheese] = useState(null);
const [veggies, setVeggies] = useState([]);
const [selectedVeggies, setSelectedVeggies] = useState([]);
  

  const [size, setSize] = useState("Medium");
const [bases, setBases] = useState([]);
const [base, setBase] = useState(null);
 

 

  const [extraCheese, setExtraCheese] = useState(false);

  const [toppings, setToppings] = useState([]);

  const toggleVeggie = (item) => {

  if (selectedVeggies.some(v => v._id === item._id)) {

    setSelectedVeggies(
      selectedVeggies.filter(v => v._id !== item._id)
    );

  } else {

    setSelectedVeggies([
      ...selectedVeggies,
      item
    ]);

  }

};

  const veggieCost = useMemo(() => {

  return selectedVeggies.reduce(
    (total, item) => total + item.price,
    0
  );

}, [selectedVeggies]);
useEffect(() => {

  const fetchData = async () => {

    try {

      // Bases
      const baseRes = await getBases();
      console.log("Base Response:", baseRes.data);

      setBases(baseRes.data.bases);
console.log("Bases State:", baseRes.data.bases);
      if (baseRes.data.bases.length > 0) {
        setBase(baseRes.data.bases[0]);
      }

      // Sauces
      const sauceRes = await getSauces();

      setSauces(sauceRes.data.sauces);

      if (sauceRes.data.sauces.length > 0) {
        setSauce(sauceRes.data.sauces[0]);
      }

      // Cheeses
      const cheeseRes = await getCheeses();

      setCheeses(cheeseRes.data.cheeses);

      if (cheeseRes.data.cheeses.length > 0) {
        setCheese(cheeseRes.data.cheeses[0]);
      }
// Veggies
const veggieRes = await getVeggies();

setVeggies(veggieRes.data.veggies);
    } catch (error) {

      console.log(error);

    }

  };

  fetchData();

}, []);
 const totalPrice =
  sizePrices[size] +
  (base?.price || 0) +
  (sauce?.price || 0) +
  (cheese?.price || 0) +
  veggieCost +
  (extraCheese ? 70 : 0);
const handleAddToCart = async () => {

  if (!base || !sauce || !cheese) {
    alert("Please select base, sauce and cheese.");
    return;
  }

  try {

    const data = {

      size,
      base: base._id,
      sauce: sauce._id,
      cheese: cheese._id,
      veggies: selectedVeggies.map(v => v._id),
      toppings: [],
      quantity: 1

    };

    const res = await addToCart(data);

    alert(res.data.message);

    navigate("/cart");

  } catch (err) {

    console.log(err.response?.data || err);

    alert(
      err.response?.data?.message || "Failed to add to cart"
    );

  }

};
const handleBuyNow = async () => {
  if (!base || !sauce || !cheese) {
    alert("Please select base, sauce and cheese.");
    return;
  }

  try {
    const data = {
      size,
      base: base._id,
      sauce: sauce._id,
      cheese: cheese._id,
      veggies: selectedVeggies.map((v) => v._id),
      toppings: [],
      quantity: 1,
    };

    const res = await addToCart(data);

    const cartId = res.data.cart._id;

    navigate(`/checkout?id=${cartId}`);

  } catch (err) {
    console.log(err);
    alert("Failed to proceed to checkout");
  }
};
  return (

    <section className="builder-page">

      <div className="builder-wrapper">

        <div className="builder-left">

          <span className="builder-tag">
            PREMIUM CUSTOMIZATION
          </span>

          <h1>
            Craft Your
            <span> Perfect Pizza</span>
          </h1>

          <p className="builder-desc">
            Create your signature LaCrosta pizza by choosing your favourite size, pizza base, sauce, cheese and fresh toppings.
          </p>

          {/* Pizza Base */}

{/* Choose Size */}

<div className="selection-box">

  <h3>Choose Size</h3>

  <div className="option-grid">

    {Object.keys(sizePrices).map((item) => (

      <div
        key={item}
        className={
          size === item
            ? "option-card active"
            : "option-card"
        }
        onClick={() => setSize(item)}
      >

        <h4>{item}</h4>

        <span>₹{sizePrices[item]}</span>

      </div>

    ))}

  </div>

</div>

{/* Pizza Base */}

<div className="selection-box">

  <h3>Choose Pizza Base</h3>

  <div className="option-grid">

    {bases.map((item) => (

      <div
        key={item._id}
        className={
  base?._id === item._id
    ? "option-card active"
    : "option-card"
}
        onClick={() => setBase(item)}
      >

        <h4>{item.name}</h4>

      </div>

    ))}

  </div>

</div>
{/* Sauce */}

<div className="selection-box">

<h3>Choose Sauce</h3>

<div className="option-grid">

{sauces.map((item) => (

  <div
    key={item._id}
    className={
      sauce?._id === item._id
        ? "option-card active"
        : "option-card"
    }
    onClick={() => setSauce(item)}
  >

    <h4>{item.name}</h4>

  </div>

))}

</div>

</div>

{/* Cheese */}

<div className="selection-box">

<h3>Choose Cheese</h3>

<div className="option-grid">

{cheeses.map((item) => (

  <div
    key={item._id}
    className={
      cheese?._id === item._id
        ? "option-card active"
        : "option-card"
    }
    onClick={() => setCheese(item)}
  >

    <h4>{item.name}</h4>

  </div>

))}

</div>

</div>
                 <div className="selection-box">

  <h3>Choose Vegetables</h3>

  <div className="toppings-grid">

    {veggies.map((item) => (

      <div
        key={item._id}
        className={
          selectedVeggies.some(v => v._id === item._id)
            ? "topping-card active"
            : "topping-card"
        }
        onClick={() => toggleVeggie(item)}
      >

        <h4>{item.name}</h4>

        <p>+ ₹{item.price}</p>

      </div>

    ))}

  </div>

</div>

          <div className="cheese-section">

            <div
              className={
                extraCheese
                  ? "cheese-card active"
                  : "cheese-card"
              }

              onClick={() =>
                setExtraCheese(!extraCheese)
              }
            >

              <div>

                <h3>🧀 Extra Cheese</h3>

                <p>
                  Rich mozzarella topping
                </p>

              </div>

              <span>
                + ₹70
              </span>

            </div>

          </div>

        </div>

        <div className="builder-right">

          
          <div className="summary-card">

            <h2>
              Order Summary
            </h2>
<div className="summary-item">

  <span>Pizza Size</span>

  <strong>{size}</strong>

</div>
            <div className="summary-item">

<span>Pizza Base</span>

<strong>{base?.name}</strong>

</div>

<div className="summary-item">

<span>Sauce</span>

<strong>{sauce?.name}</strong>

</div>

<div className="summary-item">

<span>Cheese</span>

<strong>{cheese?.name}</strong>

</div>

            

            <div className="summary-item">

              <span>Size Price</span>

              <strong>
                ₹{sizePrices[size]}
              </strong>

            </div>

            

            <div className="summary-item">

              <span>Vegetables</span>

              <strong>
  ₹{veggieCost}
</strong>

            </div>

            <div className="summary-item">

              <span>Extra Cheese</span>

              <strong>

                {extraCheese
                  ? "₹70"
                  : "₹0"}

              </strong>

            </div>

            <div className="selected-list">

<h3>Selected Vegetables</h3>

<div className="selected-grid">

{selectedVeggies.length === 0 ? (

  <p>No vegetables selected</p>

) : (

  selectedVeggies.map((item) => (

    <div
      key={item._id}
      className="selected-card"
    >

      <span>{item.name}</span>

    </div>

  ))

)}

</div>

</div>

            <div className="total-price">

              <span>Total</span>

              <h1>
                ₹{totalPrice}
              </h1>

            </div>

            <div className="builder-buttons">

  <button
    className="cart-btn"
    onClick={handleAddToCart}
  >
    Add To Cart
  </button>

  <button
    className="buy-btn"
    onClick={handleBuyNow}
  >
    Buy Now
  </button>

</div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default PizzaBuilder;