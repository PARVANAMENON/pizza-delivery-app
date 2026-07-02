const express = require("express");

const router = express.Router();

const {

    getInventory,

    updateBaseStock,

    updateSauceStock,

    updateCheeseStock,

    updateVeggieStock,

    updateToppingStock

} = require("../controllers/inventoryController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// Inventory Dashboard
router.get("/", protect, isAdmin, getInventory);

// Update Stock
router.put("/base/:id", protect, isAdmin, updateBaseStock);

router.put("/sauce/:id", protect, isAdmin, updateSauceStock);

router.put("/cheese/:id", protect, isAdmin, updateCheeseStock);

router.put("/veggie/:id", protect, isAdmin, updateVeggieStock);

router.put("/topping/:id", protect, isAdmin, updateToppingStock);

module.exports = router;
