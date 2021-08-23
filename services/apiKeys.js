const { sequelize } = require("../lib/database/db");

class ApiKeyService {
  constructor() {
    this.table = sequelize.models.apiKey;
  }

  async createApiKey(apiKey) {
    try {
      const newApiKey = await this.table.create(apiKey);
      return newApiKey;
    } catch (error) {
      console.error(error);
    }
  }

  async getApiKey({ token }) {
    try {
      const newApiKey = await this.table.findOne({
        where: {
          token,
        },
      });
      return newApiKey;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { ApiKeyService };
