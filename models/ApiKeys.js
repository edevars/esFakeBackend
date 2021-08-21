const { DataTypes } = require("sequelize");

const ApiKey = (sequelize) => {
  sequelize.define(
    "apiKeys",
    {
      token: {
        type: DataTypes.STRING,
        unique: true,
      },
      scopes: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
};

module.exports = ApiKey;
