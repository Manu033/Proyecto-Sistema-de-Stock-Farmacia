const express = require("express");
const { registerUser, loginUser, verifyToken } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-token", verifyToken);

module.exports = router;
