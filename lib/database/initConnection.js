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
  // Synchronizing models
  sequelize.sync({
    logging: false,
  });
}

module.exports = { initConnection };