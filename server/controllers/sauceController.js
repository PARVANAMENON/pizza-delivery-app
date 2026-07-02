const Sauce = require("../models/Sauce");

// Add Sauce
exports.addSauce = async (req, res) => {
    try {
        const sauce = await Sauce.create(req.body);

        res.status(201).json({
            success: true,
            message: "Sauce Added Successfully",
            sauce
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Sauces
exports.getSauces = async (req, res) => {
    try {
        const sauces = await Sauce.find();

        res.status(200).json({
            success: true,
            count: sauces.length,
            sauces
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Sauce
exports.getSauce = async (req, res) => {
    try {
        const sauce = await Sauce.findById(req.params.id);

        if (!sauce) {
            return res.status(404).json({
                success: false,
                message: "Sauce Not Found"
            });
        }

        res.status(200).json({
            success: true,
            sauce
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Sauce
exports.updateSauce = async (req, res) => {
    try {
        const sauce = await Sauce.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!sauce) {
            return res.status(404).json({
                success: false,
                message: "Sauce Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Sauce Updated Successfully",
            sauce
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Sauce
exports.deleteSauce = async (req, res) => {
    try {
        const sauce = await Sauce.findById(req.params.id);

        if (!sauce) {
            return res.status(404).json({
                success: false,
                message: "Sauce Not Found"
            });
        }

        await sauce.deleteOne();

        res.status(200).json({
            success: true,
            message: "Sauce Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};