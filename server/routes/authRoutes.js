const express = require("express");

const router = express.Router();

const {

    register,

    verifyEmail,

    login,

    forgotPassword,

    resetPassword,

    getProfile

} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// =========================
// Authentication
// =========================

// Register
router.post("/register", register);

// Verify Email
router.get("/verify-email/:token", verifyEmail);

// Login
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Logged-in User
router.get("/profile", protect, getProfile);

module.exports = router;