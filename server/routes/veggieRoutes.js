const express = require("express");
const router = express.Router();

const {
    addVeggie,
    getVeggies,
    getVeggie,
    updateVeggie,
    deleteVeggie
} = require("../controllers/veggieController");

// Add Veggie
router.post("/", addVeggie);

// Get All Veggies
router.get("/", getVeggies);

// Get Single Veggie
router.get("/:id", getVeggie);

// Update Veggie
router.put("/:id", updateVeggie);

// Delete Veggie
router.delete("/:id", deleteVeggie);

module.exports = router;