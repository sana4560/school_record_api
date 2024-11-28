const dotenv = require("dotenv");
const express = require("express");
const db = require("./config/db");
const SchoolRoutes = require("./routes/SchoolRoutes");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

// Mount routes
app.use("/api", SchoolRoutes); // Use /api as a prefix for your API endpoints

// Default route for testing
app.get("/", (req, res) => {
  res.send("Hello, world! The API is working.");
});

// Export the Express app for Vercel
module.exports = app;
