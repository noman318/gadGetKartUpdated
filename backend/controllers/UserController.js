import User from "../models/User.model.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select(
      "id name email isAdmin password"
    );
    if (user && (await user.matchPassword(password))) {
      // console.log("user", user);
      const { id, name, email, isAdmin } = user;
      const newUser = { id, name, email, isAdmin };
      console.log("newUser", newUser);
      res.json(newUser);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
  try {
    const usersData = await User.find({}).select("-password");
    // console.log("usersData", usersData);
    return res.json(usersData);
  } catch (error) {
    console.log("error", error);
    throw new Error("Users Not Found");
  }
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
