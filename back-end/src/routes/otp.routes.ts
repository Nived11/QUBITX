import express from "express";
import { generateOtp, verifyOtp } from "../controllers/otpController";
import upload from "../middlewares/multerMiddleware";

const router = express.Router();

router.post("/generate-otp", upload.single("companyProof"), generateOtp);
router.post("/verify-otp", verifyOtp);

export default router;
