const { sequelize } = require("../lib/database/db");
const { ImageService } = require("./images");
const bcrypt = require("bcrypt");

const imageService = new ImageService("profile-pictures");
class UserService {
  constructor() {
    this.table = sequelize.models.user;
  }

  async createUser(user, photo) {
    const { password } = user;
    const photoUrl = await imageService.upload(photo);
    const hashedPassword = await bcrypt.hash(password, 10);

    const tmpUser = {
      ...user,
      password: hashedPassword,
      userUrlPhoto: photoUrl,
    };

    let newUser = await this.table.create(tmpUser);

    delete newUser.dataValues.password;
    
    return newUser.dataValues;
  }

  async getUsers() {
    const users = await this.table.findAll();
    return users;
  }

  async getUserByEmail(email) {
    const user = await this.table.findAll({
      where: {
        email,
      },
    });
    return user;
  }

  async updateUserByEmail(fields, email) {
    const updatedUser = await this.table.update(fields, {
      where: {
        email,
      },
    });
    return updatedUser;
  }

  async deleteUserByEmail(email) {
    const deletedUser = await this.table.destroy({
      where: {
        email,
      },
    });
    return deletedUser;
  }
}

module.exports = { UserService };
