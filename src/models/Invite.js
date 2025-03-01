const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
    inviterUsername: { type: String, required: true },
    inviteCode: { type: String, unique: true, required: true },
    inviterScore: { type: Number, default: 0 },  // Store inviter's score
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Invite", inviteSchema);
