const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");
const { sequelize } = require("../lib/database/db");

const Analysis = sequelize.define("analysis", {
  id,
  score: DataTypes.FLOAT,
});

module.exports = Analysis;
