const { User, Task, Sequelize } = require("../models");
const { Op } = Sequelize;

const getUsers = async (queryParams = {}) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 10;
  const offset = (page - 1) * limit;

  const where = {};

  // Filtering dynamically
  if (queryParams.role) {
    where.role = queryParams.role;
  }
  if (queryParams.account_status) {
    where.account_status = queryParams.account_status;
  }

  // Searching by name (partial match using LIKE)
  if (queryParams.search) {
    where.name = {
      [Op.like]: `%${queryParams.search}%`
    };
  }

  const { count, rows } = await User.findAndCountAll({
    where,
    limit,
    offset,
    include: [{ model: Task, as: "tasks" }],
    distinct: true
  });

  const totalPages = Math.ceil(count / limit);

  return {
    data: rows,
    page,
    limit,
    total: count,
    totalPages
  };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [{ model: Task, as: "tasks" }]
  });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

const createUser = async (userData) => {
  const { name, email, role, account_status } = userData;

  if (!name || !email) {
    const error = new Error("Name and email are required");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 400;
    throw error;
  }

  return await User.create({
    name,
    email,
    role: role || "user",
    account_status: account_status || "active"
  });
};

const updateUser = async (id, updateData) => {
  const user = await getUserById(id);
  return await user.update(updateData);
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  await user.destroy();
  return { message: "User deleted successfully" };
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

