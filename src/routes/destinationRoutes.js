const express = require("express");
const router = express.Router();
const { getAllDestinations, getDestinationById, getQuizQuestion, validateAnswer } = require("../controllers/destinationController");

// Route to fetch a random destination
router.get("/quiz", getQuizQuestion);

// Route to fetch all destinations
router.get("/", getAllDestinations);

// Route to fetch a single destination by ID
router.get("/:id", getDestinationById);

// Route to validate the user's answer
router.post("/quiz/validate", validateAnswer);

module.exports = router;
