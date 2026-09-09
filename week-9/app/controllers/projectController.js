const models = require("../models");

const getProjectUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const projectWithUsers = await models.Project.findByPk(id, {
      include: {
        model: models.User,
        as: "users",
        through: { attributes: [] }
      }
    });

    if (!projectWithUsers) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, data: projectWithUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjectUsers
};
