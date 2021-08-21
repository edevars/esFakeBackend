const express = require("express");
const { UserService } = require("../services/user");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const userService = new UserService();

  router.post("/create", async function (req, res) {
    const { body: user } = req;

    try {
      const newUser = await userService.createUser(user);
      if (newUser) {
        res.status(200).json(newUser);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
}

module.exports = { authApi };
