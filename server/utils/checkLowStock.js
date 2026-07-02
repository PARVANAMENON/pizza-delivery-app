const Base = require("../models/Base");
const Sauce = require("../models/Sauce");
const Cheese = require("../models/Cheese");
const Veggie = require("../models/Veggie");
const Topping = require("../models/Topping");
const sendEmail = require("./sendEmail");

const THRESHOLD =
Number(process.env.LOW_STOCK_THRESHOLD) || 20;

const checkLowStock = async () => {

    try {

        const lowStock = [];

        const checkItems = async (Model, name) => {

            const items = await Model.find({
                stock: { $lt: THRESHOLD }
            });

            items.forEach(item => {

                lowStock.push(
                    `${name}: ${item.name} (Stock: ${item.stock})`
                );

            });

        };

        await checkItems(Base, "Base");
        await checkItems(Sauce, "Sauce");
        await checkItems(Cheese, "Cheese");
        await checkItems(Veggie, "Veggie");
        await checkItems(Topping, "Topping");

        if (lowStock.length === 0) return;

        const html = `
            <h2>Low Stock Alert</h2>

            <p>The following inventory items are running low:</p>

            <ul>
                ${lowStock.map(item => `<li>${item}</li>`).join("")}
            </ul>
        `;

        await sendEmail(

            process.env.EMAIL_USER,

            "Pizza Inventory Low Stock Alert",

            html

        );

        console.log("📧 Low stock email sent.");

    }

    catch (error) {

        console.log(error.message);

    }

};

module.exports = checkLowStock;