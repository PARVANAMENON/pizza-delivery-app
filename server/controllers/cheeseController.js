const Cheese = require("../models/Cheese");

// Add Cheese
exports.addCheese = async (req, res) => {
    try {
        const cheese = await Cheese.create(req.body);

        res.status(201).json({
            success: true,
            message: "Cheese Added Successfully",
            cheese
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Cheeses
exports.getCheeses = async (req, res) => {
    try {
        const cheeses = await Cheese.find();

        res.status(200).json({
            success: true,
            count: cheeses.length,
            cheeses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Cheese
exports.getCheese = async (req, res) => {
    try {
        const cheese = await Cheese.findById(req.params.id);

        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: "Cheese Not Found"
            });
        }

        res.status(200).json({
            success: true,
            cheese
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Cheese
exports.updateCheese = async (req, res) => {
    try {
        const cheese = await Cheese.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: "Cheese Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cheese Updated Successfully",
            cheese
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Cheese
exports.deleteCheese = async (req, res) => {
    try {
        const cheese = await Cheese.findById(req.params.id);

        if (!cheese) {
            return res.status(404).json({
                success: false,
                message: "Cheese Not Found"
            });
        }

        await cheese.deleteOne();

        res.status(200).json({
            success: true,
            message: "Cheese Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};