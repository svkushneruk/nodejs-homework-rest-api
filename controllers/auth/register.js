const { User } = require("../../models/user");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};

module.exports = register;
