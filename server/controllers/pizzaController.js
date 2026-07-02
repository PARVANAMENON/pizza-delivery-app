const Pizza = require("../models/Pizza");

// Add Pizza
exports.addPizza = async (req, res) => {
    try {
        const pizza = await Pizza.create(req.body);

        res.status(201).json({
            success: true,
            message: "Pizza Added Successfully",
            pizza
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Pizzas
exports.getPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find();

        res.status(200).json({
            success: true,
            count: pizzas.length,
            pizzas
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Pizza
exports.getPizza = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);

        if (!pizza) {
            return res.status(404).json({
                success: false,
                message: "Pizza Not Found"
            });
        }

        res.status(200).json({
            success: true,
            pizza
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Pizza
exports.updatePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!pizza) {
            return res.status(404).json({
                success: false,
                message: "Pizza Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pizza Updated Successfully",
            pizza
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Pizza
exports.deletePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);

        if (!pizza) {
            return res.status(404).json({
                success: false,
                message: "Pizza Not Found"
            });
        }

        await pizza.deleteOne();

        res.status(200).json({
            success: true,
            message: "Pizza Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};