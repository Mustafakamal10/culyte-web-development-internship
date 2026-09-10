module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Projects", [
      {
        id: 1,
        name: "LMS Dashboard",
        description: "Learning management system project",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "E-Commerce Dashboard",
        description: "Online store management dashboard",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Projects", null, {});
  }
};
