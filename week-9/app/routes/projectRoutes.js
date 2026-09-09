const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/:id/users", projectController.getProjectUsers);

module.exports = router;
