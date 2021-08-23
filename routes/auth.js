const express = require("express");
const { UserService } = require("../services/user");
const boom = require("@hapi/boom");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const userService = new UserService();

  router.post("/sign-up", async function (req, res, next) {
    const { body: user } = req;
    if (!req.files) {
      next(boom.badRequest("Profile picture not found"));
    }

    try {
      const { profilePhoto } = req.files;
      const newUser = await userService.createUser(user, profilePhoto);
      if (newUser) {
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  });
}

module.exports = { authApi };
