import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
} from "../controllers/ProductController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById);
export default router;
