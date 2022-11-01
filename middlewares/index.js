const validateAddBody = require("./validateAddBody");
const validateUpdateBody = require("./validateUpdateBody");
const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateAddBody,
  validateUpdateBody,
  validateBody,
  authenticate,
  upload,
};
