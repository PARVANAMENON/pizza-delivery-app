const express = require("express");
const router = express.Router();

const {
    createPayment,
    verifyPayment,
    getKey
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// Get Razorpay Public Key
router.get("/key", protect, getKey);

// Create Razorpay Order
router.post("/create", protect, createPayment);

// Verify Payment
router.post("/verify", protect, verifyPayment);

module.exports = router;
