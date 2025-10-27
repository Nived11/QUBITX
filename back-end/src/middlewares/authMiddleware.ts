import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // Case 1: No tokens at all -> deny access
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Case 2: Access token is present -> verify it
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as { id: string };
      (req as any).userId = decoded.id;
      return next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired access token" });
    }
  }

  // Case 3: Access token missing but refresh exists
  // Don't auto refresh here — let frontend handle refresh
  return res.status(401).json({ message: "Access token expired. Please refresh." });
};
