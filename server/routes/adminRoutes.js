const express = require("express");

const router = express.Router();

const {

    dashboard,

    getAllOrders,

    updateOrder

} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const { isAdmin } = require("../middleware/adminMiddleware");

// Dashboard
router.get("/dashboard", protect, isAdmin, dashboard);

// Get All Orders
router.get("/orders", protect, isAdmin, getAllOrders);

// Update Order Status
router.put("/orders/:id", protect, isAdmin, updateOrder);

module.exports = router;