require("dotenv").config();
const app = require("./app");
const { sequelize, User, Task, Project, UserProject } = require("./app/models");

const PORT = process.env.PORT || 5000;

const seedInitialData = async () => {
  const userCount = await User.count();
  if (userCount === 0) {
    await User.bulkCreate([
      { id: 1, name: "Mustafa", email: "mustafa@example.com", bio: "Full stack developer intern" },
      { id: 2, name: "Ali", email: "ali@example.com", bio: "Backend developer" }
    ]);

    await Task.bulkCreate([
      { id: 1, title: "Complete database assignment", description: "Set up Sequelize models and migrations", dueDate: new Date(), userId: 1 },
      { id: 2, title: "Build dashboard", description: "Create frontend UI layout", dueDate: new Date(), userId: 1 },
      { id: 3, title: "Practice Sequelize", description: "Learn associations and data types", dueDate: new Date(), userId: 2 }
    ]);

    await Project.bulkCreate([
      { id: 1, name: "LMS Dashboard", description: "Learning management system project" },
      { id: 2, name: "E-Commerce Dashboard", description: "Online store management dashboard" }
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
    const { Sequelize } = require("sequelize");
    const path = require("path");
    const fallbackSequelize = new Sequelize({
      dialect: "sqlite",
      storage: path.join(__dirname, "week9_relational_db.sqlite"),
      logging: false
    });

    const FallbackUser = require("./app/models/user")(fallbackSequelize);
    const FallbackTask = require("./app/models/task")(fallbackSequelize);
    const FallbackProject = require("./app/models/project")(fallbackSequelize);
    const FallbackUserProject = require("./app/models/userProject")(fallbackSequelize);

    FallbackUser.hasMany(FallbackTask, { foreignKey: "userId", as: "tasks" });
    FallbackTask.belongsTo(FallbackUser, { foreignKey: "userId", as: "user" });
    FallbackUser.belongsToMany(FallbackProject, { through: FallbackUserProject, foreignKey: "userId", otherKey: "projectId", as: "projects" });
    FallbackProject.belongsToMany(FallbackUser, { through: FallbackUserProject, foreignKey: "projectId", otherKey: "userId", as: "users" });

    await fallbackSequelize.sync();
    const count = await FallbackUser.count();
    if (count === 0) {
      await FallbackUser.bulkCreate([
        { id: 1, name: "Mustafa", email: "mustafa@example.com", bio: "Full stack developer intern" },
        { id: 2, name: "Ali", email: "ali@example.com", bio: "Backend developer" }
      ]);
      await FallbackTask.bulkCreate([
        { id: 1, title: "Complete database assignment", description: "Set up Sequelize models and migrations", dueDate: new Date(), userId: 1 },
        { id: 2, title: "Build dashboard", description: "Create frontend UI layout", dueDate: new Date(), userId: 1 },
        { id: 3, title: "Practice Sequelize", description: "Learn associations and data types", dueDate: new Date(), userId: 2 }
      ]);
      await FallbackProject.bulkCreate([
        { id: 1, name: "LMS Dashboard", description: "Learning management system project" },
        { id: 2, name: "E-Commerce Dashboard", description: "Online store management dashboard" }
      ]);
      await FallbackUserProject.bulkCreate([
        { id: 1, userId: 1, projectId: 1 },
        { id: 2, userId: 1, projectId: 2 },
        { id: 3, userId: 2, projectId: 1 }
      ]);
    }

    require("./app/models").User = FallbackUser;
    require("./app/models").Task = FallbackTask;
    require("./app/models").Project = FallbackProject;
    require("./app/models").UserProject = FallbackUserProject;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

startServer();
