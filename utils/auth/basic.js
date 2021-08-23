const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { UserService } = require("../../services/user");

passport.use(
  new BasicStrategy(async function (email, password, cb) {
    const userService = new UserService();
    try {
      console.log(email, password);
      const [user] = await userService.getUserByEmail(email);

      if (!user.dataValues) {
        return cb(boom.unauthorized("User or password are incorrect"), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.dataValues.password;

      return cb(null, user.dataValues);
    } catch (error) {
      return cb(error);
    }
  })
);
