module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        name: "Mustafa",
        email: "mustafa@example.com",
        role: "admin",
        account_status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Ali",
        email: "ali@example.com",
        role: "user",
        account_status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
