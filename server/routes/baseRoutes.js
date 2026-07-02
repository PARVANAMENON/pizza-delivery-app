const express = require("express");
const router = express.Router();

console.log("✅ Base Routes Loaded");

const {
    addBase,
    getBases,
    getBase,
    updateBase,
    deleteBase
} = require("../controllers/baseController");

// Add Base
router.post("/", addBase);

// Get All Bases
router.get("/", getBases);

// Get Single Base
router.get("/:id", getBase);

// Update Base
router.put("/:id", updateBase);

// Delete Base
router.delete("/:id", deleteBase);

module.exports = router;