// src/routes/authRoutes.ts
import express from "express";
import {
  signUp,
  signIn,
  authenticate,
  getProfile,
  checkUser,
} from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
// router.get("/authenticate", authenticate);
// Protect the /profile route with authMiddleware
router.get("/profile", authMiddleware, getProfile);
router.get("/user", checkUser);

export default router;
