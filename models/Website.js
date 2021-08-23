const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");
const { sequelize } = require("../lib/database/db");

const Website = sequelize.define("website", {
  id,
  name: DataTypes.STRING,
  domain: DataTypes.STRING,
});

module.exports = Website;
