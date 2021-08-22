const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");

const New = (sequelize) => {
  sequelize.define("new", {
    id,
    url: {
      type: DataTypes.STRING,
      unique: true
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING
  });
};

module.exports = New;
