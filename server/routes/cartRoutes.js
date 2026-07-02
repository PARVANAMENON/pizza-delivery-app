const express = require("express");
const router = express.Router();

const {
    addToCart,
    getCart,
    getCartItem,
    removeCartItem,
    clearCart
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// Add Item To Cart
router.post("/", protect, addToCart);

// Get User Cart
router.get("/", protect, getCart);

// Get Single Cart Item
router.get("/:id", protect, getCartItem);

// Remove Cart Item
router.delete("/:id", protect, removeCartItem);

// Clear Cart
router.delete("/", protect, clearCart);

module.exports = router;