import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "dotenv";
import authRoutes from "./routes/auth.routes";
import otpRoutes from "./routes/otp.routes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import wakeupRoutes from "./routes/wakeup.routes";
import cartRoutes from "./routes/cartRoutes";
import addressRoutes from "./routes/addressRoutes";
import orderRoutes from "./routes/orderRoutes";
import bannerRoutes from "./routes/bannerRoutes";

env.config();

const app = express();

app.use(
  cors({
   origin: [process.env.FRONTEND_URL!, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/wakeup", wakeupRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);



export default app;
