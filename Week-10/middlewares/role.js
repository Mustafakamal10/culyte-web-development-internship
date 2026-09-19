const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden. Admin role required."
      });
    }
    next();
  };
};

module.exports = authorizeRole;
