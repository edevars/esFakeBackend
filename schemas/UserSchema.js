const joi = require("@hapi/joi");

const createUser = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  profilePhoto: joi.any()
});

module.exports = { createUser };
