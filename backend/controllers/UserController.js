import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select(
      "id name email isAdmin password"
    );
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      const { id, name, email, isAdmin } = user;
      const newUser = { id, name, email, isAdmin };
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
  const { email, name, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exist" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      generateToken(res, user._id);
      const { _id, name, email, isAdmin } = user;
      const newUser = { _id, name, email, isAdmin };

      res.status(201).json(newUser);
    } else {
      res.status(400).json({ messgae: "Invalid user data" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out successfully" });
};

const getUserProfile = async (req, res) => {
  // console.log("req.user._id", req.user._id);
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const { _id, name, email, isAdmin } = user;
      const newUser = { _id, name, email, isAdmin };
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ messgae: "User Not Found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.email = req.body.email || user.email;
      user.name = req.body.name || user.name;
      if (req.body.password) {
        user.password || req.user.password;
      }

      const updatedUser = await user.save();
      const { _id, name, email, isAdmin } = updatedUser;
      const newUser = { _id, name, email, isAdmin };
      res.status(200).json(newUser);
    } else {
      res.status(400).json({ messgae: "User Not Found" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
