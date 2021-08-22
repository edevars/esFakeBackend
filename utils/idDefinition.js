const { DataTypes } = require("sequelize");

const id = {
  type: DataTypes.UUID,
  primaryKey: true,
  unique: true,
  defaultValue: DataTypes.UUIDV4,
};

module.exports = { id };
