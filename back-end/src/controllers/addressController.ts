import { Request, Response } from "express";
import Address from "../models/addressModel";
import mongoose from "mongoose";

// =================== GET ALL USER ADDRESSES ===================
export const getAddresses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const addresses = await Address.find({ user: userId })
      .sort({ isDefault: -1, createdAt: -1 }); // ✅ Default first, then newest

    res.status(200).json({ addresses });
  } catch (error) {
    console.error("Get addresses error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== GET SINGLE ADDRESS ===================
export const getAddressById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { addressId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid address ID" });
    }

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ message: "Address not found" });

    res.status(200).json({ address });
  } catch (error) {
    console.error("Get address error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== ADD ADDRESS ===================
export const addAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country = "India",
      landmark,
      isDefault = false,
      addressType = "Home",
    } = req.body;

    // ✅ Check if user has any addresses
    const existingAddressCount = await Address.countDocuments({ user: userId });
    const shouldBeDefault = isDefault || existingAddressCount === 0;

    // Create new address
    const newAddress = new Address({
      user: userId,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      landmark,
      isDefault: shouldBeDefault,
      addressType,
    });

    await newAddress.save(); // ✅ Pre-save middleware handles default logic

    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });

    res.status(201).json({
      message: "Address added successfully",
      address: newAddress,
      addresses,
    });
  } catch (error: any) {
    console.error("Add address error:", error);
    
    // ✅ Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

// =================== UPDATE ADDRESS ===================
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { addressId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid address ID" });
    }

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ message: "Address not found" });

    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      landmark,
      isDefault,
      addressType,
    } = req.body;

    // Update fields
    if (fullName !== undefined) address.fullName = fullName;
    if (phone !== undefined) address.phone = phone;
    if (addressLine1 !== undefined) address.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) address.addressLine2 = addressLine2;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;
    if (country !== undefined) address.country = country;
    if (landmark !== undefined) address.landmark = landmark;
    if (isDefault !== undefined) address.isDefault = isDefault;
    if (addressType !== undefined) address.addressType = addressType;

    await address.save(); // ✅ Pre-save middleware handles default logic

    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      message: "Address updated successfully",
      address,
      addresses,
    });
  } catch (error: any) {
    console.error("Update address error:", error);
    
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

// =================== DELETE ADDRESS ===================
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { addressId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid address ID" });
    }

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ message: "Address not found" });

    const wasDefault = address.isDefault;
    await address.deleteOne();

    // ✅ If deleted was default, set another as default
    if (wasDefault) {
      const nextAddress = await Address.findOne({ user: userId }).sort({ createdAt: -1 });
      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      message: "Address deleted successfully",
      addresses,
    });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== SET DEFAULT ADDRESS ===================
export const setDefaultAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { addressId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({ message: "Invalid address ID" });
    }

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ message: "Address not found" });

    address.isDefault = true;
    await address.save(); // ✅ Pre-save middleware handles unsetting others

    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      message: "Default address updated",
      address,
      addresses,
    });
  } catch (error) {
    console.error("Set default address error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== GET DEFAULT ADDRESS ===================
export const getDefaultAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const address = await Address.findOne({ user: userId, isDefault: true });
    
    if (!address) {
      return res.status(404).json({ message: "No default address found" });
    }

    res.status(200).json({ address });
  } catch (error) {
    console.error("Get default address error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
