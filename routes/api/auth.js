const express = require("express");
const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  authenticate,
  upload,
  resizefile,
} = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizefile,
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
