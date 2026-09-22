const express = require("express");
const cors = require("cors");
const logger = require("./app/middlewares/logger");
const errorHandler = require("./app/middlewares/errorHandler");
const userRoutes = require("./app/routes/userRoutes");
const taskRoutes = require("./app/routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
