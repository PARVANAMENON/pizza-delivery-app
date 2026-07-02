const Base = require("../models/Base");

// Add Base
exports.addBase = async (req, res) => {
    try {
        const base = await Base.create(req.body);

        res.status(201).json({
            success: true,
            message: "Base Added Successfully",
            base
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Bases
exports.getBases = async (req, res) => {
    try {
        const bases = await Base.find();

        res.status(200).json({
            success: true,
            count: bases.length,
            bases
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Base
exports.getBase = async (req, res) => {
    try {
        const base = await Base.findById(req.params.id);

        if (!base) {
            return res.status(404).json({
                success: false,
                message: "Base Not Found"
            });
        }

        res.status(200).json({
            success: true,
            base
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Base
exports.updateBase = async (req, res) => {
    try {
        const base = await Base.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!base) {
            return res.status(404).json({
                success: false,
                message: "Base Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Base Updated Successfully",
            base
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Base
exports.deleteBase = async (req, res) => {
    try {
        const base = await Base.findById(req.params.id);

        if (!base) {
            return res.status(404).json({
                success: false,
                message: "Base Not Found"
            });
        }

        await base.deleteOne();

        res.status(200).json({
            success: true,
            message: "Base Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};