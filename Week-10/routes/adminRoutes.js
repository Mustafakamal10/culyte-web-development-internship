const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authJwt");
const checkAccountStatus = require("../middlewares/account_status");
const authorizeRole = require("../middlewares/role");

router.get("/dashboard", verifyToken, checkAccountStatus, authorizeRole("admin"), adminController.getDashboard);

module.exports = router;
