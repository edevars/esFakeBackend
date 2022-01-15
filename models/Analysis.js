const { DataTypes } = require("sequelize");
const { id } = require("../utils/idDefinition");
const { sequelize } = require("../lib/database/db");

const Analysis = sequelize.define("analysis", {
  id,
  avgWordLen: DataTypes.FLOAT,
  sentimentTxt: DataTypes.FLOAT,
  numWords: DataTypes.INTEGER,
  numDiffWords: DataTypes.INTEGER,
  numStopwords: DataTypes.INTEGER,
  rateStopwordsWords: DataTypes.FLOAT,
  rateDiffwordsWords: DataTypes.FLOAT,
  predictionResult: DataTypes.BOOLEAN
});

module.exports = Analysis;
