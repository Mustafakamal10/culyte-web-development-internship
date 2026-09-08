const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserProject = sequelize.define(
    "UserProject",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  return UserProject;
};
