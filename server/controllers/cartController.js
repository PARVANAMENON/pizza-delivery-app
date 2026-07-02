const Cart = require("../models/Cart");

const Base = require("../models/Base");
const Sauce = require("../models/Sauce");
const Cheese = require("../models/Cheese");
const Veggie = require("../models/Veggie");
const Topping = require("../models/Topping");

// =======================
// Add Item To Cart
// =======================
exports.addToCart = async (req, res) => {

    try {

        const {
            
            size,
            base,
            sauce,
            cheese,
            veggies,
            toppings,
            quantity
        } = req.body;

        // Find Pizza
        const sizePrices = {
    Small: 249,
    Medium: 399,
    Large: 549
};

let totalPrice = sizePrices[size];
        // Get Base
        const baseData = await Base.findById(base);

        if (!baseData) {
            return res.status(404).json({
                success: false,
                message: "Base Not Found"
            });
        }

        totalPrice += baseData.price;

        // Get Sauce
        const sauceData = await Sauce.findById(sauce);

        if (!sauceData) {
            return res.status(404).json({
                success: false,
                message: "Sauce Not Found"
            });
        }

        totalPrice += sauceData.price;

        // Get Cheese
        const cheeseData = await Cheese.findById(cheese);

        if (!cheeseData) {
            return res.status(404).json({
                success: false,
                message: "Cheese Not Found"
            });
        }

        totalPrice += cheeseData.price;

        // Veggies
        if (veggies && veggies.length > 0) {

            const veggieData = await Veggie.find({
                _id: { $in: veggies }
            });

            veggieData.forEach(item => {
                totalPrice += item.price;
            });

        }

        // Toppings
        if (toppings && toppings.length > 0) {

            const toppingData = await Topping.find({
                _id: { $in: toppings }
            });

            toppingData.forEach(item => {
                totalPrice += item.price;
            });

        }

        totalPrice *= quantity;

        const cart = await Cart.create({

            user: req.user._id,

            

            size,

            base,

            sauce,

            cheese,

            veggies,

            toppings,

            quantity,

            totalPrice

        });

        res.status(201).json({
            success: true,
            message: "Item Added To Cart",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =======================
// Get Logged-in User Cart
// =======================
exports.getCart = async (req, res) => {

    try {

        const cart = await Cart.find({
            user: req.user._id
        })
        
        .populate("base")
        .populate("sauce")
        .populate("cheese")
        .populate("veggies")
        .populate("toppings");

        res.status(200).json({
            success: true,
            count: cart.length,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// =======================
// Get Single Cart Item
// =======================
exports.getCartItem = async (req, res) => {

    try {

        const item = await Cart.findById(req.params.id)
            .populate("base")
            .populate("sauce")
            .populate("cheese")
            .populate("veggies")
            .populate("toppings");

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found"
            });
        }

        res.status(200).json({
            success: true,
            cart: item
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// =======================
// Remove Cart Item
// =======================
exports.removeCartItem = async (req, res) => {

    try {

        const item = await Cart.findById(req.params.id);

        if (!item) {

            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found"
            });

        }

        await item.deleteOne();

        res.status(200).json({
            success: true,
            message: "Cart Item Removed"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =======================
// Clear Cart
// =======================
exports.clearCart = async (req, res) => {

    try {

        await Cart.deleteMany({
            user: req.user._id
        });

        res.status(200).json({
            success: true,
            message: "Cart Cleared"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};