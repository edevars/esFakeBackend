const { sequelize } = require("../lib/db");

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
}

module.exports = { ApiKeyService };
