const express = require("express");
const router = express.Router();

const {
    createOrder,
    createSingleOrder,
    getMyOrders,
    getAllOrders,
    getOrder,
    updateOrderStatus,
    cancelOrder
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

// Create Order
router.post("/", protect, createOrder);
router.post("/single", protect, createSingleOrder);
router.get("/admin", protect, getAllOrders);
// Get Logged-in User Orders
router.get("/", protect, getMyOrders);

// Get Single Order
router.get("/:id", protect, getOrder);

// Update Order Status
router.put("/:id", protect, updateOrderStatus);

// Cancel Order
router.put("/cancel/:id", protect, cancelOrder);

module.exports = router;
