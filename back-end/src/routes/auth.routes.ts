import express from "express";
import { loginUser, logoutUser, refreshAccessToken, changePassword } from "../controllers/authController";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", changePassword);

export default router;
