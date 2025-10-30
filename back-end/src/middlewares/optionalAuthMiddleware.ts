// middlewares/optionalAuthMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const optionalAuthenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.cookies.accessToken ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    // no token, just continue as guest
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    (req as any).userId = decoded.id;
  } catch (err) {
    // invalid/expired token → treat as guest (no error)
  }

  next();
};
