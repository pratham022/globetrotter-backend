const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username } = req.body;

        // Check if username is provided
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(200).json({ message: "User already exists", user });
        }

        // Create new user
        user = new User({ username });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updateUserScore = async (req, res) => {
    try {
        const { username, score } = req.body;

        console.log(username, score);

        // Check if username is provided (i.e., user is logged in)
        if (!username) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find the user
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's score
        user.score = score;
        await user.save();

        res.json({ message: "Score updated successfully", updatedScore: user.score });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};