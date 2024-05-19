import express from "express";
import {
  addProductReview,
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/ProductController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

router.route("/:id/reviews").post(protect, addProductReview);
export default router;
