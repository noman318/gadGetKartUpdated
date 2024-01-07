import express from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/").post(registerUser);
router.route("/logout").post(logout);
export default router;
