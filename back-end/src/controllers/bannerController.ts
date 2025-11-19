// controllers/bannerController.ts
import { Request, Response } from "express";
import Banner, { IBanner } from "../models/bannerModel";

// Get all active banners
export const getBanners = async (req: Request, res: Response): Promise<void> => {
  try {
    const banners: IBanner[] = await Banner.find({ active: true }).populate("productId", "name");
    res.status(200).json(banners);
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Add new banner (admin)
export const addBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, productId } = req.body;

    // Multer + Cloudinary stores file in req.file
    if (!req.file || !req.file.path) {
      res.status(400).json({ message: "Banner image is required" });
      return;
    }

    const image = req.file.path; // Cloudinary URL

    const banner: IBanner = await Banner.create({ name, image, productId });
    res.status(201).json(banner);
  } catch (err: any) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};