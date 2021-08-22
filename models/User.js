const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");

const User = (sequelize) => {
  sequelize.define("user", {
    id,
    name: {
      type: DataTypes.STRING(100),
    },
    userUrlPhoto: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = User;
