module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.STRING,
      defaultValue: "user",
      allowNull: false
    });
    await queryInterface.addColumn("Users", "account_status", {
      type: Sequelize.STRING,
      defaultValue: "active",
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "password");
    await queryInterface.removeColumn("Users", "role");
    await queryInterface.removeColumn("Users", "account_status");
  }
};
