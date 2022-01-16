const Analysis = require("../../models/Analysis");
const New = require("../../models/New");
const User = require("../../models/User");

async function createAssociations() {
  //Many to many analysis did it
  User.belongsToMany(Analysis, { through: "UserAnalysis" });
  Analysis.belongsToMany(User, { through: "UserAnalysis" });

  // One analysis has one new
  Analysis.hasOne(New);
  New.belongsTo(Analysis);

}

module.exports = { createAssociations };
