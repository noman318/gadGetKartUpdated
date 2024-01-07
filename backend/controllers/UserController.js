const loginUser = async (req, res) => {
  const { email, password } = req.body;
  res.json({ message: "Logging IN" });
};
const registerUser = async (req, res) => {
  res.json({ message: "REGISTERNG" });
};

const logout = async (req, res) => {
  res.json({ message: "LoggedOut" });
};

const getUserProfile = async (req, res) => {
  res.json({ message: "get userProfile User" });
};

const updateUserProfile = async (req, res) => {
  res.json({ message: "update user profile" });
};

const getAllUsers = async (req, res) => {
  res.json({ message: "get user Data" });
};

const getUserById = async (req, res) => {
  res.json({ message: "get user Data" });
};

const deleteUser = async (req, res) => {
  res.json({ message: "delete user" });
};

const updateUser = async (req, res) => {
  res.json({ message: "get user Data" });
};

export {
  loginUser,
  registerUser,
  logout,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
};
