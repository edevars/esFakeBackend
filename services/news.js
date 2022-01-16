const { sequelize } = require("../lib/database/db");

class NewsService {
  constructor() {
    this.table = sequelize.models.new;
  }

  async createNew(newObject) {
    try {
      const createdNew = await this.table.create(newObject);
      return createdNew;
    } catch (error) {
      console.error(error);
    }
  }

  async getNewByUrl(url) {
    try {
      const newByUrl = await this.table.findOne({
        where: {
          url,
        },
      });
      return newByUrl;
    } catch (error) {
      console.error(error);
    }
  }

  async getNewByAnalysesId(id) {
    try {
      const newById = await this.table.findOne({
        where: {
          analysisId: id,
        },
      });
      return newById;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { NewsService };
