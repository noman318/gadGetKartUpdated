import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  logout,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/UserController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(registerUser);
router.route("/login").post(loginUser);
router.post("/logout", logout);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;
