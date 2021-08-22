const express = require("express");
const { UserService } = require("../services/user");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const userService = new UserService();

  router.post("/sign-up", async function (req, res) {
    const { body: user } = req;
    const { profilePhoto } = req.files;
    try {
      const newUser = await userService.createUser(user, profilePhoto);
      if (newUser) {
        res.status(200).json(newUser);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
}

module.exports = { authApi };
