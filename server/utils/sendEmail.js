const transporter = require("../config/nodemailer");

const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });

        console.log("✅ Email sent successfully");
        console.log("Message ID:", info.messageId);

    } catch (error) {
        console.error("❌ Email sending failed");
        console.error(error);
        throw error;
    }
};

module.exports = sendEmail;