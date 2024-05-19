import User from "../models/User.model.js";
import { sendForgotPasswordMail } from "../services/mailService.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const loginUser = async (req, res, next) => {
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
      throw new Error("Invalid email or password");

      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    // res.status(500).json({ message: "Internal Server Error" });
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  // console.log("email", email);
  try {
    const user = await User.findOne({ email }).select("id name email isAdmin");
    // console.log("user", user);
    const userId = user._id;
    const expiresIn = 60 * 60;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
    // console.log("tokenInController", token);
    if (user) {
      await sendForgotPasswordMail(user, token);
      res.json({ message: "Email send" });
    } else {
      throw new Error("Invalid Email");
    }
  } catch (error) {
    console.error("Error while Sending Mail:", error);
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.query;
  const { password } = req.body;
  // console.log("passwordFromBody", password);

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    // console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else if (req.body.password) {
      user.password = password;
      const updatedUser = await user.save();
      // console.log("userData", updatedUser);
      return res.json({ updatedUser });
    }
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
const registerUser = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exist");
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
      throw new Error("Invalid user data");

      // res.status(400).json({ messgae: "Invalid user data" });
    }
  } catch (error) {
    console.log("error", error);
    next(error);
    // res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out successfully" });
};

const getUserProfile = async (req, res, next) => {
  // console.log("req.user._id", req.user._id);
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const { _id, name, email, isAdmin } = user;
      const newUser = { _id, name, email, isAdmin };
      res.status(201).json(newUser);
    } else {
      res.status(400);
      throw new Error("User Not Found");
      // .json({ messgae: "User Not Found" });
    }
  } catch (error) {
    console.log("error", error);
    next(error);
    // res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res, next) => {
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
      throw new Error("User Not Found");
      // res.status(400).json({ messgae: "User Not Found" });
    }
  } catch (error) {
    console.log("error", error);
    next(error);
    // res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const usersData = await User.find({}).select("-password");
    // console.log("usersData", usersData);
    if (usersData) {
      return res.json(usersData);
    }
    throw new Error("Users Not Found");
  } catch (error) {
    console.log("error", error);
    next(error);
    // throw new Error("Users Not Found");
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      return res.json(user);
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Cannont delete Admin");
      } else {
        const deltedUser = await User.deleteOne({ _id: id });
        return res.json(deltedUser);
      }
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { email, name, isAdmin } = req.body;

  try {
    const user = await User.findById(id);
    if (user) {
      if (user) {
        user.name = name;
        user.email = email;
        user.isAdmin = Boolean(isAdmin);

        const updatedUser = await user.save();
        return res.json(updatedUser);
      } else {
        res.status(400);
      }
    }
  } catch (error) {
    console.log("error", error);
    next(error);
  }
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
  forgotPassword,
  resetPassword,
};
