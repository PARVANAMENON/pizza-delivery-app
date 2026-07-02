const Topping = require("../models/Topping");

// Add Topping
exports.addTopping = async (req, res) => {
    try {
        const topping = await Topping.create(req.body);

        res.status(201).json({
            success: true,
            message: "Topping Added Successfully",
            topping
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Toppings
exports.getToppings = async (req, res) => {
    try {
        const toppings = await Topping.find();

        res.status(200).json({
            success: true,
            count: toppings.length,
            toppings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Topping
exports.getTopping = async (req, res) => {
    try {
        const topping = await Topping.findById(req.params.id);

        if (!topping) {
            return res.status(404).json({
                success: false,
                message: "Topping Not Found"
            });
        }

        res.status(200).json({
            success: true,
            topping
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Topping
exports.updateTopping = async (req, res) => {
    try {
        const topping = await Topping.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!topping) {
            return res.status(404).json({
                success: false,
                message: "Topping Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Topping Updated Successfully",
            topping
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Topping
exports.deleteTopping = async (req, res) => {
    try {
        const topping = await Topping.findById(req.params.id);

        if (!topping) {
            return res.status(404).json({
                success: false,
                message: "Topping Not Found"
            });
        }

        await topping.deleteOne();

        res.status(200).json({
            success: true,
            message: "Topping Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};