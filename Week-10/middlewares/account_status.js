const checkAccountStatus = (req, res, next) => {
  if (!req.user || req.user.account_status !== "active") {
    return res.status(403).json({
      success: false,
      message: "Account is inactive. Access forbidden."
    });
  }
  next();
};

module.exports = checkAccountStatus;
