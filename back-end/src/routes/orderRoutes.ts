import express from "express";
import { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  cancelOrder 
} from "../controllers/orderController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authenticateUser, createOrder);
router.get("/", authenticateUser, getUserOrders);
router.get("/:orderId", authenticateUser, getOrderById);
router.patch("/:orderId/cancel", authenticateUser, cancelOrder);

export default router;