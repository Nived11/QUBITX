import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateUser); 

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove/:productId", removeCartItem);
router.delete("/clear", clearCart);

export default router;
