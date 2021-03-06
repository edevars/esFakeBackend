// Requiring definition models
require("../../models/Analysis");
require("../../models/ApiKey");
require("../../models/New");
require("../../models/User");

// Utils
const { createAssociations } = require("./createAssociations");

// Requiring sequelize instance
const { sequelize } = require("./db.js");

async function assertDatabaseConnectionOk() {
  console.log("Checking database connection...");
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.error("Unable to connect to the database:");
    console.error(error.message);
    process.exit(1);
  }
}

async function initConnection() {
  // checking connection to DB
  await assertDatabaseConnectionOk();
  // Creating associations
  createAssociations();
  // Synchronizing models
  console.log("Syncing models and associations");
  await sequelize.sync({
    logging: false,
    alter: true
  });
}

module.exports = { initConnection };
