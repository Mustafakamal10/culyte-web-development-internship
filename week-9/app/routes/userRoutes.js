const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:id/tasks", userController.getUserTasks);
router.get("/:id/projects", userController.getUserProjects);

module.exports = router;
