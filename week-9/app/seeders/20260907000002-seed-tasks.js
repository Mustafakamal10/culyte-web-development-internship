module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tasks", [
      {
        id: 1,
        title: "Complete database assignment",
        description: "Set up Sequelize models and migrations",
        dueDate: new Date(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Build dashboard",
        description: "Create frontend UI layout",
        dueDate: new Date(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: "Practice Sequelize",
        description: "Learn associations and data types",
        dueDate: new Date(),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  }
};
