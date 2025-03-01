const express = require("express");
const { createInvite, getInviteDetails } = require("../controllers/inviteController");
const router = express.Router();

router.post("/create", createInvite);
router.get("/:inviteCode", getInviteDetails);


module.exports = router;
