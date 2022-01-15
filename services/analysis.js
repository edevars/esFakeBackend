const { sequelize } = require("../lib/database/db");

class AnalysisService {
  constructor() {
    this.table = sequelize.models.analysis;
  }

  async createAnalysis(analysis) {
    try {
      const newAnalysis = await this.table.create(analysis);
      return newAnalysis;
    } catch (error) {
      console.error(error);
    }
  }

  async getAnalysis({ id }) {
    try {
      const newApiKey = await this.table.findOne({
        where: {
          id,
        },
      });
      return newApiKey;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { AnalysisService };
