const express = require("express");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/itemRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api", itemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

module.exports = app;
