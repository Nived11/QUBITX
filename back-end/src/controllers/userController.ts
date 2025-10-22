import { Request, Response } from "express";
import User from "../models/userModel";

// ===================== GET USER DETAILS =====================
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No user ID found" });
    }

    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return consistent user object
    res.status(200).json({
      _id: user._id,
      id: user._id, // Include both for compatibility
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      userType: user.userType,
      companyName: user.companyName || "",
      companyProof: user.companyProof || "",
    });
  } catch (error) {
    console.error("Get user details error:", error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// ===================== UPDATE USER =====================
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { name, phone } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, updatedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "Profile updated", 
      user: {
        _id: updatedUser._id,
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        userType: updatedUser.userType,
        companyName: updatedUser.companyName,
        companyProof: updatedUser.companyProof,
      }
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// ===================== DELETE USER =====================
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await User.findByIdAndDelete(userId);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===================== BECOME SELLER =====================
export const becomeSeller = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { companyName } = req.body;
    const companyProof = req.file ? (req.file as any).path : undefined;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!companyName || !companyProof) {
      return res.status(400).json({ message: "Company name and proof are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent re-upgrading an existing seller
    if (user.userType === "seller") {
      return res.status(400).json({ message: "User is already a seller" });
    }

    user.userType = "seller";
    user.companyName = companyName;
    user.companyProof = companyProof;
    await user.save();

    res.status(200).json({
      message: "You are now a seller!",
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        phone: user.phone,
        companyName: user.companyName,
        companyProof: user.companyProof,
      },
    });
  } catch (error) {
    console.error("Become seller error:", error);
    res.status(500).json({ message: "Server error" });
  }
};