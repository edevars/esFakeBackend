const { sequelize } = require("../lib/database/db");
const { ImageService } = require("./images");

const imageService = new ImageService("profile-pictures");
class UserService {
  constructor() {
    this.table = sequelize.models.user;
  }

  async createUser(user, photo) {
    try {
      const photoUrl = await imageService.upload(photo);

      let tmpUser = {
        ...user,
        userUrlPhoto: photoUrl,
      };

      const newUser = await this.table.create(tmpUser);
      return newUser;
    } catch (error) {
      console.error(error);
    }
  }

  async getUsers() {
    try {
      const users = await this.table.findAll();
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.table.findAll({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async updateUserByEmail(fields, email) {
    try {
      const updatedUser = await this.table.update(fields, {
        where: {
          email,
        },
      });
      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUserByEmail(email) {
    try {
      const deletedUser = await this.table.destroy({
        where: {
          email,
        },
      });
      return deletedUser;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { UserService };
