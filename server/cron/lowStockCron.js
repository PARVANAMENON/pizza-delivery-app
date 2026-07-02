const cron = require("node-cron");
const checkLowStock = require("../utils/checkLowStock");

const startCron = () => {

    console.log("✅ Low Stock Cron Started");

    cron.schedule("0 * * * *", async () =>  {

        console.log("🔍 Checking Inventory...");

        await checkLowStock();

    });

};

module.exports = startCron;