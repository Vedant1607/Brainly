import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "./config.js";

interface AuthRequest extends Request {
  userId?: string;
}

export const userMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const decoded = jwt.verify(authHeader, config.jwtSecret) as JwtPayload & {
      id?: string;
    };

    if (!decoded || !decoded.id) {
      return res.status(403).json({ message: "You are not logged in" });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ message: "Unauthorized" });
  }
};
