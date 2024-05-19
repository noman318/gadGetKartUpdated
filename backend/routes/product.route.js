import express from "express";
import {
  addProductReview,
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getTopProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProduct);

router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

router.route("/:id/reviews").post(protect, addProductReview);
export default router;
