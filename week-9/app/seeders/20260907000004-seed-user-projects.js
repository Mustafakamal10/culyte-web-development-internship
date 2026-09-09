module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("UserProjects", [
      {
        id: 1,
        userId: 1,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserProjects", null, {});
  }
};
