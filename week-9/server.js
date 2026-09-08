require("dotenv").config();
const app = require("./app");
const { sequelize, User, Task, Project, UserProject } = require("./models");

const PORT = process.env.PORT || 5000;

const seedInitialData = async () => {
  const userCount = await User.count();
  if (userCount === 0) {
    await User.bulkCreate([
      { id: 1, name: "Mustafa", email: "mustafa@example.com" },
      { id: 2, name: "Ali", email: "ali@example.com" }
    ]);

    await Task.bulkCreate([
      { id: 1, title: "Complete database assignment", userId: 1 },
      { id: 2, title: "Build dashboard", userId: 1 },
      { id: 3, title: "Practice Sequelize", userId: 2 }
    ]);

    await Project.bulkCreate([
      { id: 1, name: "LMS Dashboard" },
      { id: 2, name: "E-Commerce Dashboard" }
    ]);

    await UserProject.bulkCreate([
      { id: 1, userId: 1, projectId: 1 },
      { id: 2, userId: 1, projectId: 2 },
      { id: 3, userId: 2, projectId: 1 }
    ]);
  }
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedInitialData();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("MySQL connection failed, falling back to SQLite for active endpoint testing...");
    const { Sequelize } = require("sequelize");
    const path = require("path");
    const fallbackSequelize = new Sequelize({
      dialect: "sqlite",
      storage: path.join(__dirname, "week9_relational_db.sqlite"),
      logging: false
    });

    const FallbackUser = require("./models/user")(fallbackSequelize);
    const FallbackTask = require("./models/task")(fallbackSequelize);
    const FallbackProject = require("./models/project")(fallbackSequelize);
    const FallbackUserProject = require("./models/userProject")(fallbackSequelize);

    FallbackUser.hasMany(FallbackTask, { foreignKey: "userId", as: "tasks" });
    FallbackTask.belongsTo(FallbackUser, { foreignKey: "userId", as: "user" });
    FallbackUser.belongsToMany(FallbackProject, { through: FallbackUserProject, foreignKey: "userId", otherKey: "projectId", as: "projects" });
    FallbackProject.belongsToMany(FallbackUser, { through: FallbackUserProject, foreignKey: "projectId", otherKey: "userId", as: "users" });

    await fallbackSequelize.sync();
    const count = await FallbackUser.count();
    if (count === 0) {
      await FallbackUser.bulkCreate([
        { id: 1, name: "Mustafa", email: "mustafa@example.com" },
        { id: 2, name: "Ali", email: "ali@example.com" }
      ]);
      await FallbackTask.bulkCreate([
        { id: 1, title: "Complete database assignment", userId: 1 },
        { id: 2, title: "Build dashboard", userId: 1 },
        { id: 3, title: "Practice Sequelize", userId: 2 }
      ]);
      await FallbackProject.bulkCreate([
        { id: 1, name: "LMS Dashboard" },
        { id: 2, name: "E-Commerce Dashboard" }
      ]);
      await FallbackUserProject.bulkCreate([
        { id: 1, userId: 1, projectId: 1 },
        { id: 2, userId: 1, projectId: 2 },
        { id: 3, userId: 2, projectId: 1 }
      ]);
    }

    require("./models").User = FallbackUser;
    require("./models").Task = FallbackTask;
    require("./models").Project = FallbackProject;
    require("./models").UserProject = FallbackUserProject;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

startServer();
