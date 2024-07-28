const express = require("express");
const auth = require("../../middleware/authorisation/auth");
const User = require("../../service/schemas/user-schema");
const {
  registerUser,
  verifyEmail,
  resendVerificationEmail,
  logIn,
  logOut,
  currentUser,
  updateSubscription,
  updateAvatar,
} = require("../../controller/user-controllers");
const {
  validateUser,
  validateSubscription,
  validateUserEmail,
} = require("../../middleware/validators/user-validator");
const upload = require("../../middleware/upload");

const router = express.Router();

//REGISTER
router.post("/signup", validateUser, registerUser);

//VERIFY EMAIL
router.get("/verify/:verificationToken", verifyEmail);

//RESEND VERIFICATION EMAIL
router.post("/verify", validateUserEmail, resendVerificationEmail);

//LOG IN
router.post("/login", validateUser, logIn);

//LOG OUT
router.post("/logout", auth, logOut);

//CURRENT USER
router.get("/current", auth, currentUser);

// SET SUBSCRIPTION
router.patch("/", auth, validateSubscription, updateSubscription);

// UPDATE AVATAR
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
