const boom = require("@hapi/boom");

const validate = (data, schema) => {
  const { error } = schema.validate(data);
  return error;
};

const schemaValidator = (schema, check = "body") => {
  return (req, res, next) => {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  };
};

module.exports = { schemaValidator };
