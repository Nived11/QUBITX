import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "dotenv";
import authRoutes from "./routes/auth.routes";
import otpRoutes from "./routes/otp.routes";
import { authenticateUser } from "./middlewares/authMiddleware";

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


app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);

app.get("/", authenticateUser, async (req, res) => {
  res.json({ message: "Access granted", userId: (req as any).userId });
});


export default app;
