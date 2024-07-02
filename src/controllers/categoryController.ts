// src/controllers/categoryController.ts
import { Request, Response } from "express";
import Category, { ICategory } from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  const { title, slug, color, description } = req.body;

  try {
    const category = new Category({ title, slug, color, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
