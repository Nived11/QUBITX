import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken =
    req.cookies.accessToken ||
    req.headers.authorization?.split(" ")[1];

  // ❌ Don't check for refreshToken here - only accessToken matters
  if (!accessToken) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as { id: string };
    (req as any).userId = decoded.id;
    next();
  } catch (err: any) {
    // Provide specific error messages based on the error type
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ 
        message: "Access token expired. Please refresh.",
        error: "TOKEN_EXPIRED"
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ 
        message: "Invalid token",
        error: "INVALID_TOKEN"
      });
    }
    // Generic error
    return res.status(403).json({ 
      message: "Token verification failed",
      error: "VERIFICATION_FAILED"
    });
  }
};