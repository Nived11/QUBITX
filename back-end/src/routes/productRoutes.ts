import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getSellerProducts,
} from "../controllers/productController";
import upload from "../middlewares/multerMiddleware";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/add", authenticateUser, upload.any(), addProduct);
router.put("/update/:id", authenticateUser, upload.any(), updateProduct);
router.delete("/delete/:id", authenticateUser, deleteProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.get("/seller/my-products", authenticateUser, getSellerProducts);

export default router;
