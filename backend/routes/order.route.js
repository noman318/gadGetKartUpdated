import express from "express";
const router = express.Router();

import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/OrderController.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);

router.route("/mine").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
export default router;
