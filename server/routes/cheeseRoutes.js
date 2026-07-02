const express = require("express");
const router = express.Router();

const {
    addCheese,
    getCheeses,
    getCheese,
    updateCheese,
    deleteCheese
} = require("../controllers/cheeseController");

// Add Cheese
router.post("/", addCheese);

// Get All Cheeses
router.get("/", getCheeses);

// Get Single Cheese
router.get("/:id", getCheese);

// Update Cheese
router.put("/:id", updateCheese);

// Delete Cheese
router.delete("/:id", deleteCheese);

module.exports = router;