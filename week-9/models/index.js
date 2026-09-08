const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config();

const dbName = process.env.DB_NAME || "week9_relational_db";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbDialect = process.env.DB_DIALECT || "mysql";

let sequelize;

if (dbDialect === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "week9_relational_db.sqlite"),
    logging: false
  });
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    logging: false
  });
}

const User = require("./user")(sequelize);
const Task = require("./task")(sequelize);
const Project = require("./project")(sequelize);
const UserProject = require("./userProject")(sequelize);

User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks"
});

Task.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

User.belongsToMany(Project, {
  through: UserProject,
  foreignKey: "userId",
  otherKey: "projectId",
  as: "projects"
});

Project.belongsToMany(User, {
  through: UserProject,
  foreignKey: "projectId",
  otherKey: "userId",
  as: "users"
});

const db = {
  Sequelize,
  sequelize,
  User,
  Task,
  Project,
  UserProject
};

module.exports = db;
