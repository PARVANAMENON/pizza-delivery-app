const express = require("express");
const router = express.Router();

const {
    addTopping,
    getToppings,
    getTopping,
    updateTopping,
    deleteTopping
} = require("../controllers/toppingController");

// Add Topping
router.post("/", addTopping);

// Get All Toppings
router.get("/", getToppings);

// Get Single Topping
router.get("/:id", getTopping);

// Update Topping
router.put("/:id", updateTopping);

// Delete Topping
router.delete("/:id", deleteTopping);

module.exports = router;