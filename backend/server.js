const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Google DNS

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// after middleware
app.use("/api/auth", require("./routes/auth"));


// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("CrediSkill Backend Running");
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
