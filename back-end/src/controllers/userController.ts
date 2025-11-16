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
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      userType: user.userType,
      companyName: user.companyName || "",
      companyProof: user.companyProof || "",
      sellerStatus: user.sellerStatus || "none",
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
        sellerStatus: updatedUser.sellerStatus,
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

// ===================== REQUEST TO BECOME SELLER =====================
export const requestBecomeSeller = async (req: Request, res: Response) => {
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

    // Check if user is already a seller
    if (user.userType === "seller") {
      return res.status(400).json({ message: "You are already a seller" });
    }

    // Check if there's already a pending request
    if (user.sellerStatus === "pending") {
      return res.status(400).json({ message: "Your seller request is already pending approval" });
    }

    // Update user with seller request details
    user.companyName = companyName;
    user.companyProof = companyProof;
    user.sellerStatus = "pending";
    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      message: "Seller request submitted successfully!.",
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        phone: user.phone,
        companyName: user.companyName,
        companyProof: user.companyProof,
        sellerStatus: user.sellerStatus,
      },
    });
  } catch (error) {
    console.error("Request become seller error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===================== ADMIN: APPROVE/REJECT SELLER REQUEST =====================
export const updateSellerStatus = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).userId;
    const { userId, status } = req.body; // status: "approved" or "rejected"

    // Check if requester is admin
    const admin = await User.findById(adminId);
    if (!admin || admin.userType !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    if (!userId || !status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.sellerStatus !== "pending") {
      return res.status(400).json({ message: "No pending seller request for this user" });
    }

    // Update user status
    if (status === "approved") {
      user.userType = "seller";
      user.sellerStatus = "approved";
    } else {
      user.sellerStatus = "rejected";
      // Optionally clear company details on rejection
      // user.companyName = "";
      // user.companyProof = "";
    }

    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      message: `Seller request ${status} successfully`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        sellerStatus: user.sellerStatus,
      },
    });
  } catch (error) {
    console.error("Update seller status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===================== ADMIN: GET ALL PENDING SELLER REQUESTS =====================
export const getPendingSellerRequests = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).userId;

    // Check if requester is admin
    const admin = await User.findById(adminId);
    if (!admin || admin.userType !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const pendingRequests = await User.find({ 
      sellerStatus: "pending" 
    }).select("-password");

    res.status(200).json({
      message: "Pending seller requests retrieved",
      requests: pendingRequests,
    });
  } catch (error) {
    console.error("Get pending seller requests error:", error);
    res.status(500).json({ message: "Server error" });
  }
};