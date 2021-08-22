const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");

const Website = (sequelize) => {
  sequelize.define("website", {
    id,
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
  });
};

module.exports = Website;
