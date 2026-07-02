import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/profile.css";
import { getProfile } from "../../services/authService";
import { getOrders } from "../../services/orderService";
import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "../../services/addressService";
function Profile() {
const navigate = useNavigate();
 const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [addresses, setAddresses] = useState([]);

const [showForm, setShowForm] = useState(false);
const [orders, setOrders] = useState([]);
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  houseName: "",
  street: "",
  city: "",
  state: "",
});
useEffect(() => {

  const fetchProfile = async () => {

    try {

  const token = localStorage.getItem("token");

  // Get profile
  const response = await getProfile(token);
  setUser(response.data.user);

  // Get addresses
  const addressRes = await getAddresses(token);
  console.log("Addresses:", addressRes.data.addresses);
  setAddresses(addressRes.data.addresses);

  // Get orders
  const orderRes = await getOrders();
  console.log("Orders:", orderRes.data.orders);
  setOrders(orderRes.data.orders);

} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}

  };

  fetchProfile();

}, []);
const handleLogout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");

};
const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};

const handleAddAddress = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    const response = await addAddress(token, formData);

    setAddresses([...addresses, response.data.address]);

    setFormData({
      name: "",
      phone: "",
      houseName: "",
      street: "",
      city: "",
      state: "",
    });

    setShowForm(false);

  } catch (error) {

    console.log(error);

  }

};

const handleDelete = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await deleteAddress(token, id);

    setAddresses(
      addresses.filter((address) => address._id !== id)
    );

  } catch (error) {

    console.log(error);

  }

};
if (loading) {
  return <h2>Loading...</h2>;
}

if (!user) {
  return <h2>User not found.</h2>;
}
console.log("Orders count:", orders.length);
console.log("Address count:", addresses.length);
  return (

    <section className="profile-page">

      <div className="profile-container">

        {/* LEFT */}

        <div className="profile-sidebar">

          <div className="profile-card">

            <div className="profile-avatar">
    {user.name
      ?.split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()}
</div>

            <h2>{user.name}</h2>

            <p>{user.email}</p>

            <span className="verified">
              ✔ Verified Account
            </span>

          </div>

          <div className="quick-actions">

  <button
    onClick={() => navigate("/")}
  >
    Home
  </button>

  <button
    onClick={() => navigate("/orders")}
  >
    My Orders
  </button>

  <button
    className="logout"
    onClick={handleLogout}
  >
    Logout
  </button>

</div>

        </div>

        {/* RIGHT */}

        <div className="profile-content">

          <div className="section-card">

            <h2>Personal Information</h2>

            <div className="info-grid">

              <div className="info-box">
                <label>Full Name</label>
                <h4>{user.name}</h4>
              </div>

              <div className="info-box">
                <label>Email</label>
                <h4>{user.email}</h4>
              </div>

              <div className="info-box">
                <label>Phone</label>
                <h4>{user.phone || "Not Added"}</h4>
              </div>

              <div className="info-box">
                <label>Member Since</label>
                <h4>
  {new Date(user.createdAt).toLocaleDateString()}
</h4>
              </div>

            </div>

          </div>

          <div className="stats-grid">

  <div className="stat-card">
    <h1>{orders?.length || 0}</h1>
    <p>Total Orders</p>
  </div>

  <div className="stat-card">
    <h1>{addresses?.length || 0}</h1>
    <p>Saved Addresses</p>
  </div>

</div>

          <div className="section-card">

  <div className="address-header">

    <h2>Saved Addresses</h2>

    <button
      className="add-address-btn"
      onClick={() => setShowForm(!showForm)}
    >
      {showForm ? "Close" : "+ Add Address"}
    </button>

  </div>

  {showForm && (

    <form className="address-form" onSubmit={handleAddAddress}>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="houseName"
        placeholder="House Name"
        value={formData.houseName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="street"
        placeholder="Street"
        value={formData.street}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
      />

      <button type="submit" className="save-address-btn">
        Save Address
      </button>

    </form>

  )}

  {addresses.length === 0 ? (

    <div className="address-card">

      <p>No address added yet.</p>

    </div>

  ) : (

    addresses.map((address) => (

      <div className="address-card" key={address._id}>

        <div className="address-info">

          <h4>{address.name}</h4>

          <p>{address.phone}</p>

          <p>{address.houseName}</p>

          <p>{address.street}</p>

          <p>{address.city}, {address.state}</p>

        </div>

        <div className="address-actions">

          <button
  type="button"
  className="delete-btn"
  onClick={() => handleDelete(address._id)}
>
  Delete
</button>

        </div>

      </div>

    ))

  )}

</div>

            

        </div>

      </div>

    </section>

  );

}

export default Profile;