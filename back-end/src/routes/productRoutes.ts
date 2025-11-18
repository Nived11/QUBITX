import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getSellerProducts,
  getProductsByCategory,
  searchProducts
} from "../controllers/productController";
import upload from "../middlewares/multerMiddleware";
import { authenticateUser } from "../middlewares/authMiddleware";
import { optionalAuthenticateUser } from "../middlewares/optionalAuthMiddleware";

const router = express.Router();

router.post("/add", authenticateUser, upload.any(), addProduct);
router.put("/update/:id", authenticateUser, upload.any(), updateProduct);
router.delete("/delete/:id", authenticateUser, deleteProduct);
router.get("/seller/my-products", authenticateUser, getSellerProducts);
router.get("/all", optionalAuthenticateUser, getAllProducts);
router.get("/search", optionalAuthenticateUser, searchProducts);
router.get("/category/:category", optionalAuthenticateUser, getProductsByCategory);
router.get("/:id", optionalAuthenticateUser, getProductById);

export default router;
