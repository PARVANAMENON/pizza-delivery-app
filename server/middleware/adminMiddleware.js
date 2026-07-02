const User = require("../models/User");

const isAdmin = async (req, res, next) => {
    try {

        console.log("===== ADMIN MIDDLEWARE =====");
        console.log("req.user:", req.user);

        const user = await User.findById(req.user._id);

        console.log("DB User:", user);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        console.log("Role:", user.role);

        if (user.role !== "admin") {
            console.log("Access Denied");
            return res.status(403).json({
                success: false,
                message: "Access Denied. Admin Only."
            });
        }

        console.log("Access Granted");

        next();

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = { isAdmin };