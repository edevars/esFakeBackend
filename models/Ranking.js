const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");
const { sequelize } = require("../lib/database/db");

const Ranking = sequelize.define("ranking", {
  id,
  score: DataTypes.FLOAT,
});

module.exports = Ranking;
