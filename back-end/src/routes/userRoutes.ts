import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware";
import upload from "../middlewares/multerMiddleware";
import { 
  getUserDetails, 
  updateUser, 
  deleteUser, 
  requestBecomeSeller,
  updateSellerStatus,
  getPendingSellerRequests
} from "../controllers/userController";

const router = express.Router();

// Get current user
router.get("/me", authenticateUser, getUserDetails);

// Update user profile
router.put("/update", authenticateUser, updateUser);

// Delete user account
router.delete("/delete", authenticateUser, deleteUser);

// Request to become a seller (with proof upload)
router.post("/request-seller", authenticateUser, upload.single("companyProof"), requestBecomeSeller);

// Admin routes
router.patch("/admin/seller-status", authenticateUser, updateSellerStatus);
router.get("/admin/pending-sellers", authenticateUser, getPendingSellerRequests);

export default router;