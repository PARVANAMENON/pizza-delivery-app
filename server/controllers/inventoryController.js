const Base = require("../models/Base");
const Sauce = require("../models/Sauce");
const Cheese = require("../models/Cheese");
const Veggie = require("../models/Veggie");
const Topping = require("../models/Topping");

// ==========================================
// Get Complete Inventory
// ==========================================

exports.getInventory = async (req, res) => {

    try {

        const bases = await Base.find().sort({ name: 1 });

        const sauces = await Sauce.find().sort({ name: 1 });

        const cheeses = await Cheese.find().sort({ name: 1 });

        const veggies = await Veggie.find().sort({ name: 1 });

        const toppings = await Topping.find().sort({ name: 1 });

        res.status(200).json({

            success: true,

            inventory: {

                bases,

                sauces,

                cheeses,

                veggies,

                toppings

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Update Base Stock
// ==========================================

exports.updateBaseStock = async (req, res) => {

    try {

        const base = await Base.findById(req.params.id);

        if (!base) {

            return res.status(404).json({

                success: false,

                message: "Base Not Found"

            });

        }

        base.stock = req.body.stock;

        if (base.stock <= 0) {

            base.available = false;

        } else {

            base.available = true;

        }

        await base.save();

        res.status(200).json({

            success: true,

            message: "Base Stock Updated",

            base

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Update Sauce Stock
// ==========================================

exports.updateSauceStock = async (req, res) => {

    try {

        const sauce = await Sauce.findById(req.params.id);

        if (!sauce) {

            return res.status(404).json({

                success: false,

                message: "Sauce Not Found"

            });

        }

        sauce.stock = req.body.stock;

        sauce.available = sauce.stock > 0;

        await sauce.save();

        res.status(200).json({

            success: true,

            message: "Sauce Stock Updated",

            sauce

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Update Cheese Stock
// ==========================================

exports.updateCheeseStock = async (req, res) => {

    try {

        const cheese = await Cheese.findById(req.params.id);

        if (!cheese) {

            return res.status(404).json({

                success: false,

                message: "Cheese Not Found"

            });

        }

        cheese.stock = req.body.stock;

        cheese.available = cheese.stock > 0;

        await cheese.save();

        res.status(200).json({

            success: true,

            message: "Cheese Stock Updated",

            cheese

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Update Veggie Stock
// ==========================================

exports.updateVeggieStock = async (req, res) => {

    try {

        const veggie = await Veggie.findById(req.params.id);

        if (!veggie) {

            return res.status(404).json({

                success: false,

                message: "Veggie Not Found"

            });

        }

        veggie.stock = req.body.stock;

        veggie.available = veggie.stock > 0;

        await veggie.save();

        res.status(200).json({

            success: true,

            message: "Veggie Stock Updated",

            veggie

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Update Topping Stock
// ==========================================

exports.updateToppingStock = async (req, res) => {

    try {

        const topping = await Topping.findById(req.params.id);

        if (!topping) {

            return res.status(404).json({

                success: false,

                message: "Topping Not Found"

            });

        }

        topping.stock = req.body.stock;

        topping.available = topping.stock > 0;

        await topping.save();

        res.status(200).json({

            success: true,

            message: "Topping Stock Updated",

            topping

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
