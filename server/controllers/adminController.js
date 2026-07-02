const Order = require("../models/Order");

// ============================
// Dashboard
// ============================

exports.dashboard = async (req, res) => {
  try {
    const User = require("../models/User");
    const Pizza = require("../models/Pizza");

    const totalUsers = await User.countDocuments();
    const totalPizzas = await Pizza.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find().sort({ createdAt: -1 });

    let totalRevenue = 0;
    let pendingOrders = 0;
    let deliveredOrders = 0;
    let cancelledOrders = 0;

    orders.forEach((order) => {
      if (order.paymentStatus === "Paid") {
        totalRevenue += order.totalAmount;
      }

      if (
        order.orderStatus === "Order Received" ||
        order.orderStatus === "In Kitchen" ||
        order.orderStatus === "Sent To Delivery"
      ) {
        pendingOrders++;
      }

      if (order.orderStatus === "Delivered") {
        deliveredOrders++;
      }

      if (order.orderStatus === "Cancelled") {
        cancelledOrders++;
      }
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalPizzas,
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders,
        cancelledOrders,
      },
      recentOrders: orders.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get All Orders
// ============================

exports.getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()

        .populate("user", "name email")

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

// ============================
// Update Order Status
// ============================

exports.updateOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        const status = [

            "Order Received",

            "In Kitchen",

            "Sent To Delivery",

            "Delivered",

            "Cancelled"

        ];

        if (!status.includes(req.body.orderStatus)) {

            return res.status(400).json({

                success: false,

                message: "Invalid Status"

            });

        }

        order.orderStatus = req.body.orderStatus;

        await order.save();

        res.status(200).json({

            success: true,

            message: "Order Updated Successfully",

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