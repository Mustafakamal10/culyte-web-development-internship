const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const requestLogger = require("./middlewares/logger");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

module.exports = app;
