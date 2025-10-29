import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken =
    req.cookies.accessToken ||
    req.headers.authorization?.split(" ")[1]; // ✅ Support Bearer token
  const refreshToken =
    req.cookies.refreshToken ||
    (req.headers["x-refresh-token"] as string); // optional if frontend sends manually

  if (!accessToken && !refreshToken)
    return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as { id: string };
    (req as any).userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Access token expired. Please refresh." });
  }
};
