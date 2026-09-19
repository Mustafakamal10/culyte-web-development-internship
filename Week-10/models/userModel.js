const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("Admin123", 10),
    role: "admin",
    account_status: "active",
    createdAt: new Date().toISOString()
  }
];

let nextId = 2;

const findByEmail = (email) => {
  return users.find((user) => user.email === email);
};

const findById = (id) => {
  return users.find((user) => user.id === id);
};

const create = (userData) => {
  const newUser = {
    id: nextId++,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || "user",
    account_status: userData.account_status || "active",
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
};

const getAll = () => {
  return users;
};

module.exports = {
  findByEmail,
  findById,
  create,
  getAll
};
