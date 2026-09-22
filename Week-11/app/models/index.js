const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config();

const dbName = process.env.DB_NAME || "week11_db";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbDialect = process.env.DB_DIALECT || "sqlite";

let sequelize;

if (dbDialect === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "..", "week11_db.sqlite"),
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

User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks"
});

Task.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

const db = {
  Sequelize,
  sequelize,
  User,
  Task
};

module.exports = db;
