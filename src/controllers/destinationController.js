const Destination = require("../models/Destination");

// Get all destinations
exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get a single destination by ID
exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json(destination);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get a quiz question
exports.getQuizQuestion = async (req, res) => {
    try {
        // Get a random destination
        const [correctDestination] = await Destination.aggregate([{ $sample: { size: 1 } }]);

        if (!correctDestination) {
            return res.status(404).json({ message: "No destinations found." });
        }

        // Get 3 incorrect options
        const incorrectDestinations = await Destination.aggregate([
            { $match: { _id: { $ne: correctDestination._id } } }, // Exclude the correct one
            { $sample: { size: 3 } } // Pick 3 random incorrect ones
        ]);

        // Prepare choices
        const choices = [...incorrectDestinations, correctDestination]
            .map(dest => ({ city: dest.city, country: dest.country }))
            .sort(() => Math.random() - 0.5); // Shuffle

        // Send quiz question
        res.json({
            clues: correctDestination.clues, // Clues for the user
            choices,
            questionId: correctDestination._id // ID of the correct destination
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Validate user's answer
exports.validateAnswer = async (req, res) => {
    try {
        const { questionId, selectedAnswer } = req.body;

        if (!questionId || !selectedAnswer) {
            return res.status(400).json({ message: "Question ID and selected answer are required." });
        }

        // Find the correct destination
        const correctDestination = await Destination.findById(questionId);
        if (!correctDestination) {
            return res.status(404).json({ message: "Question not found." });
        }

        // Check if the selected answer is correct
        const isCorrect = correctDestination.city.toLowerCase() === selectedAnswer.toLowerCase();

        return res.json({
            correct: isCorrect,
            ...(isCorrect ? {} : { correctAnswer: correctDestination.city, correctAnswerCountry: correctDestination.country }), // Send correct answer only if incorrect
            funFacts: correctDestination.fun_facts,
            trivia: correctDestination.trivia
        });
    } catch (error) {
        console.error("Error validating answer:", error);
        res.status(500).json({ message: "Server error" });
    }
};