const { Sequelize } = require("sequelize");
const { config } = require("../config");

const { dbUser, dbPassword, dbName, dbHost } = config;

const CONNECTION_URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`;

const sequelize = new Sequelize(CONNECTION_URI);

//Defyning models
const modelDefiners = [require("../models/User"), require("../models/ApiKeys")];

modelDefiners.map((modelDefiner) => {
  modelDefiner(sequelize);
});

module.exports = { sequelize };