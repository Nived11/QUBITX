import { Request, Response } from "express";
import Cart from "../models/cartModel";
import Product from "../models/productModel";

// =================== ADD OR UPDATE CART ITEM ===================
// =================== ADD OR UPDATE CART ITEM ===================
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { productId, quantity = 1, color } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!productId) return res.status(400).json({ message: "Product ID is required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // -- Pick variant images or fallback --
    let selectedImages: string[] = [];

    if (color) {
      const variant = product.colorVariants.find(
        (v) => v.colorName.toLowerCase() === color.toLowerCase()
      );

      if (variant) {
        selectedImages = [...variant.images];   // <<--- Variant images
      } else {
        selectedImages = [...product.images];   // <<--- Main images
      }
    } else {
      selectedImages = [...product.images];
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.color?.toLowerCase() === color?.toLowerCase()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.images = selectedImages; // <<--- update variant image
    } else {
      cart.items.push({
        product: productId,
        quantity,
        color: color || product.color,
        images: selectedImages, // <<-- store variant images
      });
    }

    await cart.save();
    const populatedCart = await cart.populate("items.product");

    return res.status(200).json({
      message: "Product added to cart",
      cart: populatedCart,
    });

  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== GET USER CART ===================
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cart = await Cart.findOne({ user: userId }).populate("items.product"); // ✅ product populated
    if (!cart) return res.status(200).json({ cart: { items: [] } });

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== UPDATE ITEM QUANTITY ===================
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { productId, quantity } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const populatedCart = await cart.populate("items.product"); // ✅ populate again

    res.status(200).json({ message: "Cart updated", cart: populatedCart });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== REMOVE ITEM ===================
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();

    const populatedCart = await cart.populate("items.product"); // ✅ populate before send
    res.status(200).json({ message: "Item removed", cart: populatedCart });
  } catch (error) {
    console.error("Remove cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== CLEAR CART ===================
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
