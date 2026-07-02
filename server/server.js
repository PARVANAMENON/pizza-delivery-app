const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const inventoryRoutes = require("./routes/inventoryRoutes");
const startCron = require("./cron/lowStockCron");
const addressRoutes = require("./routes/addressRoutes");
// Database
const connectDB = require("./config/db");



// Connect Database
connectDB();
startCron();
const app = express();

// ======================
// Middleware
// ======================

app.use(cors());
app.use(express.json());

// ======================
// Routes
// ======================

const authRoutes = require("./routes/authRoutes");

const pizzaRoutes = require("./routes/pizzaRoutes");

const baseRoutes = require("./routes/baseRoutes");
const sauceRoutes = require("./routes/sauceRoutes");
const cheeseRoutes = require("./routes/cheeseRoutes");
const veggieRoutes = require("./routes/veggieRoutes");
const toppingRoutes = require("./routes/toppingRoutes");

const cartRoutes = require("./routes/cartRoutes");

const orderRoutes = require("./routes/orderRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

const adminRoutes = require("./routes/adminRoutes");

// ======================
// Home
// ======================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Pizza Delivery API Running Successfully"

    });

});

// ======================
// API
// ======================

// Authentication
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
// Pizza
app.use("/api/pizzas", pizzaRoutes);

// Ingredients
app.use("/api/bases", baseRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/api/cheeses", cheeseRoutes);
app.use("/api/veggies", veggieRoutes);
app.use("/api/toppings", toppingRoutes);

// Cart
app.use("/api/cart", cartRoutes);

// Orders
app.use("/api/orders", orderRoutes);

// Payment
app.use("/api/payment", paymentRoutes);

// Admin
app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);
// ======================
// 404
// ======================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});