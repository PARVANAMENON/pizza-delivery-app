const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// ===================================
// Create Razorpay Order
// ===================================
exports.createPayment = async (req, res) => {

    try {

        const { orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });

        }

        const options = {

            amount: order.totalAmount * 100,

            currency: "INR",

            receipt: order._id.toString()

        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({

            success: true,

            razorpayOrder,

            key: process.env.RAZORPAY_KEY_ID

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===================================
// Verify Payment
// ===================================
exports.verifyPayment = async (req, res) => {

    try {

        console.log("VERIFY BODY:", req.body);

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        console.log("Expected Signature:", expectedSignature);
        console.log("Received Signature:", razorpay_signature);

        if (expectedSignature !== razorpay_signature) {

    return res.status(400).json({
        success: false,
        message: "Payment Verification Failed"
    });

}

        const order = await Order.findById(orderId);

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        if (order.paymentStatus === "Paid") {

            return res.status(400).json({

                success: false,

                message: "Order Already Paid"

            });

        }

        order.paymentStatus = "Paid";
        order.paymentMethod = "Razorpay";

        await order.save();

        res.status(200).json({

            success: true,

            message: "Payment Verified Successfully",

            order

        });

    }

   catch (error) {
    console.log("VERIFY ERROR:", error);

    res.status(500).json({
        success: false,
        message: error.message
    });
}
};

// ===================================
// Get Razorpay Key
// ===================================
exports.getKey = async (req, res) => {

    res.status(200).json({

        success: true,

        key: process.env.RAZORPAY_KEY_ID

    });

};
