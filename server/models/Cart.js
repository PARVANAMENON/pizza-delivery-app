const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    

    size: {
        type: String,
        required: true,
        enum: ["Small", "Medium", "Large"]
    },

    base: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
        required: true
    },

    sauce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sauce",
        required: true
    },

    cheese: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cheese",
        required: true
    },

    veggies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Veggie"
        }
    ],

    toppings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topping"
        }
    ],

    quantity: {
        type: Number,
        default: 1
    },

    totalPrice: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema);