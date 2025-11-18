import { Request, Response } from "express";
import Product from "../models/productModel";

// ====================== ADD PRODUCT ======================
export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      actualPrice,
      discountedPrice,
      category,
      brand,
      warranty,
      description,
      whychoose,
      stock,
      color,
      specifications,
      colorVariants,
    } = req.body;

    const sellerId = (req as any).userId;
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

    // ✅ Calculate discount percentage from actual and discounted prices
    const discountPercentage = actualPrice > 0 
      ? Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)
      : 0;

    const newProduct = new Product({
      seller: sellerId,
      name,
      actualPrice,
      discountedPrice,
      discountPercentage, // ✅ Now calculated from prices
      category,
      brand,
      warranty,
      description,
      whychoose: parsedwhychoose,
      stock,
      specifications: parsedSpecifications,
      color,
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

    // Validate seller
    const existing = await Product.findById(productId);
    if (!existing) return res.status(404).json({ message: "Product not found" });
    if (existing.seller.toString() !== sellerId)
      return res.status(403).json({ message: "Access denied: not your product" });

    // Parse JSON fields
    const jsonFields = ["specifications", "whychoose", "colorVariants", "existingMainImages", "existingColorImages"];
    for (const field of jsonFields) {
      if (updates[field] && typeof updates[field] === "string") {
        try {
          updates[field] = JSON.parse(updates[field]);
        } catch {
          console.warn(`Invalid JSON for ${field}, skipping parse`);
          if (field === "specifications" || field === "whychoose") {
            updates[field] = [];
          }
        }
      }
    }

    const files = req.files as Express.Multer.File[];

    // Handle main images
    let finalMainImages = updates.existingMainImages || existing.images || [];
    const newMainImages = files?.filter((f) => f.fieldname === "mainImages")?.map((f) => (f as any).path) || [];
    if (newMainImages.length) {
      finalMainImages = [...finalMainImages, ...newMainImages];
    }
    updates.images = finalMainImages;

    // Handle color variants with images
    if (Array.isArray(updates.colorVariants) && updates.colorVariants.length) {
      const parsedColorVariants = typeof updates.colorVariants[0] === "string" 
        ? updates.colorVariants 
        : updates.colorVariants.map((cv: any) => cv.colorName || cv);

      const colorVariantObjects = parsedColorVariants.map((colorName: string) => {
        const existingImages = updates.existingColorImages?.[colorName] || [];
        const newColorImages = files
          ?.filter((f) => f.fieldname === `${colorName}Images`)
          ?.map((f) => (f as any).path) || [];

        return {
          colorName,
          images: [...existingImages, ...newColorImages]
        };
      });

      updates.colorVariants = colorVariantObjects;
    }

    // Remove temporary fields
    delete updates.existingMainImages;
    delete updates.existingColorImages;

    // ✅ Recalculate discount percentage if prices changed
    const actualPrice = updates.actualPrice ?? existing.actualPrice;
    const discountedPrice = updates.discountedPrice ?? existing.discountedPrice;
    updates.discountPercentage = actualPrice > 0 
      ? Math.round(((actualPrice - discountedPrice) / actualPrice) * 100)
      : 0;

    // Update product
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
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const query = userId ? { seller: { $ne: userId } } : {};

    const products = await Product.find(query)
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

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
    if (!sellerId) return res.status(401).json({ message: "Unauthorized" });

    const page = Number(req.query.page) || 1;
    const LIMIT = 12;
    const skip = (page - 1) * LIMIT;

    const totalProducts = await Product.countDocuments({ seller: sellerId });

    const products = await Product.find({ seller: sellerId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(LIMIT);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalProducts / LIMIT),
      totalProducts,
      pageSize: LIMIT,
      hasNextPage: page * LIMIT < totalProducts,
      hasPrevPage: page > 1,
      products,
    });
  } catch (error) {
    console.error("Get seller products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ====================== GET PRODUCTS BY CATEGORY (pagination + filters) ======================
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { minPrice, maxPrice, page = 1 } = req.query;
    const userId = (req as any).userId;

    const LIMIT = 12;
    const skip = (Number(page) - 1) * LIMIT;

    const filter: any = {
      category: { $regex: new RegExp("^" + category + "$", "i") },
    };

    // remove seller’s own products
    if (userId) {
      filter.seller = { $ne: userId };
    }

    // price filters
    if (minPrice) filter.discountedPrice = { ...filter.discountedPrice, $gte: Number(minPrice) };
    if (maxPrice) filter.discountedPrice = { ...filter.discountedPrice, $lte: Number(maxPrice) };

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(LIMIT);

    res.status(200).json({
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / LIMIT),
      hasMore: Number(page) * LIMIT < totalProducts
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
