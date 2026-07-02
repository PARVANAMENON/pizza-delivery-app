const Veggie = require("../models/Veggie");

// Add Veggie
exports.addVeggie = async (req, res) => {
    try {
        const veggie = await Veggie.create(req.body);

        res.status(201).json({
            success: true,
            message: "Veggie Added Successfully",
            veggie
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Veggies
exports.getVeggies = async (req, res) => {
    try {
        const veggies = await Veggie.find();

        res.status(200).json({
            success: true,
            count: veggies.length,
            veggies
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Veggie
exports.getVeggie = async (req, res) => {
    try {
        const veggie = await Veggie.findById(req.params.id);

        if (!veggie) {
            return res.status(404).json({
                success: false,
                message: "Veggie Not Found"
            });
        }

        res.status(200).json({
            success: true,
            veggie
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Veggie
exports.updateVeggie = async (req, res) => {
    try {
        const veggie = await Veggie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!veggie) {
            return res.status(404).json({
                success: false,
                message: "Veggie Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Veggie Updated Successfully",
            veggie
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Veggie
exports.deleteVeggie = async (req, res) => {
    try {
        const veggie = await Veggie.findById(req.params.id);

        if (!veggie) {
            return res.status(404).json({
                success: false,
                message: "Veggie Not Found"
            });
        }

        await veggie.deleteOne();

        res.status(200).json({
            success: true,
            message: "Veggie Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};