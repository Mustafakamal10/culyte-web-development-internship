const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authJwt");
const checkAccountStatus = require("../middlewares/account_status");
const verifySignup = require("../middlewares/verify_signup");

router.post("/signup", verifySignup, authController.signup);
router.post("/register", verifySignup, authController.signup);
router.post("/login", authController.login);
router.get("/profile", verifyToken, checkAccountStatus, authController.getProfile);

module.exports = router;
