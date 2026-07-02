const crypto = require("crypto");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
// =======================
// Register User
// =======================

exports.register = async (req, res) => {

    try {
console.log("📩 Register Request:", req.body);
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({

                success: false,
                message: "User already exists"

            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const verificationTokenExpire =
            Date.now() + 1000 * 60 * 60;

        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpire,
            isVerified: false

        });

        const verifyURL =
            `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
console.log("Generated Token:", verificationToken);
console.log("Saved User Token:", user.verificationToken);
console.log("Verify URL:", verifyURL);
        const html = `

            <h2>Pizza Delivery</h2>

            <p>Hello ${user.name},</p>

            <p>Click the button below to verify your email.</p>

            <a href="${verifyURL}"
            style="
            background:#ff5722;
            color:white;
            padding:12px 25px;
            text-decoration:none;
            border-radius:5px;">
            Verify Email
            </a>

            <p>This link expires in 1 hour.</p>

        `;

        await sendEmail(

            user.email,

            "Verify Your Email",

            html

        );

        res.status(201).json({

            success: true,

            message:
                "Registration Successful. Please verify your email."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// =======================
// Verify Email
// =======================

exports.verifyEmail = async (req, res) => {
    try {

        const token = req.params.token;

        console.log("Received Token:", token);
        console.log("Current Time:", Date.now());

        let user = await User.findOne({
    verificationToken: token
});

if (!user) {
    return res.status(200).json({
        success: true,
        message: "Email is already verified."
    });
}

        console.log("Token Expiry:", user.verificationTokenExpire);

        if (user.verificationTokenExpire < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Verification link expired"
            });
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpire = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Email Verified Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// =======================
// Login User
// =======================

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Invalid Email"

            });

        }

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Invalid Password"

            });

        }

        if (!user.isVerified) {

            return res.status(401).json({

                success: false,

                message:
                    "Please verify your email before logging in."

            });

        }

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token: generateToken(user._id),

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// =======================
// Forgot Password
// =======================

exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User Not Found"

            });

        }

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpire =
            Date.now() + 1000 * 60 * 15;

        await user.save();

        const resetURL =

            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const html = `

        <h2>Pizza Delivery</h2>

        <p>Hello ${user.name},</p>

        <p>Click below to reset your password.</p>

        <a href="${resetURL}"
        style="
        background:#2196f3;
        color:white;
        padding:12px 25px;
        border-radius:5px;
        text-decoration:none;">
        Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>

        `;

        await sendEmail(

            user.email,

            "Reset Password",

            html

        );

        res.status(200).json({

            success: true,

            message:
                "Password Reset Link Sent Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// =======================
// Reset Password
// =======================

exports.resetPassword = async (req, res) => {

    try {

        const token = req.params.token;

        const { password } = req.body;

        const user = await User.findOne({

            resetPasswordToken: token,

            resetPasswordExpire: {

                $gt: Date.now()

            }

        });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Invalid or Expired Reset Link"

            });

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(

            password,

            salt

        );

        user.password = hashedPassword;

        user.resetPasswordToken = null;

        user.resetPasswordExpire = null;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password Reset Successful"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =======================
// Get Logged-in User
// =======================

exports.getProfile = async (req, res) => {

    try {

        res.status(200).json({

            success: true,

            user: req.user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};