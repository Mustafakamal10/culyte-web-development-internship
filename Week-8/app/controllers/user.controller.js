const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const getUsers = (req, res) => {
  res.status(200).json({
    message: 'Users fetched successfully',
    data: users
  });
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((currentUser) => currentUser.id === userId);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
      data: null
    });
  }

  res.status(200).json({
    message: 'User fetched successfully',
    data: user
  });
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      message: 'Name is required',
      data: null
    });
  }

  const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  const newUser = {
    id: newId,
    name: name.trim()
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully',
    data: newUser
  });
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name } = req.body;
  const user = users.find((currentUser) => currentUser.id === userId);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
      data: null
    });
  }

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      message: 'Name is required',
      data: null
    });
  }

  user.name = name.trim();

  res.status(200).json({
    message: 'User updated successfully',
    data: user
  });
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'User not found',
      data: null
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.status(200).json({
    message: 'User deleted successfully',
    data: deletedUser
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};