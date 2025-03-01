const express = require("express");
const router = express.Router();
const { registerUser, updateUserScore } = require("../controllers/userController");

// Route to register a user
router.post("/register", registerUser);

router.post("/update-score", updateUserScore);

module.exports = router;
