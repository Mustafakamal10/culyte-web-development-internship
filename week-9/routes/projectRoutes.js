const express = require("express");
const router = express.Router();
const { getProjectUsers } = require("../controllers/projectController");

router.get("/:id/users", getProjectUsers);

module.exports = router;
