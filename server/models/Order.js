const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    cartItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        }
    ],

    customerName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["Cash On Delivery", "Razorpay"],
        default: "Cash On Delivery"
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    },

    orderStatus: {
    type: String,
    enum: [
        "Order Received",
        "In Kitchen",
        "Sent To Delivery",
        "Delivered",
        "Cancelled"
    ],
    default: "Order Received"
}

},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
