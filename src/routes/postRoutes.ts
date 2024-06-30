// src/routes/postRoutes.ts
import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createPost); // Protect route with authMiddleware
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost); // Protect route with authMiddleware
router.delete("/:id", authMiddleware, deletePost); // Protect route with authMiddleware

export default router;
