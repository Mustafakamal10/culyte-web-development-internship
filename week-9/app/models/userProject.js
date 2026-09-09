const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserProject = sequelize.define(
    "UserProject",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Projects",
          key: "id"
        }
      }
    },
    {
      timestamps: true
    }
  );

  return UserProject;
};
