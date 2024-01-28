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
  forgotPassword,
  resetPassword,
} from "../controllers/UserController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getAllUsers).post(registerUser);
router.route("/login").post(loginUser);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
