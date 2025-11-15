// src/controllers/orderController.ts
import { Request, Response } from "express";
import Order from "../models/orderModel";
import Cart from "../models/cartModel";
import Product from "../models/productModel";

// =================== CREATE ORDER ===================
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { addressId, paymentMethod, items, subtotal, discount, shipping, total, clearCart: shouldClearCart } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    
    if (!addressId || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate products exist and have sufficient stock
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
        });
      }
    }

    // Create order
    const newOrder = new Order({
      user: userId,
      address: addressId,
      items: items.map((item: any) => ({
        product: item.productId,
        quantity: item.quantity,
        color: item.color,
        price: item.price,
      })),
      subtotal,
      discount,
      shipping,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
      orderStatus: "pending",
    });

    await newOrder.save();

    // ✅ Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    // ✅ Clear cart if requested (not for Buy Now)
    if (shouldClearCart) {
      await Cart.findOneAndUpdate(
        { user: userId },
        { items: [] }
      );
    }

    // Populate order details
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('address')
      .populate('items.product');

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
      .populate('address')
      .populate('items.product')
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
      .populate('address')
      .populate('items.product');

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

    // Allow cancellation only if order is pending OR confirmed
    const cancellableStatuses = ["pending", "confirmed"];

    if (!cancellableStatuses.includes(order.orderStatus)) {
      return res.status(400).json({
        message: `Order cannot be cancelled at this stage (${order.orderStatus})`,
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
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
