// src/controllers/postController.ts
import { Request, Response } from "express";
import Post from "../models/Post";
import { IGetUserAuthInfoRequest } from "../types/express";

export const createPost = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { title, slug, excerpt, mainImage, altText, category, publishedAt, isFeatured, body } = req.body;
  try {
    const post = new Post({
      title,
      slug,
      excerpt,
      author: req.userId, // Associate the post with the authenticated user
      mainImage,
      altText,
      category,
      publishedAt,
      isFeatured,
      body,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name username')
      .populate('category', 'title slug color description');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name username')
      .populate('category', 'title slug color description');
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('author', 'name username')
      .populate('category', 'title slug color description');
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
