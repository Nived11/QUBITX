import { Request, Response } from "express";
import Order from "../models/orderModel";
import Cart from "../models/cartModel";
import Product from "../models/productModel";
import { sendOrderPlacedEmail } from "../utils/sendOrderEmail";
import User from "../models/userModel";



export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const {
      addressId,
      paymentMethod,
      items,
      subtotal,
      discount,
      shipping,
      total,
      clearCart: shouldClearCart,
    } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!addressId || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate product & stock
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock `,
        });
      }
    }

    // ⭐ FIX: Build order items with correct variant images
    const orderItems = await Promise.all(
      items.map(async (item: any) => {
        const product = await Product.findById(item.productId);

        if (!product) throw new Error("Product not found");

        // ✅ FIXED: Use colorName instead of color to match the schema
        const variant = product?.colorVariants?.find(
          (v: any) => v.colorName?.toLowerCase() === item.color?.toLowerCase()
        );

        return {
          product: item.productId,
          quantity: item.quantity,
          color: item.color,
          price: item.price,
          // Use variant images if found, otherwise fallback to product images
          images: variant?.images?.length
            ? variant.images
            : product.images,
        };
      })
    );

    // Create order
    const newOrder = new Order({
      user: userId,
      address: addressId,
      items: orderItems,
      subtotal,
      discount,
      shipping,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
      orderStatus: "pending",
    });

    await newOrder.save();

    const orderId = (newOrder._id as any).toString();
    const user = await User.findById(userId);

    if (user?.email) {
      await sendOrderPlacedEmail(
        user.email,
        user.name || "Customer",
        orderId,
        total,
        items.length
      );
    }


    // Update stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart if needed
    if (shouldClearCart) {
      await Cart.findOneAndUpdate({ user: userId }, { items: [] });
    }

    // Populate order response
    const populatedOrder = await Order.findById(newOrder._id)
      .populate("address")
      .populate("items.product");

    res.status(201).json({
      message: "Order placed successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// =================== GET USER ORDERS ===================
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const orders = await Order.find({ user: userId })
      .populate("address")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== GET SINGLE ORDER ===================
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { orderId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const order = await Order.findOne({ _id: orderId, user: userId })
      .populate("address")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== CANCEL ORDER ===================
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { orderId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!["pending", "confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({
        message: `Order cannot be cancelled at this stage (${order.orderStatus})`,
      });
    }

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    order.orderStatus = "cancelled";
    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
