import { Request, Response } from "express";
import { Otp } from "../models/otpModel";
import User from "../models/userModel";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../utils/sendOtpMail";

/////////////////////////////////////// Generate OTP (signup / forgot-password)///////////////////////////////////////////////////

export const generateOtp = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, userType, companyName, purpose } = req.body;
    const companyProof = req.file ? req.file.path : undefined;

    if (!email || !purpose) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // FORGOT PASSWORD OTP
    if (purpose === "forgot-password") {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const otp = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

      const otpDoc = new Otp({ email, otp, purpose, expiresAt });
      await otpDoc.save();
      await sendOtpEmail(email, otp,"forgot-password");

      return res.status(200).json({ message: "OTP sent to email", expiresAt, otp });
    }

    // SIGNUP OTP
    if (purpose === "signup") {
      // Check if this is a resend request (existing OTP)
      const existingOtp = await Otp.findOne({ email, purpose }).sort({ createdAt: -1 }).exec();

      if (existingOtp) {
        // Resend OTP using previous data
        const otp = crypto.randomInt(100000, 999999).toString();
        existingOtp.otp = otp;
        existingOtp.expiresAt = new Date(Date.now() + 2 * 60 * 1000);
        await existingOtp.save();
        await sendOtpEmail(email, otp ,"signup");

        return res.status(200).json({ message: "OTP resent to email", expiresAt: existingOtp.expiresAt, otp });
      }

      // First time signup OTP
      if (!name || !password || !userType) {
        return res.status(400).json({ message: "Missing required fields for signup" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

      const otpDoc = new Otp({
        name,
        email,
        phone,
        password: hashedPassword,
        userType,
        companyName: companyName || undefined,
        companyProof,
        otp,
        purpose,
        expiresAt,
      });

      await otpDoc.save();
      await sendOtpEmail(email, otp,"signup");

      return res.status(200).json({ message: "OTP sent to email", expiresAt,});
    }

    return res.status(400).json({ message: "Invalid purpose" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/////////////////////////////////////// Verify OTP (signup / forgot-password)////////////////////////////////////////////////////

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp, purpose } = req.body;

    if (!email || !otp || !purpose) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find latest non-expired OTP for this email & purpose
    const otpDoc = await Otp.findOne({ email, purpose })
  .sort({ createdAt: -1 })
  .exec();


    if (!otpDoc) return res.status(400).json({ message: "Invalid or expired OTP" });
    if (otpDoc.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    // FORGOT PASSWORD FLOW
    if (purpose === "forgot-password") {
      await Otp.deleteOne({ _id: otpDoc._id }); // remove OTP after use
      return res.status(200).json({ message: "OTP verified" });
    }

    // SIGNUP FLOW
    if (purpose === "signup") {
      const newUser = await User.create({
        name: otpDoc.name,
        email: otpDoc.email,
        phone: otpDoc.phone,
        password: otpDoc.password,
        userType: otpDoc.userType,
        companyName: otpDoc.companyName,
        companyProof: otpDoc.companyProof,
      });
      await Otp.deleteOne({ _id: otpDoc._id });

      return res.status(201).json({
        message: "User registered successfully",
        userId: newUser._id,
        companyProofUrl: newUser.companyProof,
      });
    }

    return res.status(400).json({ message: "Invalid purpose" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};
