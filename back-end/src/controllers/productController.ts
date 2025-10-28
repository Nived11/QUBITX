import { Request, Response } from "express";
import Product from "../models/productModel";

// ====================== ADD PRODUCT ======================
export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      actualPrice,
      discountPercentage,
      category,
      brand,
      warranty,
      description,
      whychoose,
      stock,
      specifications,
      colorVariants,
    } = req.body;

    const sellerId = (req as any).userId; // ✅ Added: Get seller ID from authenticated user
    if (!sellerId) return res.status(401).json({ message: "Unauthorized" });

    // Parse JSON fields
    const parsedwhychoose = whychoose ? JSON.parse(whychoose) : [];
    const parsedSpecifications = specifications ? JSON.parse(specifications) : [];
    const parsedColorVariants = colorVariants ? JSON.parse(colorVariants) : [];

    const files = req.files as Express.Multer.File[];

    // Main product images (up to 5)
    const mainImages =
      files?.filter((f) => f.fieldname === "mainImages")?.map((f) => (f as any).path) || [];

    // Dynamically map color variants
    const colorVariantObjects = parsedColorVariants.map((colorName: string) => {
      const colorImages = files
        .filter((f) => f.fieldname === `${colorName}Images`)
        .map((f) => (f as any).path);
      return { colorName, images: colorImages };
    });

    const newProduct = new Product({
      seller: sellerId, // ✅ Save which seller added it
      name,
      actualPrice,
      discountPercentage,
      category,
      brand,
      warranty,
      description,
      whychoose: parsedwhychoose,
      stock,
      specifications: parsedSpecifications,
      images: mainImages,
      colorVariants: colorVariantObjects,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// ====================== UPDATE PRODUCT ======================
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const sellerId = (req as any).userId;

    // ✅ Ensure only the product’s seller can edit
    const existing = await Product.findById(productId);
    if (!existing) return res.status(404).json({ message: "Product not found" });
    if (existing.seller.toString() !== sellerId)
      return res.status(403).json({ message: "Access denied: not your product" });

    // Parse JSON fields
    if (updates.specifications && typeof updates.specifications === "string")
      updates.specifications = JSON.parse(updates.specifications);
    if (updates.whychoose && typeof updates.whychoose === "string")
      updates.whychoose = JSON.parse(updates.whychoose);
    if (updates.colorVariants && typeof updates.colorVariants === "string")
      updates.colorVariants = JSON.parse(updates.colorVariants);

    const files = req.files as Express.Multer.File[];
    const mainImages =
      files?.filter((f) => f.fieldname === "mainImages")?.map((f) => (f as any).path) || [];

    if (mainImages.length) updates.$push = { images: { $each: mainImages } };

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// ====================== DELETE PRODUCT ======================
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const sellerId = (req as any).userId;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.seller.toString() !== sellerId)
      return res.status(403).json({ message: "Access denied: not your product" });

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ====================== GET ALL PRODUCTS ======================
export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.find().populate("seller", "name email").sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ====================== GET PRODUCT BY ID ======================
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "name email");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ====================== GET SELLER'S PRODUCTS ======================
export const getSellerProducts = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).userId;
    const products = await Product.find({ seller: sellerId }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get seller products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
