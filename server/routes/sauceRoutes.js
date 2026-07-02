const express = require("express");
const router = express.Router();

const {
    addSauce,
    getSauces,
    getSauce,
    updateSauce,
    deleteSauce
} = require("../controllers/sauceController");

// Add Sauce
router.post("/", addSauce);

// Get All Sauces
router.get("/", getSauces);

// Get Single Sauce
router.get("/:id", getSauce);

// Update Sauce
router.put("/:id", updateSauce);

// Delete Sauce
router.delete("/:id", deleteSauce);

module.exports = router;