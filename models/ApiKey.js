const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");
const { sequelize } = require("../lib/database/db");

const ApiKey = sequelize.define("apiKey", {
  id,
  token: {
    type: DataTypes.STRING,
    unique: true,
  },
  scopes: DataTypes.TEXT,
});

module.exports = ApiKey;
