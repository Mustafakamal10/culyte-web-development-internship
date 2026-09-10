module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tasks", [
      {
        id: 1,
        title: "Complete Sequelize practice",
        description: "Practice models, associations, and queries with Sequelize",
        dueDate: new Date(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Build database relationships",
        description: "Implement one-to-many and many-to-many associations",
        dueDate: new Date(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: "Test MySQL connection",
        description: "Verify MySQL connection using mysql2 and environment variables",
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
