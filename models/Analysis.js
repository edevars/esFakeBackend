const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");

const Analysis = (sequelize) => {
  sequelize.define("analysis", {
    id,
    score: DataTypes.FLOAT,
  });
};

module.exports = Analysis;
