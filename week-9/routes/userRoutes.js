const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserTasks,
  getUserProjects
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id/tasks", getUserTasks);
router.get("/:id/projects", getUserProjects);

module.exports = router;
