const register = require("./register");
const verify = require("./verify");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  verify,
  login,
  getCurrent,
  logout,
  updateAvatar,
  resendEmail,
};
