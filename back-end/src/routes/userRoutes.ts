import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware";
import upload from "../middlewares/multerMiddleware";
import { getUserDetails, updateUser, deleteUser, becomeSeller } from "../controllers/userController";

const router = express.Router();

// Get current user
router.get("/me", authenticateUser, getUserDetails);

// Update user profile
router.put("/update", authenticateUser, updateUser);

// Delete user account
router.delete("/delete", authenticateUser, deleteUser);

// Become a seller (upload proof)
router.patch("/become-seller", authenticateUser, upload.single("companyProof"), becomeSeller);

export default router;
