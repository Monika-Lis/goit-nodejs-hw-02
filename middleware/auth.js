const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user-schema");

const auth = async (req, res, next) => {
  const token = req.header("Authorisation")?.replace("Bearder", "");
  if (!token) {
    return res.status(401).json({ message: "Not authorised" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorised" });
    }
    req.user = user;
    nect();
  } catch (err) {
    res.status(401).json({ message: "Not authorised" });
  }
};

module.exports = auth;
