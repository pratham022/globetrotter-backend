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
