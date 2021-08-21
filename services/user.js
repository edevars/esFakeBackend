const { sequelize } = require("../lib/db");

class UserService {
  constructor() {
    this.table = sequelize.models.user;
  }

  async createUser(user) {
    const newUser = await this.table.create(user);
    return newUser;
  }
}

module.exports = { UserService };
