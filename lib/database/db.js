const { Sequelize } = require("sequelize");
const { config } = require("../../config");

const { dbUser, dbPassword, dbName, dbHost } = config;

const CONNECTION_URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`;

const sequelize = new Sequelize(CONNECTION_URI);

module.exports = { sequelize };