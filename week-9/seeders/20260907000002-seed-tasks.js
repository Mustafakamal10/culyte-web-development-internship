module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tasks", [
      {
        id: 1,
        title: "Complete database assignment",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Build dashboard",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: "Practice Sequelize",
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
