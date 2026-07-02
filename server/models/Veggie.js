const mongoose = require("mongoose");

const veggieSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        default: 100
    },

    available: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Veggie", veggieSchema);