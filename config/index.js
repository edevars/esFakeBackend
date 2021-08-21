/* eslint-disable no-undef */
const dotenv = require("dotenv");

dotenv.config();

const config = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dev: process.env.NODE_ENV === "development",
};

module.exports = { config };
