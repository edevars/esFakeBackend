const Analysis = require("../../models/Analysis");
const New = require("../../models/New");
const Ranking = require("../../models/Ranking");
const User = require("../../models/User");
const Website = require("../../models/Website");

async function createAssociations() {
  //Many to many analysis did it
  User.belongsToMany(Analysis, { through: "UserAnalysis" });
  Analysis.belongsToMany(User, { through: "UserAnalysis" });

  // Manny users has many favorites
  User.belongsToMany(Analysis, { through: "Favorites" });
  Analysis.belongsToMany(User, { through: "Favorites" });

  // One analysis has one new
  Analysis.hasOne(New);
  New.belongsTo(Analysis);

  // One website has many news
  Website.hasMany(New);
  New.belongsTo(Website);

  // One website has many rankings
  Website.hasMany(Ranking);
  Ranking.belongsTo(Website);
}

module.exports = { createAssociations };
