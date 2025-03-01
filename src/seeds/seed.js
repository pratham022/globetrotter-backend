require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Destination = require("../models/Destination");
const connectDB = require("../config/db"); // Import the database connection

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await connectDB();

        // Read JSON file from the correct directory
        const dataPath = path.join(__dirname, "destinations.json");
        const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        // Insert data into MongoDB
        await Destination.insertMany(data);
        console.log("Sample destinations added successfully!");
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
