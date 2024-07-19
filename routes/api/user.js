const express = require("express");
const auth = require("../../middleware/authorisation/auth");
const User = require("../../service/schemas/user-schema");
const {
  registerUser,
  logIn,
  logOut,
  currentUser,
  updateSubscription,
  updateAvatar,
} = require("../../controller/user-controllers");
const {
  validateUser,
  validateSubscription,
} = require("../../middleware/validators/user-validator");
const upload = require("../../middleware/upload");

const router = express.Router();

//REGISTER
router.post("/signup", validateUser, registerUser);

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
