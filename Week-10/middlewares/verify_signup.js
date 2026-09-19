const userModel = require("../models/userModel");

const verifySignup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Name is required"
    });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long"
    });
  }

  const existingUser = userModel.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email is already registered"
    });
  }

  next();
};

module.exports = verifySignup;
