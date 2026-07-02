const Order = require("../models/Order");
const Cart = require("../models/Cart");

const Base = require("../models/Base");
const Sauce = require("../models/Sauce");
const Cheese = require("../models/Cheese");
const Veggie = require("../models/Veggie");
const Topping = require("../models/Topping");

// ==========================
// Create Order
// ==========================
exports.createOrder = async (req, res) => {

    try {

        const {
            customerName,
            phone,
            address,
            city,
            pincode,
            paymentMethod
        } = req.body;

        // Get User Cart
        const cartItems = await Cart.find({
            user: req.user._id
        });

        if (cartItems.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Cart is Empty"
            });

        }

        // Calculate Total Amount
        let totalAmount = 0;

        for (const item of cartItems) {

            totalAmount += item.totalPrice;

            // =============================
            // Base
            // =============================

            const base = await Base.findById(item.base);

            if (base) {

                base.stock -= item.quantity;

                if (base.stock <= 0) {

                    base.stock = 0;
                    base.available = false;

                }

                await base.save();

            }

            // =============================
            // Sauce
            // =============================

            const sauce = await Sauce.findById(item.sauce);

            if (sauce) {

                sauce.stock -= item.quantity;

                if (sauce.stock <= 0) {

                    sauce.stock = 0;
                    sauce.available = false;

                }

                await sauce.save();

            }

            // =============================
            // Cheese
            // =============================

            const cheese = await Cheese.findById(item.cheese);

            if (cheese) {

                cheese.stock -= item.quantity;

                if (cheese.stock <= 0) {

                    cheese.stock = 0;
                    cheese.available = false;

                }

                await cheese.save();

            }

            // =============================
            // Veggies
            // =============================

            for (const veggieId of item.veggies) {

                const veggie = await Veggie.findById(veggieId);

                if (veggie) {

                    veggie.stock -= item.quantity;

                    if (veggie.stock <= 0) {

                        veggie.stock = 0;
                        veggie.available = false;

                    }

                    await veggie.save();

                }

            }

            // =============================
            // Toppings
            // =============================

            for (const toppingId of item.toppings) {

                const topping = await Topping.findById(toppingId);

                if (topping) {

                    topping.stock -= item.quantity;

                    if (topping.stock <= 0) {

                        topping.stock = 0;
                        topping.available = false;

                    }

                    await topping.save();

                }

            }

        }

        // =============================
        // Create Order
        // =============================

        const order = await Order.create({

            user: req.user._id,

            cartItems: cartItems.map(item => item._id),

            customerName,
            phone,
            address,
            city,
            pincode,

            totalAmount,

            paymentMethod,

            paymentStatus:
                paymentMethod === "Cash On Delivery"
                    ? "Pending"
                    : "Pending",

            orderStatus: "Order Received"

        });

        // =============================
        // Clear Cart
        // =============================

        await Cart.deleteMany({

            user: req.user._id

        });

        res.status(201).json({

            success: true,

            message: "Order Placed Successfully",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};// ==========================
// Create Single Order
// ==========================

exports.createSingleOrder = async (req, res) => {

    try {

        const {
            cartItemId,
            customerName,
            phone,
            address,
            city,
            pincode,
            paymentMethod
        } = req.body;

        const cartItem = await Cart.findById(cartItemId);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        const order = await Order.create({

            user: req.user._id,
            cartItems: [cartItem._id],

            customerName,
            phone,
            address,
            city,
            pincode,

            totalAmount: cartItem.totalPrice,

            paymentMethod,

            paymentStatus: "Pending",

            orderStatus: "Order Received"

        });

        await Cart.findByIdAndDelete(cartItemId);

        res.status(201).json({

            success: true,
            message: "Order placed successfully",
            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ==========================
// Get Logged-in User Orders
// ==========================

exports.getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user._id
        })

        .populate({
            path: "cartItems",
            populate: [
                { path: "pizza" },
                { path: "base" },
                { path: "sauce" },
                { path: "cheese" },
                { path: "veggies" },
                { path: "toppings" }
            ]
        })

        .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: orders.length,

            orders

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// Get All Orders (Admin)
// ==========================

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Get Single Order
// ==========================

exports.getOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)

        .populate({
            path: "cartItems",
            populate: [
                { path: "pizza" },
                { path: "base" },
                { path: "sauce" },
                { path: "cheese" },
                { path: "veggies" },
                { path: "toppings" }
            ]
        });

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        res.status(200).json({

            success: true,

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// Update Order Status
// ==========================

exports.updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        const allowedStatus = [

            "Order Received",

            "In Kitchen",

            "Sent To Delivery",

            "Delivered",

            "Cancelled"

        ];

        if (!allowedStatus.includes(req.body.orderStatus)) {

            return res.status(400).json({

                success: false,

                message: "Invalid Order Status"

            });

        }

        order.orderStatus = req.body.orderStatus;

        await order.save();

        res.status(200).json({

            success: true,

            message: "Order Status Updated Successfully",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// Cancel Order
// ==========================

exports.cancelOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        if (order.orderStatus === "Delivered") {

            return res.status(400).json({

                success: false,

                message: "Delivered Orders Cannot Be Cancelled"

            });

        }

        order.orderStatus = "Cancelled";

        await order.save();

        res.status(200).json({

            success: true,

            message: "Order Cancelled Successfully",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};