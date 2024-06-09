// src/middlewares/authMiddleware.ts
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/express";
import { JWT_SECRET } from "../config/config";

export const authMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Token format is invalid" });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
