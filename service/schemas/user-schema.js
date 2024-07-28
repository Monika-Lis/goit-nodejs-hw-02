const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

userSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};

userSchema.methods.isPasswordValid = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema, "users");
module.exports = User;
