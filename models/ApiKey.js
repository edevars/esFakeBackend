const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");

const ApiKey = (sequelize) => {
  sequelize.define("apiKey", {
    id,
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
    scopes: DataTypes.STRING,
  });
};

module.exports = ApiKey;
