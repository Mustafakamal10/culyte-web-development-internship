const users = [];
let nextId = 1;

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
