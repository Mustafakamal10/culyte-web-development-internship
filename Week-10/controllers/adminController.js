const getDashboard = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Welcome to the admin dashboard",
      data: {
        admin: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboard
};
