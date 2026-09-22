module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tasks", [
      {
        id: 1,
        title: "Setup Architecture",
        description: "Implement Route -> Controller -> Service -> Model flow",
        status: "completed",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "API Testing",
        description: "Test User and Task CRUD operations in Postman",
        status: "pending",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  }
};
