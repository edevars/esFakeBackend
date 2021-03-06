const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const boom = require("@hapi/boom");

// Utils
const { config } = require("../config");
const { scopesToArray } = require("../utils/scopesTransformation");
const { createUser } = require("../schemas/UserSchema");

// Services
const { UserService } = require("../services/user");
const { ApiKeyService } = require("../services/apiKeys");

// Validation handlers
const { schemaValidator } = require("../utils/middlewares/schemaValidator");

//Basic auth strategy
require("../utils/auth/basic");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  // Services
  const apiKeyService = new ApiKeyService();
  const userService = new UserService();

  router.post("/sign-in", async function (req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized("Api Key Token is required"));
    }

    passport.authenticate("basic", function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized("User or password are incorrect"));
        } else {
          req.login(user, { session: false }, async function (error) {
            if (error) {
              next(error);
            }

            const apiKey = await apiKeyService.getApiKey({
              token: apiKeyToken,
            });

            if (!apiKey) {
              next(
                boom.unauthorized(
                  "API Key not found or is incorrect. Pleace check if you have a valid API token"
                )
              );
            } else {
              const { id, email, userUrlPhoto } = user;

              const payload = {
                id,
                email,
                scopes: scopesToArray(apiKey.dataValues.scopes),
              };

              const token = jwt.sign(payload, config.authJwtSecret);

              return res
                .status(201)
                .json({ token, user: { id, email, userUrlPhoto } });
            }
          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(
    "/sign-up",
    schemaValidator(createUser),
    async function (req, res, next) {
      const { body: user } = req;
      try {
        let photo = null
        if(req.files){
          const { profilePhoto } = req.files;
          photo = profilePhoto
        }
        const userExists = await userService.getUserByEmail(user.email);
        
        if (userExists) {
          next(boom.badRequest("User already exists"));
        } else {
          const newUser = await userService.createUser(user, photo);
          if (newUser) {
            res.status(200).json(newUser);
          }
        }
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = { authApi };
