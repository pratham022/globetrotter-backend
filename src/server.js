require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import MongoDB connection function
const destinationRoutes = require("./routes/destinationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/destinations", destinationRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Globetrotter Backend!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));