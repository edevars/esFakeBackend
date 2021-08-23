const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");

const ApiKey = (sequelize) => {
  sequelize.define("apiKey", {
    id,
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
    scopes: DataTypes.TEXT,
  });
};

module.exports = ApiKey;
