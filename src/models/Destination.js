const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
    city: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    clues: [{ type: String, required: true }], // Hints for guessing
    fun_facts: [{ type: String, required: true }], // Interesting facts
    trivia: [{ type: String, required: true }], // Extra knowledge
});

module.exports = mongoose.model("Destination", DestinationSchema);
