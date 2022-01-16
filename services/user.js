const { sequelize } = require("../lib/database/db");
const { ImageService } = require("./images");
const Analysis = require("../models/Analysis");
const bcrypt = require("bcrypt");


const imageService = new ImageService("profile-pictures");
class UserService {
  constructor() {
    this.table = sequelize.models.user;
  }

  async createUser(user, photo) {
    const { password } = user;

    let photoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png"
    if(photo){
      photoUrl = await imageService.upload(photo);
    }

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
    const user = await this.table.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async getUserWithAnalyses(email) {
    const user = await this.table.findOne({
      where: {
        email,
      },
      include: Analysis
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
