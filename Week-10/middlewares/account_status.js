const userModel = require("../models/userModel");

const checkAccountStatus = (req, res, next) => {
  const userId = req.user ? req.user.id : null;
  const user = userId ? userModel.findById(userId) : req.user;

  if (!user || user.account_status !== "active") {
    return res.status(403).json({
      success: false,
      message: "Account is inactive. Access forbidden."
    });
  }

  req.user = user;
  next();
};

module.exports = checkAccountStatus;
