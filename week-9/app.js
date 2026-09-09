const express = require("express");
const userRoutes = require("./app/routes/userRoutes");
const projectRoutes = require("./app/routes/projectRoutes");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

module.exports = app;
