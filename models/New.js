const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");
const { sequelize } = require("../lib/database/db");

const New = sequelize.define("new", {
  id,
  url: {
    type: DataTypes.STRING,
    unique: true,
  },
  title: DataTypes.STRING,
  body: DataTypes.STRING,
});

module.exports = New;
