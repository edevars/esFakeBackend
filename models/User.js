const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  sequelize.define("user", {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    userUrlPhoto: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = User;
