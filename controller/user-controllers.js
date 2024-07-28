const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user-schema");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const fs = require("fs").promises;
const path = require("path");

require("dotenv").config();
const secret = process.env.SECRET;

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const avatarURL = gravatar.url(email, { s: "250", d: "identicon" });
    const newUser = new User({ email, avatarURL });
    await newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "This user doesn't exist" });
    }

    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1d" });
    user.token = token;
    await user.save();

    let avatarLink = "";

    const avatarURL = user.avatarURL;

    if (avatarURL.includes("avatars")) {
      avatarLink = `http://localhost:${
        process.env.MAIN_PORT || 3000
      }/${avatarURL}`;
    } else {
      avatarLink = avatarURL;
    }

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: avatarLink,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.token = null;
    await user.save();
    res.status(204).json({ message: "You successfully logged out" });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    let avatarLink = "";

    const avatarURL = req.user.avatarURL;

    if (avatarURL.includes("avatars")) {
      avatarLink = `http://localhost:${
        process.env.MAIN_PORT || 3000
      }/${avatarURL}`;
    } else {
      avatarLink = avatarURL;
    }

    res.status(200).json({
      user: {
        email: req.user.email,
        subscription: req.user.subscription,
        avatar: avatarLink,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { subscription },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tmpPath, originalname } = req.file;
    const { _id: userId } = req.user;

    const img = await Jimp.read(tmpPath);
    await img.resize(250, 250).writeAsync(tmpPath);

    const avatarsDir = path.join(__dirname, "../public/avatars");
    const newAvatarName = `${userId}-${originalname}`;
    const avatarURL = path.join("avatars", newAvatarName);
    const publicPath = path.join(avatarsDir, newAvatarName);

    await fs.rename(tmpPath, publicPath);

    await User.findByIdAndUpdate(userId, { avatarURL });

    const avatarLink = `http://localhost:${
      process.env.MAIN_PORT || 3000
    }/${avatarURL}`;

    res.status(200).json({
      avatarURL: avatarLink,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  logIn,
  logOut,
  currentUser,
  updateSubscription,
  updateAvatar,
};
