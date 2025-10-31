import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "dotenv";
import authRoutes from "./routes/auth.routes";
import otpRoutes from "./routes/otp.routes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import wakeupRoutes from "./routes/wakeup.routes";

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

// Test protected route

export default app;
