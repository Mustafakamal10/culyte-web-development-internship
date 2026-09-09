const models = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const userWithTasks = await models.User.findByPk(id, {
      include: {
        model: models.Task,
        as: "tasks"
      }
    });

    if (!userWithTasks) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: userWithTasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const userWithProjects = await models.User.findByPk(id, {
      include: {
        model: models.Project,
        as: "projects",
        through: { attributes: [] }
      }
    });

    if (!userWithProjects) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: userWithProjects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserTasks,
  getUserProjects
};
