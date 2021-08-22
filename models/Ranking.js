const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");

const Ranking = (sequelize) => {
  sequelize.define("ranking", {
    id,
    score: DataTypes.FLOAT,
  });
};

module.exports = Ranking;
