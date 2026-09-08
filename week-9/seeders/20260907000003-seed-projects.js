module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Projects", [
      {
        id: 1,
        name: "LMS Dashboard",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "E-Commerce Dashboard",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Projects", null, {});
  }
};
