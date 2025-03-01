const Invite = require("../models/Invite");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

exports.createInvite = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // Fetch user's score
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const inviteCode = uuidv4();
        const newInvite = new Invite({
            inviterUsername: username,
            inviteCode,
            inviterScore: user.score // Include score in invite
        });

        await newInvite.save();

        res.json({  
            inviteLink: `http://localhost:3000/api/invite/${inviteCode}`,
            inviterUsername: username,
            inviterScore: user.score
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getInviteDetails = async (req, res) => {
    try {
        const urlParts = req.originalUrl.split('/');
        const inviteCode = urlParts[urlParts.length - 1];

        const invite = await Invite.findOne({ inviteCode });
        if (!invite) {
            return res.status(404).json({ message: "Invite not found" });
        }

        res.json({
            inviterUsername: invite.inviterUsername,
            inviterScore: invite.inviterScore
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

