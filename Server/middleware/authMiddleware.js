/** @format */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Unauthorized." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // attach user
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token. Access denied." });
  }
};

module.exports = protect;
