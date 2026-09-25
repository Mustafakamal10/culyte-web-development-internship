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
      },
      {
        id: 3,
        name: "Ali Raza",
        email: "aliraza@example.com",
        role: "user",
        account_status: "inactive",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Sara Ahmed",
        email: "sara@example.com",
        role: "admin",
        account_status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Usman Ali",
        email: "usman@example.com",
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
