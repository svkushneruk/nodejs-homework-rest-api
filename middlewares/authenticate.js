const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { RequestError } = require("../helpers/RequestError");

const { SECRET_CODE } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401, "Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_CODE);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      throw RequestError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authenticate;
