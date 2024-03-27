const sequelize = require("../database/database");

async function syncTableIfNotExists(Model) {
    try {
        // Get the table name associated with the provided model
        const tableName = Model.getTableName();

        // Check if the table exists
        const tableExists = await sequelize.getQueryInterface().showAllTables().then(tables => tables.includes(tableName));

        if (!tableExists) {
            // If table doesn't exist, sync it
            await Model.sync();
            console.log(`${tableName} table created.`);
        } else {
            console.log(`${tableName} table already exists.`);
        }
    } catch (error) {
        console.error(`Error syncing table for model ${Model.name}:`, error);
    }
}


const Customer = require("./customer.model");
syncTableIfNotExists(Customer);
