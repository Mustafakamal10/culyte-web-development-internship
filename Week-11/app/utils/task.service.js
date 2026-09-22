const { Task, User } = require("../models");

const getTasks = async () => {
  return await Task.findAll({
    include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
  });
};

const getTaskById = async (id) => {
  const task = await Task.findByPk(id, {
    include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
  });
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const createTask = async (taskData) => {
  const { title, description, status, userId } = taskData;

  if (!title) {
    const error = new Error("Task title is required");
    error.statusCode = 400;
    throw error;
  }

  if (userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error("Assigned user not found");
      error.statusCode = 404;
      throw error;
    }
  }

  return await Task.create({
    title,
    description: description || "",
    status: status || "pending",
    userId: userId || null
  });
};

const updateTask = async (id, updateData) => {
  const task = await getTaskById(id);

  if (updateData.userId) {
    const user = await User.findByPk(updateData.userId);
    if (!user) {
      const error = new Error("Assigned user not found");
      error.statusCode = 404;
      throw error;
    }
  }

  return await task.update(updateData);
};

const deleteTask = async (id) => {
  const task = await getTaskById(id);
  await task.destroy();
  return { message: "Task deleted successfully" };
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
